/* HNRD WORLDWIDE — tag na titulke: napíše sa ako tag (pero + sprej). Klik = napíše sa znova. */
(function(){
  if (window.HNRDTag) return;
  var css=document.createElement('style');
  css.textContent=
   '.hnrd-hero{position:relative;padding:clamp(22px,5vw,56px) 16px clamp(10px,2vw,20px);text-align:center;color:var(--ink,#000)}'+
   '.hnrd-tag{display:block;width:min(88vw,760px);margin:0 auto;overflow:visible;cursor:pointer}'+
   '.hnrd-tag .o{fill:none;stroke:currentColor;stroke-width:.55;stroke-linejoin:round}'+
   '.hnrd-tag .f{fill:currentColor}'+
   '.hnrd-ann2{display:flex;flex-direction:column;align-items:center;gap:10px;margin:clamp(18px,3vw,30px) auto 0;max-width:640px}'+
   '.hnrd-ann2 .k{font-family:"JetBrains Mono",ui-monospace,monospace;font-size:11px;letter-spacing:.38em;opacity:.6}'+
   '.hnrd-ann2 .t{font-family:Anton,sans-serif;font-size:clamp(40px,9vw,92px);line-height:.88;letter-spacing:.01em;text-transform:uppercase;position:relative}'+
   '.hnrd-ann2 .t span{display:block}'+
   '.hnrd-ann2 .s{font-family:"JetBrains Mono",ui-monospace,monospace;font-size:12px;letter-spacing:.22em;text-transform:uppercase}'+
   '.hnrd-ann2 .ig{margin-top:8px;display:inline-flex;align-items:center;gap:10px;padding:14px 24px;border-radius:40px;background:var(--ink,#000);color:#f7f5f1!important;text-decoration:none!important;font:700 12px/1 "JetBrains Mono",ui-monospace,monospace;letter-spacing:.2em;transition:letter-spacing .3s,transform .3s}'+
   '.hnrd-ann2 .ig:hover{letter-spacing:.28em}'+
   '.hnrd-ann2 .ig i{font-style:normal;transition:transform .3s}.hnrd-ann2 .ig:hover i{transform:translateX(4px)}'+
   /* pásy cez "VERY SOON" – rovnaká línia ako logo */
   '.hnrd-ann2 .t.striped{-webkit-mask-image:repeating-linear-gradient(180deg,#000 0 calc(var(--b,14px) - var(--g,0px)),transparent calc(var(--b,14px) - var(--g,0px)) var(--b,14px));mask-image:repeating-linear-gradient(180deg,#000 0 calc(var(--b,14px) - var(--g,0px)),transparent calc(var(--b,14px) - var(--g,0px)) var(--b,14px));transition:--g .8s}'+
   '.hnrd-ann2 .reveal{opacity:0;transform:translateY(14px);transition:opacity .7s cubic-bezier(.2,.8,.2,1),transform .7s cubic-bezier(.2,.8,.2,1)}'+
   '.hnrd-ann2 .reveal.in{opacity:1;transform:none}';
  document.head.appendChild(css);

  var ns='http://www.w3.org/2000/svg';
  function el(n,a){var e=document.createElementNS(ns,n);for(var k in a)e.setAttribute(k,a[k]);return e;}
  function ease(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;}
  function outExpo(t){return t===1?1:1-Math.pow(2,-10*t);}
  function anim(dur,fn,done){var t0=performance.now();(function f(n){var p=Math.min(1,(n-t0)/dur);fn(p);if(p<1)requestAnimationFrame(f);else if(done)done();})(t0);}

  /* svgText = obsah SVG súboru tagu · opts.lines = po napísaní sa na moment rozreže na línie a spojí späť · opts.bands = počet línií */
  function mount(box, svgText, opts){
    opts=opts||{};
    var src=new DOMParser().parseFromString(svgText,'image/svg+xml').documentElement;
    var vb=(src.getAttribute('viewBox')||'0 0 100 100').split(/[\s,]+/).map(Number), W=vb[2], H=vb[3];
    var paths=[].map.call(src.querySelectorAll('path'),function(p){return {d:p.getAttribute('d'),t:p.getAttribute('transform')||''};});
    var id='hnrdT'+Math.random().toString(36).slice(2,7), N=opts.bands||7;
    var svg=el('svg',{viewBox:vb.join(' '),class:'hnrd-tag',role:'img','aria-label':opts.label||'HNRD'});
    var defs=el('defs',{}); svg.appendChild(defs);
    var shape=el('g',{id:id+'s'}); paths.forEach(function(p){shape.appendChild(el('path',{d:p.d,transform:p.t}));}); defs.appendChild(shape);
    /* 1) obrys */
    var out=el('g',{class:'o'}); paths.forEach(function(p){out.appendChild(el('path',{d:p.d,transform:p.t,pathLength:1,'stroke-dasharray':'1 1','stroke-dashoffset':'1'}));});
    /* 2) výplň cez masku "sprejom" (cik-cak ťah zľava doprava) */
    var mk=el('mask',{id:id+'m',maskUnits:'userSpaceOnUse',x:vb[0]-10,y:vb[1]-10,width:W+20,height:H+20});
    var pts=[],x=vb[0]-6,up=true,step=W/46; while(x<vb[0]+W+8){pts.push(x.toFixed(1)+' '+(up?vb[1]-6:vb[1]+H+6).toFixed(1));x+=step;up=!up;}
    var brush=el('path',{d:'M'+pts.join(' L'),fill:'none',stroke:'#fff','stroke-width':step*1.9,'stroke-linecap':'round','stroke-linejoin':'round',pathLength:1,'stroke-dasharray':'1 1','stroke-dashoffset':'1'});
    mk.appendChild(brush); defs.appendChild(mk);
    var fill=el('g',{class:'f',mask:'url(#'+id+'m)'}); fill.appendChild(el('use',{href:'#'+id+'s'}));
    /* variant B: po napísaní sa tag rozreže na N vodorovných línií (ako logo) */
    var bands=el('g',{class:'f'}); bands.style.display='none'; var B=[];
    for(var i=0;i<N;i++){
      var cp=el('clipPath',{id:id+'c'+i,clipPathUnits:'userSpaceOnUse'}); var r=el('rect',{x:vb[0]-W,y:vb[1]+H*i/N,width:W*3,height:H/N}); cp.appendChild(r); defs.appendChild(cp);
      var gg=el('g',{'clip-path':'url(#'+id+'c'+i+')'}); var u=el('use',{href:'#'+id+'s'}); gg.appendChild(u); bands.appendChild(gg); B.push({r:r,u:u,y0:vb[1]+H*i/N});
    }
    var gapMax=H/N*(opts.gap||0.22);
    function setBands(gp,sh){ B.forEach(function(b,i){ b.r.setAttribute('y',b.y0+gp/2-0.4); b.r.setAttribute('height',Math.max(0,H/N-gp+0.8));   /* +0.8 prekrytie = žiadne tenké čiarky medzi pásmi */ b.u.setAttribute('transform','translate('+((i%2?1:-1)*sh*(1+Math.abs(i-(N-1)/2)*.35)).toFixed(2)+' 0)'); }); }
    /* línie len na moment: tag sa rozreže, pásy sa posunú do strán a potom sa zase spoja do celého tagu */
    function toLines(done){
      fill.style.display='none'; bands.style.display=''; setBands(0,0);
      anim(330,function(p){var e=outExpo(p); setBands(gapMax*e, W*0.012*e);},function(){
        setTimeout(function(){
          anim(495,function(p){var e=ease(p); setBands(gapMax*(1-e), W*0.012*(1-e));},function(){
            bands.style.display='none'; fill.style.display=''; if(done)done();
          });
        },160);
      });
    }
    svg.append(fill,bands,out); box.appendChild(svg);
    var busy=false;
    function play(){
      if(busy) return; busy=true;
      var os=out.querySelectorAll('path');
      out.style.transition='none'; out.style.opacity=1;
      os.forEach(function(p){p.setAttribute('stroke-dashoffset','1');}); brush.setAttribute('stroke-dashoffset','1');
      fill.style.display=''; bands.style.display='none';
      /* pero (obrys) ide mierne popredu, sprej (výplň) hneď za ním – ako keď sa tag píše */
      anim(1420,function(p){var e=ease(p);os.forEach(function(q){q.setAttribute('stroke-dashoffset',(1-e).toFixed(4));});});
      setTimeout(function(){ anim(1420,function(p){brush.setAttribute('stroke-dashoffset',(1-ease(p)).toFixed(4));},function(){
        out.style.transition='opacity .6s'; out.style.opacity=0;
        var fin=function(){ busy=false; if(opts.onDone)opts.onDone(); };
        if(opts.lines) setTimeout(function(){ toLines(fin); },180); else fin();
      }); },250);
    }
    svg.addEventListener('click',play);
    if(matchMedia('(prefers-reduced-motion: reduce)').matches){ brush.setAttribute('stroke-dashoffset','0'); out.style.opacity=0; if(opts.onDone)opts.onDone(); }
    else if('IntersectionObserver' in window){ var io=new IntersectionObserver(function(es){ if(es[0].isIntersecting){ io.disconnect(); play(); } },{threshold:.2}); io.observe(svg); }
    else play();
    return {play:play};
  }
  window.HNRDTag={mount:mount};
})();
