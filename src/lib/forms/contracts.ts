export type LeadInput = { requestId:string; kind:'contact'|'qrcode'|'newsletter'; name:string; email:string; phone:string; address:string; message:string; consent:boolean; source:string; website:string };
export type LeadResult = {ok:true;mode:'mock';receiptId:string;persisted:false};
export interface LeadProvider {submit(input:LeadInput):Promise<LeadResult>}
export function validateLead(value:unknown):{value?:LeadInput;error?:string} {
 if(!value||typeof value!=='object'||Array.isArray(value))return {error:'Please check the form.'};
 const v=value as Record<string,unknown>;
 for(const key of ['requestId','kind','name','email','phone','address','message','source','website'])if(typeof v[key]!=='string'||(v[key] as string).length>(key==='message'?2000:250))return {error:'Please check the form fields.'};
 if(!['contact','qrcode','newsletter'].includes(v.kind as string))return {error:'Unknown form.'};
 if(!/^[\w-]{8,100}$/.test(v.requestId as string))return {error:'Please reload the form.'};
 if(v.website)return {error:'Unable to process this request.'};
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email as string))return {error:'Please enter a valid email address.'};
 if(v.kind!=='newsletter'&&(v.name as string).trim().length<2)return {error:'Please enter your name.'};
 if(v.kind==='qrcode'&&(v.phone as string).replace(/\D/g,'').length<8)return {error:'Please enter your phone number.'};
 if(v.kind==='newsletter'&&v.consent!==true)return {error:'Please confirm your newsletter choice.'};
 if(typeof v.consent!=='boolean')return {error:'Invalid consent value.'};
 return {value:v as LeadInput};
}