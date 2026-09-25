const {chromium}=require('@playwright/test');
const fs=require('fs'),assert=require('assert/strict');
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});try{
 const page=await browser.newPage({viewport:{width:1440,height:1000}}),base='http://127.0.0.1:3000';
 const routes=JSON.parse(fs.readFileSync('review/browser-results.json')).routes.map(r=>({...r,route:r.route==='/properties'?'/property-search':r.route}));
 const links=new Set(),metadata=[];
 for(const {route} of routes){const response=await page.goto(base+route);assert.match(response.headers()['x-robots-tag'],/noindex/);
 const data=await page.evaluate(()=>({canonical:document.querySelector('link[rel="canonical"]')?.href,description:document.querySelector('meta[name="description"]')?.content,og:document.querySelector('meta[property="og:title"]')?.content,robots:document.querySelector('meta[name="robots"]')?.content,schemas:[...document.querySelectorAll('script[type="application/ld+json"]')].map(s=>JSON.parse(s.textContent)['@type']),links:[...document.querySelectorAll('a[href]')].map(a=>a.href)}));
 assert.equal(new URL(data.canonical).pathname,route);assert.ok(data.description);assert.ok(data.og);assert.match(data.robots,/noindex/);
 if(route.startsWith('/blog/'))assert.ok(data.schemas.includes('Article'));
 data.links.filter(l=>l.startsWith(base+'/')).forEach(l=>links.add(l.split('#')[0]));metadata.push({route,...data,links:undefined});
 }
 const bad=[];for(const url of links){const r=await page.request.get(url);if(r.status()>=400)bad.push({url,status:r.status()})}assert.deepEqual(bad,[]);
 assert.match(await (await page.request.get(base+'/robots.txt')).text(),/Disallow: \//);
 const sitemap=await (await page.request.get(base+'/sitemap.xml')).text();assert.match(sitemap,/coralrock/);assert.match(sitemap,/pinecrest/);assert.ok(!sitemap.includes('https://kellybelem.com'));
 await page.goto(base,{waitUntil:'networkidle'});await page.screenshot({path:'review/home-desktop-viewport.png'});
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:'review/home-mobile-viewport.png'});
 fs.writeFileSync('review/metadata-results.json',JSON.stringify({checkedLinks:links.size,brokenLinks:bad,metadata},null,2));console.log(JSON.stringify({checkedLinks:links.size,metadataRoutes:metadata.length,brokenLinks:bad}));
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});
