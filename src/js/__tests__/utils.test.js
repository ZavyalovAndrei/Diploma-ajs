import { calcTileType } from "../utils";

test.each([
  ["top-left", 0, 8],
  ["top-right", 7, 8],
  ["top", 1, 8],
  ["top", 6, 8], 
  ["left", 8, 8],
  ["left", 48, 8],
  ["right", 15, 8],
  ["right", 55, 8],
  ["bottom-left", 56, 8],
  ["bottom-right", 63, 8],
  ["bottom", 62, 8],
  ["bottom", 57, 8],
  ["center", 33, 8],
  ["center", 49, 8],
])(
  "should return %s with index: %i and board size: %i",
  (result, index, boardSize) => {
    expect(calcTileType(index, boardSize)).toEqual(result);
  }
);
