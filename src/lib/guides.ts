import {resources} from '@/lib/content/local';
// Guide PDFs live in private/guides (not public/). They are served only by /download/file/[file]
// to visitors holding the cookie set by /api/leads after a confirmed guide request.
export const guideCookie='kb_guides';
export const guideCookieHeader=(secure:boolean)=>`${guideCookie}=1; Path=/; Max-Age=31536000; SameSite=Lax; HttpOnly${secure?'; Secure':''}`;
export const hasGuideAccess=(value?:string)=>value==='1';
export const guides=resources.filter(r=>r.download).map(r=>({slug:r.slug,title:r.title,description:r.description,audience:r.audience,cover:r.cover,file:r.download!.split('/').pop()!,href:r.download!}));
export const guideOptions=guides.map(g=>({slug:g.slug,title:g.title}));
export const guideFile=(file:string)=>guides.find(g=>g.file===file)?.file;
