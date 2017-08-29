'use strict';

var TYPES = ['flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var fragmentAd = document.createDocumentFragment();
var fragmentFeature = document.createDocumentFragment();
var adsTemplate = document.querySelector('#lodge-template').content;
var replaceAd = document.querySelector('.dialog__panel');
var parentAd = replaceAd.parentNode;

var myads = [];

for (var i = 0; i < 8; i++) {
  myads[i] = new Ad(i);
}

function getRandom(max, min) {
  if (typeof min === 'undefined') {
    min = 0;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getAvatar(element) {
  return 'img/avatars/user' + '0' + element + '.png';
}

function Ad() {
  this.author = {
    avatar: getAvatar(i + 1),
  };
  this.location = {
    x: getRandom(900, 300),
    y: getRandom(500, 100),
  };
  this.offer = {
    title: TITLES[getRandom(TITLES.length - 1)],
    address: this.location.x + ',' + this.location.y,
    price: getRandom(1000000, 1000),
    type: TYPES[getRandom(TYPES.length - 1)],
    rooms: getRandom(5, 1),
    guests: getRandom(100, 1),
    checkin: CHECKIN[getRandom(CHECKIN.length - 1)],
    checkout: CHECKOUT[getRandom(CHECKOUT.length - 1)],
    features: getFeatures(getRandom(FEATURES.length, 1)),
    description: '',
    photos: [],
  };
}

function getFeatures(count) {
  var arrayFeatures = [];
  for (var x = 0; x < count; x++) {
    arrayFeatures.push(FEATURES[getRandom(FEATURES.length - 1)]);
  }
  return arrayFeatures;
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

var renderAd = function (ad) {
  FEATURES.forEach(function (feature) {
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
};

function getAdFragment(ads) {
  ads.forEach(function (ad) {
    var newElement = document.createElement('div');
    newElement.className = 'pin';
    newElement.setAttribute('style', 'left: ' + ad.location.x + 'px; top: ' + ad.location.y + 'px');
    newElement.innerHTML = '<img src="' + ad.author.avatar + '" class="rounded" width="40" height="40">';
    fragmentAd.appendChild(newElement);
  });
  return fragmentAd;
}

parentAd.replaceChild(renderAd(myads[0]), replaceAd);
document.querySelector('.dialog__title').querySelector('img').src = myads[0].author.avatar;
document.querySelector('.tokyo__pin-map').appendChild(getAdFragment(myads));
