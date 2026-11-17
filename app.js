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
  document.querySelector('#commerce-note').textContent = 'Enlaces de afiliado: las compras realizadas a través de estos enlaces pueden generar una comisión. Esta guía no indica el material que utiliza el equipo.';
  document.querySelector('#affiliate-disclosure').textContent = 'En calidad de Afiliado de Amazon, obtengo ingresos por las compras adscritas que cumplen los requisitos aplicables. Los precios, disponibilidad y condiciones se consultan directamente en Amazon. No se venden productos en esta web.';
}
document.querySelector('.legal-toggle').addEventListener('click', event => {
  const expanded = event.currentTarget.getAttribute('aria-expanded') === 'true';
  event.currentTarget.setAttribute('aria-expanded', String(!expanded));
  document.querySelector('#legal').hidden = expanded;
});
