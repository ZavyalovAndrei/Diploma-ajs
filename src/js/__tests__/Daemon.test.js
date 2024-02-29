import { Daemon } from "../characters/Daemon";

test('should return character to string', () => {
    const result = new Daemon(1);
    expect(result.toString()).toEqual('daemon (уровень: 1, здоровье: 100, атака: 10, защита: 10)');
  });