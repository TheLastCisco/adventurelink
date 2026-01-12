import { createContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export const AuthContext = createContext({ user: null, session: null, signIn: async ()=>{}, signOut: async ()=>{} });

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession();
      if (!mounted) return;
      setSession(session);
      setUser(session?.user ?? null);
    })();

    // subscribe to auth state changes
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      if (data?.subscription) data.subscription.unsubscribe();
    };
  }, []);

  /**
   * Send magic link. By default directs to NEXT_PUBLIC_SITE_URL (client env).
   * You may pass an optional `redirectTo` argument.
   */
  async function signIn(email, redirectTo) {
    const redirect = redirectTo ?? process.env.NEXT_PUBLIC_SITE_URL ?? null;
    // supabase-js v2 supports passing options: { emailRedirectTo }
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
    <AuthContext.Provider value={{ user, session, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
