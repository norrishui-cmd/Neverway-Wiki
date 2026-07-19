import { access, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { relative, resolve, sep } from 'node:path';

const root=resolve(import.meta.dirname,'..');
const files=[];
async function walk(dir){for(const name of await readdir(dir)){if(name==='scripts')continue;const file=resolve(dir,name),info=await stat(file);if(info.isDirectory())await walk(file);else if(name.endsWith('.html'))files.push(file)}}
const exists=async file=>{try{await access(file);return true}catch{return false}};
const toRoute=file=>'/'+relative(root,file).split(sep).join('/').replace(/index\.html$/,'');
const languageFrom=(html,route)=>html.match(/<html[^>]*lang="([^"]+)"/i)?.[1]?.toLowerCase()||(route.startsWith('/ja/')?'ja':route.startsWith('/es/')?'es':'en');
const baseRoute=route=>route.replace(/^\/(?:ja|es)(?=\/)/,'')||'/';
const targetRoute=async(route,lang)=>{const bare=baseRoute(route),candidate=lang==='en'?bare:`/${lang}${bare}`,file=resolve(root,candidate.slice(1),'index.html');return await exists(file)?candidate:(lang==='en'?'/':`/${lang}/`)};
const labels={en:'English',ja:'日本語',es:'Español'};

await walk(root);
let configured=0,skipped=0;
for(const file of files){let html=await readFile(file,'utf8');if(!/<nav[^>]*class="[^"]*nav[^"]*"/i.test(html)){skipped++;continue}const route=toRoute(file),current=languageFrom(html,route),links={};for(const lang of ['en','ja','es'])links[lang]=await targetRoute(route,lang);
  html=html.replace(/\s*<!-- LANGUAGE DROPDOWN START -->[\s\S]*?<!-- LANGUAGE DROPDOWN END -->\s*/g,'');
  html=html.replace(/\s*<a[^>]+lang="(?:en|ja|es)"[^>]*>[\s\S]*?<\/a>/gi,'');
  const menu=`<!-- LANGUAGE DROPDOWN START --><details class="language-switcher"><summary aria-label="Select language"><span aria-hidden="true">🌐</span><span>${labels[current]||labels.en}</span><span class="language-chevron" aria-hidden="true">▾</span></summary><div class="language-options" role="list">${['en','ja','es'].map(lang=>`<a href="${links[lang]}" lang="${lang}" hreflang="${lang}"${lang===current?' aria-current="page"':''}>${labels[lang]}</a>`).join('')}</div></details><!-- LANGUAGE DROPDOWN END -->`;
  html=html.replace(/<\/nav>/i,menu+'</nav>');await writeFile(file,html);configured++;
}
console.log(`Language dropdown configured on ${configured} HTML files; ${skipped} files had no main navigation.`);
await import('./configure-adsense.mjs');
