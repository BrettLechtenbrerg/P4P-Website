import Hero from '@/components/Hero';
import Partners from '@/components/Partners';
import ContactCTA from '@/components/ContactCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Partner Organizations */}
      <Partners />

      {/* Contact CTA */}
      <ContactCTA />

      {/* Footer */}
      <Footer />
    </>
  );
}
