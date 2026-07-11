// PoC hover-preview: op hover speelt een korte scroll-video van de demo af
// ("de start van navigeren op de pagina"). Leidt de slug af uit de bestaande
// /images/poc/<slug>.jpeg thumbnail, legt er een <video> over, en speelt/pauzeert
// op mouseenter/leave. Faalt stil als de mp4 (nog) niet bestaat. Dependency-vrij.
(function () {
  function init() {
    var imgs = document.querySelectorAll('a img[src*="/images/poc/"]');
    imgs.forEach(function (img) {
      var m = /\/images\/poc\/([a-z0-9-]+)\.(jpe?g|png|webp)/i.exec(img.getAttribute('src') || '');
      if (!m) return;
      var slug = m[1];
      var box = img.parentElement;                 // de overflow-hidden wrapper
      if (!box || box.querySelector('video.poc-hv')) return;
      if (getComputedStyle(box).position === 'static') box.style.position = 'relative';

      var v = document.createElement('video');
      v.className = 'poc-hv';
      v.muted = true; v.loop = true; v.defaultMuted = true;
      v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); v.setAttribute('preload', 'none');
      v.src = '/videos/poc/' + slug + '.mp4';
      v.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:top;opacity:0;transition:opacity .35s ease;pointer-events:none;background:#0b1220;';
      // val stil terug op de thumbnail als de video niet laadt
      v.addEventListener('error', function () { v.remove(); });
      box.appendChild(v);

      var card = img.closest('a') || box;
      var playing = false;
      card.addEventListener('mouseenter', function () {
        if (!v.parentNode) return;
        try { v.currentTime = 0; } catch (e) {}
        var p = v.play();
        if (p && p.catch) p.catch(function () {});
        v.style.opacity = '1'; playing = true;
      });
      card.addEventListener('mouseleave', function () {
        v.style.opacity = '0';
        if (playing) { try { v.pause(); } catch (e) {} playing = false; }
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
