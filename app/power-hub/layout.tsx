import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Power Hub | Partners 4 Prevention',
  description: 'Manage your website content',
  robots: 'noindex, nofollow', // Hide from search engines
};

export default function PowerHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
