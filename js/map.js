'use strict';

var map = (function () {
  var TYPES = ['flat', 'house', 'bungalo'];
  var CHECKIN = ['12:00', '13:00', '14:00'];
  var CHECKOUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  return {
    ENTER_KEYCODE: ENTER_KEYCODE
  };
  var tokioPinMap = document.querySelector('.tokyo__pin-map');
  var pinNodes = [];

  window.getRandom = function (max, min) {
    if (typeof min === 'undefined') {
      min = 0;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function suffleFunc() {
    var rand = getRandom(1);
    return rand || -1;
  }

  window.getRandomArray = function (array, minCount, maxCount) {
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
    return array.filter(function (el, y) {
      return randomMap[y];
    }).sort(suffleFunc);
  };

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

  function createAds(count) {
    var shuffleAvatars = window.getRandomArray(getAvatars());
    var shuffleTitles = window.getRandomArray(TITLES);
    var ads = [];
    for (var i = 0; i < count; i++) {
      ads.push(new Ad(i, shuffleAvatars.splice(0, 1), shuffleTitles.splice(0, 1)));
    }
    return ads;
  }

  myAds = createAds(8);
})();
