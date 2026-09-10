(()=>{
 const video=document.getElementById('homeCaptureVideo'),frame=document.getElementById('homeCaptureFrame'),controls=document.querySelector('.home-capture-controls'),canvas=document.getElementById('homeCapturedFrame'),capture=document.getElementById('homeCaptureNow'),again=document.getElementById('homeCaptureAgain'),download=document.getElementById('homeDownloadCapture'),status=document.getElementById('homeCaptureStatus');let blobURL; const preview=document.querySelector('.home-photo-preview');
 const play=()=>video.play().catch(()=>{video.controls=true;status.textContent='Tap play on the film, then capture your moment.';});
 document.getElementById('homeOpenFrame').addEventListener('click',()=>{frame.classList.add('home-frame-open');controls.hidden=false;play();frame.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});capture.focus({preventScroll:true});});
 capture.addEventListener('click',()=>{
  if(video.readyState<2||!video.videoWidth){status.textContent='The film is loading. Please try capture in a moment.';return;}
  canvas.width=video.videoWidth;canvas.height=video.videoHeight;canvas.getContext('2d').drawImage(video,0,0);canvas.hidden=false;preview.hidden=false;capture.hidden=false;again.hidden=true;play();
  const flash=frame.querySelector('.home-capture-flash');flash.classList.remove('home-flash-fire');void flash.offsetWidth;flash.classList.add('home-flash-fire');status.textContent='Your moment is captured! Save it or capture another.';
  try{canvas.toBlob(blob=>{if(!blob)return;if(blobURL)URL.revokeObjectURL(blobURL);blobURL=URL.createObjectURL(blob);download.href=blobURL;download.hidden=false;},'image/png');}catch(e){status.textContent='Your moment is captured. Keep watching to capture another.';}
 });
 again.addEventListener('click',()=>{canvas.hidden=true;preview.hidden=true;capture.hidden=false;again.hidden=true;download.hidden=true;status.textContent='Frame ready. Capture your next moment.';play();});
 document.getElementById('homeCloseFrame').addEventListener('click',()=>{controls.hidden=true;frame.classList.remove('home-frame-open');canvas.hidden=true;preview.hidden=true;capture.hidden=false;again.hidden=true;download.hidden=true;play();document.getElementById('homeOpenFrame').focus();});
 window.addEventListener('pagehide',()=>{if(blobURL)URL.revokeObjectURL(blobURL);});
})();
