'use strict';

(function () {
  var roomType = document.querySelector('#type');
  var roomNumber = document.querySelector('#room_number');
  var roomCapacity = document.querySelector('#capacity');
  var roomPrice = document.querySelector('#price');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  var CAPACITY_MAP = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0']
  };
  var TYPE_MAP = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  selectRoomType();
  selectRoomCapacity();

  timeIn.addEventListener('change', function () {
    window.synchronizeFields(timeIn, timeOut, ['12', '13', '14'], ['12', '13', '14'], syncValues);
  });

  function syncValues(element, value) {
    element.value = value;
  }

  timeOut.addEventListener('change', function () {
    window.synchronizeFields(timeOut, timeIn, ['12', '13', '14'], ['12', '13', '14'], syncValues);
  });

  roomType.addEventListener('change', function () {
    selectRoomType();
  });

  roomNumber.addEventListener('change', function () {
    selectRoomCapacity();
  });

  function selectRoomCapacity() {
    var numberSelected = roomNumber.options[roomNumber.selectedIndex];
    if (numberSelected.selected) {
      disableRoomCapacity(CAPACITY_MAP[numberSelected.value]);
    }
  }

  function disableRoomCapacity(values) {
    for (var i = 0; i < roomCapacity.options.length; i++) {
      var optionCapacity = roomCapacity.options[i];
      if (values.indexOf(optionCapacity.value) === -1) {
        optionCapacity.disabled = true;
      } else {
        optionCapacity.disabled = false;
        optionCapacity.selected = true;
      }
    }
  }

  function selectRoomType() {
    var selectedType = roomType.options[roomType.selectedIndex];
    if (selectedType.selected) {
      setPriceType(TYPE_MAP[selectedType.value]);
    }
  }

  function setPriceType(price) {
    roomPrice.min = price;
    roomPrice.value = price;
  }
})();
