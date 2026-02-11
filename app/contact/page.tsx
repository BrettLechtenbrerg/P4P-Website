'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import FadeIn from '@/components/animations/FadeIn';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would submit to a backend or form service
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <>
      <PageHeader
        badge="Contact"
        title="Get in Touch"
        description="Have questions or want to get involved? We'd love to hear from you."
        breadcrumbs={[
          { label: 'Contact' },
        ]}
        backgroundImage="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80"
      />

      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <FadeIn direction="left">
              <div>
                <h2 className="text-3xl font-bold text-white">Let&apos;s Connect</h2>
                <p className="mt-4 text-white/70 leading-relaxed">
                  Whether you have questions about our programs, want to volunteer, or are interested in partnering with us, we&apos;re here to help.
                </p>

                <div className="mt-8 space-y-6">
                  <div className="glass-card p-6 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Email Us</h3>
                      <a
                        href="mailto:director@murrayp4p.com"
                        className="mt-1 text-orange-400 hover:text-orange-300 transition-colors"
                      >
                        director@murrayp4p.com
                      </a>
                      <p className="mt-2 text-white/60 text-sm">
                        We typically respond within 24-48 hours.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
                  <p className="text-white/60 text-sm mb-4">
                    Stay connected with Murray Partners 4 Prevention on social media.
                  </p>
                  <div className="flex gap-3">
                    {['Facebook', 'Instagram', 'Twitter', 'LinkedIn', 'YouTube'].map((platform) => (
                      <a
                        key={platform}
                        href="#"
                        className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm"
                      >
                        {platform}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Contact Form */}
            <FadeIn direction="right" delay={0.2}>
              <div className="glass-card p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <CheckCircle className="w-16 h-16 text-green-400 mb-4" />
                    <h4 className="text-xl font-semibold text-white">Message Sent!</h4>
                    <p className="mt-2 text-white/60">We&apos;ll get back to you soon.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="input-glass"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="input-glass"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-white/80 mb-2">
                        Subject
                      </label>
                      <select
                        id="subject"
                        required
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        className="input-glass select-glass"
                      >
                        <option value="">Select a topic</option>
                        <option value="volunteer">Volunteer Opportunities</option>
                        <option value="partner">Partnership Inquiry</option>
                        <option value="donation">Donation Information</option>
                        <option value="event">Event Information</option>
                        <option value="general">General Question</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="input-glass resize-none"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-glow w-full justify-center"
                    >
                      <Send className="w-5 h-5" />
                      Send Message
                    </motion.button>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
