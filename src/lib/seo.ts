import type { Metadata } from 'next';
import type { SEO } from './content/models';
import {previewOrigin} from './preview-origin';
export const siteUrl = previewOrigin();
export function metadataFor(seo: SEO, path: string): Metadata {
  const image = seo.image?.src || '/media/kelly/portrait.jpg';
  return {title:seo.title,description:seo.description,alternates:{canonical:path},
    robots:{index:false,follow:false},
    openGraph:{title:seo.title,description:seo.description,url:path,siteName:'Kelly Belem',locale:'en_US',type:'website',images:[{url:image,alt:seo.image?.alt || 'Kelly Belem'}]},
    twitter:{card:'summary_large_image',title:seo.title,description:seo.description,images:[image]}};
}
export const personSchema = { '@context':'https://schema.org','@type':'Person','@id':`${siteUrl}/about#kelly`,name:'Kelly Belem',jobTitle:'Miami Real Estate Advisor',url:`${siteUrl}/about`,image:`${siteUrl}/media/kelly/portrait.jpg`,worksFor:{'@type':'Organization',name:'Keller Williams Realty'} };
