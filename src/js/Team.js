
/**
 * Класс, представляющий персонажей команды
 *
 * @todo Самостоятельно продумайте хранение персонажей в классе
 * Например
 * @example
 * ```js
 * const characters = [new Swordsman(2), new Bowman(1)]
 * const team = new Team(characters);
 *
 * team.characters // [swordsman, bowman]
 * ```
 * */
export default class Team {
  constructor() {
    this.characters = [];
    this.activeCharacter = null;
  }

  add(object) {
    this.characters.push(object);
  }

  saveActiveCharacter(object) {
    this.activeCharacter = object;
  }

  getActiveCharacter() {
        return this.activeCharacter;
  }

  deleteActiveCharacter() {
    this.activeCharacter = null;
  }

  getAllPositions() {
    const positions = [];
    this.characters.forEach((el, i) => {
      positions.push(this.characters[i].position);
    });
    return positions;
  }

  changePosition(oldIndex, index) {
    if (oldIndex === null || oldIndex === undefined) {
      throw new Error(
        'Ошибка в методе ChangePosition. Отсутствует позиция активного игрока',
      );
    }
    this.characters.forEach((el, i) => {
      if (el.position === oldIndex) {
        this.characters[i].position = index;
      }
    });
  }

  
  getTeam() {
    return [...this.characters]
  }

  getCharacter(index) {
    return this.characters.find((el) => el.position === index);
  }

  has(index) {
    let result = false;
    this.characters.forEach((el) => {
      if (el.position === index) {
        result = true;
      }
    });
    return result;
  }

  clearAll() {
    this.characters = [];
    this.activeCharacter = null;
  }

  remove(index) {
    this.characters = this.characters.filter((character) => character.position !== index);
    if (
      this.activeCharacter !== null
      && this.activeCharacter.position === index
    ) {
      this.deleteActiveCharacter();
    }
  }
}
