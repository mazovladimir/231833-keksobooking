'use strict';

(function () {
  var TYPES = ['flat', 'house', 'bungalo'];
  var CHECKIN = ['12:00', '13:00', '14:00'];
  var CHECKOUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var tokioPinMap = document.querySelector('.tokyo__pin-map');
  var dialog = document.querySelector('.dialog');
  var dialogClose = document.querySelector('.dialog__close');

  tokioPinMap.addEventListener('click', function (evt) {
    var target = evt.target;
    var pinActive = document.querySelector('.pin--active');
    if (target.parentNode.classList.contains('pin')) {
      target.parentNode.classList.add('pin--active');
      pinActive.classList.remove('pin--active');
    }
  });

  dialogClose.addEventListener('click', function () {
    var pinActive = document.querySelector('.pin--active');
    dialog.style.visibility = 'hidden';
    pinActive.classList.remove('pin--active');
  });

  dialogClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      var pinActive = document.querySelector('.pin--active');
      dialog.style.visibility = 'hidden';
      pinActive.classList.remove('pin--active');
    }
  });

  function getRandom(max, min) {
    if (typeof min === 'undefined') {
      min = 0;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function createAds(count) {
    var shuffleAvatars = getRandomArray(getAvatars());
    var shuffleTitles = getRandomArray(TITLES);
    var ads = [];
    for (var i = 0; i < count; i++) {
      ads.push(new Ad(shuffleAvatars.splice(0, 1), shuffleTitles.splice(0, 1)));
    }
    return ads;
  }

  function getAvatars() {
    var avatars = [];
    for (var avatarNumber = 1; avatarNumber < 9; avatarNumber++) {
      avatars.push('img/avatars/user0' + avatarNumber + '.png');
    }
    return avatars;
  }

  function Ad(avatar, title) {
    this.author = {
      avatar: avatar,
    };
    this.location = {
      x: getRandom(900, 300),
      y: getRandom(500, 100),
    };
    this.offer = {
      title: title,
      address: this.location.x + ', ' + this.location.y,
      price: getRandom(1000000, 1000),
      type: TYPES[getRandom(TYPES.length - 1)],
      rooms: getRandom(5, 1),
      guests: getRandom(100, 1),
      checkin: CHECKIN[getRandom(CHECKIN.length - 1)],
      checkout: CHECKOUT[getRandom(CHECKOUT.length - 1)],
      features: getRandomArray(FEATURES, 1),
      description: '',
      photos: [],
    };
  }

  function suffleFunc() {
    var rand = getRandom(1);
    return rand || -1;
  }

  function getRandomArray(array, minCount, maxCount) {
    if (typeof minCount === 'undefined') {
      minCount = array.length;
    }
    if (typeof maxCount === 'undefined') {
      maxCount = array.length;
    }
    var count = getRandom(maxCount, minCount);
    var randomMap = [];
    for (var x = 0; x < array.length; x++) {
      randomMap.push(x < count);
    }
    randomMap = randomMap.filter(suffleFunc);
    return array.filter(function (el, y) { // eslint-disable-line no-unused-vars
      return randomMap[y];
    }).sort(suffleFunc);
  }

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

  function getAdFragment(ads) {
    var fragmentAd = document.createDocumentFragment();
    ads.forEach(function (ad) {
      var newElement = document.createElement('div');
      newElement.className = 'pin';
      newElement.setAttribute('style', 'left: ' + ad.location.x + 'px; top: ' + ad.location.y + 'px');
      newElement.innerHTML = '<img src="' + ad.author.avatar + '" class="rounded" width="40" height="40">';
      fragmentAd.appendChild(newElement);
    });
    return fragmentAd;
  }

  var replaceAd = document.querySelector('.dialog__panel');
  var myAds = createAds(8);
  replaceAd.parentNode.replaceChild(renderAd(myAds[0]), replaceAd);
  document.querySelector('.dialog__title').querySelector('img').src = myAds[0].author.avatar;
  document.querySelector('.tokyo__pin-map').appendChild(getAdFragment(myAds));
})();
