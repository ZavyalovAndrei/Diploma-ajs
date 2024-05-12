import Undead from "../characters/Undead";


test("should be created a new Undead with correct parameters", () => {
  const expected = {
    level: 1,
    type: 'undead',
    health: 100,
    attack: 40,
    defence: 10,
  };
  const result = new Undead(1);
  expect(result).toEqual(expected);
});