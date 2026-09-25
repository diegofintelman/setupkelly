'use client';
import {useId,useRef,useState} from 'react';
import type {FormEvent} from 'react';
import type {LeadInput,LeadResult} from '@/lib/forms/contracts';
import {analytics} from '@/lib/analytics';
export function LeadForm({kind='contact',source='contact',compact=false}:{kind?:LeadInput['kind'];source?:string;compact?:boolean}){
 const id=useId(),started=useRef(false),requestId=useRef('');
 const [status,setStatus]=useState<'idle'|'sending'|'success'|'error'>('idle'),[message,setMessage]=useState('');
 async function submit(e:FormEvent<HTMLFormElement>){
  e.preventDefault();if(status==='sending')return;
  const form=e.currentTarget,data=new FormData(form);
  if(!requestId.current)requestId.current=crypto.randomUUID();
  const input:LeadInput={requestId:requestId.current,kind,name:String(data.get('name')||''),email:String(data.get('email')||''),phone:String(data.get('phone')||''),address:String(data.get('address')||''),message:String(data.get('message')||''),website:String(data.get('website')||''),consent:data.get('consent')==='on',source};
  setStatus('sending');setMessage('');
  try{
   const response=await fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(input)});
   const result=await response.json() as LeadResult & {error?:string};
   if(!response.ok||!result.ok||result.mode!=='mock')throw new Error(result.error||'Unable to complete the preview. Please try again.');
   setStatus('success');setMessage(kind==='newsletter'?'Signup preview complete. You have not been subscribed.':'Form preview complete. No message was sent or saved.');
   analytics.track(kind==='newsletter'?'newsletter_signup':'submit_lead',{cta_location:source,page_type:kind});
   form.reset();requestId.current='';started.current=false;
  }catch(error){setStatus('error');setMessage(error instanceof Error?error.message:'Please try again.')}
 }
 const field=(name:string,label:string,type='text',required=false)=><label className="field" key={name} htmlFor={id+name}><span>{label}{required?' *':''}</span><input id={id+name} name={name} type={type} required={required} maxLength={250} autoComplete={name==='phone'?'tel':name==='address'?'street-address':name}/></label>;
 return <form className={'lead-form '+(compact?'compact':'')} onSubmit={submit} onFocus={()=>{if(!started.current){analytics.track('start_form',{cta_location:source,page_type:kind});started.current=true;}}}>
 <p className="preview-note">Design preview · Use sample details. Nothing is sent or saved.</p>
 {kind!=='newsletter'&&field('name','Full name','text',true)}{field('email','Email address','email',true)}
 {kind!=='newsletter'&&field('phone','Phone number','tel',kind==='qrcode')}{kind==='qrcode'&&field('address','Address')}
 {kind==='contact'&&<label className="field" htmlFor={id+'message'}><span>What are you considering?</span><textarea id={id+'message'} name="message" rows={4} maxLength={2000}/></label>}
 <div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
 {kind==='newsletter'&&<label className="check-label"><input type="checkbox" name="consent" required/><span>I would like to receive Kelly’s perspectives by email.</span></label>}
 <button className="button" disabled={status==='sending'} type="submit">{status==='sending'?'Checking…':kind==='newsletter'?'Join the conversation':kind==='qrcode'?'Connect with Kelly':'Start a conversation'} <span aria-hidden>↗</span></button>
 <p className="form-status" role={status==='error'?'alert':'status'} aria-live="polite">{message}</p>
 {kind==='qrcode'&&status==='success'&&<MockWhatsApp source="qrcode"/>}</form>;
}
export function NewsletterSignup({source='footer'}:{source?:string}){return <LeadForm kind="newsletter" source={source} compact/>}
export function MockWhatsApp({source}:{source:string}){
 const [notice,setNotice]=useState(false);
 return <div><button className="text-link" type="button" onClick={()=>{setNotice(true);analytics.track('click_whatsapp',{cta_location:source})}}>Continue on WhatsApp ↗</button>{notice&&<p role="status" className="preview-note">WhatsApp preview only. No conversation has been opened.</p>}</div>;
}