'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import FadeIn from './animations/FadeIn';
import StaggerChildren, { StaggerItem } from './animations/StaggerChildren';

const partners = [
  {
    name: 'Salt Lake County Health Department',
    description: 'Offering a long list of programs including tobacco prevention, STD clinic, food protection, and community health initiatives.',
    url: 'https://slco.org/health/',
  },
  {
    name: 'Intermountain Medical Center',
    description: 'Providing advanced medical care in a friendly and supportive environment for the Murray community.',
    url: 'https://intermountainhealthcare.org/',
  },
  {
    name: 'Murray School District',
    description: 'Dedicated to cultivating a safe, supportive, and inspiring environment where every student is empowered to succeed.',
    url: 'https://murrayschools.org/',
  },
  {
    name: 'Murray City',
    description: 'Dedicated to preserving our rich history while building a vibrant, connected, and forward-thinking community.',
    url: 'https://murray.utah.gov/',
  },
  {
    name: 'Select Health',
    description: 'Offer plans to serve all members of our community from individuals and families to employers.',
    url: 'https://selecthealth.org/',
  },
  {
    name: 'Murray Chamber of Commerce',
    description: 'Empowering local businesses, fostering community connections, and driving economic growth in Murray.',
    url: 'https://themurraychamber.com/',
  },
  {
    name: 'Exchange Club',
    description: 'Proudly dedicated to serving our community through Unity for Service and prevention of child abuse.',
    url: '#',
  },
  {
    name: 'Murray Rotary',
    description: 'Dedicated to serving our community through impactful projects, fellowship, and leadership development.',
    url: '#',
  },
  {
    name: 'Murray Youth Community Council',
    description: 'A union of student leaders and business partners who come together through networking, internships, and community service.',
    url: '#',
  },
];

export default function Partners() {
  return (
    <section id="partners" className="relative w-full py-16 sm:py-20 md:py-24 overflow-hidden bg-gradient-to-b from-black via-black/95 to-black">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <FadeIn direction="up">
          <div className="text-center mb-16">
            <span className="text-orange-400 font-semibold uppercase tracking-wider text-sm">
              Our Partners
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-white">
              Partner Organizations
            </h2>
            <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
              Working together with community leaders and organizations to build a stronger, safer Murray.
            </p>
          </div>
        </FadeIn>

        {/* Partners Grid */}
        <StaggerChildren staggerDelay={0.1} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner) => (
            <StaggerItem key={partner.name}>
              <motion.a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="glass-card overflow-hidden h-full group cursor-pointer block"
              >
                {/* Gradient Header */}
                <div className="h-2 bg-gradient-to-r from-orange-500 to-orange-600" />

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors">
                      {partner.name}
                    </h3>
                    <ExternalLink className="w-5 h-5 text-white/40 group-hover:text-orange-400 transition-colors flex-shrink-0" />
                  </div>
                  <p className="mt-3 text-white/60 text-sm leading-relaxed">
                    {partner.description}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 text-orange-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Visit Website
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </motion.a>
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* CTA Banner */}
        <FadeIn direction="up" delay={0.4}>
          <div className="mt-16 glass-strong rounded-3xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Interested in Partnering?
            </h3>
            <p className="mt-4 text-white/60 max-w-2xl mx-auto">
              Join our coalition of community organizations working together to make Murray a better place for all residents.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 mt-8 btn-glow"
            >
              Become a Partner
            </motion.a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
