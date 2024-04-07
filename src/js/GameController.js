import GamePlay from "./GamePlay";
import PositionedCharacter from "./PositionedCharacter";
import { generateTeam } from "./generators";
import Bowman from "./characters/Bowman";
import Swordsman from "./characters/Swordsman";
import Magician from "./characters/Magician";
import Vampire from "./characters/Vampire";
import Undead from "./characters/Undead";
import Daemon from "./characters/Daemon";
import GameState from "./GameState";
import cursors from "./cursors";

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.playerCharacterTypes = [Bowman, Swordsman, Magician];
    this.botCharacterTypes = [Vampire, Undead, Daemon];
    this.stateService = stateService;
    this.gameState = new GameState();
    this.boardSize = 8;
    this.playerAbleTypes = ["bowman", "swordsman", "magician"];
    this.activitedCell = null;
    this.inProcess = false;
  }

  init() {
    this.setAblePositions(this.boardSize);
    const { level, theme, maxCharacters } = this.gameState.getSettings();
    this.gamePlay.drawUi(theme);
    this.createTeams(level, maxCharacters);
    this.mouseHandler();
    this.renderField(this.gameState.getPositions());
  }

  setAblePositions(boardSize) {
    this.playerAblePositions = [];
    this.botAblePositions = [];

    for (let i = 0; i < boardSize * boardSize; i += boardSize) {
      this.playerAblePositions.push(i);
      this.playerAblePositions.push(i + 1);
    }

    for (let i = 6; i < boardSize * boardSize; i += boardSize) {
      this.botAblePositions.push(i);
      this.botAblePositions.push(i + 1);
    }
  }

  createTeams(level, charactersCount, playerCharacters = []) {
    let playerTeam = generateTeam(
      "new",
      this.playerCharacterTypes,
      level,
      charactersCount - playerCharacters.length
    );

    playerTeam = [...playerTeam, ...playerCharacters];

    playerTeam.forEach((el) => {
      this.setTeams(el);
    });

    const botTeam = generateTeam(
      "new",
      this.botCharacterTypes,
      level,
      charactersCount
    );
    botTeam.forEach((el) => {
      this.setTeams(el);
    });
  }
  checkPlayerCharacters(character) {
    return this.playerAbleTypes.includes(character.type);
  }

  generatePosition(arr, arg) {
    const index = Math.floor(Math.random() * arr.length);
    const result = arr[index];
    if (arg === "player") {
      this.playerAblePositions = this.playerAblePositions.filter(
        (el) => el !== result
      );
    } else {
      this.botAblePosition = this.botAblePositions.filter(
        (el) => el !== result
      );
    }
    return result;
  }

  static generateMessage(character) {
    return `🎖${character.level} ⚔${character.attack} 🛡${character.defence} ❤${character.health}`;
  }

  mouseHandler() {
    this.gamePlay.addSaveGameListener(() => this.onSaveGameClick());
    this.gamePlay.addLoadGameListener(() => this.onLoadGameClick());
    if (this.gameState.state === "inProcess") {
      this.gamePlay.addCellEnterListener((i) => this.onCellEnter(i));
      this.gamePlay.addCellLeaveListener((i) => this.onCellLeave(i));
      this.gamePlay.addCellClickListener((i) => this.onCellClick(i));
    }
  }

  onLoadGameClick() {
    if (this.gameState.activeTeam === "playerTeam") {
      this.gameState.clearAll();
      try {
        const { level, playerTeam, botTeam, score } = this.stateService.load();
        const playerTypes = [];
        this.playerCharacterTypes.forEach((el) => {
          if (playerTeam.savedTypes.includes(el.prototype.constructor.name)) {
            playerTypes.push(el);
          }
        });
        const botTypes = [];
        this.botCharacterTypes.forEach((el) => {
          if (botTeam.savedTypes.includes(el.prototype.constructor.name)) {
            botTypes.push(el);
          }
        });
        const newPlayerTeam = generateTeam(
          "load",
          playerTypes,
          1,
          playerTypes.length
        );
        const newBotTeam = generateTeam("load", botTypes, 1, botTypes.length);

        newPlayerTeam.forEach((el, i) => {
          playerTeam.characters.forEach((item) => {
            if (item.character.type === el.type) {
              newPlayerTeam[i].level = item.character.level;
              newPlayerTeam[i].health = item.character.health;
              newPlayerTeam[i].attack = item.character.attack;
              newPlayerTeam[i].defence = item.character.defence;
              this.gameState.playerTeam.add(
                new PositionedCharacter(newPlayerTeam[i], item.position)
              );
            }
          });
        });

        newBotTeam.forEach((el, i) => {
          botTeam.characters.forEach((item) => {
            if (item.character.type === el.type) {
              newBotTeam[i].level = item.character.level;
              newBotTeam[i].health = item.character.health;
              newBotTeam[i].attack = item.character.attack;
              newBotTeam[i].defence = item.character.defence;
              this.gameState.botTeam.add(
                new PositionedCharacter(el, item.position)
              );
            }
          });
        });

        const theme = this.gameState.loadState(level, score);

        this.gamePlay.drawUi(theme);
        this.renderField(this.gameState.getPositions());
      } catch (e) {
        GamePlay.showError(e);
      }
    }
  }

  onSaveGameClick() {
    if (
      this.gameState.activeTeam === "playerTeam" &&
      this.gameState.state === "inProcess"
    ) {
      localStorage.removeItem("state");

      const savedState = {
        level: this.gameState.level,
        playerTeam: { ...this.gameState.playerTeam, savedTypes: [] },
        botTeam: { ...this.gameState.botTeam, savedTypes: [] },
        score: this.gameState.score,
      };

      savedState.playerTeam.characters.forEach((el) => {
        const i = el.character.constructor.name;
        savedState.playerTeam.savedTypes.push(i);
      });
      savedState.botTeam.characters.forEach((el) => {
        const i = el.character.constructor.name;
        savedState.botTeam.savedTypes.push(i);
      });
      this.stateService.save(savedState);
    }
  }

  onNewGameClick() {
    this.activitedNewGameListener = true;
    if (this.gameState.state === "GameOver") {
      this.reStart("bot");
    } else if (this.gameState.state === "OverWin") {
      this.gameState.toDefaultState();
      this.reStart("bot");
    }
  }

  renderField(object) {
    this.gamePlay.redrawPositions(object);
  }
  setTeams(character) {
    if (this.checkPlayerCharacters(character)) {
      const position = this.generatePosition(
        this.playerAblePositions,
        "player"
      );
      this.gameState.setPositions(new PositionedCharacter(character, position));
      this.playerAblePositions = this.playerAblePositions.filter(
        (el) => el !== position
      );
    } else {
      const position = this.generatePosition(this.botAblePositions, "bot");
      this.gameState.setPositions(new PositionedCharacter(character, position));
      this.botAblePositions = this.botAblePositions.filter(
        (el) => el !== position
      );
    }
  }

  action(index, arg) {
    if (arg === "attack") {
      const attacker = this.gameState.activeCharacter.character;
      const target = this.gameState.getCharacter(index);

      if (target === null) {
        throw new Error("В цели атаки отсутствует персонаж");
      }

      const damage = Math.ceil(
        Math.max(
          attacker.attack - target.character.defence,
          attacker.attack * 0.1
        )
      );

      if (target.character.health - damage < 0) {
        target.character.health = 0;
      } else {
        target.character.health -= damage;
      }

      this.gamePlay
        .showDamage(index, damage)
        .then(() => {
          this.gameState.addScore(this.gameState.activeTeam, damage);
          this.gamePlay.deselectCell(index);
          if (target.character.health === 0) {
            this.gameState.deleteCharacter(target.position);
            if (this.gameState.playerTeam.characters.length === 0) {
              GamePlay.showMessage("Вы проиграли");
              this.finishGame("GameOver");
              return;
            }
            if (this.gameState.botTeam.characters.length === 0) {
              GamePlay.showMessage("Вы победили");
              if (this.gameState.level !== 4) {
                this.reStart("player");
                return;
              }
              GamePlay.showMessage("Поздравляю! Вы прошли всю игру! Ваш счет: " + this.gameState.getScore());
              this.finishGame("OverWin");
              return;
            }
          }
          this.renderField(this.gameState.getPositions());
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          this.passMove();
        });
    } else if (arg === "go") {
      if (this.gameState.activeTeam === "playerTeam") {
        this.gameState.update(index);
      } else {
        this.gameState.update(index);
      }
      this.renderField(this.gameState.getPositions());

      this.passMove();
    }
  }

  finishGame(arg) {
    this.gamePlay.deselectCell(this.activitedCell);
    this.gameState.state = arg;
    this.gamePlay.drawUi("prairie");
    this.renderField([]);

    if (!this.activitedNewGameListener) {
      this.gamePlay.addNewGameListener(() => this.onNewGameClick());
    }
  }

  reStart(arg) {
    this.gamePlay.deselectCell(this.activitedCell);
    this.setAblePositions(this.boardSize);
    this.gameState.toStartState();
    this.gameState.state = "inProcess";
      if (arg === "bot") {
        this.gameState.botTeam.clearAll();
        const { level, maxCharacters } = this.gameState.getSettings();
        this.createTeams(level, maxCharacters, []);
      } else {
        const newCharacters = this.gameState.upLevel();
        const { level, theme, maxCharacters } = this.gameState.getSettings();
        this.gamePlay.drawUi(theme);
        this.createTeams(level, maxCharacters, newCharacters);
      }
  
      this.renderField(this.gameState.getPositions());    
  }

  passMove() {
    if (this.gameState.state === "inProcess") {
      this.gameState.changeTeam();
      if (this.gameState.activeTeam === "playerTeam") {
        const activeCharacter = this.gameState.playerTeam.getActiveCharacter();
        if (activeCharacter) {
          this.gameState.setActiveCharacter(activeCharacter.position);
          this.gamePlay.selectCell(this.gameState.activeCharacter.position);
        }
      }

      if (this.gameState.activeTeam === "botTeam") {
        this.botDoing();
      }
    }
  }

  botDoing() {
    const randomNumber = Math.floor(
      Math.random() *
        this.gameState[this.gameState.activeTeam].characters.length
    );
    const actCharPos =
      this.gameState[this.gameState.activeTeam].characters[randomNumber]
        .position;

    this.gameState.setActiveCharacter(actCharPos);
    const { goAbleFields, attackAbleFields } = this.gameState.getAbleMotions(
      actCharPos,
      this.gameState.activeCharacter.character.type,
      this.boardSize
    );
    const targets = [];
    this.gameState[this.gameState.nextTeam]
      .getAllPositions()
      .forEach((item) => {
        attackAbleFields.forEach((el) => {
          if (el === item) {
            targets.push(el);
          }
        });
      });
    if (targets.length > 0) {
      if (targets.length === 1) {
        this.action(targets[0], "attack");
      } else {
        this.action(
          targets[Math.floor(Math.random() * targets.length)],
          "attack"
        );
      }
    } else {
      const goIndex = Math.floor(Math.random() * goAbleFields.length);
      this.action(goAbleFields[goIndex], "go");
    }
  }
  onCellClick(index) {
    if (
      this.gameState.state === "inProcess" &&
      this.gameState.activeTeam === "playerTeam"
    ) {
      if (!this.gameState.activeCharacter) {
        if (this.gameState.playerTeam.has(index)) {
          this.gameState.setActiveCharacter(index);
          this.gamePlay.selectCell(index);
          return;
        }
        GamePlay.showError("Ошибка! Необходимо выбрать активного игрока");
      }
      if (this.gameState.activeCharacter) {

        const { goAbleFields, attackAbleFields } =
          this.gameState.getAbleMotions(
            this.gameState.activeCharacter.position,
            this.gameState.activeCharacter.character.type,
            this.boardSize
          );

        if (
          this.gameState.playerTeam.has(index) &&
          this.gameState.activeCharacter.position !== index
        ) {
          this.gamePlay.deselectCell(this.gameState.activeCharacter.position);
          this.gameState.setActiveCharacter(index);
          this.gamePlay.selectCell(this.gameState.activeCharacter.position);
        } else if (
          !this.gameState.playerTeam.has(index) &&
          !this.gameState.activeCharacter.position !== index
        ) {
          if (
            goAbleFields.includes(index) &&
            !this.gameState.botTeam.has(index)
          ) {
            this.gamePlay.deselectCell(this.gameState.activeCharacter.position);
            this.action(index, "go");
          } else if (
            attackAbleFields.includes(index) &&
            this.gameState.botTeam.has(index)
          ) {
            this.gamePlay.deselectCell(this.gameState.activeCharacter.position);
            this.action(index, "attack");
          } else {
            GamePlay.showError(
              "Ошибка. Недопустимое действие выбранного персонажа"
            );
          }
        }
      }
    }
  }
  onCellEnter(index) {
    if (this.gameState.activeTeam === "playerTeam") {
      if (this.gameState.activeCharacter !== null) {
        const { goAbleFields, attackAbleFields } =
          this.gameState.getAbleMotions(
            this.gameState.activeCharacter.position,
            this.gameState.activeCharacter.character.type,
            this.boardSize
          );
        if (
          goAbleFields.includes(index) &&
          !this.gameState.playerTeam.has(index) &&
          !this.gameState.botTeam.has(index)
        ) {
          this.gamePlay.selectCell(index, "green");
          this.gamePlay.setCursor(cursors.pointer);
          this.activitedCell = index;
        } else if (
          attackAbleFields.includes(index) &&
          !this.gameState.playerTeam.has(index) &&
          this.gameState.botTeam.has(index)
        ) {
          this.gamePlay.selectCell(index, "red");
          this.gamePlay.setCursor(cursors.crosshair);
          this.activitedCell = index;
        } else if (
          (!goAbleFields.includes(index) &&
            !attackAbleFields.includes(index) &&
            !this.gameState.playerTeam.has(index)) ||
          (attackAbleFields.includes(index) &&
            !this.gameState.playerTeam.has(index)) ||
          (goAbleFields.includes(index) &&
            !attackAbleFields.includes(index) &&
            this.gameState.botTeam.has(index))
        ) {
          this.gamePlay.setCursor(cursors.notallowed);
        }
      }

      this.gameState.playerTeam.characters.forEach((el) => {
        if (el.position === index) {
          this.gamePlay.showCellTooltip(
            GameController.generateMessage(el.character),
            index
          );
          this.gamePlay.setCursor(cursors.pointer);
          this.activitedCell = index;
        }
      });
    }
  }

  onCellLeave(index) {
    if (this.gameState.activeTeam === "playerTeam") {
      this.gameState.playerTeam.getAllPositions().forEach((el) => {
        if (el === index) {
          this.gamePlay.hideCellTooltip(index);
        }

        this.gamePlay.setCursor(cursors.auto);
      });
      if (
        this.gameState.activeCharacter &&
        this.activitedCell === index &&
        this.activitedCell !== this.gameState.activeCharacter.position
      ) {
        this.gamePlay.deselectCell(this.activitedCell);
      }
    }
  }
}
