import type {MetadataRoute} from 'next';
import {cms} from '@/lib/cms';
import {siteUrl} from '@/lib/seo';
export default async function sitemap():Promise<MetadataRoute.Sitemap>{
 const [developments,posts,neighborhoods]=await Promise.all([cms.developments(),cms.posts(),cms.neighborhoods()]);
 const staticRoutes=['','about','buy','sell','invest','neighborhoods','property-search','blog','resources','contact','privacy-policy','terms','disclaimer'];
 return [...staticRoutes.map(p=>({url:siteUrl+'/'+p})),...developments.map(d=>({url:siteUrl+'/'+d.slug})),...posts.map(p=>({url:siteUrl+'/blog/'+p.slug,lastModified:p.updatedAt})),...neighborhoods.map(n=>({url:siteUrl+'/neighborhoods/'+n.slug}))];
}