// briefing.json → briefing/index.html(최신+목록) + briefing/<날짜>/index.html(날짜별), sitemap 갱신
import fs from "fs";
const BASE = "https://seam0814.github.io/simsim/";
const days = JSON.parse(fs.readFileSync("briefing.json", "utf8")).days;
const esc = t => String(t || "").replace(/[<>&"]/g, c => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" })[c]);

const CSS = `.bwrap{max-width:720px}.bmeta{color:var(--muted);font-size:.9rem;margin:-4px 0 14px}.blead{font-size:1.02rem;line-height:1.75;margin:0 0 6px}
.bitem{padding:16px 0;border-bottom:1px dashed #d9dfd9}.bitem:last-child{border-bottom:0}
.btag{display:inline-block;font-size:.75rem;font-weight:700;color:#fff;background:#217346;padding:1px 8px;margin-right:6px;vertical-align:2px}
.bitem h2{display:inline;font-size:1.05rem;margin:0}.bt{line-height:1.85;margin:8px 0 6px;word-break:keep-all}
.btip{font-size:.92rem;color:#555;background:#f4f7f4;padding:6px 12px;border-left:2px solid #9ab89a}
.bsrc{font-size:.82rem;color:#8a8f98;margin-top:6px}.bsrc a{color:#5b7fa6;margin-right:8px}
.barch a{display:block;padding:9px 0;border-bottom:1px solid #eee;color:inherit;text-decoration:none}.barch a:hover{color:#217346}`;

function page({ title, desc, canon, root, body }) {
  return `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${canon}">
<link rel="stylesheet" href="${root}style.css">
<style>${CSS}</style>
</head>
<body>
<div class="wrap bwrap">
  <div id="site-header"></div>
${body}
  <div id="site-footer"></div>
</div>
<script>window.SITE_ROOT="${root}";</script>
<script src="${root}common.js"></script>
</body>
</html>
`;
}

function dayBody(d) {
  return `  <h1>${esc(d.title)}</h1>
  <p class="bmeta">${esc(d.date)} · 여러 언론 보도를 바탕으로 직접 정리</p>
  ${d.lead ? `<p class="blead">${esc(d.lead)}</p>` : ""}
  <div class="card">
${d.items.map(x => `    <div class="bitem"><span class="btag">${esc(x.tag)}</span><h2>${esc(x.h)}</h2>
      <p class="bt">${esc(x.t)}</p>${x.tip ? `<div class="btip">${esc(x.tip)}</div>` : ""}
      <div class="bsrc">출처 ${x.src.map(s => `<a href="${esc(s.u)}" target="_blank" rel="noopener nofollow">${esc(s.n)} ↗</a>`).join("")}</div></div>`).join("\n")}
  </div>`;
}

function archive(list) {
  return `  <div class="copy"><h2>지난 브리핑</h2><div class="barch">
${list.map(d => `    <a href="${d.date}/">${esc(d.title)}</a>`).join("\n")}
  </div></div>`;
}

const descOf = d => (d.lead ? d.lead + " " : "") + d.items.map(x => x.h).join(" · ");
fs.mkdirSync("briefing", { recursive: true });
for (const d of days) {
  fs.mkdirSync(`briefing/${d.date}`, { recursive: true });
  fs.writeFileSync(`briefing/${d.date}/index.html`, page({
    title: d.title, desc: descOf(d).slice(0, 150), canon: `${BASE}briefing/${d.date}/`, root: "../../",
    body: dayBody(d) + `\n  <p><a href="../">← 다른 날 브리핑 보기</a></p>`,
  }));
}
const latest = days[0];
fs.writeFileSync("briefing/index.html", page({
  title: "출근길 브리핑 - 직장인 3분 뉴스 요약", desc: "매일 아침 직장인이 알아두면 좋은 뉴스를 3분 분량으로 정리해요. " + descOf(latest).slice(0, 100),
  canon: `${BASE}briefing/`, root: "../",
  body: dayBody(latest).replace(/<\/h1>/, ' <a href="' + latest.date + '/" style="font-size:.5em">고정 링크</a></h1>') + "\n" + archive(days),
}));

// sitemap: briefing 항목 다시 쓰기
let sm = fs.readFileSync("sitemap.xml", "utf8").replace(/\s*<url><loc>[^<]*\/briefing\/[^<]*<\/loc>.*?<\/url>/g, "");
const urls = [`  <url><loc>${BASE}briefing/</loc><changefreq>daily</changefreq><priority>0.8</priority></url>`]
  .concat(days.map(d => `  <url><loc>${BASE}briefing/${d.date}/</loc><lastmod>${d.date}</lastmod><priority>0.6</priority></url>`));
sm = sm.replace("</urlset>", urls.join("\n") + "\n</urlset>");
fs.writeFileSync("sitemap.xml", sm);
console.log("briefing pages:", days.length);
