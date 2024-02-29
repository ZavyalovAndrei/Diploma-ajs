import { Vampire } from "../characters/Vampire";

test('should return character to string', () => {
    const result = new Vampire(1);
    expect(result.toString()).toEqual('vampire (уровень: 1, здоровье: 100, атака: 25, защита: 25)');
  });