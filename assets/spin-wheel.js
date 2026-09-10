(()=>{
 'use strict';
 const config=window.AAAM_EXPERIENCE,core=window.AAAM_SPIN_STATE;if(!config||!core)return;
 const script=document.currentScript;const bookingURL=new URL('../booking.html',script.src).href;
 const key='aaam-spin:'+config.campaignId;let storageOK=true,state=core.fresh(),busy=false,rotation=0;
 try{localStorage.setItem(key+':test','1');localStorage.removeItem(key+':test');}catch(e){storageOK=false;}
 function read(){try{return core.normalize(JSON.parse(localStorage.getItem(key)));}catch(e){return state;}}
 function save(next){if(!storageOK)throw new Error('Browser storage is unavailable');localStorage.setItem(key,JSON.stringify(next));state=next;}
 state=read();
 const root=document.createElement('div');root.className='spin-widget';
 root.innerHTML=`<button class="spin-launch" type="button" aria-haspopup="dialog">🎁 <span>Spin & Win</span></button>
 <aside class="spin-greeting" hidden aria-label="An event surprise"><button class="spin-dismiss" aria-label="Close greeting" type="button">×</button><span class="spin-gift" aria-hidden="true">🎁</span><strong></strong><p></p><button class="spin-greeting-cta" type="button">Discover my offer →</button></aside>
 <dialog class="spin-dialog" aria-labelledby="spin-title"><button class="spin-close" type="button" aria-label="Close spin wheel">×</button><p class="spin-eyebrow">A LITTLE EXTRA FOR YOUR CELEBRATION</p><h2 id="spin-title">Spin. Smile. Celebrate.</h2><p class="spin-intro">Discover your event offer, then bring your celebration to life.</p>
 <div class="spin-wheel-wrap"><span class="spin-pointer" aria-hidden="true">▼</span><canvas width="640" height="640" class="spin-canvas" role="img" aria-label="Event offer wheel"></canvas><span class="spin-hub" aria-hidden="true">AAAM</span></div>
 <p class="spin-count"></p><button class="spin-action" type="button">Spin the wheel</button><p class="spin-result" role="status" aria-live="polite"></p><div class="spin-awards"></div><a class="spin-plan" href="${bookingURL}">Use my offer · Plan Your Event →</a><a class="spin-claim" target="_blank" rel="noopener noreferrer">Claim on WhatsApp</a><p class="spin-terms"></p></dialog>`;
 document.body.append(root);
 const $=s=>root.querySelector(s),dialog=$('.spin-dialog'),canvas=$('.spin-canvas'),ctx=canvas.getContext('2d');
 $('.spin-greeting strong').textContent=config.greeting;$('.spin-greeting p').textContent=config.greetingText;$('.spin-terms').textContent=config.terms;
 function draw(){const n=config.prizes.length;if(!n)return;config.prizes.forEach((p,i)=>{const a=-Math.PI/2+i*Math.PI*2/n,b=a+Math.PI*2/n;ctx.beginPath();ctx.moveTo(320,320);ctx.arc(320,320,305,a,b);ctx.closePath();ctx.fillStyle=p.color;ctx.fill();ctx.strokeStyle='#06285e';ctx.lineWidth=5;ctx.stroke();ctx.save();ctx.translate(320,320);ctx.rotate((a+b)/2);ctx.fillStyle='#06285e';ctx.textAlign='center';ctx.font='bold 23px sans-serif';const words=p.label.split(' ');let lines=[],line='';words.forEach(w=>{if((line+' '+w).trim().length>13){lines.push(line);line=w;}else line=(line+' '+w).trim();});lines.push(line);lines.forEach((l,j)=>ctx.fillText(l,195,(j-(lines.length-1)/2)*29,190));ctx.restore();});}
 draw();
 function selectionUI(container){container.replaceChildren();const valid=state.awards.filter(a=>core.available(a,config,Date.now()));if(!valid.length)return;const title=document.createElement('p');title.textContent='Choose one offer for your enquiry';container.append(title);valid.forEach(a=>{const label=document.createElement('label'),input=document.createElement('input'),text=document.createElement('span');input.type='radio';input.name=container=== $('.spin-awards')?'wheel-offer':'booking-offer';input.value=a.awardId;input.checked=state.selected===a.awardId;text.textContent=a.message;input.addEventListener('change',()=>{try{save({...read(),selected:a.awardId});render();}catch(e){$('.spin-result').textContent='Please enable browser storage to save your offer.';}});label.append(input,text);container.append(label);});}
 function message(){const offer=core.selected(state,config);return offer?`Spin offer: ${offer.message}\nOffer reference: ${offer.awardId}\n${config.terms}`:'Spin offer: None selected';}
 window.AAAMSpin={getOffer:()=>core.selected(read(),config),enquiryText:()=>{state=read();return message();},open:()=>open()};
 function render(){
  const remaining=Math.max(0,Math.floor(config.maxSpins)-state.used);$('.spin-count').textContent=storageOK?`${remaining} of ${config.maxSpins} spins remaining in this browser`:'Enable browser storage to use and keep your offer.';
  $('.spin-action').disabled=busy||!remaining||!storageOK||!config.prizes.length;$('.spin-action').textContent=busy?'Spinning…':remaining?'Spin the wheel':'All spins used';
  selectionUI($('.spin-awards'));const offer=core.selected(state,config);$('.spin-plan').hidden=!offer;$('.spin-claim').hidden=!offer;
  if(offer)$('.spin-claim').href=`https://wa.me/${config.whatsapp}?text=${encodeURIComponent('Hello AAAM Events! I would like to claim my event offer.\n'+message())}`;
  if(!busy&&!remaining)$('.spin-result').textContent='Your spins for this campaign are saved in this browser. Choose an offer below.';else if(!busy&&!state.used)$('.spin-result').textContent=`Your ${config.maxSpins} spins are ready. Tap the button to begin.`;
  const panel=document.querySelector('[data-booking-offer]');if(panel){panel.querySelector('[data-offer-summary]').textContent=offer?`${offer.label} — applied to this enquiry. Final pricing will be confirmed by AAAM Events.`:'Have a celebration in mind? Spin to discover an event offer.';selectionUI(panel.querySelector('[data-offer-options]'));}
 }
 function dismiss(){ $('.spin-greeting').hidden=true;try{save({...read(),greeted:true});}catch(e){} }
 function open(){dismiss();state=read();render();if(!dialog.open)dialog.showModal();dialog.scrollTop=0;}
 $('.spin-launch').addEventListener('click',open);$('.spin-greeting-cta').addEventListener('click',open);$('.spin-dismiss').addEventListener('click',dismiss);$('.spin-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target===dialog){const b=dialog.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)dialog.close();}});
 $('.spin-action').addEventListener('click',async()=>{
  if(busy)return;busy=true;render();
  const run=()=>{state=read();const next=core.award(state,config);save(next.state);return next.result;};
  try{
   const result=navigator.locks?await navigator.locks.request(key,run):run();
   const index=config.prizes.findIndex(p=>p.id===result.id),target=(360-(index+.5)*360/config.prizes.length)%360;
   rotation+=360*5+((target-rotation%360+360)%360);
   const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;canvas.style.transition=reduced?'none':'transform 4s cubic-bezier(.16,.75,.16,1)';canvas.style.transform=`rotate(${rotation}deg)`;
   $('.spin-result').textContent='Finding your celebration surprise…';
   setTimeout(()=>{busy=false;$('.spin-result').textContent=`You received ${result.label}! Choose your offer below.`;render();},reduced?0:4100);
  }catch(e){busy=false;$('.spin-result').textContent=e.message;render();}
 });
 document.querySelector('[data-booking-spin]')?.addEventListener('click',open);
 window.addEventListener('storage',e=>{if(e.key===key){state=read();render();}});
 render();if(!state.greeted&&state.used<config.maxSpins&&storageOK)setTimeout(()=>{$('.spin-greeting').hidden=false;try{save({...read(),greeted:true});}catch(e){}},1800);
})();
