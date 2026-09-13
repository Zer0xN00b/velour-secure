import Link from 'next/link';

const featuredDrinks = [
  {
    name: 'Velour Signature Latte',
    desc: 'House espresso with velvety steamed milk, vanilla bean, and a dusting of cocoa.',
    price: '$5.75',
    emoji: '☕',
  },
  {
    name: 'Honey Cinnamon Cold Brew',
    desc: 'Slow-steeped cold brew sweetened with local honey and a dash of Ceylon cinnamon.',
    price: '$5.25',
    emoji: '🧊',
  },
  {
    name: 'Rose Cardamom Latte',
    desc: 'A floral, aromatic latte with rose water, cardamom, and oat milk.',
    price: '$6.00',
    emoji: '🌹',
  },
  {
    name: 'Mocha Noir',
    desc: 'Dark 70% chocolate melted into double espresso, topped with whipped cream.',
    price: '$6.25',
    emoji: '🍫',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-cream via-latte/30 to-mocha/20"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, #3e2723 2px, transparent 2px), radial-gradient(circle at 75% 75%, #a0622d 2px, transparent 2px)",
            backgroundSize: '60px 60px',
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-caramel/10 text-caramel rounded-full text-sm font-medium mb-6">
                ✦ Freshly roasted. Daily brewed.
              </span>
              <h1 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl lg:text-7xl font-bold text-coffee-dark leading-tight mb-6">
                Find your
                <span className="text-caramel italic"> perfect </span>
                pour.
              </h1>
              <p className="text-lg text-coffee/80 leading-relaxed mb-8 max-w-xl">
                Tucked between tree-lined streets, Velour Café is your neighborhood retreat for
                handcrafted coffee, fresh pastries, and slow mornings. Come for the brew — stay
                for the vibe.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/menu" className="btn-primary">
                  Explore the Menu
                </Link>
                <Link href="/about" className="btn-secondary">
                  Our Story
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-10 text-sm text-coffee/70">
                <div className="flex items-center gap-2">
                  <span className="text-caramel">★★★★★</span>
                  <span>4.9 on Google</span>
                </div>
                <div className="h-4 w-px bg-latte" />
                <span>Open since 2018</span>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="relative w-72 h-72 sm:w-96 sm:h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-caramel to-mocha rounded-full blur-3xl opacity-20" />
                <div className="relative w-full h-full bg-gradient-to-br from-cream to-latte/60 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/50">
                  <span className="text-[10rem] sm:text-[12rem]">☕</span>
                </div>
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 animate-pulse">
                  <span className="text-3xl">🥐</span>
                </div>
                <div className="absolute -bottom-2 -left-2 bg-white rounded-2xl shadow-xl p-4">
                  <span className="text-3xl">🍪</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Drinks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-12">
          <span className="text-caramel font-medium text-sm uppercase tracking-widest">
            House Favorites
          </span>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl text-coffee-dark mt-2">
            Sips Worth Savoring
          </h2>
          <p className="text-coffee/70 mt-4 max-w-xl mx-auto">
            Our baristas craft every drink with care. Here are a few of our most loved creations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDrinks.map((item) => (
            <div key={item.name} className="card p-6 text-center group">
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {item.emoji}
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-coffee-dark mb-2">
                {item.name}
              </h3>
              <p className="text-sm text-coffee/70 mb-4 leading-relaxed min-h-[60px]">{item.desc}</p>
              <span className="inline-block text-caramel font-semibold">{item.price}</span>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/menu" className="btn-secondary">
            View Full Menu →
          </Link>
        </div>
      </section>

      {/* About Blurb */}
      <section className="bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-caramel font-medium text-sm uppercase tracking-widest">
                About Us
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl text-coffee-dark mt-2 mb-6">
                A little corner of comfort.
              </h2>
              <p className="text-coffee/80 leading-relaxed mb-4">
                Velour Café began in 2018 as a small family dream — a place where the coffee is
                strong, the pastries are buttery, and everyone feels welcome the moment they walk
                through the door.
              </p>
              <p className="text-coffee/80 leading-relaxed mb-6">
                We source single-origin beans from ethical farms, bake everything fresh each
                morning, and pour every cup with intention. Whether you're catching up with
                friends or grabbing a quiet moment alone, there's a seat here waiting for you.
              </p>
              <Link href="/about" className="text-caramel font-semibold hover:text-mocha transition-colors inline-flex items-center gap-1">
                Read our full story
                <span>→</span>
              </Link>
            </div>
            <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-latte to-caramel/30 rounded-2xl aspect-[3/4] flex items-center justify-center shadow-lg">
                <span className="text-8xl">🫘</span>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-gradient-to-br from-cream to-mocha/20 rounded-2xl aspect-square flex items-center justify-center shadow-lg">
                  <span className="text-6xl">🥐</span>
                </div>
                <div className="bg-gradient-to-br from-sage/30 to-latte/50 rounded-2xl aspect-square flex items-center justify-center shadow-lg">
                  <span className="text-6xl">🫖</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="bg-coffee-dark rounded-3xl px-6 sm:px-12 py-12 sm:py-16 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 50%, #d7b899 1px, transparent 1px), radial-gradient(circle at 80% 30%, #a0622d 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
          <div className="relative">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl text-cream mb-4">
              Come say hi.
            </h2>
            <p className="text-latte max-w-lg mx-auto mb-8">
              We'd love to pour you your next favorite drink. Drop by — no reservation needed.
            </p>
            <Link href="/contact" className="inline-block bg-accent text-white px-8 py-3 rounded-lg font-medium hover:bg-caramel transition-colors">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
