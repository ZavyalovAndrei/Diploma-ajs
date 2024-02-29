import { Swordsman } from "../characters/Swordsman";

test('should return character to string', () => {
    const result = new Swordsman(1);
    expect(result.toString()).toEqual('swordsman (уровень: 1, здоровье: 100, атака: 40, защита: 10)');
  });