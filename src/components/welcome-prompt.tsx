'use client';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect,useState} from 'react';
import {analytics} from '@/lib/analytics';
const options=[['buy','I want to ','buy','/buy'],['sell','I want to ','sell','/sell'],['invest','I want to ','invest','/invest'],['contact','','Talk to Kelly','/contact']] as const;
// Pages where the prompt would compete with the page's own form.
const hiddenOn=['/contact','/download','/cadastrosqrcode','/resources','/newsletter'];
const seenKey='kb-welcome-seen';
const remember=()=>{try{sessionStorage.setItem(seenKey,'1')}catch{}};
// Opens once per session after a pause or some scrolling; afterwards only the avatar launcher stays.
export function WelcomePrompt(){
 const pathname=usePathname(),[ready,setReady]=useState(false),[open,setOpen]=useState(false);
 const hidden=hiddenOn.some(p=>pathname===p||pathname.startsWith(p+'/'));
 useEffect(()=>{
  setReady(true);
  let seen=false;try{seen=sessionStorage.getItem(seenKey)==='1'}catch{}
  if(seen||hidden)return;
  const show=()=>{setOpen(true);remember();analytics.track('welcome_open',{cta_location:'welcome-prompt'});cleanup()};
  const onScroll=()=>{if(window.scrollY>window.innerHeight*.6)show()};
  const timer=window.setTimeout(show,9000);
  window.addEventListener('scroll',onScroll,{passive:true});
  const cleanup=()=>{window.clearTimeout(timer);window.removeEventListener('scroll',onScroll)};
  return cleanup;
 },[hidden]);
 useEffect(()=>{setOpen(false)},[pathname]);
 if(!ready||hidden)return null;
 const close=()=>{setOpen(false);remember()};
 return <div className="welcome-prompt" onKeyDown={e=>{if(e.key==='Escape')close()}}>
  {open&&<div className="welcome-card" role="dialog" aria-modal="false" aria-labelledby="welcome-title">
   <button type="button" className="welcome-close" onClick={close} aria-label="Close">×</button>
   <div className="welcome-avatar"><Image src="/media/kelly/portrait.jpg" alt="" fill sizes="64px" className="object-cover"/></div>
   <p id="welcome-title" className="welcome-title">Welcome. I’m Kelly.</p>
   <p className="welcome-text">How can I help you?</p>
   <div className="welcome-options">{options.map(([id,lead,word,href])=><Link key={id} href={href} className={id==='contact'?'is-contact':''} onClick={()=>{close();analytics.track('welcome_click',{cta_location:'welcome-prompt:'+id})}}>{lead}<strong>{word}</strong></Link>)}</div>
  </div>}
  <button type="button" className="welcome-launcher" aria-expanded={open} aria-label={open?'Close Kelly’s welcome':'How can Kelly help you?'} onClick={()=>open?close():setOpen(true)}><Image src="/media/kelly/portrait.jpg" alt="" fill sizes="56px" className="object-cover"/><span className="welcome-status" aria-hidden/></button>
 </div>;
}
