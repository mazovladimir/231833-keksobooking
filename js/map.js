'use strict';

window.map = (function () {
  var address = document.querySelector('#address');
  var pinMain = document.querySelector('.pin__main');
  var area = document.querySelector('.tokyo');
  var areaRect = area.getBoundingClientRect();
  var pinRect = pinMain.getBoundingClientRect();
  var startCoords;
  var pinMainX = areaRect.width / 2;
  var pinMainY = areaRect.height / 2;

  setPinPosition(pinMainX, pinMainY);
  pinMain.style.zIndex = 2;

  pinMain.addEventListener('mousedown', mouseDown);

  address.addEventListener('input', function () {
    movePin();
  });

  function setPinPosition(x, y) {
    pinMain.style.top = y - pinRect.height + 'px';
    pinMain.style.left = x - pinRect.width / 2 + 'px';
  }

  function movePin() {
    if (!address.value.match(/x:\s*(\d+),\s*y:\s*(\d+)/)) {
      address.value = ''; 
      return;
    }

    var parsedAddress = address.value.match(/x:\s*(\d+),\s*y:\s*(\d+)/);
    if (parsedAddress[1] && parsedAddress[2]) {
      setPinPosition(+parsedAddress[1], +parsedAddress[2]);
    }
  }

  function getRangeValue(value, min, max) {
    return Math.max(Math.min(value, max), min);
  }

  function attachEvents() {
    area.addEventListener('mousemove', mouseMove);
    area.addEventListener('mouseup', mouseUp);
    area.addEventListener('mouseleave', mouseUp);
  }

  function detachEvents() {
    area.removeEventListener('mousemove', mouseMove);
    area.removeEventListener('mouseup', mouseUp);
    area.removeEventListener('mouseleave', mouseUp);
  }

  function mouseDown(evt) {
    evt.preventDefault();
    attachEvents();
    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
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

    pinMainX = getRangeValue(pinMainX - shift.x, 0, areaRect.width);
    pinMainY = getRangeValue(pinMainY - shift.y, 0, areaRect.height);

    setPinPosition(pinMainX, pinMainY);

    address.value = 'x:' + Math.round(pinMainX) + ', y:' + Math.round(pinMainY);
    return '';
  }

  function mouseUp(upEvt) {
    upEvt.preventDefault();
    detachEvents();
  }
})();
