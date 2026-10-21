/* HNRD WORLDWIDE — skin logika (mechanika). NETREBA upravovať.
   Texty, posty, farby, rýchlosti a režim nastavuješ v SHOPTETE (Pätička, hore).
   Tento súbor len číta tie hodnoty. */

(function(){
  var GLB = "https://borishnrd.github.io/Borisko/hnrd.glb";
  var IG  = "https://www.instagram.com/hnrd.worldwide/";
  var CDN = "https://cdn.myshoptet.com/usr/www.hnrdworldwide.com/user/shop/big/";
  var FALLBACK = CDN+"52_hnrd-hoodie-black-white-reflective.png";

  /* ---- načítanie nastavení zo Shoptetu (s predvolenými hodnotami) ---- */
  var MODE   = (typeof window.SHOP_MODE!=="undefined") ? window.SHOP_MODE : "live";
  var HORNY  = window.HORNY_PAS  || "DOPRAVA ZDARMA NAD 100 € ✦ LIMITED DROP ✦ SK / CZ ✦ @hnrd.worldwide ✦ ";
  var SPODNY = window.SPODNY_PAS || "HNRD WORLDWIDE ✦ @hnrd.worldwide ✦ LIMITED DROP ✦ REFLEXNÁ VÝŠIVKA ✦ ";
  var PRODUKT= window.PRODUKT_PAS|| "VÝROBA NA OBJEDNÁVKU ✦ ČAKACIA DOBA cca 14 DNÍ ✦ ĎAKUJEME ZA TRPEZLIVOSŤ ✦ ";
  var RY_H   = parseFloat(window.RYCHLOST_HORNY)  || 30;   /* sekundy: viac = pomalšie */
  var RY_S   = parseFloat(window.RYCHLOST_SPODNY) || 26;
  var IGP    = window.IG_POSTS || [];
  if(window.FARBA_POZADIA){var bg=(''+window.FARBA_POZADIA).trim();if(/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(bg))bg='#'+bg;document.documentElement.style.setProperty('--bg',bg);}

  /* reflexná sekcia – texty aj karty z nastavení */
  var i1=CDN+"52_hnrd-hoodie-black-white-reflective-zoom.jpg?ff=1&x=1024&y=768&q=85&ts=69ab399a&sg=161563f2";
  var i2=CDN+"49_hnrd-hoodie-black-black-reflective-zoom.jpg?ff=1&x=1024&y=768&q=85&ts=69ab391e&sg=161563f2";
  var R = window.REFLECTIVE || {};
  var R_NAD  = R.nadpis || "REFLECTIVE";
  var R_META = R.meta   || "SERIES 02<br>GLOWS IN THE DARK";
  var R_KARTY= (R.karty && R.karty.length) ? R.karty : [
    {img:i1, link:"/hoodie-hnrd-white-reflective/", titul:"WHITE / REFLECTIVE", popis:"€90 · GLOWS IN THE DARK"},
    {img:i2, link:"/hoodie-hnrd-black-reflective/", titul:"BLACK / REFLECTIVE", popis:"€90 · GLOWS IN THE DARK"}
  ];

  var HOME = (location.pathname==='/' || location.pathname==='' || location.pathname==='/index.html');
  var PRODUCT = !HOME && !!document.querySelector('.p-detail-inner,.p-detail,.product-detail,[itemprop="offers"],.price-final,.add-to-cart-button');

  var landing=document.getElementById('landing-page'),
      shopLogo=document.getElementById('shop-logo'),
      enterBtn=document.getElementById('enter-site'),
      soon=document.getElementById('hnrd-soon');

  function setVH(){var h=(window.visualViewport&&window.visualViewport.height)?window.visualViewport.height:window.innerHeight;document.documentElement.style.setProperty('--vh',h+'px');}
  setVH(); addEventListener('resize',setVH); addEventListener('orientationchange',setVH);

  /* veľké logo nad sekciou ALL na titulke je zrušené (logo je teraz animované v navigácii) */
  function insLogo(){ if(shopLogo) shopLogo.style.display='none'; }

  /* prázdny pás */
  function makeStrip(id){
    var d=document.createElement('div'); d.className='hnrd-marq'; if(id)d.id=id;
    d.innerHTML='<div class="t"><span></span><span></span></div>';
    return d;
  }
  /* naplní pás textom tak, aby bežal plynulo bez medzery (opakuje cez celú šírku) */
  function fillStrip(el,text,secs){
    var t=el.querySelector('.t'),s1=t.children[0],s2=t.children[1],reps=1;
    s1.textContent=text;
    while(s1.offsetWidth < window.innerWidth && reps<40){reps++;s1.textContent=Array(reps+1).join(text);}
    s2.textContent=s1.textContent;
    t.style.animationDuration=(secs||26)+'s';
  }

  /* roztiahnutie pásov na presnú šírku obrazovky (bez posunu) */
  function bleed(){
    var w=document.documentElement.clientWidth;
    ['hnrd-announce','hnrdMarq','hnrdRefl','hnrdIg'].forEach(function(id){
      var el=document.getElementById(id);if(!el)return;
      el.style.marginLeft='0'; el.style.width='auto';
      var l=el.getBoundingClientRect().left;
      el.style.width=w+'px'; el.style.marginLeft=(-l)+'px';
    });
  }
  var bt; addEventListener('resize',function(){clearTimeout(bt);bt=setTimeout(bleed,120);});

  function reflective(m){
    if(document.getElementById('hnrdRefl'))return;
    var DEF=[i1,i2];
    var cards=R_KARTY.map(function(k,idx){var img=k.img||DEF[idx]||FALLBACK;return '<a class="rc" href="'+(k.link||'#')+'"><img class="g" src="'+img+'"><img class="bl" src="'+img+'" aria-hidden="true"><span class="cap"><b>'+(k.titul||'')+'</b><small>'+(k.popis||'')+'</small></span></a>';}).join('');
    var s=document.createElement('section');s.className='hnrd-refl';s.id='hnrdRefl';
    s.innerHTML='<div class="rh"><h2>'+R_NAD+'</h2><div class="m">'+R_META+'</div></div><div class="hnrd-rg">'+cards+'</div>';
    m.appendChild(s);
    s.querySelectorAll('.rc').forEach(function(rc){rc.addEventListener('mousemove',function(e){var r=rc.getBoundingClientRect();rc.style.setProperty('--mx',(e.clientX-r.left)+'px');rc.style.setProperty('--my',(e.clientY-r.top)+'px');});});
  }

  function feed(m){
    if(document.getElementById('hnrdIg'))return;
    var posts = IGP.length ? IGP : ["52_hnrd-hoodie-black-white-reflective.png","49_hnrd-hoodie-black-black-reflective.png","47_hnrd-hoodie-black-white.png","44_hnrd-hoodie-black-black.png","57_hnrd-tee-black.jpg","54_hnrd-tee-white.jpg","60_hnrd-cap-side.jpg","44_hnrd-hoodie-black-black.png"].map(function(u){return {img:CDN+u,link:IG};});
    var g=document.createElement('section');g.className='hnrd-ig';g.id='hnrdIg';
    g.innerHTML='<h2>FEED</h2><div class="hnrd-igg">'+posts.slice(0,12).map(function(p){return '<a class="igi" href="'+(p.link||IG)+'" target="_blank" rel="noopener"><img src="'+(p.img||FALLBACK)+'" loading="lazy" alt="HNRD Instagram" onerror="this.onerror=null;this.src=\''+FALLBACK+'\'"><span class="o">OPEN &#8599;</span></a>';}).join('')+'</div>';
    m.appendChild(g);
  }

  /* logo z línií v hlavičke (rovnaká animácia ako na landing page) */
  var LOGO_JS = "https://borishnrd.github.io/Borisko/hnrd-logo.js?v=2";
  function withLogo(cb){
    if(window.HNRDLogo) return cb();
    var s=document.getElementById('hnrdLogoJs');
    if(!s){ s=document.createElement('script'); s.id='hnrdLogoJs'; s.src=LOGO_JS; s.async=true; document.head.appendChild(s); }
    s.addEventListener('load',function(){ if(window.HNRDLogo) cb(); });
  }
  function navLogo(){
    var hl=document.querySelector('.header-logo img,.logo img,#logo img,header a img[src*="logo"]');
    if(!hl || document.getElementById('hnrdNav')) return;
    function go(){
      var r=hl.getBoundingClientRect(), w=Math.round(r.width)||150, h=Math.round(r.height)||56;
      var box=document.createElement('span');
      box.id='hnrdNav'; box.setAttribute('aria-label','HNRD');
      box.style.cssText='display:inline-block;vertical-align:middle;width:'+w+'px;height:'+h+'px;color:var(--ink,#000)';
      hl.parentNode.insertBefore(box,hl); hl.style.display='none';
      /* animácia z línií len pri prvej stránke v návšteve, potom rovno hotové logo */
      var first=true; try{ first=!sessionStorage.getItem('hnrdNavAnim'); sessionStorage.setItem('hnrdNavAnim','1'); }catch(e){}
      withLogo(function(){ window.HNRDLogo.mount(box,{ mini:true, animate:first, stagger:70, thin:1, speed:1.25 }); });
    }
    function start(){ if(hl.complete && hl.naturalWidth) go(); else { hl.addEventListener('load',go); setTimeout(function(){ if(!document.getElementById('hnrdNav')) go(); },1500); } }
    /* ak sa práve ukazuje landing page, logo sa poskladá až po kliknutí na ENTER (aby ho bolo vidieť) */
    var nv=performance.getEntriesByType('navigation')[0], rel=nv?nv.type==='reload':false, visited=false;
    try{ visited=!!sessionStorage.getItem('landingVisited'); }catch(e){}
    if(HOME && landing && MODE!=='lock' && enterBtn && (!visited || rel)){
      enterBtn.addEventListener('click',function(){ setTimeout(start,650); });
    } else start();
  }

  /* "Späť do obchodu" → malá šípka */
  function backBtn(){[].forEach.call(document.querySelectorAll('a,button'),function(el){if(!el.children.length&&/^\s*Späť do obchodu\s*$/i.test(el.textContent||'')){el.title='Späť do obchodu';el.textContent='←';el.style.fontSize='22px';el.style.lineHeight='1';el.style.textDecoration='none';}});}

  /* čierne odznaky — pod fotkou, nad názvom (neprekryjú produkt) */
  function badges(){
    var list=window.ODZNAKY||[]; if(!list.length)return;
    var cards=document.querySelectorAll('.p'); if(!cards.length)cards=document.querySelectorAll('.product');
    [].forEach.call(cards,function(card){
      if(card.querySelector('.hnrd-badge'))return;
      var a=card.querySelector('a[href]'); if(!a)return;
      var href=a.getAttribute('href')||'';
      for(var i=0;i<list.length;i++){
        var key=((list[i].produkt||list[i].url||'')+'').trim();
        if(key && href.indexOf(key)>-1){
          var b=document.createElement('div');b.className='hnrd-badge';b.textContent=(list[i].text||'NEW');
          var name=card.querySelector('.name,.p-name,.product-name,h3,h2');
          if(name&&name.parentNode){ name.parentNode.insertBefore(b,name); } else { card.appendChild(b); }
          if(getComputedStyle(card).position==='static')card.style.position='relative';
          break;
        }
      }
    });
  }

  /* promo pás: na PC úplne hore nad menu, na mobile v obsahu pod menu
     (aby ho fixná mobilná hlavička neprekryla) */
  function ann(){
    if(document.getElementById('hnrd-announce'))return;
    var mobile=window.innerWidth<760, parent, ref;
    if(mobile){ parent=document.querySelector('main'); if(!parent)return; ref=parent.firstChild; }
    else { parent=document.body; ref=document.body.firstChild; }
    var b=document.createElement('div');b.id='hnrd-announce';
    b.innerHTML='<div class="t"><span></span><span></span></div>';
    parent.insertBefore(b,ref);
    fillStrip(b,HORNY,RY_H);
  }

  /* zoradí veľkosti XS→XXL (detail produktu, aj dynamicky renderované) */
  var SZ=['XXS','XS','S','M','L','XL','XXL','3XL','XXXL','4XL'];
  function szN(t){return (t||'').replace(/\s+/g,'').toUpperCase();}
  function szRank(t){var i=SZ.indexOf(szN(t));return i<0?900:i;}
  function szIs(t){return SZ.indexOf(szN(t))>-1;}
  function sortSizes(root){
    var scope=(root&&root.querySelectorAll)?root:document;
    [].forEach.call(scope.querySelectorAll('select:not([data-hs])'),function(sel){
      var o=[].slice.call(sel.options);
      if(o.filter(function(x){return szIs(x.textContent);}).length>=2){sel.setAttribute('data-hs','1');o.sort(function(a,b){return szRank(a.textContent)-szRank(b.textContent);}).forEach(function(x){sel.appendChild(x);});}
    });
    [].forEach.call(scope.querySelectorAll('.parameter-values:not([data-hs]),[class*="variant"]:not([data-hs]),[class*="param"]:not([data-hs])'),function(box){
      var k=[].slice.call(box.children); if(k.length<2)return;
      var s=k.filter(function(el){return szIs(el.textContent);});
      if(s.length>=2 && s.length>=k.length-1){box.setAttribute('data-hs','1');s.sort(function(a,b){return szRank(a.textContent)-szRank(b.textContent);}).forEach(function(el){box.appendChild(el);});}
    });
  }

  /* odznak na spodku hlavnej fotky na DETAILE produktu */
  function detailBadge(){
    var list=window.DETAIL_ODZNAKY||[]; if(!list.length || document.getElementById('hnrdDbadge'))return;
    var path=decodeURIComponent(location.pathname), hit=null;
    for(var i=0;i<list.length;i++){var k=((list[i].produkt||'')+'').trim();if(k&&path.indexOf(k)>-1){hit=list[i];break;}}
    if(!hit)return;
    if(!document.querySelector('.add-to-cart-button,button[name="add"],.btn-cart'))return;
    var big=null,area=0;
    [].forEach.call(document.querySelectorAll('img'),function(im){var r=im.getBoundingClientRect();var a=r.width*r.height;if(a>area&&r.width>150){area=a;big=im;}});
    if(!big||!big.parentElement)return;
    var box=big.parentElement;
    if(getComputedStyle(box).position==='static')box.style.position='relative';
    var b=document.createElement('div');b.id='hnrdDbadge';b.className='hnrd-dbadge';b.textContent=hit.text||'';
    box.appendChild(b);
  }

  function boot(){
    navLogo(); backBtn(); ann(); badges(); sortSizes(); detailBadge();
    var m=document.querySelector('main'); if(!m) return;
    if(HOME){
      if(!document.getElementById('hnrdMarq')){ var mq=makeStrip('hnrdMarq'); m.appendChild(mq); fillStrip(mq,SPODNY,RY_S); }
      reflective(m);
      feed(m);
    }
    bleed();
  }
  if(document.readyState!=='loading') boot(); else document.addEventListener('DOMContentLoaded',boot);
  addEventListener('load',function(){setTimeout(detailBadge,300);});
  try{ new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){for(var j=0;j<ms[i].addedNodes.length;j++){var n=ms[i].addedNodes[j];if(n.nodeType===1)sortSizes(n);}}}).observe(document.documentElement,{childList:true,subtree:true}); }catch(e){}

  /* režim otvorené / zatvorené */
  if(MODE==="lock"){
    if(enterBtn) enterBtn.style.display="none";
    if(soon) soon.style.display="block";
    document.addEventListener('DOMContentLoaded',function(){document.body.classList.add('hnrd-locked');document.querySelectorAll('.siteCookies,.js-siteCookies').forEach(function(n){n.style.zIndex='1000001';});});
  } else {
    var nv=performance.getEntriesByType('navigation')[0];
    var isR=nv?nv.type==='reload':false;
    /* landing page sa ukáže pri každej novej návšteve (nové okno / karta / otvorený odkaz), počas nákupu už nie */
    var seen=false; try{ seen=!!sessionStorage.getItem('landingVisited'); }catch(e){}
    if(landing && seen && !isR){ landing.style.display='none'; insLogo(); }
    if(enterBtn) enterBtn.addEventListener('click',function(){ landing.style.opacity='0'; setTimeout(function(){ landing.style.display='none'; insLogo(); },700); try{ sessionStorage.setItem('landingVisited','true'); }catch(e){} });
  }

  /* ===== DAY / NIGHT pre celý web (fosforový nočný režim) ===== */
  var MODE_TGS=[];
  /* NIGHT_CELY_WEB = true → nočný režim na celom webe; inak len na landing page */
  var NIGHT_ALL = window.NIGHT_CELY_WEB===true;
  window.hnrdSetMode=function(m,anim){
    var de=NIGHT_ALL ? document.documentElement : landing; if(!de) return;
    de.classList.toggle('hnrd-night',m==='night');
    if(anim && m==='night'){ de.classList.remove('hnrd-charge'); void de.offsetWidth; de.classList.add('hnrd-charge'); }
    MODE_TGS.forEach(function(tg){ [].forEach.call(tg.children,function(b){ b.setAttribute('aria-pressed', b.getAttribute('data-m')===m); }); });
    try{ localStorage.setItem('hnrdMode',m); }catch(e){}
  };
  function modeToggle(parent,cls){
    var tg=document.createElement('div'); tg.className='hnrd-mode '+(cls||''); tg.setAttribute('role','group'); tg.setAttribute('aria-label','DAY / NIGHT');
    tg.innerHTML='<button type="button" data-m="day">DAY</button><button type="button" data-m="night">NIGHT</button>';
    [].forEach.call(tg.children,function(b){ b.addEventListener('click',function(){ window.hnrdSetMode(b.getAttribute('data-m'),true); }); });
    parent.appendChild(tg); MODE_TGS.push(tg);
    var m='day'; try{ m=localStorage.getItem('hnrdMode')||'day'; }catch(e){}
    window.hnrdSetMode(m,false);
    return tg;
  }
  function shopToggle(){ if(NIGHT_ALL && !document.getElementById('hnrdModeShop')){ var t=modeToggle(document.body,'hnrd-mode-shop'); t.id='hnrdModeShop'; } }
  if(document.readyState!=='loading') shopToggle(); else document.addEventListener('DOMContentLoaded',shopToggle);

  /* ===== TITULKA: tag (napíše sa a rozreže na línie) + oznámenie dropu ===== */
  var TAG_URL="https://borishnrd.github.io/Borisko/hnrd-tag.svg?v=1", HERO_JS="https://borishnrd.github.io/Borisko/hnrd-hero.js?v=2";
  function hero(){
    if(!HOME || document.getElementById('hnrdHero')) return;
    var m=document.querySelector('main'); if(!m) return;
    var O=window.OZNAM||{};
    var s=document.createElement('section'); s.className='hnrd-hero'; s.id='hnrdHero';
    s.innerHTML='<div class="hnrd-tagbox"></div>'+
      (O.vypnut?'':'<div class="hnrd-ann2">'+
        '<div class="k reveal">'+(O.male||'DROP 02')+'</div>'+
        '<div class="t reveal">'+(O.velke||'VERY SOON')+'</div>'+
        '<div class="s reveal">'+(O.popis||'STRIPED TEES ✦ GLOW-IN-THE-DARK HOODIE')+'</div>'+
        '<a class="ig reveal" href="'+(O.link||IG)+'" target="_blank" rel="noopener">'+(O.tlacidlo||'FOLLOW @HNRD.WORLDWIDE FOR INFO')+' <i>→</i></a>'+
      '</div>');
    var bar=document.getElementById('hnrd-announce');
    if(bar && bar.parentNode===m) m.insertBefore(s,bar.nextSibling); else m.insertBefore(s,m.firstChild);
    var rev=function(){ [].forEach.call(s.querySelectorAll('.reveal'),function(e,i){ setTimeout(function(){e.classList.add('in');},i*140); }); };
    function go(svgText){ window.HNRDTag.mount(s.querySelector('.hnrd-tagbox'),svgText,{lines:true,label:'HNRD',onDone:rev}); }
    function load(cb){ if(window.HNRDTag) return cb(); var sc=document.createElement('script'); sc.src=HERO_JS; sc.onload=cb; document.head.appendChild(sc); }
    function start(){ load(function(){
      if(window.HNRD_TAG_SVG) return go(window.HNRD_TAG_SVG);
      fetch(TAG_URL).then(function(r){return r.text();}).then(go).catch(rev);
    }); }
    /* ak je otvorená landing page, tag sa začne písať až po ENTER THE SHOP (aby ho zákazník videl) */
    var lp=landing && landing.style.display!=='none' && getComputedStyle(landing).display!=='none';
    if(lp && MODE!=='lock' && enterBtn) enterBtn.addEventListener('click',function(){ setTimeout(start,750); });
    else start();
  }
  if(document.readyState!=='loading') hero(); else document.addEventListener('DOMContentLoaded',hero);

  /* ===== NEW DROP / OLD DROP – sekcie produktov (nastavuje sa v Pätičke: window.NEW_DROP) ===== */
  function drops(){
    var cfg=window.NEW_DROP||{}, keys=(cfg.produkty||[]).map(function(x){return (''+x).trim();}).filter(Boolean);
    if(document.getElementById('hnrdNewDrop') || document.getElementById('hnrdOldDrop')) return;
    var ps=[].slice.call(document.querySelectorAll('.p')); if(!ps.length) return;
    /* v Shoptete je karta .p zabalená v .product a tie sú v mriežke .products */
    var wrap=function(p){ return p.closest('.product') || p; };
    var first=wrap(ps[0]), grid=ps[0].closest('.products') || first.parentNode;
    if(!grid || !grid.parentNode) return;
    function head(id,txt){ var h=document.createElement('div'); h.id=id; h.className='hnrd-drop-h'; h.innerHTML='<h2>'+txt+'</h2>'; return h; }
    if(!keys.length){   /* nový drop ešte nie je v obchode → len nadpis nad súčasnými produktmi (napr. DROP 01) */
      if(HOME && window.OLD_DROP_NADPIS) grid.parentNode.insertBefore(head('hnrdOldDrop',window.OLD_DROP_NADPIS),grid);
      return;
    }
    var isNew=function(p){ var a=p.querySelector('a[href]'), h=a?a.getAttribute('href')||'':''; return keys.some(function(k){return h.indexOf(k)>-1;}); };
    var news=ps.filter(isNew).map(wrap); if(!news.length) return;
    var g2=grid.cloneNode(false); g2.removeAttribute('id');
    news.forEach(function(c){ g2.appendChild(c); });
    grid.parentNode.insertBefore(head('hnrdNewDrop',cfg.nadpis||'NEW DROP'),grid);
    grid.parentNode.insertBefore(g2,grid);
    if(grid.querySelector('.p')) grid.parentNode.insertBefore(head('hnrdOldDrop',window.OLD_DROP_NADPIS||'OLD DROP'),grid);
  }
  if(document.readyState!=='loading') drops(); else document.addEventListener('DOMContentLoaded',drops);

  /* ===== nová landing page: logo z línií namiesto 3D modelu ===== */
  function landingIntro(){
    if(!landing || landing.style.display==='none' || document.getElementById('hnrd-landing-logo')) return;
    var host=document.getElementById('hnrd-landing');
    if(!host){ host=document.createElement('div'); host.id='hnrd-landing'; landing.insertBefore(host,landing.firstChild); }
    var im=landing.querySelector('.hnrd-im'); if(im) im.style.display='none';
    var box=document.createElement('div'); box.id='hnrd-landing-logo'; host.appendChild(box);
    var intro=landing.querySelector('.hnrd-intro')||landing;
    modeToggle(intro,'hnrd-mode-landing');   /* DAY / NIGHT prepínač – pod INSTAGRAM */
    withLogo(function(){
      window.HNRDLogo.mount(box,{
        enterText: MODE==='lock' ? '' : (window.LANDING_TEXT || 'Enter the shop'),
        size: 0.7,
        belowSpace: MODE==='lock' ? 280 : 150,
        onLayout: function(L){ if(intro) intro.style.top=Math.round(L.below+(MODE==='lock'?28:0))+'px'; },
        onEnter: function(){ if(enterBtn) enterBtn.click(); }
      });
    });
  }
  if(document.readyState!=='loading') landingIntro(); else document.addEventListener('DOMContentLoaded',landingIntro);
})();
