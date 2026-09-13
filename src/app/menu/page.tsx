"use client";

import { useState } from 'react';
import { useSession } from '@/lib/auth-client';
import Link from 'next/link';

interface MenuItem {
  name: string;
  desc: string;
  price: string;
  emoji: string;
  tags?: string[];
}

const coffeeItems: MenuItem[] = [
  { name: 'Espresso', desc: 'A bold, concentrated shot of our house-blend single-origin beans.', price: '$3.50', emoji: '☕' },
  { name: 'Americano', desc: 'Espresso with hot water for a smooth, rich flavor.', price: '$4.00', emoji: '☕' },
  { name: 'Cappuccino', desc: 'Equal parts espresso, steamed milk, and microfoam. Classic perfection.', price: '$4.75', emoji: '☕' },
  { name: 'Velour Signature Latte', desc: 'House espresso, velvety steamed milk, vanilla bean, dusted cocoa.', price: '$5.75', emoji: '☕', tags: ['popular'] },
  { name: 'Mocha Noir', desc: 'Dark 70% chocolate melted into double espresso, topped with whipped cream.', price: '$6.25', emoji: '🍫' },
  { name: 'Honey Cinnamon Cold Brew', desc: 'Slow-steeped cold brew with local honey and Ceylon cinnamon.', price: '$5.25', emoji: '🧊' },
  { name: 'Rose Cardamom Latte', desc: 'Aromatic rose water, cardamom, and oat milk over espresso.', price: '$6.00', emoji: '🌹' },
  { name: 'Caramel Macchiato', desc: 'Vanilla, steamed milk, espresso, and a swirl of house caramel.', price: '$5.75', emoji: '🍯' },
  { name: 'Flat White', desc: 'Double ristretto with micro-steamed milk for a velvety texture.', price: '$4.95', emoji: '☕' },
];

const teaItems: MenuItem[] = [
  { name: 'Earl Grey', desc: 'Classic bergamot-infused black tea, served with milk or lemon.', price: '$3.75', emoji: '🫖' },
  { name: 'Matcha Latte', desc: 'Ceremonial-grade Japanese matcha whisked with steamed milk.', price: '$5.50', emoji: '🍵', tags: ['popular'] },
  { name: 'Chai Latte', desc: 'House-brewed spiced chai with cardamom, cinnamon, ginger, and star anise.', price: '$5.25', emoji: '🍂' },
  { name: 'Jasmine Pearls', desc: 'Hand-rolled green tea scented with fresh jasmine blossoms.', price: '$4.50', emoji: '🌸' },
  { name: 'Chamomile', desc: 'Calming Egyptian chamomile flowers. Perfect for evenings.', price: '$3.75', emoji: '🌼' },
  { name: 'London Fog', desc: 'Earl Grey with steamed milk, vanilla, and a hint of lavender.', price: '$4.95', emoji: '🌫️' },
  { name: 'Hibiscus Berry Iced Tea', desc: 'Tart hibiscus with mixed berries, served over ice.', price: '$4.50', emoji: '🧊' },
];

const pastryItems: MenuItem[] = [
  { name: 'Butter Croissant', desc: 'Flaky, layered French-style croissant baked fresh every morning.', price: '$4.25', emoji: '🥐', tags: ['popular'] },
  { name: 'Pistachio Croissant', desc: 'Buttery croissant filled with house-made pistachio cream.', price: '$5.50', emoji: '🥐' },
  { name: 'Almond Croissant', desc: 'Twice-baked croissant with frangipane and toasted almonds.', price: '$5.25', emoji: '🥐' },
  { name: 'Blueberry Muffin', desc: 'Moist lemon-zest muffin loaded with wild blueberries.', price: '$4.00', emoji: '🫐' },
  { name: 'Chocolate Chip Cookie', desc: 'Brown-butter cookie with sea salt and dark chocolate chunks.', price: '$3.50', emoji: '🍪' },
  { name: 'Cinnamon Roll', desc: 'Soft brioche swirled with cinnamon and topped with cream cheese glaze.', price: '$5.00', emoji: '🌀' },
  { name: 'Avocado Toast', desc: 'Sourdough, smashed avocado, chili flakes, lemon, and poached egg.', price: '$9.50', emoji: '🥑' },
  { name: 'Banana Bread', desc: 'Moist banana bread with walnuts and a honey-butter glaze.', price: '$4.25', emoji: '🍌' },
];

type Category = 'coffee' | 'tea' | 'pastries';

const categories: { key: Category; label: string; emoji: string; items: MenuItem[] }[] = [
  { key: 'coffee', label: 'Coffee', emoji: '☕', items: coffeeItems },
  { key: 'tea', label: 'Tea', emoji: '🫖', items: teaItems },
  { key: 'pastries', label: 'Pastries', emoji: '🥐', items: pastryItems },
];

export default function MenuPage() {
  const [active, setActive] = useState<Category>('coffee');
  const { data: session } = useSession();
  const user = session?.user;
  const favorites: { id: string; name: string; category: string }[] = [];
  const addFavorite = (item: { name: string; category: string }) => { console.log('add favorite (not yet implemented):', item); };

  const activeCategory = categories.find((c) => c.key === active)!;

  const isFavorited = (name: string) => favorites.some((f) => f.name === name);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="text-center mb-10">
        <span className="text-caramel font-medium text-sm uppercase tracking-widest">Our Menu</span>
        <h1 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl lg:text-6xl text-coffee-dark mt-2">
          Crafted with care.
        </h1>
        <p className="text-coffee/70 mt-4 max-w-xl mx-auto">
          Everything is made in-house from thoughtfully sourced ingredients. Prices include tax.
        </p>
      </div>

      {/* Category tabs */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex flex-wrap gap-2 p-2 bg-cream rounded-xl">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className={`px-5 sm:px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${
                active === cat.key
                  ? 'bg-coffee-dark text-cream shadow-md'
                  : 'text-coffee hover:bg-white/70'
              }`}
            >
              <span className="mr-2">{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Items grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {activeCategory.items.map((item) => (
          <div
            key={item.name}
            className="card p-5 sm:p-6 flex gap-4 items-start group"
          >
            <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-cream to-latte/50 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform">
              {item.emoji}
            </div>
            <div className="flex-grow min-w-0">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-[family-name:var(--font-heading)] text-lg sm:text-xl font-semibold text-coffee-dark">
                  {item.name}
                  {item.tags?.includes('popular') && (
                    <span className="ml-2 text-xs bg-caramel/15 text-caramel px-2 py-0.5 rounded-full font-sans font-medium align-middle">
                      Popular
                    </span>
                  )}
                </h3>
                <span className="text-caramel font-semibold whitespace-nowrap">{item.price}</span>
              </div>
              <p className="text-sm text-coffee/70 mt-1 leading-relaxed">{item.desc}</p>
              {user && (
                <button
                  onClick={() =>
                    !isFavorited(item.name) && addFavorite({ name: item.name, category: activeCategory.label })
                  }
                  className={`mt-2 text-xs font-medium transition-colors ${
                    isFavorited(item.name)
                      ? 'text-sage'
                      : 'text-coffee/50 hover:text-caramel'
                  }`}
                >
                  {isFavorited(item.name) ? '♥ Saved' : '♡ Save to favorites'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {!user && (
        <div className="mt-12 text-center bg-cream rounded-2xl p-8">
          <p className="text-coffee/80 mb-4">
            Want to save your favorites and track orders?
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/signup" className="btn-primary">Create an Account</Link>
            <Link href="/login" className="btn-secondary">Login</Link>
          </div>
        </div>
      )}
    </div>
  );
}
