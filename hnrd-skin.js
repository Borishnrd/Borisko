/* HNRD WORLDWIDE — skin logika (mechanika). NETREBA upravovať.
   Texty, posty, farbu pozadia a režim obchodu nastavuješ v SHOPTETE
   (pole Pätička, hore). Tento súbor len číta tie hodnoty. */

(function(){
  var GLB = "https://borishnrd.github.io/Borisko/hnrd.glb";
  var IG  = "https://www.instagram.com/hnrd.worldwide/";
  var CDN = "https://cdn.myshoptet.com/usr/www.hnrdworldwide.com/user/shop/big/";
  var MODE = (typeof window.SHOP_MODE!=="undefined") ? window.SHOP_MODE : "live";
  var HORNY = window.HORNY_PAS || "DOPRAVA ZDARMA NAD 100 € ✦ LIMITED DROP ✦ SK / CZ ✦ @hnrd.worldwide";
  var SPODNY = window.SPODNY_PAS || "HNRD WORLDWIDE ✦ @hnrd.worldwide ✦ LIMITED DROP ✦ REFLEXNÁ VÝŠIVKA ✦ ";
  var IGP = window.IG_POSTS || [];
  if(window.FARBA_POZADIA) document.documentElement.style.setProperty('--bg', window.FARBA_POZADIA);
  var HOME = (location.pathname==='/' || location.pathname==='' || location.pathname==='/index.html');
  var FALLBACK = "https://cdn.myshoptet.com/usr/www.hnrdworldwide.com/user/shop/big/52_hnrd-hoodie-black-white-reflective.png";
  // záložné fotky do feedu, ak IG_POSTS je prázdny
  var FEED = ["52_hnrd-hoodie-black-white-reflective.png","49_hnrd-hoodie-black-black-reflective.png","47_hnrd-hoodie-black-white.png","44_hnrd-hoodie-black-black.png","57_hnrd-tee-black.jpg","54_hnrd-tee-white.jpg","60_hnrd-cap-side.jpg","47_hnrd-hoodie-black-white.png"];

  var landing=document.getElementById('landing-page'),
      shopLogo=document.getElementById('shop-logo'),
      enterBtn=document.getElementById('enter-site'),
      soon=document.getElementById('hnrd-soon');

  function setVH(){var h=(window.visualViewport&&window.visualViewport.height)?window.visualViewport.height:window.innerHeight;document.documentElement.style.setProperty('--vh',h+'px');}
  setVH(); addEventListener('resize',setVH); addEventListener('orientationchange',setVH);

  function insLogo(){if(!HOME)return;var m=document.querySelector('main');if(m&&shopLogo){shopLogo.style.display='block';m.insertBefore(shopLogo,m.firstChild);}}

  /* Announce pás — hore, cez skript */
  function ann(){if(document.getElementById('hnrd-announce'))return;var b=document.createElement('div');b.id='hnrd-announce';var s=HORNY;b.innerHTML='<div class="t"><span>'+s+'</span><span>'+s+'</span></div>';document.body.insertBefore(b,document.body.firstChild);}

  /* Roztiahnutie pásov na presnú šírku obrazovky (bez posunu, aj s posuvníkom) */
  function bleed(){
    var w=document.documentElement.clientWidth;
    ['hnrdMarq','hnrdRefl','hnrdIg'].forEach(function(id){
      var el=document.getElementById(id);if(!el)return;
      el.style.marginLeft='0'; el.style.width='auto';
      var l=el.getBoundingClientRect().left;
      el.style.width=w+'px'; el.style.marginLeft=(-l)+'px';
    });
  }
  var bt; addEventListener('resize',function(){clearTimeout(bt);bt=setTimeout(bleed,120);});

  function sections(){
    var m=document.querySelector('main'); if(!m) return;
    if(!document.getElementById('hnrdMarq')){
      var mq=document.createElement('div');mq.className='hnrd-marq';mq.id='hnrdMarq';
      var t=SPODNY;
      mq.innerHTML='<div class="t"><span>'+t+t+'</span><span>'+t+t+'</span></div>';
      m.appendChild(mq);
    }
    if(HOME && !document.getElementById('hnrdRefl')){
      var i1=CDN+"52_hnrd-hoodie-black-white-reflective-zoom.jpg?ff=1&x=1024&y=768&q=85&ts=69ab399a&sg=161563f2";
      var i2=CDN+"49_hnrd-hoodie-black-black-reflective-zoom.jpg?ff=1&x=1024&y=768&q=85&ts=69ab391e&sg=161563f2";
      var s=document.createElement('section');s.className='hnrd-refl';s.id='hnrdRefl';
      s.innerHTML='<div class="rh"><h2>REFLECTIVE</h2><div class="m">SERIES 02<br>GLOWS IN THE DARK</div></div><div class="hnrd-rg"><a class="rc" href="/hoodie-hnrd-white-reflective/"><img class="g" src="'+i1+'"><img class="bl" src="'+i1+'" aria-hidden="true"><span class="cap"><b>WHITE / REFLECTIVE</b><small>€90 · GLOWS IN THE DARK</small></span></a><a class="rc" href="/hoodie-hnrd-black-reflective/"><img class="g" src="'+i2+'"><img class="bl" src="'+i2+'" aria-hidden="true"><span class="cap"><b>BLACK / REFLECTIVE</b><small>€90 · GLOWS IN THE DARK</small></span></a></div>';
      m.appendChild(s);
      s.querySelectorAll('.rc').forEach(function(rc){rc.addEventListener('mousemove',function(e){var r=rc.getBoundingClientRect();rc.style.setProperty('--mx',(e.clientX-r.left)+'px');rc.style.setProperty('--my',(e.clientY-r.top)+'px');});});
    }
    if(HOME && !document.getElementById('hnrdIg')){
      var posts = IGP.length ? IGP : FEED.map(function(u){return {img:CDN+u,link:IG};});
      var g=document.createElement('section');g.className='hnrd-ig';g.id='hnrdIg';
      g.innerHTML='<h2>FEED</h2><div class="hnrd-igg">'+posts.slice(0,8).map(function(p){return '<a class="igi" href="'+(p.link||IG)+'" target="_blank" rel="noopener"><img src="'+(p.img||FALLBACK)+'" loading="lazy" alt="HNRD Instagram" onerror="this.onerror=null;this.src=\''+FALLBACK+'\'"><span class="o">OPEN &#8599;</span></a>';}).join('')+'</div>';
      m.appendChild(g);
    }
    bleed();
  }

  /* Točiace 3D logo v hlavičke — len na titulnej */
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

  /* "Späť do obchodu" → malá šípka bez textu */
  function backBtn(){[].forEach.call(document.querySelectorAll('a,button'),function(el){if(!el.children.length&&/^\s*Späť do obchodu\s*$/i.test(el.textContent||'')){el.title='Späť do obchodu';el.textContent='←';el.style.fontSize='22px';el.style.lineHeight='1';el.style.textDecoration='none';}});}

  function boot(){ ann(); sections(); navLogo(); backBtn(); }
  if(document.readyState!=='loading') boot(); else document.addEventListener('DOMContentLoaded',boot);

  /* Režim otvorené / zatvorené */
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
