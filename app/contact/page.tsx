'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import FadeIn from '@/components/animations/FadeIn';
import contactContent from '@/content/contact.json';

export default function ContactPage() {
  const { header, contactInfo, form, social } = contactContent;

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
        badge={header.badge}
        title={header.title}
        description={header.description}
        breadcrumbs={[
          { label: 'Contact' },
        ]}
        backgroundImage={header.backgroundImage}
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
                <h2 className="text-3xl font-bold text-white">{contactInfo.sectionTitle}</h2>
                <p className="mt-4 text-white/70 leading-relaxed">
                  {contactInfo.sectionDescription}
                </p>

                <div className="mt-8 space-y-6">
                  <div className="glass-card p-6 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Email Us</h3>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="mt-1 text-orange-400 hover:text-orange-300 transition-colors"
                      >
                        {contactInfo.email}
                      </a>
                      <p className="mt-2 text-white/60 text-sm">
                        {contactInfo.emailResponseTime}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-white mb-4">{social.title}</h3>
                  <p className="text-white/60 text-sm mb-4">
                    {social.description}
                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {social.links.map((link) => (
                      <a
                        key={link.platform}
                        href={link.url}
                        className="px-3 sm:px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all text-xs sm:text-sm whitespace-nowrap"
                      >
                        {link.platform}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Contact Form */}
            <FadeIn direction="right" delay={0.2}>
              <div className="glass-card p-8">
                <h3 className="text-2xl font-bold text-white mb-6">{form.title}</h3>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <CheckCircle className="w-16 h-16 text-green-400 mb-4" />
                    <h4 className="text-xl font-semibold text-white">{form.successTitle}</h4>
                    <p className="mt-2 text-white/60">{form.successMessage}</p>
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
                        {form.subjects.map((subject) => (
                          <option key={subject.value} value={subject.value}>
                            {subject.label}
                          </option>
                        ))}
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
