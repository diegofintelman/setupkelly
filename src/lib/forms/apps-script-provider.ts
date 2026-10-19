import type {LeadProvider} from './contracts';
import {mockLeadProvider} from './mock-provider';
type Environment = Record<string, string | undefined>;
const endpointPattern = /^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/;

// Server-only. Sends validated leads to the Google Apps Script web app that writes Kelly's lead spreadsheet
// (integrations/google-apps-script/leads.gs). Success is reported only after the script confirms the row.
export function appsScriptLeadProvider(url:string,token:string,fetcher:typeof fetch=fetch):LeadProvider{return {async submit(input,meta={}){
 const {website:_honeypot,...lead}=input;
 const response=await fetcher(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...lead,page:meta.page||'',token}),redirect:'follow',cache:'no-store',signal:AbortSignal.timeout(15000)});
 if(!response.ok)throw new Error(`Lead endpoint returned HTTP ${response.status}.`);
 const body=await response.json().catch(()=>null) as {ok?:boolean;receiptId?:unknown;error?:string}|null;
 if(!body?.ok||typeof body.receiptId!=='string')throw new Error(`Lead endpoint rejected the submission (${body?.error||'unexpected response'}).`);
 return {ok:true,mode:'live',receiptId:body.receiptId,persisted:true};
}}}

// Both variables unset keeps the mock (local development). A partial or invalid setup fails loudly instead of dropping leads.
export function leadProviderFromEnv(env:Environment=process.env,fetcher:typeof fetch=fetch):LeadProvider{
 const url=env.LEADS_ENDPOINT_URL?.trim(),token=env.LEADS_ENDPOINT_TOKEN?.trim();
 if(!url&&!token)return mockLeadProvider;
 if(!url||!endpointPattern.test(url)||!token||token.length<24)return {async submit(){throw new Error('Lead endpoint is misconfigured. Check LEADS_ENDPOINT_URL and LEADS_ENDPOINT_TOKEN.')}};
 return appsScriptLeadProvider(url,token,fetcher);
}
