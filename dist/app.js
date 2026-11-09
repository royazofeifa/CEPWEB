const menu=document.querySelector('.menu'),nav=document.querySelector('.navlinks');
// Photography stays usable without JavaScript; rotation respects motion preferences.
const hero=document.querySelector('.hero-media[aria-roledescription="carrusel"]');
if(hero){
  const slides=[...hero.querySelectorAll('.hero-slide')],dots=[...hero.querySelectorAll('[data-go]')],pause=hero.querySelector('.hero-pause'),motion=matchMedia('(prefers-reduced-motion: reduce)'),mobile=matchMedia('(max-width: 760px)');
  let index=0,stopped=motion.matches,hovered=false,focused=false,inView=true,timer;
  function show(next){index=(next+slides.length)%slides.length;slides.forEach((s,i)=>{s.hidden=i!==index});dots.forEach((d,i)=>d.setAttribute('aria-pressed',String(i===index)))}
  function schedule(){clearInterval(timer);hero.classList.toggle('is-paused',stopped||hovered||focused||document.hidden||!inView);if(!stopped&&!hovered&&!focused&&!document.hidden&&inView)timer=setInterval(()=>show(index+1),mobile.matches?3000:5500)}
  function label(){pause.innerHTML=stopped?'Reanudar fotos <span aria-hidden="true">▶</span>':'Pausar fotos <span aria-hidden="true">Ⅱ</span>';pause.setAttribute('aria-pressed',String(stopped));schedule()}
  pause.addEventListener('click',()=>{stopped=!stopped;label()});
  dots.forEach(d=>d.addEventListener('click',()=>{show(Number(d.dataset.go));schedule()}));
  hero.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){hovered=true;schedule()}});hero.addEventListener('pointerleave',()=>{hovered=false;schedule()});
  hero.addEventListener('focusin',()=>{focused=true;schedule()});hero.addEventListener('focusout',e=>{if(!hero.contains(e.relatedTarget)){focused=false;schedule()}});
  mobile.addEventListener('change',schedule);document.addEventListener('visibilitychange',schedule);motion.addEventListener('change',e=>{stopped=e.matches;label()});
  new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;schedule()},{threshold:.15}).observe(hero);
  label();
}
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');nav.classList.toggle('open',open)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('open')){menu.click();menu.focus()}});
const videos=[...document.querySelectorAll('.activity-video')];
const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
let paused=motionPreference.matches;
const toggle=document.getElementById('toggle-videos');
const videoVisibility=new Map();
function syncToggle(){if(toggle){toggle.textContent=paused?'Reanudar videos':'Pausar videos';toggle.setAttribute('aria-pressed',String(paused))}}
function silence(video){video.defaultMuted=true;video.muted=true;video.volume=0;video.playsInline=true}
function shouldPlay(video){return !paused&&!document.hidden&&!video.closest('.video-card').hidden&&videoVisibility.get(video)===true}
function updateVideo(video){
  const button=video.parentElement.querySelector('.video-start');
  silence(video);
  if(!shouldPlay(video)){video.pause();button.hidden=true;return}
  const play=video.play();
  if(play)play.catch(()=>{if(shouldPlay(video))button.hidden=false});
}
function setPlayerState(){videos.forEach(updateVideo)}
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{videoVisibility.set(entry.target,entry.isIntersecting&&entry.intersectionRatio>=.15);updateVideo(entry.target)})},{threshold:[0,.15,.5]});
videos.forEach(video=>{
  silence(video);observer.observe(video);
  const button=video.parentElement.querySelector('.video-start');
  video.addEventListener('volumechange',()=>{if(!video.muted||video.volume!==0)silence(video)});
  video.addEventListener('playing',()=>{button.hidden=true;video.dataset.playing='true';if(!shouldPlay(video))video.pause()});
  video.addEventListener('pause',()=>video.dataset.playing='false');
  video.addEventListener('loadeddata',()=>updateVideo(video));
  video.addEventListener('error',()=>{button.hidden=false;button.textContent='Video no disponible · Ver en Facebook';button.dataset.failed='true'});
  button.addEventListener('click',()=>{if(button.dataset.failed==='true'){video.closest('.video-card').querySelector('.video-bottom a').click();return}paused=false;syncToggle();updateVideo(video)});
});
toggle?.addEventListener('click',()=>{paused=!paused;syncToggle();setPlayerState()});
document.addEventListener('visibilitychange',setPlayerState);
window.addEventListener('pageshow',setPlayerState);
document.addEventListener('pointerup',()=>{if(!paused)videos.filter(v=>v.paused&&shouldPlay(v)).forEach(updateVideo)},{passive:true});
motionPreference.addEventListener('change',event=>{paused=event.matches;syncToggle();setPlayerState()});
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.querySelectorAll('.video-card').forEach(card=>card.hidden=button.dataset.filter!=='Todas'&&card.dataset.category!==button.dataset.filter);setPlayerState()}));
syncToggle();

const level=document.getElementById('level');if(level){const q=new URLSearchParams(location.search).get('nivel');if([...level.options].some(o=>o.value===q))level.value=q}
document.getElementById('contact-form')?.addEventListener('submit',e=>{e.preventDefault();const f=e.currentTarget;if(!f.reportValidity())return;const text='Hola, soy '+f.elements.name.value.trim()+'. Me interesa '+f.elements.level.value+'. '+f.elements.message.value.trim();const url='https://wa.me/50627772211?text='+encodeURIComponent(text);const status=document.getElementById('form-status');status.replaceChildren(document.createTextNode('Tu consulta está preparada. '));const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener';a.textContent='Continuar en WhatsApp ↗';a.className='textlink';status.append(a)});
