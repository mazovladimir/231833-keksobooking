'use strict';

window.pin = (function () {
  var myAds = window.data.myAds;
  var dialog = window.data.dialog;
  var pinNodes = [];
  var ENTER_KEYCODE = 13;
  var tokioFilters = document.querySelector('.tokyo__filters');
  var tokioPinMap = document.querySelector('.tokyo__pin-map');
  var tokioFilterSet = document.querySelector('.tokyo__filter-set');
  var housingType = document.querySelector('#housing_type');
  var housingPrice = document.querySelector('#housing_price');
  var housingRoomNumber = document.querySelector('#housing_room-number');
  var housingGuestsNumber = document.querySelector('#housing_guests-number');
  var wifi = tokioFilterSet.querySelectorAll('input[type=checkbox]')[0];
  var dishwasher = tokioFilterSet.querySelectorAll('input[type=checkbox]')[1];
  var parking = tokioFilterSet.querySelectorAll('input[type=checkbox]')[2];
  var washer = tokioFilterSet.querySelectorAll('input[type=checkbox]')[3];
  var elevator = tokioFilterSet.querySelectorAll('input[type=checkbox]')[4];
  var conditioner = tokioFilterSet.querySelectorAll('input[type=checkbox]')[5];
  var selectFilters = ['type', 'price', 'rooms', 'guests'];
  var checkboxFilters = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var filter = {
    type: 'any',
    price: 'middle',
    rooms: 'any',
    guests: 'any',
    wifi: false,
    dishwasher: false,
    parking: false,
    washer: false,
    elevator: false,
    conditioner: false
  };

  tokioFilters.addEventListener('change', function (evt) {
    var target = evt.target;
    if (target.tagName === 'SELECT' || target.tagName === 'INPUT') {
      passAllFilters();
    }
  })

  function passAllFilters() {
    setFilterSelect(housingType, 'type');
    setFilterSelect(housingPrice, 'price');
    setFilterSelect(housingRoomNumber, 'rooms');
    setFilterSelect(housingGuestsNumber, 'guests');
    [wifi, dishwasher, parking, washer, elevator, conditioner].forEach(function(checkboxNode) {
      setFilterCheckBox(checkboxNode);
    })
    applyFilters();
  }

  function applyFilters() {
    myAds.forEach(function(item) {
      var itemCount = 0;
      var anyCount = 0;
      for (var prop in filter) {
        if ((filter[prop] !== 'any') && (selectFilters.indexOf(prop) !== -1)) {
          if ((prop === 'price') && (priceFilter(filter[prop], item.offer.price))) {
              itemCount++;
          } else if (item.offer[prop] == filter[prop]) {
            itemCount++;
          }
        } else if (filter[prop] === 'any') {
          anyCount++;
        }
        if ((filter[prop] !== false) && (checkboxFilters.indexOf(prop) !== -1)) {
          if (item.offer.features.indexOf(prop) >= 0) {
            itemCount++;
          }
        } else if (filter[prop] === false) {
          anyCount++;
        }
      }
      if ((anyCount + itemCount) === Object.keys(filter).length) {
        pinNodes[item.id].hidden = false;
      } else {
        pinNodes[item.id].hidden = true;
      }
    });
  }

  function priceFilter(selectPrice, price) {
    switch(selectPrice) {
      case 'low':
        if (price < 10000) {
          return true;
        }
        break;
      case 'middle':
        if ((price > 10000) && (price < 50000)) {
          return true;
        }
        break;
      case 'high':
        if (price >= 50000) {
          return true;
        }
        break;
      default:
        return false;
    }
  }

  function setFilterCheckBox(property) {
    filter[property.value] = property.checked;
  }

  function setFilterSelect(filterSelect, filterProperty) {
    var select = filterSelect.options[filterSelect.selectedIndex];
    if (select.selected) {
      filter[filterProperty] = select.value;
    }
  }

  window.data.getAds(function(ads) {
    myAds = ads;
    document.querySelector('.dialog__title').querySelector('img').src = ads[0].author.avatar;
    document.querySelector('.tokyo__pin-map').appendChild(getAdFragment(ads.slice(0, 5)));
  });

  tokioPinMap.addEventListener('click', function (evt) {
    movePin(evt);
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      movePin(evt);
    }
  });

  function getAdFragment(ads) {
    var fragmentAd = document.createDocumentFragment();

    ads.forEach(function (ad, index) {
      var newElement = document.createElement('div');
      ad.id = index;
      newElement.className = 'pin';
      newElement.style.left = ad.location.x + 'px';
      newElement.style.top = ad.location.y + 'px';
      var avatar = new Image(40, 40);
      avatar.className = 'rounded';
      avatar.tabIndex = '0';
      avatar.src = ad.author.avatar;
      newElement.appendChild(avatar);
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

  function removePinActive() {
    var activeIds = myAds.find(getActivePin);
    var activeId = myAds.find(getActivePin).id;

    myAds[activeId].isActive = false;
    pinNodes[activeId].classList.remove('pin--active');
  }

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
      window.showCard(myAds[targetId]);
    }
  }

  function getActivePin(item) {
    return item.isActive === true;
  }

  return {
    removePinActive: removePinActive
  };
})();
