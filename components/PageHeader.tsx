'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import FadeIn from './animations/FadeIn';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
}

export default function PageHeader({
  badge,
  title,
  description,
  breadcrumbs,
}: PageHeaderProps) {
  return (
    <section className="relative w-full pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <FadeIn direction="up">
            <nav className="flex justify-center items-center gap-2 text-sm text-white/60 mb-6">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              {breadcrumbs.map((crumb, index) => (
                <span key={index} className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" />
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-white transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-orange-400">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          </FadeIn>
        )}

        {/* Badge */}
        {badge && (
          <FadeIn direction="up">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 text-orange-400 text-sm font-medium">
              {badge}
            </span>
          </FadeIn>
        )}

        {/* Title */}
        <FadeIn direction="up" delay={0.1}>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold">
            <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-orange-400 bg-clip-text text-transparent">
              {title}
            </span>
          </h1>
        </FadeIn>

        {/* Description */}
        {description && (
          <FadeIn direction="up" delay={0.2}>
            <p className="mt-6 text-lg sm:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
