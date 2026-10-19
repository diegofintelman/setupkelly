import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {cookies} from 'next/headers';
import {guideCookie,guideFile,hasGuideAccess,guides} from '@/lib/guides';
export async function GET(request:Request,{params}:{params:Promise<{file:string}>}){
 const file=guideFile((await params).file);
 if(!file)return new Response('Not found',{status:404,headers:{'X-Robots-Tag':'noindex'}});
 if(!hasGuideAccess((await cookies()).get(guideCookie)?.value)){const slug=guides.find(g=>g.file===file)?.slug||'';return Response.redirect(new URL(`/resources?guide=${slug}#request`,request.url),303)}
 const pdf=await readFile(path.join(process.cwd(),'private','guides',file+'.pdf'));
 return new Response(new Uint8Array(pdf),{headers:{'Content-Type':'application/pdf','Content-Disposition':`attachment; filename="Kelly-Belem-${file}.pdf"`,'Cache-Control':'private, no-store','X-Robots-Tag':'noindex, nofollow'}});
}
