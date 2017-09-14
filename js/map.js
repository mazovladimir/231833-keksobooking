'use strict';

//(function () {
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
  var typeSelect = document.querySelector('#type');
  var roomNumberField = document.querySelector('#room_number');
  var roomCapacityField = document.querySelector('#capacity');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var priceSelect = document.querySelector('#price');
  var pinNodes = [];
  var optionCapacity;
  var optionNumber;

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

  timeIn.addEventListener('change', function () {
    changeTime();
  });

  timeOut.addEventListener('change', function () {
    timeIn = document.querySelector('#timeout');
    timeOut = document.querySelector('#timein');
    changeTime(timeIn, timeOut);
  });

  function changeTime() {
    var timeInSelected = timeIn.options[timeIn.selectedIndex].value;
    for (var i = 0; i < timeOut.options.length; i++) {
      if (timeInSelected === timeOut.options[i].value) {
        timeOut.options[i].selected = true;
      }
    }
  }

  roomNumberField.addEventListener('change', function () {
    for (var i = 0; i < roomNumberField.options.length; i++) {
      optionNumber = roomNumberField.options[i];
      if (optionNumber.selected) {
        switch (optionNumber.value) {
          case '1':
            var arraySwitchNumber = ['1']
            switchNumber(arraySwitchNumber);
            return;
          case '2':
            for (var j = 0; j < roomCapacityField.options.length; j++) {
              optionCapacity = roomCapacityField.options[j];
              if (optionCapacity.value !== '1' && optionCapacity.value !== '2') {
                optionCapacity.disabled = true;
              } else {
                optionCapacity.disabled = false;
              }
            }
            return;
          case '3':
            for (var j = 0; j < roomCapacityField.options.length; j++) {
              optionCapacity = roomCapacityField.options[j];
              if (optionCapacity.value !== '1' && optionCapacity.value !== '2' && optionCapacity.value !== '3') {
                optionCapacity.disabled = true;
              } else {
                optionCapacity.disabled = false;
              }
            }
            return;
          case '100':
            switchNumber('0');
            return;
        }
      }
    }
  });

  function switchNumber(capacityValue) {
    for (var j = 0; j < roomCapacityField.options.length; j++) {
      optionCapacity = roomCapacityField.options[j];
      if (optionCapacity.value !== capacityValue) {
        optionCapacity.disabled = true;
      } else {
        optionCapacity.disabled = false;
      }
    }
  }

  typeSelect.addEventListener('change', function () {
    var getSelectedType = typeSelect.options[typeSelect.selectedIndex].value;
      switch (getSelectedType) {
        case 'flat':
          priceSelect.value = 1000;
          return;
        case 'bungalo':
          priceSelect.value = 0;
          return;
        case 'house':
          priceSelect.value = 5000;
          return;
        case 'palace':
          priceSelect.value = 10000;
          return;
      }
  });


  function movePin(evt) {
    var targetPin = evt.target;
    var targetId = targetPin.parentNode.dataset.id;
    var activePin = myAds.find(getActivePin);
    if (targetId) {
      if (activePin) {
        removePinActive();
      } else {
        dialog.style.visibility = '';
      }
      myAds[targetId].isActive = true;
      pinNodes[targetId].classList.add('pin--active');
      changeDialog(targetPin, targetId);
    }
  }

  function closeDialog() {
    dialog.style.visibility = 'hidden';
    removePinActive();
  }

  function removePinActive() {
    var activeId = myAds.find(getActivePin).id;
    myAds[activeId].isActive = false;
    pinNodes[activeId].classList.remove('pin--active');
  }

  function changeDialog(targetPin, targetId) {
    dialogTitle.querySelector('img').src = targetPin.src;
    replacePinDialog(myAds[targetId]);
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

  function replacePinDialog(myAd) {
    var replaceAd = document.querySelector('.dialog__panel');
    replaceAd.parentNode.replaceChild(renderAd(myAd), replaceAd);
  }

  var myAds = createAds(8);
  replacePinDialog(myAds[0]);
  document.querySelector('.dialog__title').querySelector('img').src = myAds[0].author.avatar;
  document.querySelector('.tokyo__pin-map').appendChild(getAdFragment(myAds));
//})();
