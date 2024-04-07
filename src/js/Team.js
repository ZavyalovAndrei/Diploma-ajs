
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
    if (this.activeCharacter) {
      return this.activeCharacter;
    }
    return null;
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

  levelUp() {
    for (const el of this.characters) {
      el.character.level += 1;
      el.character.attack = Math.ceil(
        Math.max(
          el.character.attack,
          (el.character.attack * (80 + el.character.health)) / 100,
        ),
      );
      el.character.defence = Math.ceil(
        Math.max(
          el.character.defence,
          (el.character.defence * (80 + el.character.health)) / 100,
        ),
      );
      if (el.character.health + 80 > 100) {
        el.character.health = 100;
      } else el.character.health += 80;
    }

    const arr = [];
    this.characters.forEach((item) => arr.push(item.character));

    return arr;
  }

  getTeam() {
    const team = [];
    this.characters.forEach((el) => team.push(el.character));
    return team;
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
    this.characters.forEach((el, i) => {
      if (el.position === index) {
        this.characters.splice(i, 1);
      }
    });
    if (
      this.activeCharacter !== null
      && this.activeCharacter.position === index
    ) {
      this.deleteActiveCharacter();
    }
  }
}
