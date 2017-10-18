'use strict';

window.backend = (function () {
  var URL = 'https://1510.dump.academy/keksobooking';

  function save(data, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad();
      } else {
        onError(xhr.statusText);
      }
    });

    xhr.timeout = 10000;

    xhr.open('POST', URL);
    xhr.send(data);
  }

  function load(onLoad, onError) {

  }

  return {
    save: save
  };
})();
