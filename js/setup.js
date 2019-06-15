/* eslint-disable no-console */
'use strict';
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var WIZARD_FIRSTNAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var createFullName = function (firstNames, surNames) {
  var fullName = firstNames[Math.round(Math.random() * firstNames.length)] + ' ' + surNames[Math.round(Math.random() * surNames.length)];
  return fullName;
};


var createWizards = function (coats, eyes, amount) {
  var wizards = [];
  for (var i = 0; i < amount; i++) {
    var wizard = {};
    wizard.name = createFullName(WIZARD_FIRSTNAMES, WIZARD_SURNAMES);
    wizard.coatColor = coats[Math.round(Math.random() * coats.length)];
    wizard.eyesColor = eyes[Math.round(Math.random() * eyes.length)];
    wizards.push(wizard);
  }
  return wizards;
};

var wizards = createWizards(WIZARD_COAT_COLORS, WIZARD_EYES_COLORS, 4);

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);


userDialog.querySelector('.setup-similar').classList.remove('hidden');
