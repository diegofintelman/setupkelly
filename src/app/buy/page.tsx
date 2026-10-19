import {ServicePage} from '@/components/service-page';import {metadataFor} from '@/lib/seo';
export const metadata=metadataFor({title:'Buy a Home in Miami',description:'Buying a home in Miami? Kelly Belem runs a focused search, gives you an honest view of every property and manages the details from offer to keys.'},'/buy');
export default function Buy(){return <ServicePage slug="buy" label="Buy"
 title="The right home, found with patience. Bought with someone who reads the fine print."
 description="Kelly manages the details of the purchase and the relocation, making the transition as smooth as possible so you can focus on your family and your new beginning."
 image="/media/kelly/entrance.jpg"
 primary={{label:'Start Your Search',href:'/property-search'}} secondary={{label:'Talk to Kelly',href:'/contact?interest=buy'}}
 note="I will search for your home until I find it."
 guide={{eyebrow:'Free guide',title:'16 questions to ask before buying property in Florida.',text:'Developer track record, association finances, rental rules, insurance, resale. The questions most buyers only think of after signing.',cover:{src:'/media/guides/guide-2.webp',alt:'Cover of Kelly Belem’s 16 Questions Guide'},cta:'I want the guide',href:'/resources?guide=16-questions-guide#request'}}
 pointsTitle="What Kelly handles for you."
 points={[
  {title:'A search built on your priorities.',text:'Before visiting a single property, Kelly learns how you live, what you need and what you will not compromise on.'},
  {title:'An honest view of every property.',text:'Condition, layout, association rules, insurance and the true cost of ownership. If a property is wrong for you, she will say so.'},
  {title:'Negotiation beyond the price.',text:'Terms, timing, contingencies and credits. Kelly structures offers that protect you.'},
  {title:'The relocation, handled.',text:'Lenders, attorneys, inspectors, insurance, schools, movers. Kelly coordinates the team so the transition is as smooth as possible.'},
 ]}
 topics={['Primary residences & second homes','Relocation from other states and abroad','New construction & pre-construction','Historic & architecturally distinctive homes','Waterfront & condominium living']}
 review={2}
 next={{title:'Tell Kelly what you are looking for.',cta:'Start the Conversation',href:'/contact?interest=buy'}}/>}
