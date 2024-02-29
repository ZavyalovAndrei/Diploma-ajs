import Team from "./Team";

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
export function* characterGenerator(allowedTypes, maxLevel) {
  yield new allowedTypes[Math.floor(Math.random() * (allowedTypes.length - 1))](
    Math.ceil(Math.random() * maxLevel)
  );
}

/**
 * Формирует массив персонажей на основе characterGenerator
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @param characterCount количество персонажей, которое нужно сформировать
 * @returns экземпляр Team, хранящий экземпляры персонажей. Количество персонажей в команде - characterCount
 * */
export function generateTeam(allowedTypes, maxLevel, characterCount) {
  const generatedTeam = [];
  for (let i = 0; i < characterCount; i++) {
    const teamGenerator = characterGenerator(allowedTypes, maxLevel);
    generatedTeam.push(teamGenerator.next().value);
  }
  return new Team(generatedTeam);
}

export function generatePosition(characterCount, boardSize) {
  const positions = { player: [], enemy: [] };
  const randomPositions = { player: [], enemy: [] };

  for (let index = 0; index < boardSize; index++) {
    const row = boardSize * index;
    positions.player.push(row);
    positions.player.push(row + 1);
    positions.enemy.push(row + boardSize - 2);
    positions.enemy.push(row + boardSize - 1);
  }

  for (let i = 0; i < characterCount; ) {
    const playerPositionIndex = Math.floor(
      Math.random() * positions.player.length
    );
    const playerPosition = positions.player[playerPositionIndex];
    const enemyPositionIndex = Math.floor(
      Math.random() * positions.enemy.length
    );
    const enemyPosition = positions.enemy[enemyPositionIndex];
    if (
      randomPositions.player.indexOf(playerPosition) === -1 &&
      randomPositions.enemy.indexOf(enemyPosition) === -1
    ) {
      randomPositions.player.push(playerPosition);
      randomPositions.enemy.push(enemyPosition);
      i++;
    } else {
      continue;
    }
  }
  return randomPositions;
}
