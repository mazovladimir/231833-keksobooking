'use strict';

window.map = (function () {
  var address = document.querySelector('#address');
  var pinMain = document.querySelector('.pin__main');
  var startCoords;

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    mouseDown(evt);
  });

  address.addEventListener('input', function () {
    movePin();
  });

  function movePin() {
    pinMain.style.top = (parseInt(address.value.replace('x:', '').replace('y:', '').split(',')[1], 10) - 94) + 'px';
    pinMain.style.left = (parseInt(address.value.replace('x:', '').replace('y:', '').split(',')[0], 10) - 36) + 'px';
  }

  function mouseDown(evt) {
    startCoords = {
      x: evt.cleintX,
      y: evt.clientY
    };

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
  }

  function mouseMove(moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
    pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';

    address.value = 'x:' + (parseInt(pinMain.style.left, 10) + 36) + ', y:' + (parseInt(pinMain.style.top, 10) + 94);
  }

  function mouseUp(upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);
  }
})();
