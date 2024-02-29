export default class GameState {
constructor(){
  this.characters = [];
  this.currentPlayer = "user";
  this.theme = 'prairie';
  this.cursors = 'auto';
  this.score = 0;
  this.level = 1;
  this.isGameOver = false;
}
  static from(object) {
    // TODO: create object
    return null;
  }
}


const game = new GameState;

game.from()