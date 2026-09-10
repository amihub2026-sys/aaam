const header = document.querySelector('.site-header');
const menu = document.querySelector('.menu-btn');
const links = document.querySelector('.nav-links');
function updateHeader(){header?.classList.toggle('scrolled',window.scrollY>30);}
window.addEventListener('scroll', updateHeader, {passive:true});updateHeader();
function setMenu(open){
 links?.classList.toggle('open',open);
 menu?.setAttribute('aria-expanded',String(open));
 menu?.setAttribute('aria-label',open?'Close menu':'Open menu');
 if(!open) document.querySelectorAll('.nav-drop.open').forEach(el=>{el.classList.remove('open');el.querySelector('button')?.setAttribute('aria-expanded','false');});
}
if(links) links.id='main-navigation';
menu?.setAttribute('aria-controls','main-navigation');setMenu(false);
menu?.addEventListener('click',()=>setMenu(!links?.classList.contains('open')));
links?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
document.querySelectorAll('.drop-toggle').forEach(button=>{
 button.setAttribute('aria-expanded','false');
 button.addEventListener('click',()=>{
  const drop=button.closest('.nav-drop');const open=!drop.classList.contains('open');
  document.querySelectorAll('.nav-drop').forEach(el=>{el.classList.remove('open');el.querySelector('button')?.setAttribute('aria-expanded','false');});
  drop.classList.toggle('open',open);button.setAttribute('aria-expanded',String(open));
 });
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){setMenu(false);menu?.focus();}});
document.addEventListener('click',e=>{if(header&&!header.contains(e.target))setMenu(false);});
window.matchMedia('(max-width:980px)').addEventListener('change',()=>setMenu(false));
