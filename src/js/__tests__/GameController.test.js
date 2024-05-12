import GamePlay from "../GamePlay";
import GameController from "../GameController";
import GameStateService from "../GameStateService";
import Bowman from "../characters/Bowman";

const gamePlay = new GamePlay();

const stateService = new GameStateService();

const gameCtrl = new GameController(gamePlay, stateService);

gameCtrl.activeCharacter = {
  character: {
    level: 2,
    attack: 40,
    defence: 10,
    health: 100,
    type: "swordsman",
  },
  position: 8,
};

test("for method generateMessage of ClassGameController", () => {
  const bowman = new Bowman(1);
  expect(GameController.generateMessage(bowman)).toBe("🎖1 ⚔25 🛡25 ❤100");
});

jest.mock("../GameStateService");

beforeEach(() => {
  jest.resetAllMocks();
});

test("for method onSaveGameClick", () => {
  gameCtrl.stateService.load.mockReturnValue(
    JSON.stringify({
      level: 1,
      botTeam: {
        activeCharacter: null,
        characters: [
          {
            character: {
              attack: 10,
              defence: 10,
              health: 100,
              level: 1,
              type: "daemon",
            },
            position: 23,
          },
          {
            character: {
              attack: 40,
              defence: 10,
              health: 100,
              level: 1,
              type: "undead",
            },
            position: 38,
          },
        ],
        savedTypes: ["Daemon", "Undead"],
      },
      playerTeam: {
        activeCharacter: null,
        characters: [
          {
            character: {
              attack: 40,
              defence: 10,
              health: 100,
              level: 1,
              type: "swordsman",
            },
            position: 17,
          },
          {
            character: {
              attack: 25,
              defence: 25,
              health: 100,
              level: 1,
              type: "bowman",
            },
            position: 38,
          },
        ],
        savedTypes: ["Swordsman", "Bowman"],
      },
      score: { playerTeam: 0, botTeam: 0 },
    })
  );
  expect(JSON.parse(gameCtrl.stateService.load())).toEqual({
    level: 1,
    botTeam: {
      activeCharacter: null,
      characters: [
        {
          character: {
            attack: 10,
            defence: 10,
            health: 100,
            level: 1,
            type: "daemon",
          },
          position: 23,
        },
        {
          character: {
            attack: 40,
            defence: 10,
            health: 100,
            level: 1,
            type: "undead",
          },
          position: 38,
        },
      ],
      savedTypes: ["Daemon", "Undead"],
    },
    playerTeam: {
      activeCharacter: null,
      characters: [
        {
          character: {
            attack: 40,
            defence: 10,
            health: 100,
            level: 1,
            type: "swordsman",
          },
          position: 17,
        },
        {
          character: {
            attack: 25,
            defence: 25,
            health: 100,
            level: 1,
            type: "bowman",
          },
          position: 38,
        },
      ],
      savedTypes: ["Swordsman", "Bowman"],
    },
    score: { playerTeam: 0, botTeam: 0 },
  });
});

beforeEach(() => {
  jest.resetAllMocks();
});

test('for method onSaveGameClick and expect "Invalid state"', () => {
  gameCtrl.stateService.load.mockImplementation(() => {
    throw new Error("Invalid state")
  });
  expect(() => {
    gameCtrl.stateService.load();
  }).toThrow("Invalid state");
});
