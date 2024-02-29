import Character from "../Character";

test('should throw error when new Character', () => {
    expect(() => new Character()).toThrow('Ошибка! Невозможно создать нового персонажа.');
});