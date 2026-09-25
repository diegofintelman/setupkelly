'use client';
import Link from 'next/link';
import Image from 'next/image';
import {usePathname} from 'next/navigation';
import {useState,useEffect} from 'react';
import {BrokerageIdentification} from './brokerage';
const navigation=[['About','/about'],['Buy','/buy'],['Sell','/sell'],['Invest','/invest'],['Neighborhoods','/neighborhoods'],['Properties','/property-search'],['Insights','/blog'],['Resources','/resources']];
export function Brand(){return <Link className="brand" href="/" aria-label="Kelly Belem home"><Image className="brand-logo brand-logo-dark" src="/media/brand/kelly-horizontal-mixed.png" alt="Kelly Belem Real Estate Advisor" width={2160} height={724} sizes="(max-width:600px) 155px, 205px"/><Image className="brand-logo brand-logo-light" src="/media/brand/kelly-horizontal-ivory.png" alt="Kelly Belem Real Estate Advisor" width={2160} height={724} sizes="(max-width:600px) 155px, 205px"/></Link>}
export function SiteHeader(){
 const pathname=usePathname(),[open,setOpen]=useState(false),[scrolled,setScrolled]=useState(false);
 useEffect(()=>{setOpen(false)},[pathname]);
 useEffect(()=>{const onScroll=()=>setScrolled(window.scrollY>24);onScroll();window.addEventListener('scroll',onScroll,{passive:true});return()=>window.removeEventListener('scroll',onScroll)},[]);
 return <header className={'site-header '+(scrolled?'is-scrolled':'')}><div className="header-inner"><Brand/><nav className="desktop-nav" aria-label="Main navigation">{navigation.slice(0,6).map(([label,href])=><Link key={href} href={href} aria-current={pathname===href?'page':undefined}>{label}</Link>)}<Link href="/blog" aria-current={pathname.startsWith('/blog')?'page':undefined}>Insights</Link></nav><BrokerageIdentification compact/><Link className="header-contact" href="/contact">Let’s connect <span aria-hidden>↗</span></Link><button className="menu-toggle" aria-expanded={open} aria-controls="mobile-nav" onClick={()=>setOpen(!open)} aria-label={open?'Close navigation':'Open navigation'}>{open?'Close −':'Menu +'}</button></div><nav id="mobile-nav" className="mobile-nav" hidden={!open} aria-label="Mobile navigation" onKeyDown={e=>{if(e.key==='Escape'){setOpen(false);document.querySelector<HTMLButtonElement>('.menu-toggle')?.focus()}}}><BrokerageIdentification compact/>{navigation.map(([label,href])=><Link key={href} href={href} aria-current={pathname===href?'page':undefined} onClick={()=>setOpen(false)}>{label}<span aria-hidden>↗</span></Link>)}<Link href="/contact" onClick={()=>setOpen(false)}>Contact ↗</Link></nav></header>;
}
