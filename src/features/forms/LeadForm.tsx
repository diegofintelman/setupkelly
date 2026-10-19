'use client';
import {useId,useRef,useState} from 'react';
import {useRouter} from 'next/navigation';
import type {FormEvent} from 'react';
import type {LeadInput,LeadResult} from '@/lib/forms/contracts';
import {analytics} from '@/lib/analytics';
import {contact} from '@/lib/site';
export const interestOptions=[['buy','Buying'],['sell','Selling'],['valuation','A home valuation'],['invest','Investing'],['developer-review','A developer review'],['guide','A guide (PDF)'],['coralrock','The Coral Rock Village'],['other','Something else']] as const;
export function normalizeInterest(value?:string){if(!value)return '';if(value.startsWith('guide-'))return 'guide';if(value.startsWith('neighborhood-'))return 'buy';return interestOptions.some(([v])=>v===value)?value:''}
export function LeadForm({kind='contact',source='contact',compact=false,defaultInterest='',title,guides=[]}:{kind?:LeadInput['kind'];source?:string;compact?:boolean;defaultInterest?:string;title?:string;guides?:{slug:string;title:string}[]}){
 const id=useId(),started=useRef(false),requestId=useRef(''),router=useRouter();
 const [status,setStatus]=useState<'idle'|'sending'|'success'|'error'>('idle'),[message,setMessage]=useState('');
 async function submit(e:FormEvent<HTMLFormElement>){
  e.preventDefault();if(status==='sending')return;
  const form=e.currentTarget,data=new FormData(form);
  if(!requestId.current)requestId.current=crypto.randomUUID();
  const input:LeadInput={requestId:requestId.current,kind,name:String(data.get('name')||''),email:String(data.get('email')||''),phone:String(data.get('phone')||''),address:String(data.get('address')||''),message:String(data.get('message')||''),interest:String(data.get('interest')||''),bestTime:String(data.get('bestTime')||''),website:String(data.get('website')||''),consent:data.get('consent')==='on',source};
  setStatus('sending');setMessage('');
  try{
   const response=await fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(input)});
   const result=await response.json() as LeadResult & {error?:string};
   if(!response.ok||!result.ok)throw new Error(result.error||'We could not send your message. Please try again.');
   const preview=result.mode==='mock';
   if(kind==='guide'){setStatus('success');setMessage('Thank you. Opening your guides…');analytics.track('download_resource',{cta_location:source,page_type:kind});router.push('/download?guide='+input.interest?.replace(/^guide-/,''));return}
   setStatus('success');setMessage(kind==='newsletter'?(preview?'Signup preview complete. You have not been subscribed.':'Thank you. You are on the list for Kelly’s Market Notes.'):'Thank you. Kelly will be in touch shortly.'+(preview?' (Preview: nothing was sent or saved.)':''));
   analytics.track(kind==='newsletter'?'newsletter_signup':'submit_lead',{cta_location:source,page_type:kind});
   form.reset();requestId.current='';started.current=false;
  }catch(error){setStatus('error');setMessage(error instanceof Error?error.message:'Please try again.')}
 }
 const field=(name:string,label:string,type='text',required=false)=><label className="field" key={name} htmlFor={id+name}><span>{label}{required?' *':''}</span><input id={id+name} name={name} type={type} required={required} maxLength={250} autoComplete={name==='phone'?'tel':name==='address'?'street-address':name}/></label>;
 return <form className={'lead-form '+(compact?'compact':'')} onSubmit={submit} onFocus={()=>{if(!started.current){analytics.track('start_form',{cta_location:source,page_type:kind});started.current=true;}}}>
 {title&&<h2 className="lead-form-title">{title}</h2>}
 {kind==='guide'&&<label className="field" htmlFor={id+'interest'}><span>Guide *</span><select id={id+'interest'} name="interest" required defaultValue={defaultInterest&&guides.some(g=>'guide-'+g.slug===defaultInterest)?defaultInterest:''}><option value="" disabled>Select a guide</option>{guides.map(g=><option key={g.slug} value={'guide-'+g.slug}>{g.title}</option>)}</select></label>}
 {kind!=='newsletter'&&field('name','Full name','text',true)}{field('email','Email','email',true)}
 {kind!=='newsletter'&&field('phone','Phone (with country code)','tel',true)}{kind==='qrcode'&&field('address','Address')}
 {kind==='contact'&&<><label className="field" htmlFor={id+'interest'}><span>I’m interested in</span><select id={id+'interest'} name="interest" defaultValue={normalizeInterest(defaultInterest)}><option value="">Select an option</option>{interestOptions.map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label>
 <fieldset className="field time-field"><legend>Best time to reach you</legend><div>{['Morning','Afternoon','Evening'].map(t=><label key={t} className="check-label"><input type="radio" name="bestTime" value={t.toLowerCase()}/><span>{t}</span></label>)}</div></fieldset>
 <label className="field" htmlFor={id+'message'}><span>What are you considering?</span><textarea id={id+'message'} name="message" rows={4} maxLength={2000}/></label></>}
 <div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
 {kind==='newsletter'&&<label className="check-label"><input type="checkbox" name="consent" required/><span>I would like to receive Kelly’s Market Notes by email.</span></label>}
 <button className="button" disabled={status==='sending'} type="submit">{status==='sending'?'Sending…':kind==='newsletter'?'Subscribe':kind==='qrcode'?'Connect with Kelly':kind==='guide'?'Get the guide':'Send to Kelly'} <span aria-hidden>↗</span></button>
 {kind!=='newsletter'&&<p className="form-consent">By submitting, you agree to be contacted by Kelly Belem by phone, text and email about real estate services. Reply STOP to opt out at any time. Message and data rates may apply. Your information stays with Kelly. It is never shared or sold.</p>}
 <p className="form-status" role={status==='error'?'alert':'status'} aria-live="polite">{message}</p>
 {kind==='qrcode'&&status==='success'&&<WhatsAppLink source="qrcode"/>}</form>;
}
export function NewsletterSignup({source='footer'}:{source?:string}){return <LeadForm kind="newsletter" source={source} compact/>}
export function WhatsAppLink({source}:{source:string}){return <a className="text-link" href={contact.whatsappHref} target="_blank" rel="noreferrer" onClick={()=>analytics.track('click_whatsapp',{cta_location:source})}>Message Kelly on WhatsApp ↗</a>}
