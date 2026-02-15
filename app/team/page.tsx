'use client';

import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import Link from 'next/link';
import teamContent from '@/content/team.json';

export default function TeamPage() {
  const { header, officers, members, cta } = teamContent;

  return (
    <>
      <PageHeader
        badge={header.badge}
        title={header.title}
        description={header.description}
        breadcrumbs={[
          { label: 'Team' },
        ]}
        backgroundImage={header.backgroundImage}
      />

      {/* Coalition Officers */}
      <section className="relative py-16 overflow-hidden">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white">{officers.sectionTitle}</h2>
            <p className="mt-4 text-white/60">{officers.sectionDescription}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {officers.members.map((member, index) => (
              <motion.div
                key={`${member.name}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass-card p-6 text-center group"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 mx-auto mb-4 flex items-center justify-center shadow-lg overflow-hidden">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <span className="text-3xl font-bold text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                <p className="text-orange-400 text-sm font-medium">{member.title}</p>
                {member.subtitle && (
                  <p className="text-white/60 text-xs font-medium mt-1">{member.subtitle}</p>
                )}
                <p className="mt-4 text-white/60 text-sm line-clamp-3">{member.bio}</p>
                <div className="mt-4 flex justify-center gap-3">
                  <a
                    href={`mailto:${member.email}`}
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                  >
                    <Mail className="w-4 h-4 text-white/60" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coalition Members */}
      <section className="relative py-16 overflow-hidden">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white">{members.sectionTitle}</h2>
            <p className="mt-4 text-white/60">{members.sectionDescription}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.members.map((person, index) => (
              <motion.div
                key={`${person.name}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 mx-auto mb-6 flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-white">
                    {person.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white">{person.name}</h3>
                <p className="text-orange-400 font-medium">{person.title}</p>
                <p className="text-white/60 text-sm font-medium mt-1">{person.organization}</p>
                <p className="mt-4 text-white/60">{person.bio}</p>
                <a
                  href={`mailto:${person.email}`}
                  className="inline-flex items-center gap-2 mt-4 text-sm text-orange-400 hover:text-orange-300 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Contact
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Coalition CTA */}
      <section className="relative py-16 overflow-hidden">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-strong rounded-3xl p-8 md:p-12 text-center"
          >
            <h2 className="text-3xl font-bold text-white">{cta.title}</h2>
            <p className="mt-4 text-white/60 max-w-2xl mx-auto">
              {cta.description}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href={cta.primaryButtonLink}>
                <button className="btn-glow">{cta.primaryButtonText}</button>
              </Link>
              <Link href={cta.secondaryButtonLink}>
                <button className="btn-secondary">{cta.secondaryButtonText}</button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
