// Root pages always win. The CMS adapter must apply this same policy on publication.
export const reservedSlugs = new Set([
  'about','buy','sell','invest','neighborhoods','properties','property-search','search','blog','resources','contact',
  'privacy-policy','terms','disclaimer','cadastrosqrcode','api','_next','media','fonts',
  'robots.txt','sitemap.xml','favicon.ico','icon.svg','wp-admin','wp-json',
]);
export function isDevelopmentSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && !reservedSlugs.has(slug.toLowerCase());
}
export function assertDevelopmentSlugs(slugs: string[]) {
  if (new Set(slugs).size !== slugs.length || slugs.some(s => !isDevelopmentSlug(s))) {
    throw new Error('Development slugs must be unique, lowercase, and non-reserved.');
  }
}
