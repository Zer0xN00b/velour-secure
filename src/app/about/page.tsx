import Link from 'next/link';

const timeline = [
  { year: '2018', title: 'The seed is planted', desc: 'Velour Café opens its doors on Oakwood Avenue with just four tables and one espresso machine.' },
  { year: '2020', title: 'Finding our roots', desc: 'We partner with our first direct-trade coffee farm in Colombia, building relationships that still shape our roasts today.' },
  { year: '2022', title: 'The bakery expansion', desc: 'We add a full in-house pastry kitchen, welcoming our head baker Mia and her legendary croissants.' },
  { year: '2026', title: 'Your neighborhood home', desc: 'Today we serve hundreds of regulars every week — but we still pour every cup the way we poured our first.' },
];

const values = [
  { icon: '🌱', title: 'Ethically sourced', desc: 'We work directly with small farms, paying fair prices for exceptional beans.' },
  { icon: '🥐', title: 'Baked fresh daily', desc: 'Our pastries are mixed, shaped, and baked in-house every morning — never frozen, never shipped.' },
  { icon: '🤝', title: 'Community first', desc: 'We host open mics, book clubs, and local art shows because a café should be more than coffee.' },
  { icon: '♻️', title: 'Thoughtfully green', desc: 'Compostable packaging, compost pickup, and a bring-your-own-cup discount for every drink.' },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative bg-gradient-to-b from-cream to-transparent">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <span className="text-caramel font-medium text-sm uppercase tracking-widest">Our Story</span>
          <h1 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl lg:text-6xl text-coffee-dark mt-2 mb-6">
            Brewed from love,<br />served with warmth.
          </h1>
          <p className="text-lg text-coffee/80 max-w-2xl mx-auto leading-relaxed">
            Velour Café was born from a simple idea: that a good cup of coffee has the power to slow
            time, spark conversation, and make a regular day feel a little more special.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="prose prose-lg max-w-none text-coffee/85 leading-relaxed space-y-5">
          <p>
            It started in a tiny apartment kitchen in 2017, when our founders — Aisha and Rehan —
            realized the coffee shops they loved never quite felt like home. Either the drinks were
            rushed, the space was cold, or the pastries came from a truck rather than an oven.
            They wanted something different: a place where the baristas knew your name, the milk
            was steamed properly, and you could stay three hours with a book and nobody would rush you.
          </p>
          <p>
            Six months later they signed a lease on a shuttered flower shop on Oakwood Avenue,
            painted the walls themselves, and named the café after the velvety texture of a
            perfectly pulled latte. On opening day they served 37 customers. A year later,
            regulars were lined up out the door.
          </p>
          <p>
            Today, Velour is still owned and run by the same small team. Our mission hasn't
            changed: serve excellent coffee, bake excellent pastries, and treat every guest like
            they're walking into our living room.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl text-coffee-dark text-center mb-12">
            Our Journey
          </h2>
          <div className="relative">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-latte sm:-translate-x-1/2" />
            <div className="space-y-10">
              {timeline.map((entry, i) => (
                <div
                  key={entry.year}
                  className={`relative flex flex-col sm:flex-row gap-4 sm:gap-8 ${
                    i % 2 === 0 ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  <div className="sm:w-1/2 sm:text-right pl-12 sm:pl-0 sm:pr-8">
                    <div className="bg-white rounded-2xl p-5 shadow-md inline-block text-left sm:text-inherit">
                      <span className="text-caramel font-bold text-sm">{entry.year}</span>
                      <h3 className="font-[family-name:var(--font-heading)] text-xl text-coffee-dark mt-1">
                        {entry.title}
                      </h3>
                      <p className="text-coffee/70 text-sm mt-2 leading-relaxed">{entry.desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-4 sm:left-1/2 w-4 h-4 bg-caramel rounded-full border-4 border-cream -translate-x-1/2 mt-2" />
                  <div className="hidden sm:block sm:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl text-coffee-dark">
            What we care about
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div key={v.title} className="card p-6 text-center">
              <div className="text-4xl mb-3">{v.icon}</div>
              <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-coffee-dark mb-2">
                {v.title}
              </h3>
              <p className="text-sm text-coffee/70 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Location & Hours */}
      <section className="bg-coffee-dark text-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <span className="text-accent font-medium text-sm uppercase tracking-widest">Visit Us</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl mt-2 mb-6">
                Location & Hours
              </h2>
              <address className="not-italic text-latte leading-relaxed mb-8">
                <div className="flex items-start gap-3 mb-2">
                  <span className="text-accent">📍</span>
                  <div>
                    42 Oakwood Avenue<br />
                    Dhaka, 1205<br />
                    Bangladesh
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-accent">📞</span>
                  <a href="tel:+8801234567890" className="hover:text-accent transition-colors">+880 1234 567 890</a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-accent">✉️</span>
                  <a href="mailto:hello@velourcafe.com" className="hover:text-accent transition-colors">hello@velourcafe.com</a>
                </div>
              </address>
              <Link href="/contact" className="inline-block bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-caramel transition-colors">
                Send us a message
              </Link>
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-heading)] text-2xl mb-6">Hours</h3>
              <div className="space-y-3">
                {[
                  { day: 'Monday – Friday', hours: '7:00 AM – 8:00 PM' },
                  { day: 'Saturday', hours: '8:00 AM – 9:00 PM' },
                  { day: 'Sunday', hours: '8:00 AM – 6:00 PM' },
                  { day: 'Public holidays', hours: '9:00 AM – 4:00 PM' },
                ].map((h) => (
                  <div key={h.day} className="flex justify-between border-b border-coffee pb-3">
                    <span className="text-latte">{h.day}</span>
                    <span className="font-medium">{h.hours}</span>
                  </div>
                ))}
              </div>
              <p className="text-latte/70 text-sm mt-6 italic">
                * Kitchen closes 30 minutes before closing time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
