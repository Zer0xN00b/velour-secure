"use client";

import { useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from '@/lib/auth-client';

export default function LoginPage() {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) router.push('/dashboard');
  }, [user, router]);

  const validate = () => {
    const e: typeof errors = {};
    if (!email) e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Please enter a valid email.';
    if (!password) e.password = 'Password is required.';
    else if (password.length < 6) e.password = 'Password must be at least 6 characters.';
    return e;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;
    setLoading(true);
    const { error } = await signIn.email({ email, password });
setLoading(false);
if (error) {
  setErrors({ general: error.message || 'Invalid email or password.' });
} else {
  router.push('/dashboard');
}
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="card p-8">
          <div className="text-center mb-8">
            <span className="text-4xl">☕</span>
            <h1 className="font-[family-name:var(--font-heading)] text-3xl text-coffee-dark mt-3">
              Welcome back
            </h1>
            <p className="text-coffee/70 text-sm mt-2">Sign in to your Velour Café account</p>
          </div>

          {errors.general && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-coffee-dark mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((er) => ({ ...er, email: undefined, general: undefined }));
                }}
                placeholder="you@example.com"
                className={`input-field ${errors.email ? 'border-red-400 focus:ring-red-300' : ''}`}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-coffee-dark mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((er) => ({ ...er, password: undefined, general: undefined }));
                  }}
                  placeholder="••••••••"
                  className={`input-field pr-12 ${errors.password ? 'border-red-400 focus:ring-red-300' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-coffee/50 hover:text-coffee text-sm"
                  tabIndex={-1}
                >
                  {showPass ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
            </div>

            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-sm text-caramel hover:text-mocha transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-coffee/70 mt-6">
            Don't have an account?{' '}
            <Link href="/signup" className="text-caramel font-medium hover:text-mocha transition-colors">
              Sign up
            </Link>
          </p>
        </div>
        <p className="text-center text-xs text-coffee/50 mt-4">
          Demo tip: Create an account first on the signup page, then log in here.
        </p>
      </div>
    </div>
  );
}
