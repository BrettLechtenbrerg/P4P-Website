// Content types for the CMS

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
      headline: 'Partners 4 Prevention Coalition',
      subheadline: 'Working together to create a safer, healthier community through prevention and education.',
      buttonText: 'Get Involved',
      buttonLink: '/contact',
      backgroundImage: {
        url: '/images/hero-bg.jpg',
        alt: 'Hero background'
      }
    },
    {
      type: 'text',
      title: 'Our Mission',
      content: 'Partners 4 Prevention Coalition brings together community leaders, organizations, and individuals to prevent substance abuse and promote mental health awareness in our community.'
    },
    {
      type: 'features',
      title: 'Our Programs',
      subtitle: 'Making a difference',
      features: [
        {
          icon: 'heart',
          title: 'Youth Prevention',
          description: 'Evidence-based programs to help young people make healthy choices.'
        },
        {
          icon: 'users',
          title: 'Community Outreach',
          description: 'Connecting resources and support throughout our community.'
        },
        {
          icon: 'book',
          title: 'Education & Training',
          description: 'Workshops and training for parents, educators, and community members.'
        }
      ]
    },
    {
      type: 'cta',
      headline: 'Join Our Coalition',
      subheadline: 'Together, we can make a difference in our community.',
      buttonText: 'Get Involved',
      buttonLink: '/contact',
      backgroundColor: '#F27A21'
    }
  ]
};
