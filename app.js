console.log('JavaScript loaded');

var board1 = [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0];
var board2 = [0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0];
var board3 = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1];
var board4 = [0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1];
var board5 = [0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1];

var gameNumber = 1;
var lives = 3;
var found = 0;

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

  if (label.length === 0) {
    return [0];
  }

  label = label.filter(Number);
  return label;
}

$(document).ready(function() {

  var $container = $('.container');

  var $startButton = $('#startbutton');
  $startButton.on('click', animateStart);
  var $buttonDiv = $('#buttondiv');


  var $title = $('.title');
  var tP = $('#p');
  var tI = $('#i');
  var tC = $('#c');
  var tR = $('#r');
  var tO = $('#o');
  var tS = $('#s');
  var tSS = $('#s2');

  function animateStart() {
    //title color change
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

    setTimeout(choiceLoad, 1750);


  }


  function choiceLoad() {
      gameNumber = 1;
      found = 0;
      lives = 3;
      $container.empty();

      $container.append('<div class="select-title"></div>');
      $('.select-title').append('<h1>Pick a Game Mode</h1>');
      $container.append('<div class="choices"><span id="story">STORY</span><span id="random">RANDOM</span><span id="build">BUILD</span></div>');
      $container.append('<div id="circles"></div>')

      $('#circles').append('<div class="circle bk"><img class="book" src="css/book.png"></div>');
      $('#circles').append('<div class="circle qm">?</div>');
      $('#circles').append('<div class="circle hm"><img class="hammer" src="css/hammer.png"></div>');
      $('.bk').on('click', storyLoad);
      $('.qm').on('click', randomLoad);
      $('.hm').on('click', buildLoad);
  }


  function boardLoad(xbyx) {
    $container.empty();

    $container.append('<div class="gametitle"></div>');
    $('.gametitle').append('<h1></h1>');
    $('h1').text('GAME ' + gameNumber.toString());

    $container.append('<table class="game1"></table>');

    for (var i = 0; i < xbyx; i++) {
      $('.game1').append('<tr class="gametr"></tr>');
    }

    var rows = $('.gametr');

    for (var i = 0; i < xbyx; i++) {
      for (var z = 0; z < xbyx; z++) {
        $('.gametr').eq(i).append('<td class="game"></td>');
      }
    }

    if (xbyx === 5) {
      $('.game').css('padding', '20');
    } else if (xbyx === 9) {
        $('.game').css('padding', '6');
    } else if (xbyx === 16) {
        $('.game').css('padding', '.5');
    }

  }

  function assignValues() {
    var cells = $('.game');

    //sets values to preset boards
    if (gameNumber === 1) {
      for (var i = 0; i < cells.length; i++) {
        cells.eq(i).attr('val', 'v' + board1[i].toString())
      }
    } else if (gameNumber === 2) {
        for (var i = 0; i < cells.length; i++) {
          cells.eq(i).attr('val', 'v' + board2[i].toString())
        }
    } else if (gameNumber === 3) {
        for (var i = 0; i < cells.length; i++) {
          cells.eq(i).attr('val', 'v' + board3[i].toString())
        }
    } else if (gameNumber === 4) {
        for (var i = 0; i < cells.length; i++) {
          cells.eq(i).attr('val', 'v' + board4[i].toString())
        }
    } else if (gameNumber === 5) {
        for (var i = 0; i < cells.length; i++) {
          cells.eq(i).attr('val', 'v' + board5[i].toString())
        }
    }

    //creates rows
    var row1 =  [];
    for (var i = 0; i < 5; i++) {
      var vx = cells.eq(i).attr('val');
      var str = vx.replace(/\D/g,'');
      row1.push(parseInt(str));
    }
    row1 = axis(row1);
    var row2 =  [];
    for (var i = 5; i < 10; i++) {
      var vx = cells.eq(i).attr('val');
      var str = vx.replace(/\D/g,'');
      row2.push(parseInt(str));
    }
    row2 = axis(row2);
    var row3 =  [];
    for (var i = 10; i < 15; i++) {
      var vx = cells.eq(i).attr('val');
      var str = vx.replace(/\D/g,'');
      row3.push(parseInt(str));
    }
    row3 = axis(row3);
    var row4 =  [];
    for (var i = 15; i < 20; i++) {
      var vx = cells.eq(i).attr('val');
      var str = vx.replace(/\D/g,'');
      row4.push(parseInt(str));
    }
    row4 = axis(row4);
    var row5 =  [];
    for (var i = 20; i < 25; i++) {
      var vx = cells.eq(i).attr('val');
      var str = vx.replace(/\D/g,'');
      row5.push(parseInt(str));
    }
    row5 = axis(row5);

    $container.append('<div class="row r1"></div>');
    $container.append('<div class="row r2"></div>');
    $container.append('<div class="row r3"></div>');
    $container.append('<div class="row r4"></div>');
    $container.append('<div class="row r5"></div>');

    for (var i = 0; i < row1.length; i++) {
      $('.r1').append('<span>' + row1[i] + '</span>');
    }
    for (var i = 0; i < row2.length; i++) {
      $('.r2').append('<span>' + row2[i] + '</span>');
    }
    for (var i = 0; i < row3.length; i++) {
      $('.r3').append('<span>' + row3[i] + '</span>');
    }
    for (var i = 0; i < row4.length; i++) {
      $('.r4').append('<span>' + row4[i] + '</span>');
    }
    for (var i = 0; i < row5.length; i++) {
      $('.r5').append('<span>' + row5[i] + '</span>');
    }

    //creates columns
    var col1 = [];
    var col2 = [];
    var col3 = [];
    var col4 = [];
    var col5 = [];

    for (var i =0; i<cells.length; i++) {
      if (i%5 === 0) {
        var vx = cells.eq(i).attr('val');
        var str = vx.replace(/\D/g,'');
        col1.push(parseInt(str));
      } else if (i > 0 && i%5 === 1) {
        var vx = cells.eq(i).attr('val');
        var str = vx.replace(/\D/g,'');
        col2.push(parseInt(str));
      } else if (i > 0 && i%5 === 2) {
        var vx = cells.eq(i).attr('val');
        var str = vx.replace(/\D/g,'');
        col3.push(parseInt(str));
      } else if (i > 0 && i%5 === 3) {
        var vx = cells.eq(i).attr('val');
        var str = vx.replace(/\D/g,'');
        col4.push(parseInt(str));
      } else {
        var vx = cells.eq(i).attr('val');
        var str = vx.replace(/\D/g,'');
        col5.push(parseInt(str));
      }
    }

    col1 = axis(col1);
    col2 = axis(col2);
    col3 = axis(col3);
    col4 = axis(col4);
    col5 = axis(col5);

    $container.append('<div class="col c1"></div>');
    $container.append('<div class="col c2"></div>');
    $container.append('<div class="col c3"></div>');
    $container.append('<div class="col c4"></div>');
    $container.append('<div class="col c5"></div>');

    for (var i = 0; i < col1.length; i++) {
      $('.c1').append('<span>' + col1[i] + '</span>');
    }
    for (var i = 0; i < col2.length; i++) {
      $('.c2').append('<span>' + col2[i] + '</span>');
    }
    for (var i = 0; i < col3.length; i++) {
      $('.c3').append('<span>' + col3[i] + '</span>');
    }
    for (var i = 0; i < col4.length; i++) {
      $('.c4').append('<span>' + col4[i] + '</span>');
    }
    for (var i = 0; i < col5.length; i++) {
      $('.c5').append('<span>' + col5[i] + '</span>');
    }

    //creates hearts / home button
    $container.append('<div class="heart hp1"><img src="css/heart.png"></div>');
    $container.append('<div class="heart hp2"><img src="css/heart.png"></div>');
    $container.append('<div class="heart hp3"><img src="css/heart.png"></div>');
    $container.append('<div class="return-container"></div>');
    $('.return-container').append('<button type="button" id="return-button">HOME</button>');

    $('#return-button').on('click', choiceLoad);
  }

  function clickResult() {
    var $hearts = $('.heart');
    var i = 0;

    if($(this).attr('val') === 'v1') {
      $(this).css('background-color', 'lightgrey');
      found++;
    } else {
      $(this).css('background-color', 'grey');
      lives--;
      $hearts.eq(i).remove();
    }
    $(this).off('click');
    checkWin();
  }

  function checkWin() {
    var $hearts = $('.heart');
    var $cells = $('.game');



    if ($('.container').has('.heart').length === 0) {
      $cells.css('background-color', 'red');
      $cells.off('click');
      $container.append('<button type="button" id="retry">TRY AGAIN</button>');
      $('#retry').on('click', function(e){
        storyLoad();
      });
    }

    var blocks = 0;
    for (var i = 0; i<$cells.length; i++) {
      if($cells.eq(i).attr('val') === 'v1') {
        blocks++;
      }
    }

    //win
    if (found === blocks) {
      $cells.off('click');
      if (gameNumber === 1) {
        for (var i = 0; i<$cells.length; i++) {
          if($cells.eq(i).attr('val') === 'v1') {
            $cells.eq(i).css('background-color', 'gold');
          }
        }
      } else if (gameNumber === 2) {
          for (var i = 0; i<$cells.length; i++) {
            if($cells.eq(i).attr('val') === 'v1') {
              $cells.eq(i).css('background-color', 'green');
            }
          }
      } else if (gameNumber === 3) {
          for (var i = 0; i<$cells.length; i++) {
            if($cells.eq(i).attr('val') === 'v1') {
              $cells.eq(i).css('background-color', 'pink');
            }
          }
      } else if (gameNumber === 4) {
          $cells.eq(1).css('background-color', 'pink');
          $cells.eq(2).css('background-color', 'pink');
          $cells.eq(3).css('background-color', 'pink');
          $cells.eq(5).css('background-color', 'pink');
          $cells.eq(6).css('background-color', 'blue');
          $cells.eq(7).css('background-color', 'pink');
          $cells.eq(8).css('background-color', 'blue');
          $cells.eq(9).css('background-color', 'pink');
          $cells.eq(10).css('background-color', 'pink');
          $cells.eq(11).css('background-color', 'black');
          $cells.eq(12).css('background-color', 'pink');
          $cells.eq(13).css('background-color', 'black');
          $cells.eq(14).css('background-color', 'pink');
          $cells.eq(16).css('background-color', 'pink');
          $cells.eq(17).css('background-color', 'pink');
          $cells.eq(18).css('background-color', 'pink');
          $cells.eq(20).css('background-color', 'hotpink');
          $cells.eq(21).css('background-color', 'hotpink');
          $cells.eq(23).css('background-color', 'hotpink');
          $cells.eq(24).css('background-color', 'hotpink');
      } else if (gameNumber === 5) {
          $cells.eq(3).css('background-color', 'brown');
          $cells.eq(6).css('background-color', 'brown');
          $cells.eq(7).css('background-color', 'red');
          $cells.eq(8).css('background-color', 'tan');
          $cells.eq(9).css('background-color', 'tan');
          $cells.eq(10).css('background-color', 'brown');
          $cells.eq(11).css('background-color', 'brown');
          $cells.eq(12).css('background-color', 'brown');
          $cells.eq(13).css('background-color', 'red');
          $cells.eq(14).css('background-color', 'tan');
          $cells.eq(15).css('background-color', 'brown');
          $cells.eq(18).css('background-color', 'brown');
          $cells.eq(20).css('background-color', 'tan');
          $cells.eq(21).css('background-color', 'tan');
          $cells.eq(23).css('background-color', 'tan');
          $cells.eq(24).css('background-color', 'tan');
      } else {
        for (var i = 0; i<$cells.length; i++) {
          if($cells.eq(i).attr('val') === 'v1') {
            $cells.eq(i).css('background-color', 'cyan');
          }
        }
      }

      $container.append('<button type="button" id="next-button">NEXT</button>');
      $('#next-button').on('click', function(e) {
        if (gameNumber < 5) {
          gameNumber++;
          lives = 3;
          found = 0;
          storyLoad();
        } else if (gameNumber === 5) {
          $container.css('background-color', 'green');
        }

      })

    }



  }

  function storyLoad() {
    boardLoad(5);
    assignValues();

    var cells = $('.game');

    for (var i = 0; i < cells.length; i++) {
      cells.eq(i).on('click', clickResult);
    }

  }

  function randomLoad() {
    $container.empty();
  }

  function buildLoad() {
    $container.empty();
  }
});
