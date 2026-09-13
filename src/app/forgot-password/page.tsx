"use client";

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email.');
      return;
    }
    setError(undefined);
    setLoading(true);

    const auth = authClient as typeof authClient & {
      forgetPassword: (params: { email: string; redirectTo: string }) => Promise<unknown>;
    };

    await auth.forgetPassword({ email, redirectTo: '/reset-password' });
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="card p-8">
          <div className="text-center mb-8">
            <span className="text-4xl">🔐</span>
            <h1 className="font-[family-name:var(--font-heading)] text-3xl text-coffee-dark mt-3">
              Reset your password
            </h1>
            <p className="text-coffee/70 text-sm mt-2">
              {sent
                ? 'Check your inbox for reset instructions.'
                : 'Enter your email and we will send you a reset link.'}
            </p>
          </div>

          {sent ? (
            <div className="text-center">
              <div className="text-5xl mb-4">📬</div>
              <p className="text-coffee/80 mb-6 text-sm">
                If an account exists for <strong>{email}</strong>, we've sent a password reset link.
                It should arrive within a minute or two.
              </p>
              <div className="space-y-3">
                <button onClick={() => { setSent(false); setEmail(''); }} className="btn-secondary w-full">
                  Send again
                </button>
                <Link href="/login" className="btn-primary block text-center">
                  Back to login
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-coffee-dark mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(undefined); }}
                  placeholder="you@example.com"
                  className={`input-field ${error ? 'border-red-400 focus:ring-red-300' : ''}`}
                />
                {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
              <p className="text-center text-sm text-coffee/70">
                <Link href="/login" className="text-caramel hover:text-mocha transition-colors">
                  ← Back to login
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
