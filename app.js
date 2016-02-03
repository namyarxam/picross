//creates a random board array
function randomBoard() {
  var boardNumber = Math.round(Math.random()*33554431); //max binary decimal for 25 chars
  var boardBinary = boardNumber.toString(2);

  while (boardBinary.length < 25) {
    boardBinary = '0' + boardBinary;
  }

  var board = boardBinary.split('');

  return board;
}
