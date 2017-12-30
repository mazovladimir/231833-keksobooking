'use strict';

window.showCard = (function () {
  var dialogTitle = document.querySelector('.dialog__title');

  return function (ad) {
    dialogTitle.querySelector('img').src = ad.author.avatar;
    window.card.replacePinDialog(ad);
  };
})();
