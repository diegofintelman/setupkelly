import {validateLead} from '@/lib/forms/contracts';
import {leadProviderFromEnv} from '@/lib/forms/apps-script-provider';
import {guideCookieHeader} from '@/lib/guides';
import {isAllowedPreviewOrigin} from '@/lib/preview-origin';
export async function POST(request:Request){
 const url=new URL(request.url);
 // Next may normalize request.url to localhost while the browser uses 127.0.0.1.
 // Validate the actual Host authority before checking the browser's origin.
 let authority:URL;
 try{authority=new URL(`${url.protocol}//${request.headers.get('host')||url.host}`)}catch{return Response.json({error:'Invalid host.'},{status:403})}
 if(!isAllowedPreviewOrigin(authority.origin)||authority.username||authority.password||authority.pathname!=='/'||authority.search||authority.hash)return Response.json({error:'Preview host not allowed.'},{status:403});
 const origin=request.headers.get('origin');
 if(origin&&origin!==authority.origin)return Response.json({error:'Invalid origin.'},{status:403});
 if(!request.headers.get('content-type')?.includes('application/json'))return Response.json({error:'JSON required.'},{status:415});
 const text=await request.text();
 if(text.length>8000)return Response.json({error:'Request too large.'},{status:413});
 let input:unknown;try{input=JSON.parse(text)}catch{return Response.json({error:'Invalid request.'},{status:400})}
 const parsed=validateLead(input);
 if(!parsed.value)return Response.json({error:parsed.error},{status:400});
 // Path of the page that sent the form, so the sheet shows which page or landing page converted.
 let page='';try{const referer=request.headers.get('referer');if(referer){const u=new URL(referer);if(u.origin===authority.origin)page=u.pathname.slice(0,200)}}catch{}
 try{
  const result=await leadProviderFromEnv().submit(parsed.value,{page});
  const headers=new Headers({'Cache-Control':'no-store'});
  // A confirmed guide request unlocks the hidden /download page and its PDFs.
  if(parsed.value.kind==='guide')headers.append('Set-Cookie',guideCookieHeader(authority.protocol==='https:'));
  return Response.json(result,{headers});
 }
 catch(error){console.error('lead submission failed:',error instanceof Error?error.message:error);return Response.json({error:'We could not send your message right now. Please call or email Kelly directly.'},{status:502,headers:{'Cache-Control':'no-store'}})}
}
