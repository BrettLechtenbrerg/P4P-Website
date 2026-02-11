'use client';

import { motion } from 'framer-motion';
import { Heart, HandHeart, Building2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import FadeIn from '@/components/animations/FadeIn';

const opportunities = [
  {
    id: 'volunteer',
    icon: HandHeart,
    title: 'Volunteer',
    description: 'Give your time and talents to support community programs and events.',
    details: [
      'Help organize community events',
      'Mentor youth in leadership programs',
      'Assist with outreach and education',
      'Support administrative tasks',
    ],
    cta: 'Become a Volunteer',
  },
  {
    id: 'donate',
    icon: Heart,
    title: 'Donate',
    description: 'Your financial support helps us expand our programs and reach more residents.',
    details: [
      'Fund youth development programs',
      'Support family resource initiatives',
      'Enable community health events',
      'Expand prevention education',
    ],
    cta: 'Make a Donation',
  },
  {
    id: 'partner',
    icon: Building2,
    title: 'Partner With Us',
    description: 'Organizations and businesses can join our coalition to make a bigger impact.',
    details: [
      'Join our coalition meetings',
      'Co-sponsor community events',
      'Provide resources and expertise',
      'Collaborate on prevention initiatives',
    ],
    cta: 'Become a Partner',
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      <PageHeader
        badge="Get Involved"
        title="Make a Difference"
        description="Join us in building a stronger, safer Murray. There are many ways to contribute to our community."
        breadcrumbs={[
          { label: 'Get Involved' },
        ]}
        backgroundImage="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&q=80"
      />

      {/* Opportunities Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="space-y-12">
            {opportunities.map((opp, index) => (
              <FadeIn key={opp.id} direction="up" delay={index * 0.1}>
                <div id={opp.id} className="scroll-mt-32">
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="glass-card p-8 md:p-12"
                  >
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                      <div>
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-6 shadow-lg">
                          <opp.icon className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-white">{opp.title}</h2>
                        <p className="mt-4 text-white/70 text-lg leading-relaxed">
                          {opp.description}
                        </p>
                        <Link href="/contact">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-6 btn-glow"
                          >
                            {opp.cta}
                            <ArrowRight className="w-5 h-5" />
                          </motion.button>
                        </Link>
                      </div>
                      <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                        <h3 className="text-lg font-semibold text-white mb-4">How You Can Help</h3>
                        <ul className="space-y-3">
                          {opp.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-orange-400 text-sm font-bold">{idx + 1}</span>
                              </span>
                              <span className="text-white/70">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="relative py-16 overflow-hidden">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <FadeIn direction="up">
            <div className="glass-strong rounded-3xl p-8 md:p-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white">Your Impact</h2>
                <p className="mt-4 text-white/60 max-w-2xl mx-auto">
                  Every contribution makes a difference in our community.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { number: '1000+', label: 'Residents Served' },
                  { number: '50+', label: 'Active Volunteers' },
                  { number: '9', label: 'Partner Organizations' },
                  { number: '20+', label: 'Annual Programs' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                    <div className="mt-2 text-white/60">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-16 overflow-hidden">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <FadeIn direction="up">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white">Ready to Get Started?</h2>
              <p className="mt-4 text-white/60 max-w-2xl mx-auto">
                Contact us today to learn more about how you can contribute to Murray Partners 4 Prevention.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-glow"
                  >
                    Contact Us
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
                <Link href="/about">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-secondary"
                  >
                    Learn About Us
                  </motion.button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </>
  );
}
