import Swordsman from "../characters/Swordsman";

test("should be created a new Swordsman with correct parameters", () => {
  const expected = {
    level: 1,
    type: "swordsman",
    health: 50,
    attack: 40,
    defence: 10,
  };
  const result = new Swordsman(1);
  expect(result).toEqual(expected);
});
