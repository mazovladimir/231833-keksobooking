'use strict';

var TYPE = ['flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var ADS_COUNT = 8;
var GUESTS_COUNT = 100;

var fragment = document.createDocumentFragment();
var similarAdsTemplate = document.querySelector('#lodge-template').content;

var myads = [];

for (var i = 0; i < ADS_COUNT; i++) {
  myads[i] = new Ads();
  myads[i].author.avatar = getAvatar(i + 1);
  myads[i].offer.title = TITLE[i];
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

function Ads() {
  this.author = {
    avatar: '',
  };
  this.offer = {
    title: '',
    address: '',
    price: getRandom(1000000, 1000),
    type: TYPE[getRandom(TYPE.length - 1)],
    rooms: getRandom(5, 1),
    guests: getRandom(GUESTS_COUNT),
    checkin: CHECKIN[getRandom(CHECKIN.length - 1)],
    checkout: CHECKOUT[getRandom(CHECKOUT.length - 1)],
    features: FEATURES[getRandom(FEATURES.length - 1)],
    description: '',
    photos: [],
  };
  this.mylocation = {
    x: getRandom(900, 300),
    y: getRandom(500, 100),
  };
}

var renderAds = function (ads) {
  var adsElement = similarAdsTemplate.cloneNode(true);
  adsElement.querySelector('.lodge__title').textContent = ads.offer.title[0];
  return adsElement;
};

myads.forEach(function (ads) {
  var newElement = document.createElement('div');
  newElement.className = 'pin';
  newElement.setAttribute('style', 'left: ' + ads.mylocation.x + 'px; top: ' + ads.mylocation.y + 'px');
  newElement.innerHTML = '<img src="' + ads.author.avatar + '" class="rounded" width="40" height="40">';
  fragment.appendChild(newElement);
});

document.querySelector('.tokyo__pin-map').appendChild(fragment);
