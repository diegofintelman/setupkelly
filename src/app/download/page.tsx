import type {Metadata} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {cookies} from 'next/headers';
import {EditorialHero,ContactCTA} from '@/components/editorial';
import {LeadForm} from '@/features/forms/LeadForm';
import {guideCookie,guideOptions,guides,hasGuideAccess} from '@/lib/guides';
// Hidden page: not linked in the site, not in the sitemap, disallowed in robots.txt and noindex.
// Visitors reach it only after a confirmed guide request (see /api/leads).
export const metadata:Metadata={title:'Your Guides',robots:{index:false,follow:false,nocache:true}};
export const dynamic='force-dynamic';
type Props={searchParams:Promise<{guide?:string|string[]}>};
export default async function Download({searchParams}:Props){
 const {guide}=await searchParams;const requested=Array.isArray(guide)?guide[0]:guide;
 if(!hasGuideAccess((await cookies()).get(guideCookie)?.value))return <><EditorialHero eyebrow="The Kelly Belem Guides" title="Request your guide." description="The guides are free. Leave your details and the download opens right away."/><section className="container guide-request pb-24" id="request"><LeadForm kind="guide" source="download-gate" guides={guideOptions} defaultInterest={requested?'guide-'+requested:''}/></section></>;
 const ordered=[...guides].sort((a,b)=>Number(b.slug===requested)-Number(a.slug===requested));
 return <><EditorialHero eyebrow="The Kelly Belem Guides" title="Your guides are ready." description="Download the guide you requested, along with the rest of the collection. Kelly will be in touch personally if you would like to talk through any of it." image={{src:'/media/kelly/sofa.jpg',alt:'Kelly Belem in a contemporary Miami living room'}}/>
 <section className="container pb-24"><div className="download-list">{ordered.map(g=><article key={g.slug} className={'download-item'+(g.slug===requested?' is-requested':'')}><div className="download-cover"><Image src={g.cover.src} alt={g.cover.alt} fill sizes="120px" className="object-contain"/></div><div><p className="eyebrow">{g.slug===requested?'Your guide':g.audience==='sellers'?'For sellers':'For buyers'}</p><h2>{g.title}</h2><p>{g.description}</p></div><a className={g.slug===requested?'button':'button outline'} href={g.href} download>Download PDF <span aria-hidden>↓</span></a></article>)}</div>
 <p className="small mt-12">Questions about what you read? <Link className="text-link" href="/contact?interest=guide">Talk to Kelly ↗</Link></p></section><ContactCTA/></>;
}
