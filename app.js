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

  label=label.filter(Number);
  return label;
}
