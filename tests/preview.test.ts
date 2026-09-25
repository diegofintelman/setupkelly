import test from 'node:test';
import assert from 'node:assert/strict';
import {previewOrigin,isAllowedPreviewOrigin} from '../src/lib/preview-origin';
import {POST} from '../src/app/api/leads/route';
const vercel={VERCEL:'1',VERCEL_ENV:'production',VERCEL_URL:'setupkelly-build.vercel.app',VERCEL_BRANCH_URL:'setupkelly-branch.vercel.app'};
const lead={requestId:'vercel-review-123',kind:'contact',name:'Preview Visitor',email:'preview@example.test',phone:'7865550100',address:'',message:'Website review test',consent:false,source:'preview-test',website:''};
test('metadata uses the review alias in Vercel and the unique URL on preview branches',()=>{
 assert.equal(previewOrigin({}),'http://localhost:3000');
 assert.equal(previewOrigin(vercel),'https://setupkelly.vercel.app');
 assert.equal(previewOrigin({...vercel,VERCEL_ENV:'preview'}),'https://setupkelly-build.vercel.app');
 assert.equal(previewOrigin({SITE_URL:'https://review.example.com'}),'https://review.example.com');
 for(const SITE_URL of ['http://public.example.com','https://user:pass@example.com','https://example.com/path','https://example.com?x=1'])assert.throws(()=>previewOrigin({SITE_URL}));
});
test('only exact deployment origins are accepted',()=>{
 for(const origin of ['https://setupkelly.vercel.app','https://setupkelly.fintelmannd.com.br','https://setupkelly-build.vercel.app','https://setupkelly-branch.vercel.app'])assert.equal(isAllowedPreviewOrigin(origin,vercel),true);
 for(const origin of ['https://kellybelem.com','https://attacker.vercel.app','https://setupkelly.vercel.app.attacker.com','http://setupkelly.vercel.app','http://localhost:3000','https://setupkelly.vercel.app/'])assert.equal(isAllowedPreviewOrigin(origin,vercel),false);
});
test('online review form succeeds without persistence and rejects foreign origins',async()=>{
 const old=process.env.VERCEL;process.env.VERCEL='1';
 try{
  const request=(origin:string,host='setupkelly.vercel.app')=>new Request('https://setupkelly.vercel.app/api/leads',{method:'POST',headers:{host,origin,'content-type':'application/json'},body:JSON.stringify(lead)});
  const response=await POST(request('https://setupkelly.vercel.app'));
  assert.equal(response.status,200);assert.equal(response.headers.get('cache-control'),'no-store');
  const body=await response.json();assert.equal(body.persisted,false);assert.equal(body.mode,'mock');
  assert.equal((await POST(request('https://attacker.example'))).status,403);
  assert.equal((await POST(request('https://attacker.example','attacker.example'))).status,403);
 }finally{if(old===undefined)delete process.env.VERCEL;else process.env.VERCEL=old;}
});
