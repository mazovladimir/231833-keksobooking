'use strict';

window.showCard = (function () {
  var dialogTitle = document.querySelector('.dialog__title');
  var myAds = window.data.myAds;

  return function (targetPin, targetId) {
    dialogTitle.querySelector('img').src = targetPin.src;
    window.card.replacePinDialog(myAds[targetId]);
  };
})();
