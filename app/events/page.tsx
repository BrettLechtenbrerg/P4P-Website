'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import FadeIn from '@/components/animations/FadeIn';
import StaggerChildren, { StaggerItem } from '@/components/animations/StaggerChildren';

// Sample events - placeholder data
const upcomingEvents = [
  {
    title: 'Coalition Monthly Meeting',
    date: 'March 15, 2026',
    time: '6:00 PM - 7:30 PM',
    location: 'Murray City Hall',
    description: 'Join us for our monthly coalition meeting. All community members are welcome to attend and learn about current initiatives.',
    type: 'Meeting',
  },
  {
    title: 'Youth Leadership Workshop',
    date: 'March 22, 2026',
    time: '10:00 AM - 2:00 PM',
    location: 'Murray High School',
    description: 'A hands-on workshop for young leaders to develop skills in community organizing and prevention advocacy.',
    type: 'Workshop',
  },
  {
    title: 'Community Health Fair',
    date: 'April 5, 2026',
    time: '9:00 AM - 3:00 PM',
    location: 'Murray Park',
    description: 'Free health screenings, wellness resources, and family activities for the Murray community.',
    type: 'Community Event',
  },
  {
    title: 'Prevention Education Seminar',
    date: 'April 12, 2026',
    time: '7:00 PM - 8:30 PM',
    location: 'Murray Library',
    description: 'Educational seminar on substance abuse prevention and resources available to Murray families.',
    type: 'Seminar',
  },
];

const pastEvents = [
  {
    title: 'Back to School Resource Fair',
    date: 'August 2025',
    description: 'Provided school supplies and resources to over 500 Murray families.',
  },
  {
    title: 'Summer Safety Campaign',
    date: 'June 2025',
    description: 'Community-wide safety awareness initiative reaching thousands of residents.',
  },
  {
    title: 'Youth Empowerment Conference',
    date: 'May 2025',
    description: 'Brought together 200+ young leaders for a day of workshops and networking.',
  },
];

export default function EventsPage() {
  return (
    <>
      <PageHeader
        badge="Events"
        title="Community Events"
        description="Join us at upcoming events and help build a stronger Murray community."
        breadcrumbs={[
          { label: 'Events' },
        ]}
      />

      {/* Upcoming Events */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <FadeIn direction="up">
            <div className="text-center mb-12">
              <span className="text-orange-400 font-semibold uppercase tracking-wider text-sm">
                Join Us
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white">
                Upcoming Events
              </h2>
            </div>
          </FadeIn>

          <StaggerChildren staggerDelay={0.1} className="space-y-6">
            {upcomingEvents.map((event, index) => (
              <StaggerItem key={event.title}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="glass-card p-6 md:p-8"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Date Badge */}
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex flex-col items-center justify-center text-white shadow-lg">
                        <span className="text-2xl font-bold">{event.date.split(' ')[1].replace(',', '')}</span>
                        <span className="text-xs uppercase tracking-wider">{event.date.split(' ')[0].slice(0, 3)}</span>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="flex-grow">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-medium">
                            {event.type}
                          </span>
                          <h3 className="mt-2 text-xl font-semibold text-white">{event.title}</h3>
                        </div>
                      </div>
                      <p className="mt-3 text-white/60 leading-relaxed">{event.description}</p>
                      <div className="mt-4 flex flex-wrap gap-4 text-sm text-white/50">
                        <span className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-orange-400" />
                          {event.time}
                        </span>
                        <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-orange-400" />
                          {event.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Past Events */}
      <section className="relative py-16 overflow-hidden">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <FadeIn direction="up">
            <div className="text-center mb-12">
              <span className="text-orange-400 font-semibold uppercase tracking-wider text-sm">
                Our Impact
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white">
                Past Events
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {pastEvents.map((event, index) => (
              <FadeIn key={event.title} direction="up" delay={index * 0.1}>
                <div className="glass-card p-6 h-full">
                  <span className="text-orange-400 font-medium text-sm">{event.date}</span>
                  <h3 className="mt-2 text-lg font-semibold text-white">{event.title}</h3>
                  <p className="mt-3 text-white/60 text-sm">{event.description}</p>
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
              <Calendar className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white">Want to Host an Event?</h2>
              <p className="mt-4 text-white/60 max-w-2xl mx-auto">
                Partner with us to bring prevention education and community resources to your neighborhood or organization.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-glow"
                  >
                    Contact Us
                    <ArrowRight className="w-4 h-4" />
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
