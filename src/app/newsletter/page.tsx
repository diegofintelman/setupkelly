import {EditorialHero,Breadcrumbs} from '@/components/editorial';
import {NewsletterSignup} from '@/features/forms/LeadForm';
import {metadataFor} from '@/lib/seo';
export const metadata=metadataFor({title:'Kelly’s Market Notes',description:'Occasional notes by email on the Miami market, new developments and the questions worth asking, by Kelly Belem.'},'/newsletter');
const notes=[
 ['Market readings','What is moving in the neighborhoods Kelly follows, and why it matters for buyers and sellers.'],
 ['New developments','Early notes on projects worth a closer look, and on the ones that deserve caution.'],
 ['Better questions','Practical points from Kelly’s guides, sent before you need them.'],
];
export default function Newsletter(){return <><div className="container"><Breadcrumbs items={[{label:'Newsletter',href:'/newsletter'}]}/></div>
 <EditorialHero eyebrow="Kelly’s Market Notes" title="The Miami market, without the noise." description="Occasional notes by email, written by Kelly. No spam, no daily listings. Unsubscribe anytime."/>
 <section className="container newsletter-page pb-24"><ol className="newsletter-notes">{notes.map(([title,text],i)=><li key={title}><span className="eyebrow">0{i+1}</span><h2>{title}</h2><p>{text}</p></li>)}</ol><div className="newsletter-signup-panel"><p className="eyebrow">Subscribe</p><h2>Receive the next note.</h2><NewsletterSignup source="newsletter-page"/></div></section></>}
