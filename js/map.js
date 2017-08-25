'use strict';

var TYPE = ['flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var ADS_COUNT = 8;
var GUESTS_COUNT = 100;

var fragmentAd = document.createDocumentFragment();
var fragmentFeature = document.createDocumentFragment();
var adsTemplate = document.querySelector('#lodge-template').content;
var replaceAd = document.querySelector('.dialog__panel');
var parentAd = replaceAd.parentNode;

var mytype;
var myads = [];

for (var i = 0; i < ADS_COUNT; i++) {
  myads[i] = new Ad();
  myads[i].offer.address = myads[i].mylocation.x + ',' + myads[i].mylocation.y;
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
  this.offer = {
    title: TITLE.splice(getRandom(TITLE.length - 1), 1),
    address: '',
    price: getRandom(1000000, 1000),
    type: TYPE[getRandom(TYPE.length - 1)],
    rooms: getRandom(5, 1),
    guests: getRandom(GUESTS_COUNT, 1),
    checkin: CHECKIN[getRandom(CHECKIN.length - 1)],
    checkout: CHECKOUT[getRandom(CHECKOUT.length - 1)],
    features: FEATURES,
    description: '',
    photos: [],
  };
  this.mylocation = {
    x: getRandom(900, 300),
    y: getRandom(500, 100),
  };
}

function getType(type) {
  switch (type) {
    case 'flat':
      mytype = 'Квартира';
      break;
    case 'house':
      mytype = 'Дом';
      break;
    case 'bungalo':
      mytype = 'Бунгало';
      break;
  }
  return mytype;
}

FEATURES.forEach(function (feature) {
  var fElement = document.createElement('span');
  fElement.className = 'feature__image feature__image--' + feature;
  fragmentFeature.appendChild(fElement);
});

var renderAd = function (ads) {
  var adsElement = adsTemplate.cloneNode(true);
  adsElement.querySelector('.lodge__title').textContent = ads.offer.title;
  adsElement.querySelector('.lodge__address').textContent = ads.offer.address;
  adsElement.querySelector('.lodge__price').textContent = ads.offer.price + '\u20BD/\u043D\u043E\u0447\u044C';
  adsElement.querySelector('.lodge__type').textContent = getType(ads.offer.type);
  adsElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + ads.offer.guests + ' гостей в ' + ads.offer.rooms + ' комнатах';
  adsElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + ads.offer.checkin + ' , выезд до ' + ads.offer.checkout;
  adsElement.querySelector('.lodge__features').appendChild(fragmentFeature);
  adsElement.querySelector('.lodge__description').textContent = ads.offer.description;
  return adsElement;
};

myads.forEach(function (ads) {
  var newElement = document.createElement('div');
  newElement.className = 'pin';
  newElement.setAttribute('style', 'left: ' + ads.mylocation.x + 'px; top: ' + ads.mylocation.y + 'px');
  newElement.innerHTML = '<img src="' + ads.author.avatar + '" class="rounded" width="40" height="40">';
  fragmentAd.appendChild(newElement);
});

parentAd.replaceChild(renderAd(myads[4]), replaceAd);
document.querySelector('.dialog__title').querySelector('img').src = myads[4].author.avatar;
document.querySelector('.tokyo__pin-map').appendChild(fragmentAd);
