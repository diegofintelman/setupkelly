'use client';
import Link from 'next/link';
import Image from 'next/image';
import {usePathname} from 'next/navigation';
import {useState,useEffect} from 'react';
import {BrokerageLogo} from './brokerage';
import {contact} from '@/lib/site';
const navigation=[['About','/about'],['Buy','/buy'],['Sell','/sell'],['Invest','/invest'],['Neighborhoods','/neighborhoods'],['Search Properties','/property-search'],['Insights','/blog']];
export function Brand(){return <Link className="brand" href="/" aria-label="Kelly Belem home"><Image className="brand-logo brand-logo-dark" src="/media/brand/kelly-horizontal-mixed.png" alt="Kelly Belem Real Estate Advisor" width={2160} height={724} sizes="(max-width:600px) 150px, 200px"/><Image className="brand-logo brand-logo-light" src="/media/brand/kelly-horizontal-ivory.png" alt="Kelly Belem Real Estate Advisor" width={2160} height={724} sizes="(max-width:600px) 150px, 200px"/></Link>}
export function ContactBar(){return <div className="contact-bar"><div className="contact-bar-inner"><div className="contact-bar-links"><a href={contact.phoneHref}><span aria-hidden>☎</span> {contact.phone}</a><a href={contact.emailHref}><span aria-hidden>✉</span> {contact.email}</a><a href={contact.whatsappHref} target="_blank" rel="noreferrer">WhatsApp ↗</a></div><span className="contact-bar-note">English · Português · Español</span></div></div>}
export function SiteHeader(){
 const pathname=usePathname(),[open,setOpen]=useState(false),[scrolled,setScrolled]=useState(false);
 useEffect(()=>{setOpen(false)},[pathname]);
 useEffect(()=>{const onScroll=()=>setScrolled(window.scrollY>24);onScroll();window.addEventListener('scroll',onScroll,{passive:true});return()=>window.removeEventListener('scroll',onScroll)},[]);
 const current=(href:string)=>pathname===href||(href!=='/'&&pathname.startsWith(href+'/'))?'page':undefined;
 return <header className={'site-header '+(scrolled?'is-scrolled':'')}><ContactBar/><div className="header-inner"><div className="brand-lockup"><Brand/><span className="brand-divider" aria-hidden/><BrokerageLogo className="header-brokerage"/></div><nav className="desktop-nav" aria-label="Main navigation">{navigation.map(([label,href])=><Link key={href} href={href} aria-current={current(href)}>{label}</Link>)}</nav><Link className="header-contact" href="/contact">Contact Kelly <span aria-hidden>↗</span></Link><button className="menu-toggle" aria-expanded={open} aria-controls="mobile-nav" onClick={()=>setOpen(!open)} aria-label={open?'Close navigation':'Open navigation'}>{open?'Close −':'Menu +'}</button></div><nav id="mobile-nav" className="mobile-nav" hidden={!open} aria-label="Mobile navigation" onKeyDown={e=>{if(e.key==='Escape'){setOpen(false);document.querySelector<HTMLButtonElement>('.menu-toggle')?.focus()}}}>{navigation.map(([label,href])=><Link key={href} href={href} aria-current={current(href)} onClick={()=>setOpen(false)}>{label}<span aria-hidden>↗</span></Link>)}<Link href="/resources" onClick={()=>setOpen(false)}>Guides<span aria-hidden>↗</span></Link><Link href="/contact" onClick={()=>setOpen(false)}>Contact Kelly<span aria-hidden>↗</span></Link><div className="mobile-contact"><a href={contact.phoneHref}>{contact.phone}</a><a href={contact.emailHref}>{contact.email}</a></div><BrokerageLogo/></nav></header>;
}
