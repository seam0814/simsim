(function(){
  var ROOT=window.SITE_ROOT||"./";
  (function(){var l=document.createElement("link");l.rel="stylesheet";l.href="https://fonts.googleapis.com/css2?family=Jua&display=swap";document.head.appendChild(l)})();
  var GA_ID="G-3WT6016LYF",CLARITY_ID="";
  if(GA_ID){var g=document.createElement("script");g.async=true;g.src="https://www.googletagmanager.com/gtag/js?id="+GA_ID;document.head.appendChild(g);window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag("js",new Date());gtag("config",GA_ID)}
  if(CLARITY_ID){(function(c,l,a,r,i){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};var t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;var y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script",CLARITY_ID)}
  window.track=function(n,p){try{if(window.gtag)gtag("event",n,p||{})}catch(e){}try{if(window.clarity)clarity("event",n)}catch(e){}};
  window.store={get:function(k,d){try{var v=localStorage.getItem("ss_"+k);return v===null?d:v}catch(e){return d}},set:function(k,v){try{localStorage.setItem("ss_"+k,v)}catch(e){}}};

  // 등록: path=내부 폴더, url=외부(기존 사이트). cat=카테고리
  var ITEMS=[
    {path:"desk/", ic:"", title:"업무 대시보드 (뉴스+게임+채팅)", desc:"한 화면에 다 모은 올인원", cat:"사무실에서", pop:true},
    {path:"reaction/", ic:"", title:"반응속도 테스트", desc:"몇 ms? 점수 자랑하기", cat:"테스트", pop:true},
    {path:"minesweeper/", ic:"", title:"지뢰찾기", desc:"고전 지뢰찾기 (엑셀풍)", cat:"사무실에서", pop:true},
    {path:"omok/", ic:"", title:"오목 (AI 대국)", desc:"컴퓨터와 5목 두기", cat:"사무실에서", pop:true},
    {path:"news/", ic:"", title:"뉴스 모음", desc:"언론사 바로가기+헤드라인", cat:"사무실에서"},
    {url:"https://seam0814.github.io/typetest/animal/", ic:"", title:"동물상 테스트", desc:"질문으로 보는 내 얼굴상", cat:"테스트", ext:true},
    {url:"https://seam0814.github.io/wordplay/", ic:"", title:"온라인 끝말잇기", desc:"친구랑 각자 PC에서 2인", cat:"같이 하기", ext:true, pop:true},
    {url:"https://seam0814.github.io/sheetgame/", ic:"", title:"엑셀 2048", desc:"업무 위장 퍼즐 (보스키)", cat:"사무실에서", ext:true},
    {url:"https://seam0814.github.io/sheetgame/idle/", ic:"", title:"방치형 실적게임", desc:"숫자만 쌓이는 방치형", cat:"사무실에서", ext:true}
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
      return '<a class="gcard" href="'+href+'"'+tgt+'>'+(t.pop?'<span class="pop">인기</span>':'')+(t.ext?'<span class="ext">↗</span>':'')+(t.ic?'<span class="ic">'+t.ic+'</span>':'')+'<b>'+t.title+'</b><small>'+t.desc+'</small></a>'}
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
    x.font="700 46px Jua,sans-serif";x.fillText("심심풀이",W/2,140);x.font="180px sans-serif";x.fillText(o.emoji||"",W/2,470);
    x.font="800 86px Jua,sans-serif";var yy=wrapC(x,o.title||"",W/2,610,W-240,98);
    x.font="400 42px sans-serif";x.fillStyle="rgba(255,255,255,.95)";(o.lines||[]).forEach(function(ln){yy=wrapC(x,ln,W/2,yy+24,W-260,58)});
    x.font="600 36px Jua,sans-serif";x.fillStyle="rgba(255,255,255,.92)";x.fillText("seam0814.github.io/simsim",W/2,H-90);
    c.toBlob(function(b){if(!b)return;var f=null;try{f=new File([b],"simsim.png",{type:"image/png"})}catch(e){}
      if(f&&navigator.canShare&&navigator.canShare({files:[f]})){navigator.share({files:[f],text:o.share||"내 결과 "}).then(function(){track("card_share")}).catch(function(){})}
      else{var u=URL.createObjectURL(b),a=document.createElement("a");a.href=u;a.download="심심풀이.png";a.click();setTimeout(function(){URL.revokeObjectURL(u)},1000);track("card_download")}},"image/png")};

  /* ===== 휴게실 채팅 (익명·최근50 보존, Firebase. config 넣으면 활성화) ===== */
  var FIREBASE_CONFIG={apiKey:"AIzaSyDOoMfpblSgms5JXw_ETwkCrHlcuYUanQ8",authDomain:"simsim-games-faac6.firebaseapp.com",projectId:"simsim-games-faac6",storageBucket:"simsim-games-faac6.firebasestorage.app",messagingSenderId:"732340191924",appId:"1:732340191924:web:716d3923f7b95b83c48de1"}; // 집에서 firebaseConfig 붙여넣기
  function esc(t){return String(t).replace(/[<>&]/g,function(c){return{"<":"&lt;",">":"&gt;","&":"&amp;"}[c]})}
  var BAD=["씨발","시발","개새끼","병신","좆","지랄","fuck","shit"];
  function clean(t){BAD.forEach(function(w){t=t.split(w).join(new Array(w.length+1).join("*"))});return t}
  var loungeEl=document.getElementById("lounge");
  if(loungeEl){
    if(FIREBASE_CONFIG.apiKey){
      var s1=document.createElement("script");s1.src="https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js";
      s1.onload=function(){var s2=document.createElement("script");s2.src="https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js";
        s2.onload=function(){try{firebase.initializeApp(FIREBASE_CONFIG);lounge(firebase.firestore())}catch(e){}};document.head.appendChild(s2)};
      document.head.appendChild(s1);
    }else{loungeEl.innerHTML='<div class="cat"> 사무실 휴게실</div><p class="disc" style="text-align:left">채팅은 곧 열려요 (운영자 준비 중).</p>';}
  }
  function lounge(db){
    var nick=store.get("nick","")||("익명"+Math.floor(Math.random()*9999));store.set("nick",nick);
    loungeEl.innerHTML='<div class="cat"> 사무실 휴게실 <span style="font-weight:400;color:var(--muted);font-size:.8rem">(익명·누구나)</span></div>'
      +'<div class="chatbox" id="cbox"></div>'
      +'<form id="cform" class="chatform"><input id="cnick" maxlength="12" value="'+esc(nick)+'"><input id="cmsg" maxlength="200" placeholder="메시지 입력"><button class="btn" type="submit">전송</button></form>';
    db.collection("lounge").orderBy("createdAt").limitToLast(50).onSnapshot(function(q){
      var h="";q.forEach(function(d){var m=d.data();h+='<div class="cmsg"><b>'+esc(m.name||"익명")+'</b> '+esc(m.text)+'</div>'});
      var box=document.getElementById("cbox");if(box){box.innerHTML=h||'<p class="disc">첫 메시지를 남겨보세요 </p>';box.scrollTop=box.scrollHeight}
    },function(){});
    document.getElementById("cform").addEventListener("submit",function(e){e.preventDefault();
      var msg=(document.getElementById("cmsg").value||"").trim();if(!msg)return;
      var nm=(document.getElementById("cnick").value||"익명").trim().slice(0,12)||"익명";store.set("nick",nm);
      db.collection("lounge").add({name:nm,text:clean(msg).slice(0,200),createdAt:firebase.firestore.FieldValue.serverTimestamp()}).catch(function(){});
      document.getElementById("cmsg").value="";track("lounge_msg");
    });
  }

  /* ===== 엑셀 위장 크롬 + 공통 보스키(Esc/blur) ===== */
  (function(){
    var bar=document.createElement("div");bar.className="xlchrome";
    bar.innerHTML='<div class="xltitle">통합 문서1 - Excel<span style="float:right">—  </span></div>'
      +'<div class="xlribbon"><b>파일</b> &nbsp;홈 &nbsp;삽입 &nbsp;페이지 레이아웃 &nbsp;수식 &nbsp;데이터 &nbsp;검토 &nbsp;보기</div>'
      +'<div class="xlformbar"><span class="nb">A1</span><span>fx</span><span>=SHEET()</span></div>';
    document.body.insertBefore(bar,document.body.firstChild);
    var boss=document.createElement("div");boss.id="bossv";
    var rows=[["항목","1월","2월","3월","합계"],["매출","1,240","1,310","1,455","4,005"],["매출원가","720","760","810","2,290"],["판관비","310","325","330","965"],["영업이익","210","225","315","750"]];
    var tb="<table><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th></tr>";
    rows.forEach(function(r,i){tb+="<tr><th>"+(i+1)+"</th>"+r.map(function(x){return "<td>"+x+"</td>"}).join("")+"</tr>"});tb+="</table>";
    boss.innerHTML='<div class="xltitle" style="background:#217346;color:#fff;padding:6px 12px">분기보고서_최종_v4.xlsx - Excel<span style="float:right">—  </span></div>'
      +'<div class="xlribbon" style="background:#f3f3f3;border-bottom:1px solid #d4d4d4;padding:6px 12px;color:#555"><b>파일</b> 홈 삽입 수식 데이터 검토</div>'
      +tb+'<div class="bosshint">아무 키나 누르면 돌아갑니다…</div>';
    document.body.appendChild(boss);
    function bshow(v){boss.classList.toggle("show",v)}
    window.addEventListener("keydown",function(e){if(e.key==="Escape"){bshow(!boss.classList.contains("show"));e.preventDefault();return}if(boss.classList.contains("show"))bshow(false)});
    boss.addEventListener("click",function(){bshow(false)});
  })();
})();
