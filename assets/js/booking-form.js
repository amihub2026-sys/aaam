const $=(s)=>document.querySelector(s), $$=(s)=>[...document.querySelectorAll(s)];
function checkedServices(){return $$('input[name="service"]:checked').map(x=>x.value)}
function refresh(){
 const type=$('input[name="event"]:checked')?.value||'Not selected';
 const house=document.getElementById('bookingHousewarming');if(house){house.hidden=type!=='Housewarming';house.querySelectorAll('input').forEach(i=>{i.disabled=house.hidden;if(house.hidden)i.checked=false;});}
 const guests=$('#guests')?.value||'—'; const date=$('#date')?.value||'—'; const services=checkedServices();
 $('#eventOut').textContent=type; $('#guestOut').textContent=guests; $('#dateOut').textContent=date;
 $('#serviceCount').textContent=services.length; $('#selectedOut').innerHTML=services.length?services.map(s=>`<span class="booking-selected-chip">${s}</span>`).join(''):'<span class="booking-muted">No services selected yet.</span>';
}
$$('input').forEach(x=>x.addEventListener('change',refresh)); $('#guests')?.addEventListener('input',refresh);
$$('.booking-select-all').forEach(btn=>btn.addEventListener('click',()=>{const box=btn.closest('.booking-service-group');const items=[...box.querySelectorAll('input[name="service"]')];const all=items.every(i=>i.checked);items.forEach(i=>i.checked=!all);refresh()}));
$('#clearPlan')?.addEventListener('click',()=>{$$('input[name="service"]').forEach(i=>i.checked=false);refresh()});
$('#sendWhatsApp')?.addEventListener('click',()=>{
 const type=$('input[name="event"]:checked')?.value||'Not selected'; const services=checkedServices();
 const lines=[`AAAM EVENTS - CUSTOM EVENT REQUEST`,``,`Name: ${$('#name').value||'-'}`,`Phone: ${$('#phone').value||'-'}`,`Event: ${type}`,`Date: ${$('#date').value||'-'}`,`Guests: ${$('#guests').value||'-'}`,`Venue/Area: ${$('#venue').value||'-'}`,`Budget: ${$('#budget').value||'-'}`,``,`Selected Services (${services.length}):`,...(services.length?services.map((s,i)=>`${i+1}. ${s}`):['None']),``,`Special requirements: ${$('#notes').value||'-'}`];
 lines.push('', window.AAAMSpin?.enquiryText() || 'Spin offer: None selected');
 window.open(`https://wa.me/${window.AAAM_EXPERIENCE?.whatsapp || '918524952495'}?text=${encodeURIComponent(lines.join('\n'))}`,'_blank');
});
const requested=new URLSearchParams(location.search).get('event');if(requested){const option=$$('input[name=event]').find(i=>i.value.toLowerCase()===requested.toLowerCase());if(option)option.checked=true;}
refresh();
