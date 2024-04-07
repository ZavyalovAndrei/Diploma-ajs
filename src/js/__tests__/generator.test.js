import Bowman from '../characters/Bowman';
import Swordsman from '../characters/Swordsman';
import Magician from '../characters/Magician';
import { generateTeam, characterGenerator } from '../generators';

test('for characterGenerator', () => {
  const playerTypes = [Bowman, Swordsman, Magician];
  const character = characterGenerator(playerTypes, 2);
  const testArr = [];
  for (let i = 0; i < 10; i += 1) {
    testArr.push(character.next().value);
  }
  expect(testArr.length).toBe(10);
});

test('for generateTeam', () => {
  const playerTypes = [Bowman, Swordsman, Magician];
  const team = generateTeam('new', playerTypes, 1, 4);
  expect(team.length).toBe(4);
});