'use strict';

window.data = (function () {
  var dialog = document.querySelector('.dialog');
  var myAds = [];

  function getAds(onLoadAds) {
    if (myAds.length) {
      onLoadAds(myAds);
    } else {
      window.backend.get('/data', onLoadAds);
    }
  }

  return {
    dialog: dialog,
    getAds: getAds
  };
})();
