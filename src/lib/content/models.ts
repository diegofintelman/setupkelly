export type Media = { src: string; alt: string; width?: number; height?: number };
export type SEO = { title: string; description: string; image?: Media; noindex?: boolean };
export type CTA = { label: string; href: string };
export type ContentSection = { id: string; heading: string; paragraphs: string[]; bullets?: string[] };
export type Development = {
  id: string; slug: string; title: string; status: 'available' | 'coming-soon' | 'sold';
  hero: Media; location: { address: string; city: string; region: string };
  commercialInformation: { price?: number; currency: 'USD'; displayPrice: string };
  propertyDetails: { label: string; value: string }[];
  gallery: Media[]; video?: { src: string; poster: string };
  floorPlans: { title: string; file: string; image?: Media }[];
  overview: string; architecture: string; amenities: string[];
  developer?: { name: string; description?: string };
  neighborhood: string; cta: CTA; seo: SEO;
  relatedContent: { posts: string[]; neighborhoods: string[] };
  template: 'coralrock' | 'editorial';
};
export type Neighborhood = {
  id: string; slug: string; title: string; eyebrow: string; description: string;
  image?: Media; sections: ContentSection[]; seo: SEO;
};
export type Post = {
  id: string; slug: string; title: string; excerpt: string; body: ContentSection[];
  author: { name: string; url: string }; featuredImage: Media;
  categories: string[]; tags: string[]; publishedAt: string; updatedAt: string;
  seo: SEO; relatedDevelopments: string[]; relatedNeighborhoods: string[];
  adsenseEligible: boolean; cta: CTA; sourceGuide: string; readingMinutes: number;
  editorialStatus: 'working-draft' | 'approved';
};
export type Resource = {
  id: string; slug: string; title: string; description: string; cover: Media;
  access: 'open' | 'gated' | 'hybrid'; articleSlug: string;
  download?: string; seo: SEO;
};
