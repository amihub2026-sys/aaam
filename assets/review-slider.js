(()=>{
 const root=document.querySelector('.home-review-carousel');if(!root)return;
 const slides=[...root.querySelectorAll('.home-review-slide')],pause=root.querySelector('[data-review-pause]'),count=root.querySelector('[data-review-count]');
 let index=0,userPaused=matchMedia('(prefers-reduced-motion: reduce)').matches,hovered=false,timer;
 function render(){slides.forEach((s,i)=>{s.hidden=i!==index;});count.textContent=`${index+1} / ${slides.length}`;}
 function schedule(){clearInterval(timer);pause.textContent=userPaused?'▶':'Ⅱ';pause.setAttribute('aria-label',userPaused?'Play automatic reviews':'Pause automatic reviews');if(!userPaused&&!hovered&&!document.hidden)timer=setInterval(()=>{index=(index+1)%slides.length;render();},6000);}
 root.querySelector('[data-review-prev]').addEventListener('click',()=>{index=(index+slides.length-1)%slides.length;render();schedule();});
 root.querySelector('[data-review-next]').addEventListener('click',()=>{index=(index+1)%slides.length;render();schedule();});
 pause.addEventListener('click',()=>{userPaused=!userPaused;schedule();});
 root.addEventListener('pointerenter',()=>{hovered=true;schedule();});root.addEventListener('pointerleave',()=>{hovered=false;schedule();});
 root.addEventListener('focusin',()=>{hovered=true;schedule();});root.addEventListener('focusout',e=>{if(!root.contains(e.relatedTarget)){hovered=false;schedule();}});document.addEventListener('visibilitychange',schedule);
 render();schedule();
})();
