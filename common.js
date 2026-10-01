(function(){
  var ROOT=window.SITE_ROOT||"./";
  (function(){var l=document.createElement("link");l.rel="stylesheet";l.href="https://fonts.googleapis.com/css2?family=Jua&display=swap";document.head.appendChild(l)})();
  var GA_ID="",CLARITY_ID="";
  if(GA_ID){var g=document.createElement("script");g.async=true;g.src="https://www.googletagmanager.com/gtag/js?id="+GA_ID;document.head.appendChild(g);window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag("js",new Date());gtag("config",GA_ID)}
  if(CLARITY_ID){(function(c,l,a,r,i){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};var t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;var y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script",CLARITY_ID)}
  window.track=function(n,p){try{if(window.gtag)gtag("event",n,p||{})}catch(e){}try{if(window.clarity)clarity("event",n)}catch(e){}};
  window.store={get:function(k,d){try{var v=localStorage.getItem("ss_"+k);return v===null?d:v}catch(e){return d}},set:function(k,v){try{localStorage.setItem("ss_"+k,v)}catch(e){}}};

  // 등록: path=내부 폴더, url=외부(기존 사이트). cat=카테고리
  var ITEMS=[
    {path:"reaction/", ic:"⚡", title:"반응속도 테스트", desc:"몇 ms? 점수 자랑하기", cat:"테스트", pop:true},
    {url:"https://seam0814.github.io/typetest/animal/", ic:"🐶", title:"동물상 테스트", desc:"질문으로 보는 내 얼굴상", cat:"테스트", ext:true},
    {url:"https://seam0814.github.io/wordplay/", ic:"🗣️", title:"온라인 끝말잇기", desc:"친구랑 각자 PC에서 2인", cat:"같이 하기", ext:true, pop:true},
    {url:"https://seam0814.github.io/sheetgame/", ic:"🔢", title:"엑셀 2048", desc:"업무 위장 퍼즐 (보스키)", cat:"사무실에서", ext:true},
    {url:"https://seam0814.github.io/sheetgame/idle/", ic:"📈", title:"방치형 실적게임", desc:"숫자만 쌓이는 방치형", cat:"사무실에서", ext:true}
  ];
  window.ITEMS=ITEMS; window.SITE_NAME='심심<span>풀이</span>';
  function h(s){var d=document.createElement("div");d.innerHTML=s.trim();return d.firstChild}
  var head=document.getElementById("site-header");
  if(head){head.className="sitehead";head.appendChild(h('<a class="brand" href="'+ROOT+'">'+window.SITE_NAME+'</a>'));head.appendChild(h('<a class="home" href="'+ROOT+'">← 전체 놀거리</a>'))}
  var foot=document.getElementById("site-footer");
  if(foot){foot.className="sitefoot";var links=ITEMS.map(function(t){var href=t.ext?t.url:ROOT+t.path;return '<a href="'+href+'">'+t.title+'</a>'}).join("");
    foot.appendChild(h('<div class="fnav">'+links+'</div>'));
    foot.appendChild(h('<div>심심할 때 하나씩 · 재미로 즐겨요 · <a href="'+ROOT+'privacy.html">개인정보처리방침</a></div>'))}
  var grid=document.getElementById("items");
  if(grid){
    function card(t){var href=t.ext?t.url:ROOT+t.path;var tgt=t.ext?' target="_blank" rel="noopener"':'';
      return '<a class="gcard" href="'+href+'"'+tgt+'>'+(t.pop?'<span class="pop">인기</span>':'')+(t.ext?'<span class="ext">↗</span>':'')+'<span class="ic">'+t.ic+'</span><b>'+t.title+'</b><small>'+t.desc+'</small></a>'}
    var cats=[];ITEMS.forEach(function(t){if(cats.indexOf(t.cat)<0)cats.push(t.cat)});
    cats.forEach(function(c){grid.appendChild(h('<div class="cat">'+c+'</div>'));var g=h('<div class="grid"></div>');
      ITEMS.filter(function(t){return t.cat===c}).forEach(function(t){g.appendChild(h(card(t)))});grid.appendChild(g)})
  }

  // 결과 공유 카드
  function rr(x,a,b,w,hh,r){x.beginPath();x.moveTo(a+r,b);x.arcTo(a+w,b,a+w,b+hh,r);x.arcTo(a+w,b+hh,a,b+hh,r);x.arcTo(a,b+hh,a,b,r);x.arcTo(a,b,a+w,b,r);x.closePath()}
  function wrapC(x,t,cx,y,maxW,lh){var line="",yy=y;for(var i=0;i<t.length;i++){var tt=line+t[i];if(x.measureText(tt).width>maxW&&line){x.fillText(line,cx,yy);line=t[i];yy+=lh}else line=tt}if(line)x.fillText(line,cx,yy);return yy+lh}
  window.shareCard=function(o){var W=1080,H=1350,c=document.createElement("canvas");c.width=W;c.height=H;var x=c.getContext("2d");
    var g=x.createLinearGradient(0,0,W,H);g.addColorStop(0,"#ff5e7e");g.addColorStop(1,"#ff9a5a");x.fillStyle=g;x.fillRect(0,0,W,H);
    x.fillStyle="rgba(255,255,255,.14)";rr(x,70,190,W-140,H-380,44);x.fill();x.textAlign="center";x.fillStyle="#fff";
    x.font="700 46px Jua,sans-serif";x.fillText("심심풀이",W/2,140);x.font="180px sans-serif";x.fillText(o.emoji||"🎮",W/2,470);
    x.font="800 86px Jua,sans-serif";var yy=wrapC(x,o.title||"",W/2,610,W-240,98);
    x.font="400 42px sans-serif";x.fillStyle="rgba(255,255,255,.95)";(o.lines||[]).forEach(function(ln){yy=wrapC(x,ln,W/2,yy+24,W-260,58)});
    x.font="600 36px Jua,sans-serif";x.fillStyle="rgba(255,255,255,.92)";x.fillText("seam0814.github.io/simsim",W/2,H-90);
    c.toBlob(function(b){if(!b)return;var f=null;try{f=new File([b],"simsim.png",{type:"image/png"})}catch(e){}
      if(f&&navigator.canShare&&navigator.canShare({files:[f]})){navigator.share({files:[f],text:o.share||"내 결과 ✨"}).then(function(){track("card_share")}).catch(function(){})}
      else{var u=URL.createObjectURL(b),a=document.createElement("a");a.href=u;a.download="심심풀이.png";a.click();setTimeout(function(){URL.revokeObjectURL(u)},1000);track("card_download")}},"image/png")};
})();
