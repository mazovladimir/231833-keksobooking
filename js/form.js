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

  getRoomType();
  getRoomTimeIn();
  getRoomTimeOut();
  getRoomCapacity();

  timeIn.addEventListener('change', function () {
    getRoomTimeIn();
  });

  timeOut.addEventListener('change', function () {
    getRoomTimeOut();
  });

  roomType.addEventListener('change', function () {
    getRoomType();
  });

  roomNumber.addEventListener('change', function () {
    getRoomCapacity();
  });

  function getRoomCapacity() {
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

  function getRoomTimeIn() {
    var timeInSelected = timeIn.options[timeIn.selectedIndex].value;
    for (var i = 0; i < timeOut.options.length; i++) {
      if (timeInSelected === timeOut.options[i].value) {
        timeOut.options[i].selected = true;
      }
    }
  }

  function getRoomTimeOut() {
    var timeOutSelected = timeOut.options[timeOut.selectedIndex].value;
    for (var i = 0; i < timeIn.options.length; i++) {
      if (timeOutSelected === timeIn.options[i].value) {
        timeIn.options[i].selected = true;
      }
    }
  }

  function getRoomType() {
    var selectedType = roomType.options[roomType.selectedIndex];
    if (selectedType.selected) {
      getPriceType(TYPE_MAP[selectedType.value]);
    }
  }

  function getPriceType(price) {
    roomPrice.min = price;
    roomPrice.value = price;
  }
})();
