import { createContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export const AuthContext = createContext({ user: null, session: null, initializing: true, signIn: async ()=>{}, signOut: async ()=>{} });

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (!mounted) return;
        setSession(data?.session ?? null);
        setUser(data?.session?.user ?? null);
      } catch (err) {
        console.error('Error fetching initial session', err);
      } finally {
        if (mounted) setInitializing(false);
      }
    };

    init();

    // subscribe to auth changes and capture the subscription explicitly
    const { data: subscriptionData } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session ?? null);
      setUser(session?.user ?? null);
      setInitializing(false);
    });

    const subscription = subscriptionData?.subscription || subscriptionData;

    return () => {
      mounted = false;
      if (subscription?.unsubscribe) subscription.unsubscribe();
    };
  }, []);

  async function signIn(email, redirectTo) {
    const redirect = redirectTo ?? process.env.NEXT_PUBLIC_SITE_URL ?? null;
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: redirect ? { emailRedirectTo: `${redirect}` } : undefined,
    });
    if (error) throw error;
    return data;
  }

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  }

  return (
    <AuthContext.Provider value={{ user, session, initializing, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
