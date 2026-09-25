import Link from 'next/link';
import {Breadcrumbs} from '@/components/editorial';
import {BrokerageIdentification} from '@/components/brokerage';
import {MatrixSearch} from '@/features/property-search/components/MatrixSearch';
import {metadataFor} from '@/lib/seo';

export const metadata = metadataFor({
  title: 'Property Search',
  description: 'Search homes, condos and investment properties across South Florida with Kelly Belem.',
}, '/property-search');

export default function PropertySearchPage() {
  return <div className="idx-page">
    <div className="container"><Breadcrumbs items={[{label: 'Property Search', href: '/property-search'}]} /></div>
    <header className="container editorial-hero idx-intro">
      <p className="eyebrow">South Florida / Find your next chapter</p>
      <h1>South Florida Property Search</h1>
      <p className="intro">Explore homes, condos and investment properties in the South Florida MLS. Use the search below to explore locations and refine your preferences.</p>
      <div className="idx-actions">
        <Link href="/contact" className="button">Talk with Kelly <span aria-hidden="true">↗</span></Link>
        <nav aria-label="Explore neighborhoods"><Link href="/neighborhoods/coral-gables" className="text-link">Coral Gables</Link><Link href="/neighborhoods/pinecrest" className="text-link">Pinecrest</Link></nav>
      </div>
    </header>
    <section className="idx-wrapper" aria-label="MLS property search tool">
      <MatrixSearch />
      <footer className="idx-attribution">
        <p><strong>Kelly Belem — Keller Williams Capital Realty</strong></p>
        <p>Listing information is provided by the Southeast Florida MLS. Data is deemed reliable but is not guaranteed accurate by the MLS.</p>
        <BrokerageIdentification />
      </footer>
      <p className="preview-note">Design preview. The MLS search above is live and operated by Matrix. Forms elsewhere on this preview remain simulations.</p>
    </section>
  </div>;
}
