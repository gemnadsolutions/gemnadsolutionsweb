const q=(s,c=document)=>c.querySelector(s),qa=(s,c=document)=>[...c.querySelectorAll(s)],clamp=(n,min,max)=>Math.max(min,Math.min(n,max)),lerp=(a,b,t)=>a+(b-a)*t;
const nav=q('#nav');addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>40),{passive:true});
const glow=q('#cursorGlow');addEventListener('pointermove',e=>{if(glow){glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'}qa('[data-speed]').forEach(el=>{const s=parseFloat(el.dataset.speed||0);el.style.transform=`translate(${(e.clientX-innerWidth/2)*s}px,${(e.clientY-innerHeight/2)*s}px)`})});
qa('.magnetic').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=e.clientX-(r.left+r.width/2),y=e.clientY-(r.top+r.height/2);el.style.transform=`translate(${x*.08}px,${y*.08}px)`});el.addEventListener('pointerleave',()=>el.style.transform='')});
const transition=q('#transition'),invisible=q('.invisible-word'),found=q('.found-word');
function updateTransition(){if(!transition)return;const r=transition.getBoundingClientRect(),p=clamp((-r.top)/(r.height-innerHeight),0,1);invisible.style.opacity=1-clamp((p-.18)/.36,0,1);invisible.style.transform=`scale(${1+p*.55}) translateY(${-p*35}px)`;found.style.opacity=clamp((p-.42)/.3,0,1);found.style.transform=`scale(${lerp(.68,1,clamp((p-.42)/.45,0,1))})`}
addEventListener('scroll',updateTransition,{passive:true});updateTransition();
const growth=q('#growth'),nodes=qa('.growth-node'),gp=q('#growthProgress'),story=q('#growthStory');
const stories=[['01','BUILD THE FOUNDATION.','Brand identity, websites and digital infrastructure built to explain, build trust and guide customers toward action.'],['02','CONNECT THE BUSINESS.','Strengthen local presence, Google Business Profile signals and the touchpoints customers use before they even reach your website.'],['03','BECOME DISCOVERABLE.','Combine SEO with Answer Engine Optimization so both search engines and AI systems can understand and recommend the business.'],['04','COMMUNICATE WITH PURPOSE.','Strategy, content, social media and advertising working as one system instead of random posting.'],['05','AUTOMATE THE REPETITION.','AI chat agents, lead qualification, follow-ups, appointment flows, internal assistants and reporting automation.'],['06','MEASURE. LEARN. IMPROVE.','Analytics closes the loop: review what works, fix what does not and continuously improve the entire digital ecosystem.']];
function updateGrowth(){if(!growth)return;const r=growth.getBoundingClientRect(),max=r.height-innerHeight,p=clamp((-r.top)/max,0,1),step=Math.min(5,Math.floor(p*6));nodes.forEach((n,i)=>n.classList.toggle('active',i<=step));if(innerWidth<=850){gp.style.height=(p*100)+'%';gp.style.width='100%'}else{gp.style.width=(p*100)+'%';gp.style.height='100%'}const s=stories[step];story.innerHTML=`<span>${s[0]}</span><h3>${s[1]}</h3><p>${s[2]}</p>`}
addEventListener('scroll',updateGrowth,{passive:true});addEventListener('resize',updateGrowth);updateGrowth();
const work=q('.work'),rail=q('.work-rail'),workProgress=q('#workProgress');
function updateRail(){
  if(!work||!rail)return;
  const r=work.getBoundingClientRect();
  const scrollable=Math.max(1,r.height-innerHeight);
  const p=clamp((-r.top)/scrollable,0,1);

  // Account for the rail's left/right page padding so the final card fully reaches view.
  const total=Math.max(0,rail.scrollWidth-innerWidth);
  rail.style.transform=`translate3d(${-total*p}px,0,0)`;

  if(workProgress) workProgress.style.width=(p*100)+'%';
}
addEventListener('scroll',updateRail,{passive:true});
addEventListener('resize',updateRail);
updateRail();
const rotateWords=['TRUST.','EXPERIENCES.','CONVERSIONS.','GROWTH.'];let rw=0;setInterval(()=>{rw=(rw+1)%rotateWords.length;const el=q('#rotatingWord');if(el){el.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{duration:450});el.textContent=rotateWords[rw]}},1800);
const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting||entry.target.dataset.done)return;entry.target.dataset.done='1';const end=+entry.target.dataset.count,t0=performance.now(),dur=1600;const tick=now=>{const p=clamp((now-t0)/dur,0,1),val=Math.floor(end*(1-Math.pow(1-p,3)));entry.target.textContent=end>=1000000?(val/1000000).toFixed(1)+'M+':end>=1000?Math.round(val/1000)+'K+':val;if(p<1)requestAnimationFrame(tick)};requestAnimationFrame(tick)}),{threshold:.4});qa('[data-count]').forEach(c=>io.observe(c));
const revealObs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.animate([{opacity:.15,transform:'translateY(30px)'},{opacity:1,transform:'none'}],{duration:800,easing:'cubic-bezier(.2,.8,.2,1)',fill:'forwards'});revealObs.unobserve(e.target)}}),{threshold:.12});qa('.division-card,.project,.search-panel,.metric,.workflow,.results-preview,.clients-preview').forEach(el=>revealObs.observe(el));



