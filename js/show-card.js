'use strict';

window.showCard = (function () {
  var dialogTitle = document.querySelector('.dialog__title');
  var myAds = window.data.myAds;

  return function (targetId) {
    dialogTitle.querySelector('img').src = myAds[targetId].author.avatar;
    window.card.replacePinDialog(myAds[targetId]);
  };
})();
