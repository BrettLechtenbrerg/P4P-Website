// Content types for the Power Hub CMS

export interface ImageField {
  url: string;
  alt: string;
}

export interface HeroSection {
  type: 'hero';
  headline: string;
  subheadline: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: ImageField;
}

export interface TextSection {
  type: 'text';
  title: string;
  content: string;
}

export interface ImageTextSection {
  type: 'image-text';
  title: string;
  content: string;
  image: ImageField;
  imagePosition: 'left' | 'right';
}

export interface FeaturesSection {
  type: 'features';
  title: string;
  subtitle: string;
  features: {
    icon: string;
    title: string;
    description: string;
  }[];
}

export interface CTASection {
  type: 'cta';
  headline: string;
  subheadline: string;
  buttonText: string;
  buttonLink: string;
  backgroundColor: string;
}

export interface TestimonialsSection {
  type: 'testimonials';
  title: string;
  testimonials: {
    quote: string;
    author: string;
    role: string;
    image: ImageField;
  }[];
}

export type PageSection =
  | HeroSection
  | TextSection
  | ImageTextSection
  | FeaturesSection
  | CTASection
  | TestimonialsSection;

export interface PageContent {
  id: string;
  title: string;
  slug: string;
  status: 'draft' | 'published';
  lastEdited: string;
  author: string;
  sections: PageSection[];
}

// Sample page data for P4P
export const sampleHomePage: PageContent = {
  id: 'home',
  title: 'Home',
  slug: '/',
  status: 'published',
  lastEdited: new Date().toISOString(),
  author: 'Admin',
  sections: [
    {
      type: 'hero',
      headline: 'Partners 4 Prevention',
      subheadline: 'Working together to create healthier, safer communities through collaborative prevention strategies.',
      buttonText: 'Get Involved',
      buttonLink: '/get-involved',
      backgroundImage: {
        url: '/images/hero-bg.jpg',
        alt: 'Hero background'
      }
    },
    {
      type: 'text',
      title: 'About Our Coalition',
      content: 'Partners 4 Prevention brings together community leaders, healthcare providers, educators, and families to address critical health and safety issues in our region.'
    },
    {
      type: 'features',
      title: 'Our Focus Areas',
      subtitle: 'What we work on',
      features: [
        {
          icon: 'shield',
          title: 'Substance Prevention',
          description: 'Education and resources for substance abuse prevention.'
        },
        {
          icon: 'users',
          title: 'Community Outreach',
          description: 'Connecting with families and organizations across the region.'
        },
        {
          icon: 'rocket',
          title: 'Youth Programs',
          description: 'Engaging young people in positive activities and leadership.'
        }
      ]
    },
    {
      type: 'cta',
      headline: 'Join Our Coalition',
      subheadline: 'Together, we can make a difference in our community.',
      buttonText: 'Contact Us',
      buttonLink: '/contact',
      backgroundColor: '#EA580C'
    }
  ]
};
