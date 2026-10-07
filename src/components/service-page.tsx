import Link from 'next/link';
import type {ReactNode} from 'react';
import {EditorialHero,ContactCTA,Breadcrumbs,SectionHeading,KellyNote,GuideFeature,Reviews} from './editorial';
import {reviews} from '@/lib/site';
type Point={title:string;text:string};
type Guide={eyebrow:string;title:string;text:string;cover:{src:string;alt:string};cta:string;href:string};
export function ServicePage({slug,label,title,description,image,primary,secondary,note,guide,pointsTitle,points,numbered=false,topics,review,next,children}:{
 slug:string;label:string;title:string;description:string;image:string;
 primary:{label:string;href:string};secondary?:{label:string;href:string};
 note?:string;guide?:Guide;pointsTitle:string;points:Point[];numbered?:boolean;topics:string[];
 review?:number;next:{title:string;text?:string;cta:string;href:string};children?:ReactNode;
}){return <>
 <div className="container"><Breadcrumbs items={[{label,href:'/'+slug}]}/></div>
 <EditorialHero eyebrow={label} title={title} description={description} image={{src:image,alt:'Kelly Belem, Miami real estate advisor'}}><div className="hero-actions"><Link className="button" href={primary.href}>{primary.label} <span aria-hidden>↗</span></Link>{secondary&&<Link className="text-link" href={secondary.href}>{secondary.label} ↗</Link>}</div></EditorialHero>
 {note&&<KellyNote quote={note}/>}
 {guide&&<GuideFeature {...guide}/>}
 {children}
 <section className="section paper"><div className="container philosophy-grid"><div><p className="eyebrow">Who Kelly works with</p><ul className="topic-list">{topics.map(t=><li key={t}>{t}</li>)}</ul></div><div><h2 className="points-title">{pointsTitle}</h2><div className="points">{points.map((p,i)=><article key={p.title}>{numbered&&<span className="index-number">0{i+1}</span>}<h3>{p.title}</h3><p>{p.text}</p></article>)}</div></div></div></section>
 {review!==undefined&&<Reviews items={[reviews[review]]} eyebrow="Client review" title="In their words."/>}
 <section className="section container next-step"><SectionHeading eyebrow="Next step" title={next.title}/>{next.text&&<p className="intro">{next.text}</p>}<Link className="button" href={next.href}>{next.cta} <span aria-hidden>↗</span></Link></section>
 <ContactCTA/>
</>}
