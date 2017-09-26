'use strict';

window.card = (function () {
  var dialog = window.data.dialog;
  var myAds = window.data.myAds;
  var removePinActive = window.pin.removePinActive;
  var ESC_KEYCODE = 27;
  var dialogClose = dialog.querySelector('.dialog__close');
  var dialogTitle = document.querySelector('.dialog__title');

  dialogClose.addEventListener('click', function () {
    closeDialog();
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeDialog();
    }
  });

  function getType(type) {
    switch (type) {
      case 'flat':
        return 'Квартира';
      case 'house':
        return 'Дом';
      case 'bungalo':
        return 'Бунгало';
    }
    return '';
  }

  function renderAd(ad) {
    var fragmentFeature = document.createDocumentFragment();
    var adsTemplate = document.querySelector('#lodge-template').content;
    ad.offer.features.forEach(function (feature) {
      var fElement = document.createElement('span');
      fElement.className = 'feature__image feature__image--' + feature;
      fragmentFeature.appendChild(fElement);
    });
    var adsElement = adsTemplate.cloneNode(true);
    adsElement.querySelector('.lodge__title').textContent = ad.offer.title;
    adsElement.querySelector('.lodge__address').textContent = ad.offer.address;
    adsElement.querySelector('.lodge__price').textContent = ad.offer.price + '\u20BD' + '/ночь';
    adsElement.querySelector('.lodge__type').textContent = getType(ad.offer.type);
    adsElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + ad.offer.guests + ' гостей в ' + ad.offer.rooms + ' комнатах';
    adsElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    adsElement.querySelector('.lodge__features').appendChild(fragmentFeature);
    adsElement.querySelector('.lodge__description').textContent = ad.offer.description;
    return adsElement;
  }

  function closeDialog() {
    dialog.style.visibility = 'hidden';
    removePinActive();
  }

  function replacePinDialog(myAd) {
    var replaceAd = document.querySelector('.dialog__panel');
    replaceAd.parentNode.replaceChild(renderAd(myAd), replaceAd);
  }

  function changeDialog(targetPin, targetId) {
    dialogTitle.querySelector('img').src = targetPin.src;
    replacePinDialog(myAds[targetId]);
  }

  replacePinDialog(myAds[0]);

  return {
    closeDialog: closeDialog,
    replacePinDialog: replacePinDialog,
    changeDialog: changeDialog
  };
}());
