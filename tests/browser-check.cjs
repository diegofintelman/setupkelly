const {chromium}=require('@playwright/test');
const {default:AxeBuilder}=require('@axe-core/playwright');
const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const dir=path.join(process.cwd(),'review');fs.mkdirSync(dir,{recursive:true});
async function capture(page,options){if(process.env.REVIEW_CAPTURE==="0")return;await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=700){scrollTo(0,y);await new Promise(r=>setTimeout(r,200))}scrollTo(0,0)});await page.waitForLoadState('networkidle');await page.waitForFunction(()=>Array.from(document.images).every(i=>i.complete));await page.screenshot(options)};
(async()=>{
const browser=await chromium.launch({channel:'chrome',headless:true});
const context=await browser.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1,reducedMotion:'reduce'});
// Deterministic host-page regression only; live Matrix is validated separately.
await context.route('https://sef.mlsmatrix.com/**', route=>route.fulfill({contentType:'text/html',body:'<!doctype html><title>Matrix test boundary</title><p>External Matrix content is tested separately.</p>'}));
const page=await context.newPage();const external=[],errors=[],routes=[];
page.on('request',r=>{if(/^https?:/.test(r.url())&&!/^http:\/\/(localhost|127\.0\.0\.1):3000\//.test(r.url()))external.push(r.url())});
page.on('pageerror',e=>errors.push(String(e)));
const paths=['/','/about','/buy','/sell','/invest','/neighborhoods','/neighborhoods/coral-gables','/neighborhoods/pinecrest','/property-search','/blog','/blog/preparing-to-buy-property-in-florida','/blog/16-questions-before-buying-property-in-florida','/blog/florida-property-buying-process','/blog/after-buying-property-in-florida','/resources','/contact','/coralrock','/cadastrosqrcode','/privacy-policy','/terms','/disclaimer'];
for(const route of paths){
const res=await page.goto('http://127.0.0.1:3000'+route,{waitUntil:'networkidle'});
assert.equal(res.status(),200,route);
assert.equal(await page.locator('h1').count(),1,route+' h1');
assert.equal(await page.locator('html').getAttribute('lang'),'en');
const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
assert.equal(overflow,false,route+' desktop overflow');
routes.push({route,status:res.status(),title:await page.title()});
}
await page.goto('http://127.0.0.1:3000',{waitUntil:'networkidle'});
await capture(page,{path:path.join(dir,'home-desktop.png'),fullPage:true});
const axeHome=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
await page.getByLabel('Where would you like to explore?').fill('Pinecrest');
await page.locator('.search-entry button').click();await page.waitForURL(/\/property-search\??$/);
assert.equal(new URL(page.url()).search,'');
assert.equal(await page.locator('iframe.idx-frame').getAttribute('src'),'https://sef.mlsmatrix.com/Matrix/public/IDX.aspx?idx=c9622024');
assert.equal(await page.locator('iframe.idx-frame').getAttribute('sandbox'),null);
assert.equal(await page.locator('.property-card').count(),0);
await page.goto('http://127.0.0.1:3000');
await page.getByLabel('Where would you like to explore?').fill('Coral Gables');
await page.getByLabel('Where would you like to explore?').press('Enter');
await page.waitForURL(/\/property-search\??$/);assert.equal(new URL(page.url()).search,'');
const redirect=await page.request.get('http://127.0.0.1:3000/properties?q=Pinecrest',{maxRedirects:0});
assert.equal(redirect.status(),308);assert.equal(redirect.headers().location,'/property-search');
await capture(page,{path:path.join(dir,'property-search-desktop.png'),fullPage:true});
await page.goto('http://127.0.0.1:3000/contact',{waitUntil:'networkidle'});
const form=page.locator('main form');
await form.getByLabel('Full name').fill('Preview Visitor');await form.getByLabel('Email address').fill('preview@example.test');
const response=page.waitForResponse(r=>r.url().endsWith('/api/leads')&&r.request().method()==='POST');
await form.getByRole('button',{name:'Start a conversation'}).click();
const receipt=await (await response).json();assert.equal(receipt.mode,'mock');assert.equal(receipt.persisted,false);
await page.getByText('Form preview complete. No message was sent or saved.',{exact:true}).waitFor();
const axeContact=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
await page.goto('http://127.0.0.1:3000/cadastrosqrcode',{waitUntil:'networkidle'});
const qr=page.locator('main form');await qr.getByLabel('Full name').fill('QR Preview');await qr.getByLabel('Email address').fill('qr@example.test');await qr.getByLabel('Phone number').fill('7865550100');await qr.getByLabel('Address',{exact:true}).fill('Sample address');
await qr.getByRole('button',{name:'Connect with Kelly'}).click();await page.getByText('Form preview complete. No message was sent or saved.',{exact:true}).waitFor();await qr.getByRole('button',{name:'Continue on WhatsApp'}).click();assert.equal(context.pages().length,1);
await page.goto('http://127.0.0.1:3000/coralrock',{waitUntil:'networkidle'});
await page.getByRole('button',{name:'Next image of Cottage 2',exact:true}).click();assert.equal(await page.getByAltText('Cottage 2 — image 2').count(),1);
assert.equal(await page.locator('video').getAttribute('preload'),'none');assert.equal(await page.locator('video').getAttribute('autoplay'),null);
await capture(page,{path:path.join(dir,'coralrock-desktop.png'),fullPage:true});
const missing=await page.goto('http://127.0.0.1:3000/a-page-that-does-not-exist');assert.equal(missing.status(),404);
for(const p of ['/blog/missing-article','/neighborhoods/missing-place'])assert.equal((await page.goto('http://127.0.0.1:3000'+p)).status(),404);
await page.setViewportSize({width:390,height:844});
for(const route of ['/','/property-search','/blog/preparing-to-buy-property-in-florida','/resources','/contact','/coralrock','/cadastrosqrcode']){
 await page.goto('http://127.0.0.1:3000'+route,{waitUntil:'networkidle'});
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,route+' mobile overflow');
 await capture(page,{path:path.join(dir,route==='/'?'home-mobile.png':route==='/coralrock'?'coralrock-mobile.png':route.replaceAll('/','-').slice(1)+'-mobile.png'),fullPage:true});
}
await page.goto('http://127.0.0.1:3000',{waitUntil:'networkidle'});await page.getByRole('button',{name:'Open navigation'}).click();assert.equal(await page.locator('#mobile-nav').isVisible(),true);await page.locator('#mobile-nav').getByRole('link',{name:'Resources'}).click();await page.waitForURL('**/resources');assert.equal(new URL(page.url()).pathname,'/resources');
const axeMobile=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
assert.ok(external.every(url=>url.startsWith('https://sef.mlsmatrix.com/')),'Only stubbed Matrix requests allowed');assert.deepEqual(errors,[],'Browser errors');
const result={routes,externalRequests:external,pageErrors:errors,checks:['desktop routes','mobile overflow','MLS entry via button and Enter','legacy 308 redirect','Matrix frame boundary (stubbed)','safe contact submission','safe QR submission','no WhatsApp navigation','gallery controls','click-to-play video','real 404','mobile navigation'],accessibility:{home:axeHome.violations,contact:axeContact.violations,mobileResources:axeMobile.violations}};
fs.writeFileSync(path.join(dir,'browser-results.json'),JSON.stringify(result,null,2));
console.log(JSON.stringify({routes:routes.length,externalRequests:external,errors,accessibility:Object.fromEntries(Object.entries(result.accessibility).map(([k,v])=>[k,v.map(x=>({id:x.id,impact:x.impact,nodes:x.nodes.map(n=>n.target)}))]))},null,2));await context.close();await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
