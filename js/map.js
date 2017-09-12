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
  var dialogClose = dialog.querySelector('.dialog__close');
  var dialogTitle = document.querySelector('.dialog__title');
  var pinNodes = [];

  tokioPinMap.addEventListener('click', function (evt) {
    movePin(evt);
  });

  dialogClose.addEventListener('click', function () {
    closeDialog();
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeDialog();
    }
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      movePin(evt);
    }
  });

  function movePin(evt) {
    var targetPin = evt.target;
    var activePin = myAds.find(getActivePin);
    if (targetPin.parentNode.classList.contains('pin')) {
      if (activePin !== null && activePin !== 'undefined') {
        var activeId = activePin.id;
        pinNodes[activeId].classList.remove('pin--active');
        myAds[activeId].isActive = false;
      } else {
        dialog.style.visibility = '';
      }
      var targetId = targetPin.parentNode.dataset.id;
      myAds[targetId].isActive = true;
      pinNodes[targetId].classList.add('pin--active');
      dialogTitle.querySelector('img').src = targetPin.src;
      replaceAd = document.querySelector('.dialog__panel');
      replaceAd.parentNode.replaceChild(renderAd(myAds[targetId]), replaceAd);
    }
  }

  function closeDialog() {
    var activePin = myAds.find(getActivePin);
    dialog.style.visibility = 'hidden';
    pinNodes[activePin.id].classList.remove('pin--active');
    myAds[activePin.id].isActive = false;
  }

  function getActivePin(item) {
    return item.isActive === true;
  }

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
      ads.push(new Ad(i, shuffleAvatars.splice(0, 1), shuffleTitles.splice(0, 1)));
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

  function Ad(id, avatar, title) {
    this.id = id;
    this.isActive = false;
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
    randomMap = randomMap.sort(suffleFunc);
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
    ads.forEach(function (ad, index) {
      var newElement = document.createElement('div');
      newElement.className = 'pin';
      newElement.style.left = ad.location.x + 'px';
      newElement.style.top = ad.location.y + 'px';
      newElement.innerHTML = '<img src="' + ad.author.avatar + '" class="rounded" width="40" height="40" tabindex="0">';
      newElement.dataset.id = index;
      pinNodes.push(newElement);
      if (index === 0) {
        newElement.classList.add('pin--active');
        ad.isActive = true;
      }
      fragmentAd.appendChild(newElement);
    });
    return fragmentAd;
  }

  var myAds = createAds(8);
  var replaceAd = document.querySelector('.dialog__panel');
  replaceAd.parentNode.replaceChild(renderAd(myAds[0]), replaceAd);
  document.querySelector('.dialog__title').querySelector('img').src = myAds[0].author.avatar;
  document.querySelector('.tokyo__pin-map').appendChild(getAdFragment(myAds));
})();
