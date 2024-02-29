import {
  characterGenerator,
  generateTeam,
  generatePosition,
} from "../generators";
import { Bowerman } from "../characters/Bowerman";
import { Magician } from "../characters/Magician";
import { Undead } from "../characters/Undead";
import { Daemon } from "../characters/Daemon";
import Team from "../Team";

it("should return a generator that yields an instance of a random class from the allowedTypes array with a random level between 1 and maxLevel", () => {
  const allowedTypes = [Bowerman, Magician, Undead, Daemon];
  const maxLevel = 10;
  let result = 0;
  const characterQuantity = 50;

  for (let i = 0; i < characterQuantity; i++) {
    const character = characterGenerator(allowedTypes, maxLevel).next().value;
    allowedTypes.forEach((element) => {
      if (character instanceof element) result++;
    });
  }
  expect(result).toBe(characterQuantity);
});

it("should return an instance of Team with the correct number of characters and level", () => {
  const allowedTypes = [Bowerman, Magician, Undead, Daemon];
  const maxLevel = 10;
  const characterCount = 3;
  const team = generateTeam(allowedTypes, maxLevel, characterCount);
  let correctLevelCount = 0;
  team.characters.forEach((element) => {
    if (element.level > 0 && element.level <= maxLevel) {
      correctLevelCount++;
    }
  });
  expect(team).toBeInstanceOf(Team);
  expect(team.characters.length).toBe(characterCount);
  expect(correctLevelCount).toBe(characterCount);
});

  test("should return an object with two arrays of positions", () => {
    const characterCount = 2;
    const boardSize = 4;
    const result = generatePosition(characterCount, boardSize);
    expect(result).toEqual({
      player: expect.any(Array),
      enemy: expect.any(Array),
    });
    expect(result.player).toHaveLength(characterCount);
    expect(result.enemy).toHaveLength(characterCount);
  });

  test("should return different positions for player and enemy", () => {
    const characterCount = 2;
    const boardSize = 4;
    const result = generatePosition(characterCount, boardSize);
    const playerPositions = result.player;
    const enemyPositions = result.enemy;
    expect(playerPositions).not.toEqual(enemyPositions);
  });