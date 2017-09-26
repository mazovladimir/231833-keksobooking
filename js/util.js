'use strict';

window.util = (function () {
  function suffleFunc() {
    var rand = getRandom(1);
    return rand || -1;
  }

  function getRandom(max, min) {
    if (typeof min === 'undefined') {
      min = 0;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
    return array.filter(function (el, y) {
      return randomMap[y];
    }).sort(suffleFunc);
  }

  return {
    getRandom: getRandom,
    getRandomArray: getRandomArray
  };
})();
