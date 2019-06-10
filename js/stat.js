'use strict';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 15;
var BAR_MAXHEIGHT = 150;
var BAR_WIDTH = 50;
var BAR_GAP = 40;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    var maxElement = arr[0];
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  var barOffset = BAR_WIDTH + BAR_GAP;
  var statsBasicPositionX = CLOUD_X + BAR_WIDTH + 5;
  var statsBasicPositionY = CLOUD_Y + CLOUD_HEIGHT;
  var statsPositionX = 0;

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = 'black';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура Вы победили!', CLOUD_X + 20, CLOUD_Y + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + 20, CLOUD_Y + FONT_GAP * 2);

  var maxTime = getMaxElement(times);


  for (var i = 0; i < players.length; i++) {
    var barHeight = (BAR_MAXHEIGHT * times[i]) / maxTime;
    statsPositionX = statsBasicPositionX + (barOffset * i);
    ctx.fillStyle = 'black';
    times[i] = Math.round(times[i]);
    ctx.fillText(times[i], statsPositionX, statsBasicPositionY - FONT_GAP * 1.5);
    ctx.fillText(players[i], statsPositionX, statsBasicPositionY - FONT_GAP * 3 - barHeight);
    ctx.fillStyle = 'rgba(0, 0, ' + Math.round(255 * Math.random()) + ', ' + Math.random() + ')';
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    ctx.fillRect(statsPositionX, statsBasicPositionY - (BAR_MAXHEIGHT + FONT_GAP * 2) + BAR_MAXHEIGHT - barHeight, BAR_WIDTH, barHeight);
  }
};
