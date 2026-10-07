import {ServicePage} from '@/components/service-page';import {metadataFor} from '@/lib/seo';
export const metadata=metadataFor({title:'Sell Your Home in Miami',description:'Data-driven pricing, honest assessment and a strategy built for your property. Sell your Miami home with Kelly Belem, Keller Williams Agent of the Year.'},'/sell');
export default function Sell(){return <ServicePage slug="sell" label="Sell"
 title="An honest price. A clear strategy. A strong sale."
 description="Kelly takes a data-driven approach, analyzing what the market is saying: comparable sales, competing listings, pricing trends and buyer activity. You get an honest, objective assessment and a strategy built for your property and your goals."
 image="/media/kelly/architecture.jpg"
 primary={{label:'What Is My Home Worth?',href:'/contact?interest=valuation'}} secondary={{label:'Talk to Kelly',href:'/contact?interest=sell'}}
 guide={{eyebrow:'Free guide · A Fresh Perspective on Selling',title:'Every property deserves more than a listing.',text:'Seven principles Kelly uses to evaluate every property before it goes to market: presentation, marketing, the ideal buyer, preparation, feedback, strategy and pricing.',cover:{src:'/media/guides/guide-5.webp',alt:'Cover of Kelly Belem’s A Fresh Perspective on Selling'},cta:'I want the selling guide',href:'/contact?interest=guide-selling-guide'}}
 pointsTitle="How Kelly sells."
 numbered
 points={[
  {title:'Read the market.',text:'Comparable sales, competing listings, pricing trends and buyer activity. The price starts with data, not with hope.'},
  {title:'An honest assessment.',text:'You get an objective view of your property: what buyers will value, what may hold it back and what is worth preparing.'},
  {title:'Present with intention.',text:'Professional photography, video, clear information and a story that shows what makes the property distinctive.'},
  {title:'Reach the right buyers.',text:'The Keller Williams network, the MLS, targeted digital campaigns and Kelly’s own relationships with buyers in the U.S. and abroad.'},
  {title:'Evaluate every offer.',text:'Price, terms, timing and conditions, compared side by side. Kelly negotiates and coordinates through closing.'},
 ]}
 topics={['Single-family homes & estates','Historic & architecturally distinctive properties','Waterfront homes','Condominiums','Listings that need a fresh strategy']}
 review={1}
 next={{title:'Find out what your property is worth today.',text:'A confidential, no-obligation conversation and a market analysis built for your property.',cta:'Request a Market Analysis',href:'/contact?interest=valuation'}}/>}
