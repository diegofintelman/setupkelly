import {validateLead} from '@/lib/forms/contracts';
import {mockLeadProvider} from '@/lib/forms/mock-provider';
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
 return Response.json(await mockLeadProvider.submit(parsed.value),{headers:{'Cache-Control':'no-store'}});
}
