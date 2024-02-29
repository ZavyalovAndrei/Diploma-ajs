import GamePlay from "../GamePlay";
import GameController from "../GameController";
import { Undead } from "../characters/Undead";
import GameStateService from "../GameStateService"

  test("should returns a string with the correct emoji and stats", () => {
    const character = new Undead(3);
    const gameController = new GameController(new GamePlay(), new GameStateService([]));
    const expected = `\u{1F396}3 \u{2694}40 \u{1F6E1}10 \u{2764}100`;
    expect(gameController.getCharacterInfo(character)).toEqual(expected);
  });