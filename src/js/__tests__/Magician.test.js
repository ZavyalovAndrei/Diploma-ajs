import { Magician } from "../characters/Magician";

test('should return character to string', () => {
    const result = new Magician(1);
    expect(result.toString()).toEqual('magician (уровень: 1, здоровье: 100, атака: 10, защита: 40)');
  });