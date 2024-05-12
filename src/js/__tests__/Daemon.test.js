import Daemon from "../characters/Daemon";

test("should be created a new Daemon with correct parameters", () => {
  const expected = {
    level: 1,
      type: 'daemon',
      health: 100,
      attack: 10,
      defence: 10,
  };
  const result = new Daemon(1);
  expect(result).toEqual(expected);
});
