import Vampire from "../characters/Vampire";

test("should be created a new Vampire with correct parameters", () => {
  const expected = {
    level: 1,
    type: "vampire",
    health: 50,
    attack: 25,
    defence: 25,
  };
  const result = new Vampire(1);
  expect(result).toEqual(expected);
});
