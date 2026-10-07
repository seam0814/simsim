// 서버(GitHub Actions)에서 실행: 언론사 RSS를 받아 news.json 생성 (CORS·캐시 문제 없음)
const FEEDS=[
  {u:"https://www.yna.co.kr/rss/news.xml",s:"연합뉴스"},
  {u:"https://www.yna.co.kr/rss/economy.xml",s:"연합뉴스"},
  {u:"https://www.yna.co.kr/rss/industry.xml",s:"연합뉴스"},
  {u:"https://news.sbs.co.kr/news/newsflashRssFeed.do?plink=RSSREADER",s:"SBS"},
  {u:"http://www.khan.co.kr/rss/rssdata/total_news.xml",s:"경향신문"},
  {u:"https://rss.donga.com/total.xml",s:"동아일보"},
  {u:"https://www.hankyung.com/feed/all-news",s:"한국경제"}
];
function tag(block,name){const m=block.match(new RegExp("<"+name+"[^>]*>([\\s\\S]*?)</"+name+">","i"));if(!m)return "";let v=m[1].trim();v=v.replace(/^<!\[CDATA\[/,"").replace(/\]\]>$/,"").trim();return v;}
function strip(h){return h.replace(/<[^>]+>/g," ").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&nbsp;/g," ").replace(/\s+/g," ").trim();}
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
      const desc=strip(tag(b,"description")).slice(0,500);
      return {title,link,pubDate:pub,src:f.s,desc};
    }).filter(x=>x.title&&x.link);
  }catch(e){console.error("fail",f.u,e.message);return [];}
}
const all=[];const seen=new Set();
for(const f of FEEDS){const arr=await one(f);for(const it of arr){if(it.link&&!seen.has(it.link)){seen.add(it.link);all.push(it);}}}
all.sort((a,b)=>(new Date(b.pubDate)-new Date(a.pubDate))||0);
const out={updated:new Date().toISOString(),count:Math.min(all.length,60),items:all.slice(0,60)};
import("fs").then(fs=>fs.writeFileSync("news.json",JSON.stringify(out)));
console.log("news.json:",out.items.length,"items, latest:",out.items[0]&&out.items[0].pubDate);
