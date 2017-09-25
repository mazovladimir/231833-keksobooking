'use strict';

window.pin = (function () {
  var ENTER_KEYCODE = 13;
  var tokioPinMap = document.querySelector('.tokyo__pin-map');
  var pinNodes = [];
  var myAds = window.myAds;
  var dialog = window.dialog;

  function removePinActive() {
    var activeId = myAds.find(getActivePin).id;
    myAds[activeId].isActive = false;
    pinNodes[activeId].classList.remove('pin--active');
  }

  function movePin(evt) {
    var targetPin = evt.target;
    var targetId = targetPin.parentNode.dataset.id;
    var activePin = myAds.find(getActivePin);
    if (targetId) {
      if (activePin) {
        removePinActive();
      } else {
        dialog.style.visibility = '';
      }
      myAds[targetId].isActive = true;
      pinNodes[targetId].classList.add('pin--active');
      window.card.changeDialog(targetPin, targetId);
    }
  }

  function getActivePin(item) {
    return item.isActive === true;
  }

  tokioPinMap.addEventListener('click', function (evt) {
    movePin(evt);
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      movePin(evt);
    }
  });

  return {
    removePinActive: removePinActive
  };
})();
