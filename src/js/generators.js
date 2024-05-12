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
export function* characterGenerator(allowedTypes, level, arg) {
  if (arg === "new") {
    while(true) {
      yield new allowedTypes[Math.floor(Math.random() * allowedTypes.length)](level);
    }
  } else {
    for (let i = 0; i < allowedTypes.length; i += 1) {
      yield new allowedTypes[i](level);
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
export function generateTeam(arg, allowedTypes, level, characterCount) {
  const characters = characterGenerator(allowedTypes, level, arg);
  return Array.from({length: characterCount}).map(() => characters.next().value)
}
