/**
 * Формирует экземпляр персонажа из массива allowedTypes со
 * случайным уровнем от 1 до maxLevel
 *
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @returns генератор, который при каждом вызове
 * возвращает новый экземпляр класса персонажа
 *
 */
export function* characterGenerator(allowedTypes, maxLevel, arg) {
  if (arg === "new") {
    for (let i = 0; i < +Infinity; i += 1) {
      yield new allowedTypes[Math.floor(Math.random() * allowedTypes.length)](
        Math.ceil(Math.random() * maxLevel)
      );
    }
  } else {
    for (let i = 0; i < allowedTypes.length; i += 1) {
      yield new allowedTypes[i](maxLevel);
    }
  }
}

/**
 * Формирует массив персонажей на основе characterGenerator
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @param characterCount количество персонажей, которое нужно сформировать
 * @returns экземпляр Team, хранящий экземпляры персонажей. Количество персонажей в команде
 * - characterCount
 * */
export function generateTeam(arg, allowedTypes, maxLevel, characterCount) {
  const team = [];
  if (arg === "new") {
    const characters = characterGenerator(allowedTypes, maxLevel, "new");
    for (let i = 0; i < characterCount; i += 1) {
      team.push(characters.next().value);
    }
  } else {
    const characters = characterGenerator(allowedTypes, maxLevel, "load");
    for (let i = 0; i < characterCount; i += 1) {
      team.push(characters.next().value);
    }
  }
  return team;
}
