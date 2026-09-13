"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession, signOut } from '@/lib/auth-client';

type Tab = 'orders' | 'favorites' | 'profile';

export default function DashboardPage() {
  const { data: session } = useSession();
  const user = session?.user;
  const orderHistory: { id: string; date: string; total: number; items: string[] }[] = [];
  const favorites: { id: string; name: string; category: string }[] = [];
  const removeFavorite = (id: string) => { console.log('remove favorite (not yet implemented):', id); };
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('orders');

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-pulse text-coffee/60">Loading...</div>
      </div>
    );
  }

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Header */}
      <div className="bg-gradient-to-r from-coffee-dark to-mocha rounded-3xl p-6 sm:p-10 text-cream mb-8 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 80% 50%, #d7b899 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center text-2xl font-bold shadow-lg">
            {initials}
          </div>
          <div className="flex-grow">
            <h1 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold">
              Hi, {user.name.split(' ')[0]} ☕
            </h1>
            <p className="text-latte text-sm mt-1">{user.email}</p>
            <p className="text-latte/80 text-xs mt-2">
              Member since {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
          <button
            onClick={async () => {
  await signOut();
  router.push('/');
}}
            className="px-4 py-2 border border-latte/30 rounded-lg text-sm hover:bg-cream/10 transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        <div className="card p-5">
          <p className="text-xs uppercase tracking-wider text-coffee/50">Orders</p>
          <p className="font-[family-name:var(--font-heading)] text-3xl text-coffee-dark mt-1">{orderHistory.length}</p>
        </div>
        <div className="card p-5">
          <p className="text-xs uppercase tracking-wider text-coffee/50">Favorites</p>
          <p className="font-[family-name:var(--font-heading)] text-3xl text-coffee-dark mt-1">{favorites.length}</p>
        </div>
        <div className="card p-5 col-span-2 sm:col-span-1">
          <p className="text-xs uppercase tracking-wider text-coffee/50">Loyalty drinks</p>
          <p className="font-[family-name:var(--font-heading)] text-3xl text-coffee-dark mt-1">3/10</p>
          <p className="text-xs text-sage mt-1">7 more for a free drink!</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-latte mb-6 overflow-x-auto">
        {(['orders', 'favorites', 'profile'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-3 text-sm font-medium capitalize whitespace-nowrap border-b-2 transition-colors ${
              tab === t ? 'border-caramel text-caramel' : 'border-transparent text-coffee/60 hover:text-coffee'
            }`}
          >
            {t === 'orders' ? 'Order History' : t === 'favorites' ? 'Saved Favorites' : 'Profile'}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === 'orders' && (
        <div>
          {orderHistory.length === 0 ? (
            <div className="card p-12 text-center">
              <div className="text-5xl mb-3">☕</div>
              <h3 className="font-[family-name:var(--font-heading)] text-xl text-coffee-dark mb-2">No orders yet</h3>
              <p className="text-coffee/70 text-sm mb-6">Your order history will appear here once you place your first order.</p>
              <Link href="/menu" className="btn-primary">Browse the menu</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orderHistory.map((order) => (
                <div key={order.id} className="card p-5">
                  <div className="flex justify-between items-start mb-3 flex-wrap gap-2">
                    <div>
                      <p className="text-xs text-coffee/50">Order #{order.id.split('-').pop()}</p>
                      <p className="font-semibold text-coffee-dark">
                        {new Date(order.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <span className="text-caramel font-semibold text-lg">${order.total.toFixed(2)}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {order.items.map((item, i) => (
                      <span key={i} className="text-xs bg-cream text-coffee px-3 py-1 rounded-full">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-cream flex justify-between items-center">
                    <span className="text-xs text-sage font-medium">● Completed</span>
                    <button className="text-xs text-caramel hover:text-mocha font-medium">Reorder →</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'favorites' && (
        <div>
          {favorites.length === 0 ? (
            <div className="card p-12 text-center">
              <div className="text-5xl mb-3">♥</div>
              <h3 className="font-[family-name:var(--font-heading)] text-xl text-coffee-dark mb-2">No favorites yet</h3>
              <p className="text-coffee/70 text-sm mb-6">Save items from the menu to quickly reorder them.</p>
              <Link href="/menu" className="btn-primary">Explore menu</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {favorites.map((fav) => (
                <div key={fav.id} className="card p-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-coffee-dark">{fav.name}</p>
                    <p className="text-xs text-coffee/60 mt-1">{fav.category}</p>
                  </div>
                  <button
                    onClick={() => removeFavorite(fav.id)}
                    className="text-coffee/40 hover:text-red-500 transition-colors p-2"
                    aria-label="Remove"
                    title="Remove"
                  >
                    ♥
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'profile' && (
        <div className="card p-6 sm:p-8 max-w-xl">
          <h3 className="font-[family-name:var(--font-heading)] text-xl text-coffee-dark mb-6">Account details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-coffee/50 mb-1">Name</label>
              <input type="text" defaultValue={user.name} className="input-field" readOnly />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-coffee/50 mb-1">Email</label>
              <input type="email" defaultValue={user.email} className="input-field" readOnly />
            </div>
            <p className="text-xs text-coffee/50 italic">
              Demo app: profile editing is disabled. Account data is stored locally in your browser.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
