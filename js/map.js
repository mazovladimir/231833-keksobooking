'use strict';

var TYPE = ['flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var ADDRESS = '{{location.x}}, {{location.y}}';

var myads = [];

for (var i = 0; i < 8; i++) {
  myads[i] = new Ads();
}

function getRandom(max, min) {
  if (typeof min === 'undefined') {
    min = 0;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getAvatar() {
  return 'img/avatars/user' + '0' + getRandom(8, 1) + '.png';
}

function Ads() {
  this.author = {
    avatar: getAvatar(),
  };
  this.offer = {
    title: TITLE,
  };
  this.address = ADDRESS;
  this.price = getRandom(100000000, 1000);
  this.type = TYPE;
  this.rooms = getRandom(5, 1);
  this.guests = getRandom(100);
  this.checkin = CHECKIN;
  this.checkout = CHECKOUT;
  this.features = FEATURES;
  this.description = ' ';
  this.photos = [];
}
