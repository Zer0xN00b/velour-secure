import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-coffee-dark text-cream mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">☕</span>
              <span className="font-[family-name:var(--font-heading)] text-xl font-bold">Velour Café</span>
            </div>
            <p className="text-latte text-sm leading-relaxed">
              Where every cup tells a story. Handcrafted coffee, fresh pastries, and a cozy atmosphere that feels like home.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-latte hover:text-accent transition-colors">Home</Link></li>
              <li><Link href="/menu" className="text-latte hover:text-accent transition-colors">Menu</Link></li>
              <li><Link href="/about" className="text-latte hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-latte hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Hours</h4>
            <ul className="space-y-2 text-sm text-latte">
              <li>Mon–Fri: 7:00 AM – 8:00 PM</li>
              <li>Saturday: 8:00 AM – 9:00 PM</li>
              <li>Sunday: 8:00 AM – 6:00 PM</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Visit Us</h4>
            <address className="text-sm text-latte not-italic leading-relaxed">
              42 Oakwood Avenue<br />
              Dhaka, 1205<br />
              Bangladesh<br /><br />
              <a href="mailto:hello@velourcafe.com" className="hover:text-accent transition-colors">hello@velourcafe.com</a><br />
              <a href="tel:+8801234567890" className="hover:text-accent transition-colors">+880 1234 567 890</a>
            </address>
          </div>
        </div>

        <div className="border-t border-coffee mt-10 pt-6 text-center text-sm text-latte/70">
          © {new Date().getFullYear()} Velour Café. Brewed with ♥ and a lot of caffeine.
        </div>
      </div>
    </footer>
  );
}
