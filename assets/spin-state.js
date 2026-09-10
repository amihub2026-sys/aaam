(function(root){
 'use strict';
 const fresh=()=>({used:0,awards:[],selected:null,greeted:false});
 function normalize(raw){
  if(!raw||!Number.isInteger(raw.used)||raw.used<0||!Array.isArray(raw.awards))return fresh();
  return {used:raw.used,awards:raw.awards.filter(a=>a&&typeof a.id==='string'&&typeof a.label==='string'&&Number.isFinite(a.earnedAt)),selected:raw.selected||null,greeted:!!raw.greeted};
 }
 function available(a,config,now){return !config.offerValidDays||now-a.earnedAt<config.offerValidDays*86400000;}
 function selected(state,config,now=Date.now()){return state.awards.find(a=>a.awardId===state.selected&&available(a,config,now))||null;}
 function award(state,config,now=Date.now()){
  const max=Math.max(0,Math.floor(Number(config.maxSpins)||0));
  if(state.used>=max)throw new Error('Spin limit reached');
  if(!config.resultSequence.length)throw new Error('No results configured');
  const id=config.resultSequence[state.used%config.resultSequence.length];
  const prize=config.prizes.find(p=>p.id===id);if(!prize)throw new Error('Unknown configured prize');
  const result={...prize,awardId:config.campaignId+'-'+(state.used+1),earnedAt:now};
  const next={...state,used:state.used+1,awards:[...state.awards,result]};
  if(!selected(next,config,now))next.selected=result.awardId;
  return {state:next,result};
 }
 const api={fresh,normalize,available,selected,award};
 if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.AAAM_SPIN_STATE=api;
})(typeof window!=='undefined'?window:globalThis);
