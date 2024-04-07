import Swordsman from '../characters/Swordsman';
import PositionedCharacter from '../PositionedCharacter';
import GameState from '../GameState';

const gameState = new GameState();

const swordsman = new Swordsman(1);
gameState.setPositions(new PositionedCharacter(swordsman, 8));
gameState.setActiveCharacter(8);

test('for method getAbleMotions', () => {
  const result = gameState.getAbleMotions(8, 'swordsman', 8);
  const expected = {
    attackAbleFields: [16, 0, 17, 9, 1],
    goAbleFields: [
      40, 32, 24, 16, 0, 41, 33, 25, 17, 9, 1, 42, 34, 26, 18, 10, 2, 43, 35,
      27, 19, 11, 3, 44, 36, 28, 20, 12, 4,
    ],
  };
  expect(result).toEqual(expected);
});