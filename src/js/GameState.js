import Team from './Team';

export default class GameState {
  constructor() {
    this.level = 1;
    this.themes = ['prairie', 'desert', 'arctic', 'mountain'];
    this.activeTeam = 'playerTeam';
    this.nextTeam = 'botTeam';
    this.playerTeam = new Team();
    this.botTeam = new Team();
    this.activeCharacter = null;
    this.score = { playerTeam: 0, botTeam: 0 };
    this.iGameState = 'inProcess';
  }

  loadState(level, score) {
    this.level = level;
    this.score = score;

    return this.themes[level - 1];
  }

  getSettings() {
    const settings = {
      level: this.level,
      theme: this.themes[this.level - 1],
      maxCharacters: 4,
    };
    return settings;
  }

  set state(arg) {
    this.iGameState = arg;
  }

  get state() {
    return this.iGameState;
  }

  clearAll() {
    this.playerTeam = new Team();
    this.botTeam = new Team();
  }

  getCharacter(index) {
    if (this.playerTeam.has(index)) {
      return this.playerTeam.getCharacter(index);
    }
    if (this.botTeam.has(index)) {
      return this.botTeam.getCharacter(index);
    }
    return null;
  }

  setPositions(object) {
    if (
      object.character.type === 'swordsman'
      || object.character.type === 'bowman'
      || object.character.type === 'magician'
    ) {
      this.playerTeam.add(object);
    } else {
      this.botTeam.add(object);
    }
  }

  getPositions() {
    return [...this.playerTeam.characters, ...this.botTeam.characters];
  }

  update(index) {
    this[this.activeTeam].changePosition(this.activeCharacter.position, index);
    this.activeCharacter.position = index;
  }

  changeTeam() {
    if (this.activeTeam === 'playerTeam') {
      this.playerTeam.saveActiveCharacter(this.activeCharacter);
      this.activeCharacter = null;
    }

    this.activeTeam = this.activeTeam === 'playerTeam' ? 'botTeam' : 'playerTeam';
    this.nextTeam = this.nextTeam === 'botTeam' ? 'playerTeam' : 'botTeam';
    this.activeCharacter = null;
  }

  addScore(arg, score) {
    this.score[arg] += score;
  }

  getScore() {
    return `player: ${this.score.playerTeam}, bot: ${this.score.botTeam}`;
  }

  getCells(boardSize, able, pos) {
    const horizontal = [];
    let ableIndexes = [];

    for (let i = -able; i <= able; i += 1) {
      const num = pos + i;
      if (
        !((num % boardSize) - (pos % boardSize) > able)
        && Math.floor(num / boardSize) === Math.floor(pos / boardSize)
      ) {
        horizontal.push(num);
      }
    }

    horizontal.forEach((el) => {
      for (let i = -able; i <= able; i += 1) {
        const index = el - boardSize * i;
        if (index >= 0 && index <= 63) {
          ableIndexes.push(index);
        }
      }
    });

    this[this.activeTeam].getAllPositions().forEach((item) => {
      ableIndexes = ableIndexes.filter((el) => el !== item);
    });

    return ableIndexes;
  }

  getAbleMotions(pos, type, boardSize) {
    let fieldSettings = {};
    if (this.activeCharacter) {
      const settings = {
        boardSize,
        position: pos,
        goDist: null,
        attackDist: null,
        type,
      };
      if (settings.type === 'swordsman' || settings.type === 'undead') {
        settings.goDist = 4;
        settings.attackDist = 1;
      } else if (settings.type === 'bowman' || settings.type === 'vampire') {
        settings.goDist = 2;
        settings.attackDist = 2;
      } else {
        settings.goDist = 1;
        settings.attackDist = 4;
      }
      fieldSettings = {
        goAbleFields: this.getCells(
          settings.boardSize,
          settings.goDist,
          settings.position,
        ),
        attackAbleFields: this.getCells(
          settings.boardSize,
          settings.attackDist,
          settings.position,
        ),
      };

      this[this.nextTeam].getAllPositions().forEach((el) => {
        fieldSettings.goAbleFields = fieldSettings.goAbleFields.filter(
          (item) => item !== el,
        );
      });
    }
    return fieldSettings;
  }

  deleteCharacter(index) {
    if (this.playerTeam.has(index)) {
      this.playerTeam.remove(index);
    } else if (this.botTeam.has(index)) {
      this.botTeam.remove(index);
    } else {
      throw new Error(
        'Ошибка в deleteCharacter. Искомый индекс отсутствует у команд',
      );
    }
  }

  setActiveCharacter(index) {
    if (this.playerTeam.has(index)) {
      this.activeCharacter = this.playerTeam.getCharacter(index);
      this.playerTeam.saveActiveCharacter(this.activeCharacter);
    } else if (this.botTeam.has(index)) {
      this.activeCharacter = this.botTeam.getCharacter(index);
    } else {
      throw new Error(
        'Ошибка в setActiveCharacter. Искомый индекс отсутствует у команд',
      );
    }
  }

  toDefaultState() {
    this.level = 1;
    this.playerTeam.clearAll();
  }

  toStartState() {
    this.activeTeam = 'playerTeam';
    this.nextTeam = 'botTeam';
    this.activeCharacter = null;
  }

  upLevel() {
    this.level += 1;
    const upperTeam = this.playerTeam.levelUp();
    this.playerTeam.clearAll();
    this.botTeam.clearAll();
    return upperTeam;
  }
}