export type LeadInput = { requestId:string; kind:'contact'|'qrcode'|'newsletter'|'guide'; name:string; email:string; phone:string; address:string; message:string; interest?:string; bestTime?:string; consent:boolean; source:string; website:string };
export type LeadResult = {ok:true;mode:'mock'|'live';receiptId:string;persisted:boolean};
export type LeadMeta = {page?:string};
export interface LeadProvider {submit(input:LeadInput,meta?:LeadMeta):Promise<LeadResult>}
export function validateLead(value:unknown):{value?:LeadInput;error?:string} {
 if(!value||typeof value!=='object'||Array.isArray(value))return {error:'Please check the form.'};
 const v=value as Record<string,unknown>;
 for(const key of ['requestId','kind','name','email','phone','address','message','source','website'])if(typeof v[key]!=='string'||(v[key] as string).length>(key==='message'?2000:250))return {error:'Please check the form fields.'};
 for(const key of ['interest','bestTime'])if(v[key]!==undefined&&(typeof v[key]!=='string'||(v[key] as string).length>60))return {error:'Please check the form fields.'};
 if(!['contact','qrcode','newsletter','guide'].includes(v.kind as string))return {error:'Unknown form.'};
 if(!/^[\w-]{8,100}$/.test(v.requestId as string))return {error:'Please reload the form.'};
 if(v.website)return {error:'Unable to process this request.'};
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email as string))return {error:'Please enter a valid email address.'};
 if(v.kind!=='newsletter'&&(v.name as string).trim().length<2)return {error:'Please enter your name.'};
 if(v.kind!=='newsletter'&&(v.phone as string).replace(/\D/g,'').length<8)return {error:'Please enter your phone number, including country code.'};
 if(v.kind==='guide'&&!/^guide-[a-z0-9-]+$/.test(String(v.interest||'')))return {error:'Please choose a guide.'};
 if(v.kind==='newsletter'&&v.consent!==true)return {error:'Please confirm your newsletter choice.'};
 if(typeof v.consent!=='boolean')return {error:'Invalid consent value.'};
 return {value:v as LeadInput};
}
