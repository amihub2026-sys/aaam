/* Edit social destinations in experience-config.js. */
document.querySelectorAll('[data-social]').forEach(link=>{const url=window.AAAM_EXPERIENCE.socials[link.dataset.social];if(url){link.href=url;link.hidden=false;}});
