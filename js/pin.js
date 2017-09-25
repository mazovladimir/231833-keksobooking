'use strict';

window.pin = (function () {
  var ENTER_KEYCODE = 13;
  var tokioPinMap = document.querySelector('.tokyo__pin-map');
  var myAds = window.myAds;
  var dialog = window.dialog;
  var pinNodes = window.pinNodes;

  function getAdFragment(ads) {
    var fragmentAd = document.createDocumentFragment();
    ads.forEach(function (ad, index) {
      var newElement = document.createElement('div');
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
      window.card.changeDialog(targetPin, targetId);
    }
  }

  function getActivePin(item) {
    return item.isActive === true;
  }

  tokioPinMap.addEventListener('click', function (evt) {
    movePin(evt);
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      movePin(evt);
    }
  });

  document.querySelector('.dialog__title').querySelector('img').src = myAds[0].author.avatar;
  document.querySelector('.tokyo__pin-map').appendChild(getAdFragment(myAds));

  return {
    removePinActive: removePinActive
  };
})();
