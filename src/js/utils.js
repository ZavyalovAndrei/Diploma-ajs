/**
 * @todo
 * @param index - индекс поля
 * @param boardSize - размер квадратного поля (в длину или ширину)
 * @returns строка - тип ячейки на поле:
 *
 * top-left
 * top-right
 * top
 * bottom-left
 * bottom-right
 * bottom
 * right
 * left
 * center
 *
 * @example
 * ```js
 * calcTileType(0, 8); // 'top-left'
 * calcTileType(1, 8); // 'top'
 * calcTileType(63, 8); // 'bottom-right'
 * calcTileType(7, 7); // 'left'
 * ```
 * */
export function calcTileType(index, boardSize) {
  const horizontal = index % boardSize;
  const vertical = index / boardSize;

  if (horizontal === 0 && vertical < 1) {
    return 'top-left';
  } if (horizontal > 0 && vertical < 1 && index + 1 !== boardSize) {
    return 'top';
  } if (horizontal + 1 === boardSize && vertical < 1) {
    return 'top-right';
  } if (horizontal === 0 && vertical >= 1 && vertical + 1 !== boardSize) {
    return 'left';
  } if (horizontal === 0 && vertical + 1 === boardSize) {
    return 'bottom-left';
  } if (
    horizontal !== 0
    && vertical < boardSize
    && vertical > boardSize - 1
    && (index + 1) / boardSize !== boardSize
  ) {
    return 'bottom';
  } if (
    horizontal + 1 === boardSize
    && vertical > 1
    && (index + 1) / boardSize !== boardSize
  ) {
    return 'right';
  } if (index + 1 === boardSize * boardSize) {
    return 'bottom-right';
  }
  return 'center';
}

export function calcHealthLevel(health) {
  if (health < 15) {
    return 'critical';
  }

  if (health < 50) {
    return 'normal';
  }

  return 'high';
}