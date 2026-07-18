import { readdir, readFile, stat, access } from 'node:fs/promises';
import { resolve, relative } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const files = [];
async function walk(dir){ for(const name of await readdir(dir)){ const p=resolve(dir,name); const s=await stat(p); if(s.isDirectory() && name!=='scripts') await walk(p); else if(name==='index.html') files.push(p); } }
await walk(root);
const seenTitles=new Map(), seenCanonicals=new Map(), errors=[];
for(const file of files){
  const html=await readFile(file,'utf8'); const rel=relative(root,file);
  const pick=(r)=>html.match(r)?.[1]?.trim();
  if (/<meta name="robots" content="noindex, follow"\s*\/>/.test(html)) continue;
  const title=pick(/<title>(.*?)<\/title>/s), desc=pick(/<meta[\s\S]*?name="description"[\s\S]*?content="(.*?)"[\s\S]*?\/?\s*>/), canonical=pick(/<link rel="canonical" href="(.*?)"\s*\/?\s*>/s);
  const h1=(html.match(/<h1[ >]/g)||[]).length;
  const lang=pick(/<html lang="(.*?)"/);
  const text=html.replace(/<script.*?<\/script>/gs,' ').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
  const words=text.split(' ').length, internal=(html.match(/href="\//g)||[]).length;
  for(const [key,val,map] of [['title',title,seenTitles],['canonical',canonical,seenCanonicals]]){ if(!val) errors.push(`${rel}: missing ${key}`); else if(map.has(val)) errors.push(`${rel}: duplicate ${key} with ${map.get(val)}`); else map.set(val,rel); }
  const descMin=lang==='ja'?45:90, descMax=lang==='ja'?110:180;
  if(!desc || desc.length<descMin || desc.length>descMax) errors.push(`${rel}: description length ${desc?.length??0}`);
  if(h1!==1) errors.push(`${rel}: expected 1 H1, found ${h1}`);
  if(lang==='ja' ? text.length<700 : words<220) errors.push(`${rel}: thin page (${lang==='ja'?text.length+' characters':words+' words'})`);
  if(internal<4) errors.push(`${rel}: weak internal linking (${internal})`);
  if(/this page should|if a demo is available|once (?:the game |details are )?(?:launches|confirmed)|placeholder/i.test(text)) errors.push(`${rel}: semantic placeholder language`);
  try { for(const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) JSON.parse(m[1]); } catch { errors.push(`${rel}: invalid JSON-LD`); }
  for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) {
    const href=m[1];
    if (/\.[a-z0-9]+$/i.test(href)) continue;
    const target=resolve(root, href.slice(1), 'index.html');
    try { await access(target); } catch { errors.push(`${rel}: broken internal link ${href}`); }
  }
}
console.log(`Audited ${files.length} index pages.`);
if(errors.length){ console.error(errors.join('\n')); process.exitCode=1; } else console.log('SEO audit passed.');
