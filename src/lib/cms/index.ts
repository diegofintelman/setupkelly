import type { Development, Neighborhood, Post, Resource } from '../content/models';
import { developments, neighborhoods, posts, resources } from '../content/local';
import { assertDevelopmentSlugs, isDevelopmentSlug } from '../content/slugs';
/** Future WordPress REST adapter maps API payloads into these domain models.
 * UI components never consume WP fields, rendered HTML, or ACF shapes directly.
 * Publish/preview authentication and cache invalidation are intentionally unconfigured. */
export interface ContentRepository {
  developments(): Promise<Development[]>;
  development(slug: string): Promise<Development | undefined>;
  neighborhoods(): Promise<Neighborhood[]>;
  neighborhood(slug: string): Promise<Neighborhood | undefined>;
  posts(): Promise<Post[]>;
  post(slug: string): Promise<Post | undefined>;
  resources(): Promise<Resource[]>;
}
assertDevelopmentSlugs(developments.map(d => d.slug));
export const cms: ContentRepository = {
  developments: async () => developments,
  development: async slug => isDevelopmentSlug(slug) ? developments.find(d => d.slug === slug) : undefined,
  neighborhoods: async () => neighborhoods,
  neighborhood: async slug => neighborhoods.find(n => n.slug === slug),
  posts: async () => posts, post: async slug => posts.find(p => p.slug === slug),
  resources: async () => resources,
};
