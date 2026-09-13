"use client";

import { useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signUp, useSession } from '@/lib/auth-client';

function passwordStrength(pw: string): { score: number; label: string; color: string } {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const labels = ['Weak', 'Fair', 'Good', 'Strong', 'Excellent'];
  const colors = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400', 'bg-emerald-500'];
  return { score, label: labels[score] || 'Weak', color: colors[score] || colors[0] };
}

export default function SignupPage() {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; confirm?: string; general?: string }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) router.push('/dashboard');
  }, [user, router]);

  const validate = () => {
    const e: typeof errors = {};
    if (!name.trim()) e.name = 'Name is required.';
    else if (name.trim().length < 2) e.name = 'Please enter your full name.';

    if (!email) e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Please enter a valid email.';

    if (!password) e.password = 'Password is required.';
    else if (password.length < 8) e.password = 'Password must be at least 8 characters.';

    if (!confirm) e.confirm = 'Please confirm your password.';
    else if (confirm !== password) e.confirm = 'Passwords do not match.';

    return e;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;
    setLoading(true);
    const { error } = await signUp.email({ name: name.trim(), email, password });
setLoading(false);
if (error) {
  setErrors({ general: error.message || 'Could not create account.' });
} else {
  router.push('/dashboard');
}
  };

  const strength = passwordStrength(password);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="card p-8">
          <div className="text-center mb-8">
            <span className="text-4xl">☕</span>
            <h1 className="font-[family-name:var(--font-heading)] text-3xl text-coffee-dark mt-3">
              Join the club
            </h1>
            <p className="text-coffee/70 text-sm mt-2">Create your Velour Café account</p>
          </div>

          {errors.general && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-coffee-dark mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setErrors((er) => ({ ...er, name: undefined, general: undefined })); }}
                placeholder="Jane Doe"
                className={`input-field ${errors.name ? 'border-red-400 focus:ring-red-300' : ''}`}
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-coffee-dark mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors((er) => ({ ...er, email: undefined, general: undefined })); }}
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
                  onChange={(e) => { setPassword(e.target.value); setErrors((er) => ({ ...er, password: undefined, general: undefined })); }}
                  placeholder="At least 6 characters"
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
              {password && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full ${i < strength.score ? strength.color : 'bg-latte'}`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-coffee/60 mt-1">{strength.label}</p>
                </div>
              )}
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
            </div>
            <div>
              <label htmlFor="confirm" className="block text-sm font-medium text-coffee-dark mb-2">
                Confirm Password
              </label>
              <input
                id="confirm"
                type={showPass ? 'text' : 'password'}
                value={confirm}
                onChange={(e) => { setConfirm(e.target.value); setErrors((er) => ({ ...er, confirm: undefined, general: undefined })); }}
                placeholder="Re-enter your password"
                className={`input-field ${errors.confirm ? 'border-red-400 focus:ring-red-300' : ''}`}
              />
              {errors.confirm && <p className="mt-1 text-xs text-red-500">{errors.confirm}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-coffee/70 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-caramel font-medium hover:text-mocha transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
