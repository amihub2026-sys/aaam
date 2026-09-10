/* OWNER SETTINGS — replace all demo offers and social links before launch. */
window.AAAM_EXPERIENCE = {
  campaignId: "aaam-preview-september-v2", // Change only to intentionally reset everyone's browser spins.
  maxSpins: 2,
  offerValidDays: null, // null = no expiry, or enter a number of days.
  whatsapp: "918524952495",
greeting: "Your celebration deserves something special!",
greetingText: "Spin the wheel and unlock an exclusive offer for your upcoming event.",
terms:
  "Offer valid for eligible event bookings and subject to availability. Final offer value will be confirmed by AAAM Events at the time of booking. One promotional offer may be applied per enquiry and cannot be combined with other offers.",
  socials: {
    instagram: "https://www.instagram.com/aaamevents7/",
    facebook: "https://www.facebook.com/",
    youtube: 'https://youtube.com/@aaamevents?si=UAEsnsRTx_iUTnoR',
  },
  prizes: [
    {
      id: "discount40",
      label: "40% OFF",
      message: "Enjoy up to 40% off on your eligible event booking",
      percent: 40,
      color: "#ffd761",
    },
    {
      id: "welcome",
      label: "FREE WELCOME BOARD",
      message: "Complimentary welcome board for your celebration",
      percent: 0,
      color: "#ff8ab7",
    },
    {
      id: "discount10",
      label: "10% OFF",
     message: "Enjoy 10% off on your eligible event booking",
      percent: 10,
      color: "#6ce3d3",
    },
    {
      id: "decor",
      label: "DECOR SURPRISE",
      message: "Receive a complimentary décor surprise for your celebration",
      percent: 0,
      color: "#b8a5ff",
    },
    {
      id: "discount20",
      label: "20% OFF",
      message: "Enjoy 20% off on your eligible event booking",
      percent: 20,
      color: "#ffab69",
    },
    {
      id: "photo",
      label: "PHOTO SURPRISE",
      message: "Receive a complimentary photography add-on, subject to availability",
      percent: 0,
      color: "#80c9ff",
    },
  ],
  resultSequence: ["discount40", "welcome"], // First spin, second spin; repeats if maxSpins is larger.
};
