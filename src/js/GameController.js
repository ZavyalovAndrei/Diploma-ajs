import themes from "./themes";
import PositionedCharacter from "./PositionedCharacter";
import { generateTeam, generatePosition } from "./generators";
import { Bowerman } from "./characters/Bowerman";
import { Daemon } from "./characters/Daemon";
import { Magician } from "./characters/Magician";
import { Swordsman } from "./characters/Swordsman";
import { Undead } from "./characters/Undead";
import { Vampire } from "./characters/Vampire";
import GameState from "./GameState";

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.playerTypes = [Bowerman, Magician, Swordsman];
    this.enemyTypes = [Daemon, Undead, Vampire];
    this.maxLevel = 4;
    this.teamSize = 4;
    this.positionedCharacter = [];
    this.gameState = new GameState();
  }

  init() {
    this.gamePlay.drawUi(themes.prairie);
    this.placeTeam();
    this.gamePlay.redrawPositions(this.positionedCharacter);
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
    // TODO: load saved stated from stateService
  }

  onCellClick(index) {
switch(this.gameState.currentPlayer) {
  case "user":
    
}
  }

  onCellEnter(index) {
    this.positionedCharacter.forEach((element) => {
      if (element.position === index) {
        this.gamePlay.showCellTooltip(
          this.getCharacterInfo(element.character),
          index
        );
      }
    });
  }

  onCellLeave(index) {
    this.gamePlay.hideCellTooltip(index);
  }

  placeTeam() {
    const playerTeam = generateTeam(
      this.playerTypes,
      this.maxLevel,
      this.teamSize
    );
    const enemyTeam = generateTeam(
      this.enemyTypes,
      this.maxLevel,
      this.teamSize
    );
    const positions = generatePosition(this.teamSize, this.gamePlay.boardSize);
    for (let i = 0; i < playerTeam.characters.length; i++) {
      this.positionedCharacter.push(
        new PositionedCharacter(playerTeam.characters[i], positions.player[i])
      );
      this.positionedCharacter.push(
        new PositionedCharacter(enemyTeam.characters[i], positions.enemy[i])
      );
    }
  }

  getCharacterInfo(character) {
    return `\u{1F396}${character.level} \u2694${character.attack} \u{1F6E1}${character.defence} \u2764${character.health}`;
  }
}
