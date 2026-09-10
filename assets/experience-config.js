/* OWNER SETTINGS — replace all demo offers and social links before launch. */
window.AAAM_EXPERIENCE = {
 campaignId: 'aaam-preview-september-v2', // Change only to intentionally reset everyone's browser spins.
 maxSpins: 2,
 offerValidDays: null, // null = no expiry, or enter a number of days.
 whatsapp: '918524952495',
 greeting: 'Your celebration deserves a little surprise!',
 greetingText: 'Spin the wheel and discover an offer for your next event.',
 terms: 'Demo offer. Subject to confirmation by AAAM Events. One offer per enquiry; offers cannot be combined.',
 socials: {instagram:'https://www.instagram.com/aaamevents7/',facebook:'https://www.facebook.com/',youtube:'https://www.youtube.com/'},
 prizes: [
  {id:'discount40',label:'40% OFF',message:'40% discount on your event enquiry',percent:40,color:'#ffd761'},
  {id:'welcome',label:'FREE WELCOME BOARD',message:'Free welcome board for your celebration',percent:0,color:'#ff8ab7'},
  {id:'discount10',label:'10% OFF',message:'10% discount on your event enquiry',percent:10,color:'#6ce3d3'},
  {id:'decor',label:'DECOR SURPRISE',message:'A complimentary decor surprise',percent:0,color:'#b8a5ff'},
  {id:'discount20',label:'20% OFF',message:'20% discount on your event enquiry',percent:20,color:'#ffab69'},
  {id:'photo',label:'PHOTO SURPRISE',message:'A photography add-on, subject to confirmation',percent:0,color:'#80c9ff'}
 ],
 resultSequence: ['discount40','welcome'] // First spin, second spin; repeats if maxSpins is larger.
};
