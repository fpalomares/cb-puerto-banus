const config = window.SITE_CONFIG || {};
let hasAffiliateLinks = false;
document.querySelectorAll('[data-amazon]').forEach(link => {
  const custom = config.amazonLinks?.[link.dataset.amazon];
  const url = new URL(custom || link.href);
  if (url.protocol !== 'https:' || !['amazon.es', 'www.amazon.es', 'amzn.to'].includes(url.hostname)) return;
  if (config.amazonTag && url.hostname !== 'amzn.to') url.searchParams.set('tag', config.amazonTag);
  link.href = url.href;
  if (url.searchParams.has('tag') || (custom && url.hostname === 'amzn.to')) {
    hasAffiliateLinks = true;
    link.rel = 'sponsored noopener noreferrer';
  }
});
if (hasAffiliateLinks) {
  document.querySelector('#commerce-note').textContent = 'Enlaces de afiliado. En calidad de Afiliado de Amazon, obtengo ingresos por las compras adscritas que cumplen los requisitos aplicables. Esta guía no indica el material que utiliza el equipo.';
  document.querySelector('#affiliate-disclosure').textContent = 'En calidad de Afiliado de Amazon, obtengo ingresos por las compras adscritas que cumplen los requisitos aplicables. Los precios, disponibilidad y condiciones se consultan directamente en Amazon. No se venden productos en esta web.';
}
document.querySelector('.legal-toggle').addEventListener('click', event => {
  const expanded = event.currentTarget.getAttribute('aria-expanded') === 'true';
  event.currentTarget.setAttribute('aria-expanded', String(!expanded));
  document.querySelector('#legal').hidden = expanded;
});

const newsCards = [...document.querySelectorAll('.news[data-category]')];
let activeFilter = 'Todas';
let visibleCount = 6;
const moreButton = document.querySelector('.gallery-more');
function renderGallery() {
 const matches = newsCards.filter(card => activeFilter === 'Todas' || card.dataset.category === activeFilter);
 newsCards.forEach(card => { card.hidden = !matches.slice(0,visibleCount).includes(card); });
 moreButton.hidden = matches.length <= visibleCount;
 document.querySelector('.gallery-count').textContent = Math.min(visibleCount,matches.length) + ' de ' + matches.length + ' publicaciones';
}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 activeFilter = button.dataset.filter; visibleCount = 6;
 document.querySelectorAll('[data-filter]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
 renderGallery();
}));
moreButton.addEventListener('click',()=>{visibleCount+=6;renderGallery();});
renderGallery();
const imageDialog=document.querySelector('.image-dialog');
document.querySelectorAll('[data-image]').forEach(button=>button.addEventListener('click',()=>{
 const img=imageDialog.querySelector('img'); img.src=button.dataset.image;img.alt=button.dataset.title;
 document.querySelector('#image-caption').textContent=button.dataset.title;imageDialog.showModal();
}));
imageDialog.querySelector('.image-close').addEventListener('click',()=>imageDialog.close());
imageDialog.addEventListener('click',event=>{if(event.target===imageDialog)imageDialog.close();});
