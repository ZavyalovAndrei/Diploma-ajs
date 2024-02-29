import { Undead } from "../characters/Undead";

test('should return character to string', () => {
    const result = new Undead(1);
    expect(result.toString()).toEqual('undead (уровень: 1, здоровье: 100, атака: 40, защита: 10)');
  });