/* --- GSAP bulb hero scroll animation --- */
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.set(".bulb-off-image", {opacity: 1, scale: 1, y: 0});
  gsap.set(".bulb-on-image", {opacity: 0, scale: 0.96, y: 20});
  gsap.set(".bulb-glow", {opacity: 0, scale: 0.75});
  gsap.set(".ring-one", {rotation: 0, opacity: 0.18});
  gsap.set(".ring-two", {rotation: 0, opacity: 0.12});
  gsap.set(".bulb-word-left", {opacity: 0, x: 18});
  gsap.set(".bulb-word-right", {opacity: 0, x: -18});

  const bulbStage = document.getElementById("bulbStage");

  const bulbTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".bulb-hero",
      start: "top top",
      end: "bottom bottom",
      scrub: 1.1,
      onUpdate: (self) => {
        if (bulbStage) {
          bulbStage.classList.toggle("text-lit", self.progress > 0.42);
        }
      }
    }
  });

  // First scene = OFF. Scroll down = ON.
  bulbTimeline
    .to(".bulb-off-image", {
      opacity: 0,
      scale: 0.96,
      y: -6,
      duration: 0.42,
      ease: "none"
    }, 0.18)
    .to(".bulb-on-image", {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.48,
      ease: "none"
    }, 0.30)
    .to(".bulb-glow", {
      opacity: 1,
      scale: 1.15,
      duration: 0.46,
      ease: "none"
    }, 0.32)
    .to(".ring-one", {
      rotation: 180,
      opacity: 0.48,
      duration: 0.7,
      ease: "none"
    }, 0.14)
    .to(".ring-two", {
      rotation: -150,
      opacity: 0.28,
      duration: 0.7,
      ease: "none"
    }, 0.14)
    .to(".bulb-word-left", {
      opacity: 1,
      x: 0,
      duration: 0.34,
      ease: "none"
    }, 0.44)
    .to(".bulb-word-right", {
      opacity: 1,
      x: 0,
      duration: 0.34,
      ease: "none"
    }, 0.44);

  
  if (bulbStage) {
    bulbStage.addEventListener("pointermove", (e) => {
      const r = bulbStage.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / r.width;
      const y = (e.clientY - (r.top + r.height / 2)) / r.height;

      gsap.to(".bulb-off-image, .bulb-on-image", {
        x: x * 16,
        y: y * 16,
        rotationY: x * 8,
        rotationX: -y * 8,
        duration: 0.45,
        ease: "power2.out"
      });
      gsap.to(".bulb-glow", {
        x: x * 24,
        y: y * 18,
        duration: 0.45,
        ease: "power2.out"
      });
    });

    bulbStage.addEventListener("pointerleave", () => {
      gsap.to(".bulb-off-image, .bulb-on-image", {
        x: 0,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        duration: 0.55,
        ease: "power2.out"
      });
      gsap.to(".bulb-glow", {
        x: 0,
        y: 0,
        duration: 0.55,
        ease: "power2.out"
      });
    });
  }
}


/* --- Web sample slider --- */
const webSlidesTrack = q('#webSlides');
const webDots = qa('.web-dot');
let webSlideIndex = 0;
let webSlideTimer = null;

function renderWebSlider(index){
  if(!webSlidesTrack || !webDots.length) return;
  webSlideIndex = (index + webDots.length) % webDots.length;
  webSlidesTrack.style.transform = `translateX(-${webSlideIndex * 100}%)`;
  webDots.forEach((dot, i) => dot.classList.toggle('active', i === webSlideIndex));
}

function startWebSlider(){
  if(!webSlidesTrack || webDots.length < 2) return;
  if(webSlideTimer) clearInterval(webSlideTimer);
  webSlideTimer = setInterval(() => renderWebSlider(webSlideIndex + 1), 3200);
}

webDots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    renderWebSlider(i);
    startWebSlider();
  });
});

renderWebSlider(0);
startWebSlider();


/* ==========================================================
   Branding PDF — GSAP-style scroll-driven vertical parallax
   ========================================================== */
const brandingPdfStage = q('#brandingPdfStage');
const brandingPdfFrame = q('#brandingPdfFrame');
const brandingPdfTrack = q('#brandingPdfTrack');
const brandingPdfProgress = q('#brandingPdfProgress');
const brandingPdfPage = q('#brandingPdfPage');

function getBrandingPdfTravel(){
  if(!brandingPdfFrame || !brandingPdfTrack) return 0;
  return Math.max(0, brandingPdfTrack.scrollHeight - brandingPdfFrame.clientHeight);
}

