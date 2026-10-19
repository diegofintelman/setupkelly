import Link from 'next/link';
import {cms} from '@/lib/cms';
import {EditorialHero,DevelopmentCard,ContactCTA,Breadcrumbs,SectionHeading} from '@/components/editorial';
import {metadataFor} from '@/lib/seo';
export const metadata=metadataFor({title:'New Developments in Miami',description:'Historic estates, new construction and pre-construction in Miami, reviewed by Kelly Belem with an independent view of each developer.'},'/developments');
export default async function Developments(){const developments=await cms.developments();return <><div className="container"><Breadcrumbs items={[{label:'New Developments',href:'/developments'}]}/></div>
 <EditorialHero eyebrow="New Developments" title="Selected properties, read closely." description="Historic estates, new construction and pre-construction in Miami. Kelly looks at each project the way an investor would: the developer, the delivery record, the association and the numbers behind the brochure." image={{src:'/media/aerial/canopy-skyline-2.jpg',alt:'Aerial view of Miami’s tree canopy with the downtown skyline on the horizon'}}/>
 <section className="container development-index pb-24">{developments.map(d=><DevelopmentCard key={d.id} item={d}/>)}</section>
 <section className="section container development-review"><SectionHeading eyebrow="Pre-construction" title="An independent view, before you reserve."><p>Before you commit a deposit, Kelly reviews which developers have historically delivered their projects on time, how deposits are protected and what ownership will cost once the building is finished. Her advice is not paid by the developer.</p></SectionHeading><div className="development-review-actions"><Link className="button" href="/contact?interest=developer-review">Ask about a project <span aria-hidden>↗</span></Link><Link className="text-link" href="/invest">How Kelly reviews developers ↗</Link></div></section>
 <ContactCTA/></>}
