'use client';

import { motion } from 'framer-motion';
import { Target, Heart, Users, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import FadeIn from '@/components/animations/FadeIn';
import StaggerChildren, { StaggerItem } from '@/components/animations/StaggerChildren';

const values = [
  {
    icon: Heart,
    title: 'Compassion',
    description: 'We lead with empathy and understanding, recognizing the unique challenges each Murray resident faces.',
  },
  {
    icon: Users,
    title: 'Connection',
    description: 'Building bridges between families, organizations, and community resources to create lasting support networks.',
  },
  {
    icon: Shield,
    title: 'Prevention',
    description: 'Proactively addressing community challenges before they become crises through education and early intervention.',
  },
  {
    icon: Target,
    title: 'Empowerment',
    description: 'Giving residents the tools, knowledge, and confidence to thrive and contribute to our community.',
  },
];

const focusAreas = [
  {
    title: 'Youth Development',
    description: 'Empowering young people with leadership skills, mentorship opportunities, and positive community engagement.',
  },
  {
    title: 'Family Support',
    description: 'Connecting families with resources for health, education, and well-being to strengthen the foundation of our community.',
  },
  {
    title: 'Substance Prevention',
    description: 'Educating residents about substance abuse prevention and providing support for those seeking help.',
  },
  {
    title: 'Community Safety',
    description: 'Working with local organizations to create a safer environment for all Murray residents.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        badge="About Us"
        title="Our Mission"
        description="A connected and compassionate Murray where all residents are empowered to thrive, grow, and build a stronger, safer community together."
        breadcrumbs={[
          { label: 'About Us' },
        ]}
        backgroundImage="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=80"
      />

      {/* Mission & Vision Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="left">
              <div>
                <span className="text-orange-400 font-semibold uppercase tracking-wider text-sm">
                  Who We Are
                </span>
                <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white">
                  Murray Partners 4 Prevention
                </h2>
                <p className="mt-6 text-white/70 leading-relaxed">
                  Murray Partners 4 Prevention (P4P) is a community coalition dedicated to building a stronger, safer Murray. We bring together residents, organizations, and local leaders to address community challenges through prevention, education, and support.
                </p>
                <p className="mt-4 text-white/70 leading-relaxed">
                  Our coalition works collaboratively with schools, healthcare providers, city government, businesses, and community organizations to create programs and initiatives that empower residents of all ages.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/team">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-primary"
                    >
                      Meet Our Team
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </Link>
                  <Link href="/contact">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-secondary"
                    >
                      Get Involved
                    </motion.button>
                  </Link>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.2}>
              <div className="glass-card p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Our Vision</h3>
                <p className="text-white/70 leading-relaxed text-lg italic">
                  &ldquo;A connected and compassionate Murray where all residents are empowered to thrive, grow, and build a stronger, safer community together.&rdquo;
                </p>
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex flex-wrap gap-3">
                    {['Supporting Residents', 'Connecting Families', 'Empowering Youth', 'Fostering Growth'].map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <FadeIn direction="up">
            <div className="text-center mb-12">
              <span className="text-orange-400 font-semibold uppercase tracking-wider text-sm">
                Our Values
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white">
                What Guides Us
              </h2>
            </div>
          </FadeIn>

          <StaggerChildren staggerDelay={0.1} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="glass-card p-6 h-full"
                >
                  <div className="feature-icon">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <FadeIn direction="up">
            <div className="text-center mb-12">
              <span className="text-orange-400 font-semibold uppercase tracking-wider text-sm">
                What We Do
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white">
                Focus Areas
              </h2>
              <p className="mt-4 text-white/60 max-w-2xl mx-auto">
                Our coalition addresses key community needs through targeted programs and initiatives.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            {focusAreas.map((area, index) => (
              <FadeIn key={area.title} direction="up" delay={index * 0.1}>
                <div className="glass-card p-6 flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{area.title}</h3>
                    <p className="text-white/60 leading-relaxed">{area.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <FadeIn direction="up">
            <div className="glass-strong rounded-3xl p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold text-white">Join Our Mission</h2>
              <p className="mt-4 text-white/60 max-w-2xl mx-auto">
                Whether you&apos;re a resident, organization, or business, there are many ways to get involved with Murray Partners 4 Prevention.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-glow"
                  >
                    Get Involved
                  </motion.button>
                </Link>
                <Link href="/team">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-secondary"
                  >
                    Meet the Team
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
