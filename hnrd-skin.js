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

  function insLogo(){if(!HOME)return;var m=document.querySelector('main');if(m&&shopLogo){shopLogo.style.display='block';var bar=document.getElementById('hnrd-announce');if(bar&&bar.parentNode===m){m.insertBefore(shopLogo,bar.nextSibling);}else{m.insertBefore(shopLogo,m.firstChild);}}}

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
    g.innerHTML='<h2>FEED</h2><div class="hnrd-igg">'+posts.slice(0,8).map(function(p){return '<a class="igi" href="'+(p.link||IG)+'" target="_blank" rel="noopener"><img src="'+(p.img||FALLBACK)+'" loading="lazy" alt="HNRD Instagram" onerror="this.onerror=null;this.src=\''+FALLBACK+'\'"><span class="o">OPEN &#8599;</span></a>';}).join('')+'</div>';
    m.appendChild(g);
  }

  /* točiace 3D logo v hlavičke */
  function navLogo(){
    var hl=document.querySelector('.header-logo img,.logo img,#logo img,header a img[src*="logo"]');
    if(!hl || document.getElementById('hnrdNav')) return;
    var w=hl.offsetWidth||150, h=hl.offsetHeight||56;
    var mv=document.createElement('model-viewer');
    mv.id='hnrdNav'; mv.setAttribute('src',GLB);
    mv.setAttribute('auto-rotate',''); mv.setAttribute('auto-rotate-delay','0');
    mv.setAttribute('rotation-per-second','40deg'); mv.setAttribute('interaction-prompt','none');
    mv.setAttribute('disable-zoom',''); mv.setAttribute('loading','eager');
    mv.setAttribute('camera-orbit','0deg 82deg auto');
    mv.style.cssText='width:'+w+'px;height:'+h+'px;background:transparent;pointer-events:none';
    hl.style.display='none'; hl.parentNode.insertBefore(mv,hl);
  }

  /* "Späť do obchodu" → malá šípka */
  function backBtn(){[].forEach.call(document.querySelectorAll('a,button'),function(el){if(!el.children.length&&/^\s*Späť do obchodu\s*$/i.test(el.textContent||'')){el.title='Späť do obchodu';el.textContent='←';el.style.fontSize='22px';el.style.lineHeight='1';el.style.textDecoration='none';}});}

  /* čierne odznaky na kartách vybraných produktov (podľa URL) */
  function badges(){
    var list=window.ODZNAKY||[]; if(!list.length)return;
    [].forEach.call(document.querySelectorAll('.p,.product'),function(card){
      if(card.querySelector('.hnrd-badge'))return;
      var a=card.querySelector('a[href]'); if(!a)return;
      var href=a.getAttribute('href')||'';
      for(var i=0;i<list.length;i++){
        var key=((list[i].produkt||list[i].url||'')+'').trim();
        if(key && href.indexOf(key)>-1){
          if(getComputedStyle(card).position==='static')card.style.position='relative';
          var b=document.createElement('span');b.className='hnrd-badge';b.textContent=(list[i].text||'NEW');
          card.appendChild(b); break;
        }
      }
    });
  }

  /* tenký promo pás navrchu obsahu (pod menu) — viditeľný hneď aj na mobile */
  function ann(){
    var m=document.querySelector('main'); if(!m||document.getElementById('hnrd-announce'))return;
    var b=document.createElement('div');b.id='hnrd-announce';
    b.innerHTML='<div class="t"><span></span><span></span></div>';
    m.insertBefore(b,m.firstChild);
    fillStrip(b,HORNY,RY_H);
  }

  function boot(){
    navLogo(); backBtn(); ann(); badges();
    var m=document.querySelector('main'); if(!m) return;
    if(HOME){
      if(!document.getElementById('hnrdMarq')){ var mq=makeStrip('hnrdMarq'); m.appendChild(mq); fillStrip(mq,SPODNY,RY_S); }
      reflective(m);
      feed(m);
    }
    bleed();
  }
  if(document.readyState!=='loading') boot(); else document.addEventListener('DOMContentLoaded',boot);

  /* režim otvorené / zatvorené */
  if(MODE==="lock"){
    if(enterBtn) enterBtn.style.display="none";
    if(soon) soon.style.display="block";
    document.addEventListener('DOMContentLoaded',function(){document.body.classList.add('hnrd-locked');document.querySelectorAll('.siteCookies,.js-siteCookies').forEach(function(n){n.style.zIndex='1000001';});});
  } else {
    var nv=performance.getEntriesByType('navigation')[0];
    var isR=nv?nv.type==='reload':false;
    if(landing && localStorage.getItem('landingVisited') && !isR){ landing.style.display='none'; insLogo(); }
    if(enterBtn) enterBtn.addEventListener('click',function(){ landing.style.opacity='0'; setTimeout(function(){ landing.style.display='none'; insLogo(); },700); localStorage.setItem('landingVisited','true'); });
  }
})();
