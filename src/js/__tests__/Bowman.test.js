import Bowman from "../characters/Bowman";

test("should be created a new Bowman with correct parameters", () => {
  const expected = {
    level: 1,
    type: "bowman",
    health: 100,
    attack: 25,
    defence: 25,
  };
  const result = new Bowman(1);
  expect(result).toEqual(expected);
});
