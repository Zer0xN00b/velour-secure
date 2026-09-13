"use client";

import { useState, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = (): Errors => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = 'Please enter your name.';
    else if (form.name.trim().length < 2) e.name = 'Name is too short.';

    if (!form.email.trim()) e.email = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email.';

    if (!form.message.trim()) e.message = 'Please write a message.';
    else if (form.message.trim().length < 10) e.message = 'Message should be at least 10 characters.';

    return e;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;
    setSubmitting(true);
    // Simulate async submission
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSubmitted(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field as keyof Errors]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="text-center mb-12">
        <span className="text-caramel font-medium text-sm uppercase tracking-widest">Get in Touch</span>
        <h1 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl lg:text-6xl text-coffee-dark mt-2">
          Say hello.
        </h1>
        <p className="text-coffee/70 mt-4 max-w-xl mx-auto">
          Questions, catering inquiries, or just want to tell us how much you loved your latte?
          We'd love to hear from you.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Info */}
        <div className="lg:col-span-2 space-y-5">
          <div className="card p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-caramel/10 flex items-center justify-center text-2xl flex-shrink-0">
                📍
              </div>
              <div>
                <h3 className="font-semibold text-coffee-dark mb-1">Visit</h3>
                <p className="text-sm text-coffee/70 leading-relaxed">
                  42 Oakwood Avenue<br />Dhaka, 1205, Bangladesh
                </p>
              </div>
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-caramel/10 flex items-center justify-center text-2xl flex-shrink-0">
                ✉️
              </div>
              <div>
                <h3 className="font-semibold text-coffee-dark mb-1">Email</h3>
                <a href="mailto:hello@velourcafe.com" className="text-sm text-coffee/70 hover:text-caramel transition-colors">
                  hello@velourcafe.com
                </a>
              </div>
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-caramel/10 flex items-center justify-center text-2xl flex-shrink-0">
                📞
              </div>
              <div>
                <h3 className="font-semibold text-coffee-dark mb-1">Call</h3>
                <a href="tel:+8801234567890" className="text-sm text-coffee/70 hover:text-caramel transition-colors">
                  +880 1234 567 890
                </a>
              </div>
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-caramel/10 flex items-center justify-center text-2xl flex-shrink-0">
                🕐
              </div>
              <div>
                <h3 className="font-semibold text-coffee-dark mb-1">Hours</h3>
                <p className="text-sm text-coffee/70 leading-relaxed">
                  Mon–Fri: 7am – 8pm<br />
                  Sat: 8am – 9pm<br />
                  Sun: 8am – 6pm
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-3">
          <div className="card p-6 sm:p-8">
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="font-[family-name:var(--font-heading)] text-2xl text-coffee-dark mb-2">
                  Message sent!
                </h2>
                <p className="text-coffee/70 mb-6">
                  Thanks for reaching out. We typically respond within 1–2 business days.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-secondary"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-coffee-dark mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Your full name"
                      className={`input-field ${errors.name ? 'border-red-400 focus:ring-red-300' : ''}`}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-coffee-dark mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="you@example.com"
                      className={`input-field ${errors.email ? 'border-red-400 focus:ring-red-300' : ''}`}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-sm font-medium text-coffee-dark mb-2">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={form.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    placeholder="What's this about? (optional)"
                    className="input-field"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-coffee-dark mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    value={form.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Tell us what's on your mind..."
                    className={`input-field resize-none ${errors.message ? 'border-red-400 focus:ring-red-300' : ''}`}
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
