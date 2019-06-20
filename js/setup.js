'use strict';

var WIZARD_FIRSTNAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var KEYCODES = {
  ENTER: 13,
  ESC: 27
};

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

var userNameInput = setup.querySelector('.setup-user-name');
var coatColorInput = setup.querySelector('input[name="coat-color"]');
var eyesColorInput = setup.querySelector('input[name="eyes-color"]');
var fireballColorInput = setup.querySelector('input[name="fireball-color"]');

var wizardCoat = setup.querySelector('.wizard-coat');
var wizardEyes = setup.querySelector('.wizard-eyes');
var wizardFireball = setup.querySelector('.setup-fireball-wrap');

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === KEYCODES.ESC) {
    closePopup();
  }
};

var getRandomElement = function (array) {
  return array[Math.round(Math.random() * (array.length - 1))];
};

var createWizards = function (coats, eyes, amount) {
  var wizards = [];
  for (var i = 0; i < amount; i++) {
    var wizard = {};
    wizard.name = getRandomElement(WIZARD_FIRSTNAMES) + ' ' + getRandomElement(WIZARD_SURNAMES);
    wizard.coatColor = getRandomElement(WIZARD_COAT_COLORS);
    wizard.eyesColor = getRandomElement(WIZARD_EYES_COLORS);
    wizards.push(wizard);
  }
  return wizards;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderWizards = function () {
  var wizards = createWizards(WIZARD_COAT_COLORS, WIZARD_EYES_COLORS, 4);
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};

renderWizards();

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEYCODES.ENTER) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEYCODES.ENTER) {
    closePopup();
  }
});


userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Какой же это волшебник без имени?');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});


var toggleStyle = function (styleToChange, styleInput, STYLE_VALUES) {
  styleToChange.style.fill = getRandomElement(STYLE_VALUES);
  styleInput.value = styleToChange.style.fill;
};

wizardCoat.addEventListener('click', function () {
  toggleStyle(wizardCoat, coatColorInput, WIZARD_COAT_COLORS);
});

wizardEyes.addEventListener('click', function () {
  toggleStyle(wizardEyes, eyesColorInput, WIZARD_EYES_COLORS);
});

wizardFireball.addEventListener('click', function () {
  toggleStyle(wizardFireball, fireballColorInput, WIZARD_FIREBALL_COLORS);
});
