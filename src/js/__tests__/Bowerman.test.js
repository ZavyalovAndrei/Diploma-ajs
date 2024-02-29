import { Bowerman } from "../characters/Bowerman";

test('should return character to string', () => {
    const result = new Bowerman(1);
    expect(result.toString()).toEqual('bowerman (уровень: 1, здоровье: 100, атака: 25, защита: 25)');
  });