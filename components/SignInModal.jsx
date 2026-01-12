import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function SignInModal({ open, onClose }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const { signIn } = useContext(AuthContext);

  if (!open) return null;

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      // signIn will use NEXT_PUBLIC_SITE_URL for redirect if configured
      await signIn(email);
      setMessage('Check your email for a magic link to sign in.');
    } catch (err) {
      setMessage(err.message || 'Failed to send magic link.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md p-6 card">
        <h3 className="text-lg neon">Sign in</h3>
        <p className="text-sm text-gray-400">Enter your email and we'll send a magic link.</p>
        <form onSubmit={submit} className="mt-4 space-y-3">
          <input required type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" className="w-full p-2 rounded bg-black/10" />
          <div className="flex items-center justify-between">
            <button type="submit" disabled={loading} className="px-4 py-2 rounded neon bg-cyan-800/30">{loading ? 'Sending…' : 'Send Magic Link'}</button>
            <button type="button" onClick={onClose} className="px-3 py-2 rounded bg-gray-700/30">Close</button>
          </div>
          {message && <div className="text-sm text-gray-300 mt-2">{message}</div>}
        </form>
      </div>
    </div>
  );
}
