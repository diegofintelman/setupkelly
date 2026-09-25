type Environment = Record<string, string | undefined>;
const loopback = new Set(['localhost', '127.0.0.1', '[::1]']);
// Exact aliases of the existing setupkelly review project, not the live Kelly site.
const reviewOrigins = [
  'https://setupkelly.vercel.app',
  'https://setupkelly.fintelmannd.com.br',
  'https://setupkelly-gestaofintelman-projects.vercel.app',
  'https://setupkelly-git-main-gestaofintelman-projects.vercel.app',
];

export function previewOrigin(env: Environment = process.env): string {
  const deployment = env.VERCEL_ENV === 'preview' ? env.VERCEL_URL : undefined;
  const value = env.SITE_URL || (deployment ? `https://${deployment}` :
    env.VERCEL === '1' ? reviewOrigins[0] : 'http://localhost:3000');
  const url = new URL(value);
  if (url.username || url.password || url.pathname !== '/' || url.search || url.hash ||
    !(url.protocol === 'https:' || (url.protocol === 'http:' && loopback.has(url.hostname)))) {
    throw new Error('SITE_URL must be an HTTPS origin, or an HTTP loopback origin for development.');
  }
  return url.origin;
}

export function isAllowedPreviewOrigin(origin: string, env: Environment = process.env): boolean {
  let url: URL;
  try { url = new URL(origin); } catch { return false; }
  if (url.origin !== origin) return false;
  if (env.VERCEL !== '1' && loopback.has(url.hostname) && ['http:', 'https:'].includes(url.protocol)) return true;
  const allowed = [previewOrigin(env)];
  if (env.VERCEL === '1') {
    allowed.push(...reviewOrigins);
    for (const key of ['VERCEL_URL', 'VERCEL_BRANCH_URL', 'VERCEL_PROJECT_PRODUCTION_URL']) {
      if (env[key]) allowed.push(`https://${env[key]}`);
    }
  }
  return allowed.includes(origin);
}
