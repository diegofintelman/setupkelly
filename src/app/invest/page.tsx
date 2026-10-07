import Link from 'next/link';
import {ServicePage} from '@/components/service-page';import {metadataFor} from '@/lib/seo';
export const metadata=metadataFor({title:'Invest in Miami Real Estate',description:'Independent research on Miami developers, delivery track records and the full cost of ownership. Invest with information, not promises.'},'/invest');
export default function Invest(){return <ServicePage slug="invest" label="Invest"
 title="Invest with information, not promises."
 description="Miami’s pre-construction market is full of renderings and projections. Kelly helps you look at what matters: who is building, how they have delivered before and what the property will really cost to own."
 image="/media/kelly/conversation.jpg"
 primary={{label:'Discuss an Investment',href:'/contact?interest=invest'}} secondary={{label:'Request a Developer Review',href:'/contact?interest=developer-review'}}
 pointsTitle="The questions behind a sound purchase."
 points={[
  {title:'Purpose.',text:'A family home, a second home and a rental property call for different decisions. Define use and time horizon first.'},
  {title:'The full cost of ownership.',text:'Association fees, special assessments, taxes, insurance and maintenance, alongside the purchase price.'},
  {title:'Rental rules.',text:'Minimum lease terms, association restrictions and management arrangements for each building.'},
  {title:'The building’s finances.',text:'Reserves, recent inspections and planned assessments.'},
  {title:'Exit.',text:'Resale demand, competing inventory and assignment rules for pre-construction contracts.'},
 ]}
 topics={['U.S. investors adding a Miami property','International buyers & second-home owners','Pre-construction & new developments','Long-term ownership & rental properties']}
 next={{title:'The right experts at the table.',text:'Kelly provides real estate research and guidance. Tax, legal, immigration and financial questions belong with qualified professionals, and Kelly can connect you with trusted specialists in each area.',cta:'Discuss an Investment',href:'/contact?interest=invest'}}>
 <section className="section container developer-research"><div className="developer-research-inner" data-reveal><p className="eyebrow">Developer research</p><h2>Independent analysis of developers.</h2><div className="developer-research-copy"><p className="intro">Before you commit to pre-construction, Kelly researches the developer behind the project: completed buildings, original versus actual delivery dates, and how finished projects have held up. You see which developers have historically delivered on time and which have not.</p><p className="intro">The research is independent. Kelly is not paid by the developer to recommend it.</p><Link className="button light" href="/contact?interest=developer-review">Request a Developer Review <span aria-hidden>↗</span></Link><p className="small legal-note">Information on this page is educational and does not constitute tax, legal or investment advice. Past delivery performance does not guarantee future results.</p></div></div></section>
 </ServicePage>}
