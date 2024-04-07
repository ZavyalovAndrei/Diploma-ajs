import Magician from "../characters/Magician";

test("should be created a new Magician with correct parameters", () => {
  const expected = {
    level: 1,
      type: 'magician',
      health: 50,
      attack: 10,
      defence: 40,
  };
  const result = new Magician(1);
  expect(result).toEqual(expected);
});