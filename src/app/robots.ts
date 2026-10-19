import type {MetadataRoute} from 'next';
// Review site: nothing is crawlable. /download stays disallowed when this opens up for production.
export default function robots():MetadataRoute.Robots{return {rules:{userAgent:'*',disallow:['/','/download']}}}
