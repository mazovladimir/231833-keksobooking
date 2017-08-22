'use strict';

var TYPE = ['flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var ADDRESS = '{{getX()}}, {{getY()}}';
var ADS_COUNT = 8;

var fragment = document.createDocumentFragment();

var myads = [];

for (var i = 0; i < ADS_COUNT; i++) {
  myads[i] = new Ads();
}

function getRandom(max, min) {
  if (typeof min === 'undefined') {
    min = 0;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getAvatar() {
  return 'img/avatars/user' + '0' + getRandom(ADS_COUNT - 1, 1) + '.png';
}

function Ads() {
  this.author = {
    avatar: getAvatar(),
  };
  this.offer = {
    title: TITLE,
    address: ADDRESS,
    price: getRandom(100000000, 1000),
    type: TYPE,
    rooms: getRandom(5, 1),
    guests: getRandom(100),
    checkin: CHECKIN,
    checkout: CHECKOUT,
    features: FEATURES,
    description: ' ',
    photos: [],
  };
  this.mylocation = {
    x: getRandom(900, 300),
    y: getRandom(500, 100),
  };
}

myads.forEach(function (ads) {
  var newElement = document.createElement('div');
  newElement.className = 'pin';
  newElement.innerHTML = 'style="left: ' + ads.mylocation.x + 'px; top: ' + ads.mylocation.y + 'px"' + '<img src="' + ads.author.avatar + '" class="rounded" width="40" height="40">';
  fragment.appendChild(newElement);
})

document.querySelector(".tokyo__pin-map").appendChild(fragment);