function renderBrandingPdfState(progress){
  const p = clamp(progress,0,1);
  if(brandingPdfProgress) brandingPdfProgress.style.width = `${p*100}%`;

  if(brandingPdfPage){
    const page = Math.min(13, Math.max(1, Math.floor(p * 12.999) + 1));
    brandingPdfPage.textContent = String(page).padStart(2,'0');
  }
}

function updateBrandingPdfFallback(){
  if(!brandingPdfStage || !brandingPdfTrack) return;
  const r = brandingPdfStage.getBoundingClientRect();
  const scrollable = Math.max(1, brandingPdfStage.offsetHeight - innerHeight);
  const progress = clamp((-r.top) / scrollable,0,1);
  const travel = getBrandingPdfTravel();
  brandingPdfTrack.style.transform = `translate3d(0,${-travel*progress}px,0)`;
  renderBrandingPdfState(progress);
}

if(window.gsap && window.ScrollTrigger && brandingPdfStage && brandingPdfTrack && brandingPdfFrame){
  gsap.registerPlugin(ScrollTrigger);

  const brandingPdfTween = gsap.to(brandingPdfTrack,{
    y: () => -getBrandingPdfTravel(),
    ease:'none',
    paused:true
  });

  ScrollTrigger.create({
    trigger:brandingPdfStage,
    start:'top top',
    end:'bottom bottom',
    scrub:1.05,
    animation:brandingPdfTween,
    invalidateOnRefresh:true,
    onUpdate:self => renderBrandingPdfState(self.progress)
  });

  addEventListener('resize',()=>ScrollTrigger.refresh());
  renderBrandingPdfState(0);
}else{
  addEventListener('scroll',updateBrandingPdfFallback,{passive:true});
  addEventListener('resize',updateBrandingPdfFallback);
  updateBrandingPdfFallback();
}


/* ==========================================================
   SECOND HERO — animated search typing sequence
   ========================================================== */
const heroSearchQuery = q('#heroSearchQuery');
const heroSearchTitle = q('#heroSearchTitle');
const heroSearchMeta = q('#heroSearchMeta');
const heroSearchResult = q('#heroSearchResult');
const heroSearchStatus = q('#heroSearchStatus');
const heroSearchStatusWrap = q('.search-demo-status');

const heroSearchItems = [
  {
    query:'Digital marketing company',
    title:'Gemnad Solutions',
    meta:'Digital Marketing × Creative × Technology'
  },
  {
    query:'Studio in Kiribathgoda',
    title:'Gemnad Studio',
    meta:'Photography × Videography × Studio Production'
  },
  {
    query:'Best Restaurant in Monaragala',
    title:'Elaine Forest View',
    meta:'Restaurant × Hotel × Monaragala'
  },
  {
    query:'Epoxy flooring company',
    title:'Fourcle',
    meta:'Epoxy Flooring × Engineering Solutions'
  }
];

let heroSearchItemIndex = 0;
let heroSearchCharIndex = 0;
let heroSearchDeleting = false;
let heroSearchTimer = null;

function setHeroSearchFound(found){
  if(heroSearchResult) heroSearchResult.classList.toggle('is-found',found);
  if(heroSearchStatusWrap) heroSearchStatusWrap.classList.toggle('is-found',found);
  if(heroSearchStatus) heroSearchStatus.textContent = found ? 'Result found' : 'Searching...';
}

function runHeroSearchAnimation(){
  if(!heroSearchQuery) return;

  const item = heroSearchItems[heroSearchItemIndex];

  if(!heroSearchDeleting){
    heroSearchCharIndex++;
    heroSearchQuery.textContent = item.query.slice(0,heroSearchCharIndex);

    if(heroSearchCharIndex >= item.query.length){
      if(heroSearchTitle) heroSearchTitle.textContent = item.title;
      if(heroSearchMeta) heroSearchMeta.textContent = item.meta;
      setHeroSearchFound(true);

      heroSearchTimer = setTimeout(()=>{
        heroSearchDeleting = true;
        setHeroSearchFound(false);
        runHeroSearchAnimation();
      },1500);
      return;
    }

    heroSearchTimer = setTimeout(runHeroSearchAnimation,78);
  }else{
    heroSearchCharIndex--;
    heroSearchQuery.textContent = item.query.slice(0,Math.max(0,heroSearchCharIndex));

    if(heroSearchCharIndex <= 0){
      heroSearchDeleting = false;
      heroSearchItemIndex = (heroSearchItemIndex + 1) % heroSearchItems.length;
      heroSearchTimer = setTimeout(runHeroSearchAnimation,420);
      return;
    }

    heroSearchTimer = setTimeout(runHeroSearchAnimation,38);
  }
}

if(heroSearchQuery){
  setHeroSearchFound(false);
  setTimeout(runHeroSearchAnimation,700);
}
