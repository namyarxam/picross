console.log('JavaScript loaded');

//creates a random board array
function randomBoard() {
  var boardNumber = Math.round(Math.random()*33554431); //max binary decimal for 25 chars
  var boardBinary = boardNumber.toString(2);

  while (boardBinary.length < 25) {
    boardBinary = '0' + boardBinary;
  }

  var board = boardBinary.split('');

  for (var i = 0; i<board.length; i++) {
    board[i] = parseInt(board[i]);
  }

  return board;
}

//calculates the clusters of '1' in a binary string (axis labels)
function axis(arr) {
  var label = [];
  var x = 0;

  for (var i=0; i<arr.length; i++) {
    if(arr[i] === 1) {
        if (!label[x]) {
          label[x] = 0;
        }
        label[x]++;
    } else {
      x++;
    }
  }

  label = label.filter(Number);
  return label;
}

$(document).ready(function() {

  var $startButton = $('#startbutton');
  var $title = $('.title');
  var tP = $('#p');
  var tI = $('#i');
  var tC = $('#c');
  var tR = $('#r');
  var tO = $('#o');
  var tS = $('#s');
  var tSS = $('#s2');

  $startButton.on('click', function(event) {
    tP.addClass('red');
    setTimeout(function() {
      tI.addClass('orange');
    }, 250);
    setTimeout(function() {
      tC.addClass('yellow');
    }, 500);
    setTimeout(function() {
      tR.addClass('green');
    }, 750);
    setTimeout(function() {
      tO.addClass('blue');
    }, 1000);
    setTimeout(function() {
      tS.addClass('indigo');
    }, 1250);
    setTimeout(function() {
      tSS.addClass('violet');
    }, 1500);

    setTimeout(function() {
      $title.remove();
    }, 1750);
    setTimeout(function() {
      $startButton.remove();
    }, 1750);
  })

});
