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
    {path:"omok/", ic:"", title:"오목 (AI·온라인)", desc:"AI 또는 친구와 5목", cat:"사무실에서", pop:true},
    {path:"minesweeper/", ic:"", title:"지뢰찾기", desc:"고전 지뢰찾기 (엑셀풍)", cat:"사무실에서", pop:true},
    {path:"reaction/", ic:"", title:"반응속도 테스트", desc:"몇 ms? 점수 자랑하기", cat:"테스트", pop:true},
    {path:"baseball/", ic:"", title:"숫자야구", desc:"스트라이크·볼 추리", cat:"사무실에서", pop:true},
    {url:"https://seam0814.github.io/wordplay/", ic:"", title:"온라인 끝말잇기", desc:"친구랑 각자 PC에서 2인", cat:"같이 하기", ext:true, pop:true},
    {url:"https://seam0814.github.io/typetest/animal/", ic:"", title:"동물상 테스트", desc:"질문으로 보는 내 얼굴상", cat:"테스트", ext:true}
  ];
  window.ITEMS=ITEMS; window.SITE_NAME='업무 <span>대시보드</span>';
  function h(s){var d=document.createElement("div");d.innerHTML=s.trim();return d.firstChild}
  var head=document.getElementById("site-header");
  if(head){head.className="sitehead";head.appendChild(h('<a class="brand" href="'+ROOT+'">'+window.SITE_NAME+'</a>'));head.appendChild(h('<a class="home" href="'+ROOT+'">← 전체 놀거리</a>'))}
  var foot=document.getElementById("site-footer");
  if(foot){foot.className="sitefoot";var links=ITEMS.map(function(t){var href=t.ext?t.url:ROOT+t.path;return '<a href="'+href+'">'+t.title+'</a>'}).join("");
    foot.appendChild(h('<div class="fnav">'+links+'</div>'));
    foot.appendChild(h('<div>재미로 즐겨요 · 특정인·회사 비방·개인정보 공유 금지(위반 시 작성자 책임) · <a href="'+ROOT+'privacy.html">개인정보처리방침</a></div>'))}
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
    x.font="700 46px Jua,sans-serif";x.fillText("",W/2,140);x.font="180px sans-serif";x.fillText(o.emoji||"",W/2,470);
    x.font="800 86px Jua,sans-serif";var yy=wrapC(x,o.title||"",W/2,610,W-240,98);
    x.font="400 42px sans-serif";x.fillStyle="rgba(255,255,255,.95)";(o.lines||[]).forEach(function(ln){yy=wrapC(x,ln,W/2,yy+24,W-260,58)});
    x.font="600 36px Jua,sans-serif";x.fillStyle="rgba(255,255,255,.92)";x.fillText("seam0814.github.io/simsim",W/2,H-90);
    c.toBlob(function(b){if(!b)return;var f=null;try{f=new File([b],"simsim.png",{type:"image/png"})}catch(e){}
      if(f&&navigator.canShare&&navigator.canShare({files:[f]})){navigator.share({files:[f],text:o.share||"내 결과 "}).then(function(){track("card_share")}).catch(function(){})}
      else{var u=URL.createObjectURL(b),a=document.createElement("a");a.href=u;a.download="결과.png";a.click();setTimeout(function(){URL.revokeObjectURL(u)},1000);track("card_download")}},"image/png")};

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
      var h="";q.forEach(function(d){var m=d.data();var tm="";try{if(m.createdAt&&m.createdAt.toDate){var dd=m.createdAt.toDate();tm=("0"+dd.getHours()).slice(-2)+":"+("0"+dd.getMinutes()).slice(-2)}}catch(e){}h+='<div class="cmsg"><b>'+esc(m.name||"익명")+'</b> '+esc(m.text)+(tm?'<span class="ctime">'+tm+'</span>':"")+'</div>'});
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
    if(window.self!==window.top)return; /* iframe 임베드 시 크롬/보스키 생략 (대시보드가 제공) */
    var bar=document.createElement("div");bar.className="xlchrome";
    bar.innerHTML='<div class="xltitle"><a href="'+ROOT+'" style="color:inherit;text-decoration:none">통합 문서1 - Excel</a><span style="float:right">—  </span></div>'
      +'<div class="xlribbon"><a href="'+ROOT+'" style="color:#333;font-weight:700;text-decoration:none">파일</a> &nbsp;<a href="'+ROOT+'" style="color:inherit;text-decoration:none">홈</a> &nbsp;삽입 &nbsp;페이지 레이아웃 &nbsp;수식 &nbsp;데이터 &nbsp;검토 &nbsp;보기</div>'
      +'<div class="xlformbar"><span class="nb">A1</span><span>fx</span><span>=SHEET()</span></div>';
    document.body.insertBefore(bar,document.body.firstChild);
    var boss=document.createElement("div");boss.id="bossv";
    function colN(n){var r="";n++;while(n>0){var m=(n-1)%26;r=String.fromCharCode(65+m)+r;n=Math.floor((n-1)/26)}return r}
    function C(v,cls){return {v:(v==null?"":v),cls:cls||""}}
    function money(a){return a.map(function(x){return C(x.toLocaleString("en-US"),"n"+(x<0?" neg":""))})}
    function H(a){return a.map(function(x){return C(x,"hh")})}
    var TPL={
      finance:{file:"분기보고서_최종_v4.xlsx",label:"재무·회계",cell:"F10",fx:"=SUM(B10:E10)",rows:function(){
        return [H(["과목 (백만원)","1분기","2분기","3분기","4분기","연간","비중"]),
          [C("매출액","lb")].concat(money([9800,10600,11200,12100])).concat([C("43,700","n"),C("100.0%","n")]),
          [C("매출원가","lb")].concat(money([5880,6250,6500,6900])).concat([C("25,530","n"),C("58.4%","n")]),
          [C("매출총이익","sub")].concat(money([3920,4350,4700,5200])).concat([C("18,170","n sub"),C("41.6%","n sub")]),
          [C("판매관리비","lb")].concat(money([2240,2430,2570,2740])).concat([C("9,980","n"),C("22.8%","n")]),
          [C("영업이익","sub")].concat(money([1680,1920,2130,2460])).concat([C("8,190","n sub"),C("18.7%","n sub")]),
          [C("영업이익률","lb"),C("17.1%","n"),C("18.1%","n"),C("19.0%","n"),C("20.3%","n"),C("18.7%","n"),C("")],
          [C("영업외손익","lb")].concat(money([-120,85,-40,160])).concat([C("85","n"),C("0.2%","n")]),
          [C("법인세비용","lb")].concat(money([390,460,500,620])).concat([C("1,970","n"),C("4.5%","n")]),
          [C("당기순이익","tot")].concat(money([1170,1545,1590,2000])).concat([C("6,305","n tot"),C("14.4%","n tot")])
        ];}},
      sales:{file:"거래처_매출현황_2026.xlsx",label:"영업·매출",cell:"J2",fx:"=H2/I2",rows:function(){
        function row(name,arr,goal){var sum=arr.reduce(function(a,b){return a+b},0),rate=Math.round(sum/goal*100);
          return [C(name,"lb")].concat(money(arr)).concat([C(sum.toLocaleString("en-US"),"n"),C(goal.toLocaleString("en-US"),"n"),C(rate+"%","n "+(rate>=100?"pos":"neg"))]);}
        return [H(["거래처","1월","2월","3월","4월","5월","6월","상반기","목표","달성률"]),
          row("삼성전자",[420,445,460,438,472,495],2800),
          row("LG전자",[310,298,325,340,331,352],1950),
          row("SK하이닉스",[280,295,310,288,305,320],1700),
          row("현대모비스",[190,205,198,210,220,215],1300),
          row("쿠팡",[150,165,172,180,195,210],1000),
          row("네이버",[120,128,135,130,142,150],850),
          row("카카오",[95,102,110,105,118,122],700),
          [C("합계","tot"),C("1,565","n tot"),C("1,638","n tot"),C("1,710","n tot"),C("1,691","n tot"),C("1,783","n tot"),C("1,864","n tot"),C("10,251","n tot"),C("10,300","n tot"),C("99.5%","n tot neg")]
        ];}},
      dev:{file:"스프린트34_이슈트래커.xlsx",label:"개발·IT",cell:"G2",fx:'=COUNTIF(E:E,"완료")',rows:function(){
        function st(s){return C(s,s==="완료"?"pos":(s==="지연"?"neg":""))}
        return [H(["이슈ID","제목","담당자","우선순위","상태","SP","진척"]),
          [C("API-1042","lb"),C("로그인 토큰 만료 처리"),C("김도현"),C("High"),st("완료"),C("5","n"),C("100%","n pos")],
          [C("API-1043","lb"),C("결제 모듈 리팩터링"),C("이수민"),C("High"),st("진행"),C("8","n"),C("60%","n")],
          [C("WEB-2210","lb"),C("대시보드 반응형 레이아웃"),C("박정우"),C("Mid"),st("리뷰"),C("3","n"),C("90%","n")],
          [C("WEB-2215","lb"),C("다크모드 토글 버그"),C("최유나"),C("Low"),st("대기"),C("2","n"),C("0%","n")],
          [C("INF-330","lb"),C("CI 파이프라인 캐시 최적화"),C("정민호"),C("Mid"),st("진행"),C("5","n"),C("40%","n")],
          [C("DB-118","lb"),C("인덱스 재설계 및 쿼리 튜닝"),C("김도현"),C("High"),st("지연"),C("8","n"),C("25%","n neg")],
          [C("QA-087","lb"),C("E2E 테스트 시나리오 추가"),C("한지은"),C("Mid"),st("완료"),C("3","n"),C("100%","n pos")],
          [C("번다운","tot"),C("완료 8 / 진행 18 / 잔여 34 SP"),C(""),C(""),C(""),C("34","n tot"),C("53%","n tot")]
        ];}},
      hr:{file:"인원현황_급여대장_2026.xlsx",label:"인사·총무",cell:"D2",fx:"=B2-C2",rows:function(){
        function row(dep,jeong,hyeon,geun,sal){var gap=jeong-hyeon;
          return [C(dep,"lb"),C(jeong,"n"),C(hyeon,"n"),C(gap,"n "+(gap>0?"neg":"")),C(geun+"년","n"),C(sal.toLocaleString("en-US"),"n")];}
        return [H(["부서","정원","현원","결원","평균근속","평균연봉(천원)"]),
          row("경영지원",12,11,5.2,58000),
          row("영업본부",28,25,3.1,61000),
          row("개발본부",45,42,2.8,72000),
          row("마케팅",16,15,3.5,59000),
          row("생산/제조",60,57,7.4,48000),
          row("품질관리",14,13,6.1,54000),
          row("연구소",22,20,4.0,78000),
          [C("합계/평균","tot"),C("197","n tot"),C("183","n tot"),C("14","n tot neg"),C("4.6년","n tot"),C("61,429","n tot")]
        ];}},
      email:{label:"이메일(Outlook)"}
    };
    var OPTS=Object.keys(TPL).map(function(k){return '<option value="'+k+'">'+TPL[k].label+'</option>'}).join("");
    function render(rows){
      var maxc=12;rows.forEach(function(r){if(r.length>maxc)maxc=r.length});
      var h="<table class='xlsheet'><tr><th class='corner'></th>";
      for(var c=0;c<maxc;c++)h+="<th class='colh'>"+colN(c)+"</th>";h+="</tr>";
      var total=Math.max(rows.length+2,30);
      for(var r=0;r<total;r++){h+="<tr><th class='rowh'>"+(r+1)+"</th>";var row=rows[r]||[];
        for(var c=0;c<maxc;c++){var cc=row[c];if(cc==null)cc={v:"",cls:""};if(typeof cc!=="object")cc={v:cc,cls:""};
          h+="<td class='"+(cc.cls||"")+"'>"+(cc.v==null?"":cc.v)+"</td>";}
        h+="</tr>";}
      return h+"</table>";
    }
    function draw(name){var t=TPL[name]||TPL.finance;
      var SEL='<span style="display:flex;gap:8px;align-items:center;font-size:12px;opacity:.95">보기 <select id="bosssel" style="font:inherit;font-size:12px;border:1px solid rgba(255,255,255,.5);background:rgba(255,255,255,.15);color:#fff;border-radius:2px;padding:1px 4px">'+OPTS+'</select><span style="letter-spacing:3px">—▢✕</span></span>';
      var HINT='<div class="bosshint">아무 키나 누르면 돌아갑니다…</div>';
      if(name==="email"){
        var folds=["⭐ 즐겨찾기","받은 편지함 (12)","보낸 편지함","임시 보관함","삭제된 항목","정크 메일","보관"];
        var fh=folds.map(function(x,i){return '<div class="olf'+(i===1?" on":"")+'">'+x+'</div>'}).join("");
        var M=[["인사팀","[공지] 2026년 연차 사용 촉진 안내","오전 9:14",1],["김과장","Re: 주간 업무보고 제출 요청","오전 9:02",0],["IT보안팀","[보안] 분기 비밀번호 변경 권고","어제",0],["총무팀","사무용품 신청 마감(금일 18시)","어제",1],["이대리","회의실 예약 확인 부탁드립니다","어제",0],["급여관리","2026년 9월 급여명세서 안내","10/05",0],["프로젝트A","Re: Re: 일정 조율 건","10/05",0],["뉴스레터","[주간] 업계 동향 리포트","10/04",0],["박부장","[중요] 3분기 실적 취합 건","10/04",1],["교육팀","필수 이수 교육 안내(기한 임박)","10/02",0]];
        var mr=M.map(function(m){return '<tr class="'+(m[3]?"unread":"")+'"><td class="st">'+(m[3]?"●":"")+'</td><td class="fr">'+m[0]+'</td><td class="sj">'+m[1]+'</td><td class="dt">'+m[2]+'</td></tr>'}).join("");
        boss.innerHTML='<div class="xltitle" style="background:#0f6cbd;color:#fff;padding:6px 12px;display:flex;justify-content:space-between;align-items:center"><span>받은 편지함 - 홍길동 - Outlook</span>'+SEL+'</div>'
          +'<div class="xlribbon" style="background:#f3f3f3;border-bottom:1px solid #d4d4d4;padding:6px 12px;color:#555"><b>파일</b> &nbsp;홈 &nbsp;보내기/받기 &nbsp;폴더 &nbsp;보기 &nbsp;도움말</div>'
          +'<div class="olwrap"><div class="olfold">'+fh+'</div><div class="olmain"><table class="oltbl"><tr><th></th><th>보낸 사람</th><th>제목</th><th>받은 날짜</th></tr>'+mr+'</table></div></div>'+HINT;
      }else{
        boss.innerHTML='<div class="xltitle" style="background:#217346;color:#fff;padding:6px 12px;display:flex;justify-content:space-between;align-items:center"><span>'+t.file+' - Excel</span>'+SEL+'</div>'
          +'<div class="xlribbon" style="background:#f3f3f3;border-bottom:1px solid #d4d4d4;padding:6px 12px;color:#555"><b>파일</b> &nbsp;홈 &nbsp;삽입 &nbsp;페이지 레이아웃 &nbsp;수식 &nbsp;데이터 &nbsp;검토 &nbsp;보기</div>'
          +'<div class="xlformbar"><span class="nb">'+t.cell+'</span><span>fx</span><span>'+t.fx+'</span></div>'
          +'<div class="bosssheet">'+render(t.rows())+'</div>'+HINT;
      }
      var se=document.getElementById("bosssel");if(se){se.value=name;
        se.addEventListener("click",function(e){e.stopPropagation()});
        se.addEventListener("mousedown",function(e){e.stopPropagation()});
        se.addEventListener("change",function(e){e.stopPropagation();store.set("boss",this.value);draw(this.value)});}
    }
    draw(store.get("boss","finance"));
    document.body.appendChild(boss);
    function bshow(v){boss.classList.toggle("show",v)}
    window.addEventListener("keydown",function(e){if(e.key==="Escape"){bshow(!boss.classList.contains("show"));e.preventDefault();return}
      if(boss.classList.contains("show")){if(e.target&&e.target.id==="bosssel")return;bshow(false)}});
    boss.addEventListener("click",function(e){if(e.target&&e.target.id==="bosssel")return;bshow(false)});
  })();
})();
