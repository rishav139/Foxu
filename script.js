(function () {
  var rail = document.querySelector('.rail');
  if (!rail) return;

  // Arrow buttons step one card at a time.
  document.querySelectorAll('.arrow').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card = rail.querySelector('.card');
      var step = card ? card.getBoundingClientRect().width + 22 : 300;
      rail.scrollBy({ left: step * Number(btn.dataset.dir), behavior: 'smooth' });
    });
  });

  // Mouse drag to scroll on desktop. Touch keeps native swiping.
  var startX = 0;
  var startScroll = 0;
  var dragged = false;
  var active = false;

  rail.addEventListener('pointerdown', function (e) {
    if (e.pointerType !== 'mouse') return;
    active = true;
    dragged = false;
    startX = e.clientX;
    startScroll = rail.scrollLeft;
  });

  window.addEventListener('pointermove', function (e) {
    if (!active) return;
    var dx = e.clientX - startX;
    if (!dragged && Math.abs(dx) > 5) {
      dragged = true;
      rail.classList.add('dragging');
    }
    if (dragged) rail.scrollLeft = startScroll - dx;
  });

  window.addEventListener('pointerup', function () {
    if (!active) return;
    active = false;
    if (dragged) {
      rail.classList.remove('dragging');
    }
  });

  // Keyboard: left and right arrows scroll the rail when it has focus.
  rail.addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    var card = rail.querySelector('.card');
    var step = card ? card.getBoundingClientRect().width + 22 : 300;
    rail.scrollBy({ left: e.key === 'ArrowRight' ? step : -step, behavior: 'smooth' });
  });
})();
