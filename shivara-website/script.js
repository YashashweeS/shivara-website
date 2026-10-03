window.addEventListener('load',()=>{
  setTimeout(()=>{
    const l=document.querySelector('#loader');
    l.style.opacity='0'; l.style.transform='scale(1.035)';
    setTimeout(()=>l.remove(),850)
  },2200)
});
const menu=document.querySelector('#menuBtn'),nav=document.querySelector('#nav');
menu.onclick=()=>nav.classList.toggle('open');
nav.querySelectorAll('a').forEach(a=>a.onclick=()=>nav.classList.remove('open'));
document.querySelectorAll('section h2,.cat,.story-copy>p,.gallery figure,.visit-card,.details,.manifesto p').forEach(x=>x.classList.add('reveal'));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.1,rootMargin:'0px 0px -40px'});
document.querySelectorAll('.reveal').forEach(x=>io.observe(x));
const pop=document.querySelector('#popup');
if(!sessionStorage.getItem('shivaraPopup')) setTimeout(()=>pop.classList.add('show'),7000);
document.querySelector('#closePopup').onclick=()=>{pop.classList.remove('show');sessionStorage.setItem('shivaraPopup','1')};
window.addEventListener('scroll',()=>{
 const y=window.scrollY;
 const hero=document.querySelector('.hero-media img');
 if(hero && y<innerHeight) hero.style.transform=`scale(${1.03+y/8000}) translateY(${y*.055}px)`;
},{passive:true});

// V4 image lightbox: collection and lookbook images open for a closer look.
const lightbox=document.querySelector('#lightbox');
const lightboxImage=document.querySelector('#lightboxImage');
const lightboxClose=document.querySelector('#lightboxClose');
const zoomTargets=document.querySelectorAll('.cat img,.gallery figure img,.showroom-gallery img');
function openLightbox(img){
  lightboxImage.src=img.currentSrc||img.src;
  lightboxImage.alt=img.alt||'Shivara look';
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden','false');
  document.body.classList.add('lightbox-open');
}
function closeLightbox(){
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden','true');
  document.body.classList.remove('lightbox-open');
  setTimeout(()=>{if(!lightbox.classList.contains('open')) lightboxImage.src='';},350);
}
zoomTargets.forEach(img=>{
  img.setAttribute('tabindex','0');
  img.setAttribute('role','button');
  img.setAttribute('aria-label',`${img.alt||'Shivara look'} — open larger image`);
  img.addEventListener('click',e=>{e.stopPropagation();openLightbox(img)});
  img.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openLightbox(img)}});
});
lightboxClose.addEventListener('click',closeLightbox);
lightbox.addEventListener('click',e=>{if(e.target===lightbox) closeLightbox()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&lightbox.classList.contains('open')) closeLightbox()});
