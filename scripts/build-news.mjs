// 서버(GitHub Actions)에서 실행: 언론사 RSS를 카테고리별로 받아 news.json 생성
const FEEDS=[
  {u:"https://www.yna.co.kr/rss/news.xml",s:"연합뉴스",cat:"종합"},
  {u:"https://news.sbs.co.kr/news/newsflashRssFeed.do?plink=RSSREADER",s:"SBS",cat:"종합"},
  {u:"http://www.khan.co.kr/rss/rssdata/total_news.xml",s:"경향신문",cat:"종합"},
  {u:"https://rss.donga.com/total.xml",s:"동아일보",cat:"종합"},
  {u:"https://www.yna.co.kr/rss/economy.xml",s:"연합뉴스",cat:"경제"},
  {u:"https://www.hankyung.com/feed/all-news",s:"한국경제",cat:"경제"},
  {u:"https://www.yna.co.kr/rss/industry.xml",s:"연합뉴스",cat:"IT산업"},
  {u:"https://www.yna.co.kr/rss/sports.xml",s:"연합뉴스",cat:"스포츠"},
  {u:"https://www.yna.co.kr/rss/entertainment.xml",s:"연합뉴스",cat:"연예"},
  {u:"https://www.yna.co.kr/rss/international.xml",s:"연합뉴스",cat:"세계"}
];
function tag(block,name){const m=block.match(new RegExp("<"+name+"[^>]*>([\\s\\S]*?)</"+name+">","i"));if(!m)return "";let v=m[1].trim();v=v.replace(/^<!\[CDATA\[/,"").replace(/\]\]>$/,"").trim();return v;}
function strip(h){return h.replace(/<[^>]+>/g," ").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&nbsp;/g," ").replace(/\s+/g," ").trim();}
async function fullText(url){
  try{
    const ctrl=new AbortController();const t=setTimeout(()=>ctrl.abort(),8000);
    const r=await fetch(url,{signal:ctrl.signal,headers:{"User-Agent":"Mozilla/5.0 (newsbot)"}});clearTimeout(t);
    const h=await r.text();
    let txt="";
    const m=h.match(/<meta property=["']og:description["'] content=["']([^"']*)["']/i);if(m)txt=strip(m[1]);
    if(txt.length<40){const m2=h.match(/<meta name=["']description["'] content=["']([^"']*)["']/i);if(m2)txt=strip(m2[1]);}
    txt=txt.replace(/무단\s*전재.*$/,"").replace(/Copyright.*$/i,"").replace(/저작권자.*$/,"").replace(/ⓒ.*$/i,"").trim();
    return txt.slice(0,400);
  }catch(e){return "";}
}
async function one(f){
  try{
    const ctrl=new AbortController();const t=setTimeout(()=>ctrl.abort(),12000);
    const r=await fetch(f.u,{signal:ctrl.signal,headers:{"User-Agent":"Mozilla/5.0 (newsbot)"}});clearTimeout(t);
    const xml=await r.text();
    const items=xml.split(/<item[ >]/i).slice(1);
    return items.map(b=>{
      const title=strip(tag(b,"title"));
      let link=tag(b,"link");if(!link){const m=b.match(/<link[^>]*>([\s\S]*?)<\/link>/i);link=m?m[1].trim():"";}
      const pub=tag(b,"pubDate")||tag(b,"dc:date");
      const desc=strip(tag(b,"description")).slice(0,600);
      return {title,link,pubDate:pub,src:f.s,cat:f.cat,desc};
    }).filter(x=>x.title&&x.link);
  }catch(e){console.error("fail",f.u,e.message);return [];}
}
const all=[];const seen=new Set();
for(const f of FEEDS){const arr=await one(f);let n=0;for(const it of arr){if(it.link&&!seen.has(it.link)){seen.add(it.link);all.push(it);n++;}}console.log(f.cat,f.s,"+",n);}
const byCat={};for(const it of all){(byCat[it.cat]=byCat[it.cat]||[]).push(it);}
let items=[];for(const c in byCat){byCat[c].sort((a,b)=>(new Date(b.pubDate)-new Date(a.pubDate))||0);items=items.concat(byCat[c].slice(0,22));}
items.sort((a,b)=>(new Date(b.pubDate)-new Date(a.pubDate))||0);
console.log("enriching",items.length,"articles...");
for(let i=0;i<items.length;i+=12){const batch=items.slice(i,i+12);await Promise.all(batch.map(async it=>{const ft=await fullText(it.link);if(ft&&ft.length>(it.desc||"").length)it.desc=ft;}));}
const out={updated:new Date().toISOString(),count:items.length,items:items};
import("fs").then(fs=>fs.writeFileSync("news.json",JSON.stringify(out)));
console.log("TOTAL news.json:",items.length);
