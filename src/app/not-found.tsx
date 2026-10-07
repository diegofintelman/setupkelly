import Link from 'next/link';
export default function NotFound(){return <section className="container empty-state"><p className="eyebrow">404</p><h1>This page has moved.</h1><p>Let’s get you back on track.</p><div className="hero-actions"><Link className="button" href="/">Go to homepage ↗</Link><Link className="text-link" href="/contact">Contact Kelly ↗</Link></div></section>}
