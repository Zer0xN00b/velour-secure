"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSession, signOut } from '@/lib/auth-client';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/menu', label: 'Menu' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const handleLogout = async () => {
  await signOut();
  setMobileOpen(false);
  router.push('/');
};
  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-latte/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
            <span className="text-3xl">☕</span>
            <span className="font-[family-name:var(--font-heading)] text-xl sm:text-2xl font-bold text-coffee-dark tracking-wide">
              Velour Café
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  pathname === link.href
                    ? 'text-caramel border-b-2 border-caramel pb-1'
                    : 'text-coffee hover:text-caramel'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/dashboard"
                  className={`text-sm font-medium transition-colors ${
                    pathname === '/dashboard' ? 'text-caramel' : 'text-coffee hover:text-caramel'
                  }`}
                >
                  {user.name.split(' ')[0]}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-coffee hover:text-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className="text-sm font-medium text-coffee hover:text-caramel transition-colors">
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-coffee-dark text-cream px-4 py-2 rounded-lg text-sm font-medium hover:bg-mocha transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-coffee-dark"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-latte/50">
            <nav className="flex flex-col gap-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`py-2 text-base font-medium transition-colors ${
                    pathname === link.href ? 'text-caramel' : 'text-coffee hover:text-caramel'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="py-2 text-base font-medium text-coffee hover:text-caramel"
                  >
                    Dashboard ({user.name.split(' ')[0]})
                  </Link>
                  <button onClick={handleLogout} className="text-left py-2 text-base font-medium text-red-600">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="py-2 text-base font-medium text-coffee hover:text-caramel"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="py-2 text-center bg-coffee-dark text-cream rounded-lg font-medium mt-2"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
