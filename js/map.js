'use strict';

window.map = (function () {
  var address = document.querySelector('#address');
  var pinMain = document.querySelector('.pin__main');
  var area = document.querySelector('.tokyo');
  var areaRect = area.getBoundingClientRect();
  var pinRect = pinMain.getBoundingClientRect();
  var startCoords;
  var isMouseDown = false;
  var pinMainX = areaRect.width / 2;
  var pinMainY = areaRect.height / 2;

  setPinPosition(pinMainX, pinMainY);
  pinMain.style.zIndex = 2;

  pinMain.addEventListener('mousedown', mouseDown);
  area.addEventListener('mousemove', mouseMove);
  area.addEventListener('mouseup', mouseUp);
  area.addEventListener('mouseleave', mouseUp);

  address.addEventListener('input', function () {
    movePin();
  });

  function setPinPosition(x, y) {
    pinMain.style.top = y - pinRect.height + 'px';
    pinMain.style.left = x - pinRect.width / 2 + 'px';
  }

  function movePin() {
    var parsedAddress = address.value.match(/x:\s*(\d+),\s*y:\s*(\d+)/);
    if (parsedAddress[1] && parsedAddress[2]) {
      setPinPosition(+parsedAddress[1], +parsedAddress[2]);
    }
  }

  function mouseDown(evt) {
    evt.preventDefault();

    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    isMouseDown = true;
  }

  function mouseMove(moveEvt) {
    moveEvt.preventDefault();

    if (!isMouseDown) {
      return false;
    }

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    pinMainX = pinMainX - shift.x;
    pinMainY = pinMainY - shift.y;
    pinMainX = Math.min(pinMainX, areaRect.width);
    pinMainX = Math.max(pinMainX, 0);
    pinMainY = Math.min(pinMainY, areaRect.height);
    pinMainY = Math.max(pinMainY, 0);

    setPinPosition(pinMainX, pinMainY);
    address.value = 'x:' + pinMainX + ', y:' + pinMainY;
    return '';
  }

  function mouseUp(upEvt) {
    upEvt.preventDefault();
    isMouseDown = false;
  }
})();
