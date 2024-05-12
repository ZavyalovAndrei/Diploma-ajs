/**
 * Базовый класс, от которого наследуются классы персонажей
 * @property level - уровень персонажа, от 1 до 4
 * @property attack - показатель атаки
 * @property defence - показатель защиты
 * @property health - здоровье персонажа
 * @property type - строка с одним из допустимых значений:
 * swordsman
 * bowman
 * magician
 * daemon
 * undead
 * vampire
 */

export default class Character {
  constructor(level, type = 'generic') {
    this.level = level;
    this.attack = 0;
    this.defence = 0;
    this.health = 100;
    this.type = type;

    if (new.target.name === 'Character') {
      throw new Error('Ошибка! Невозможно создать нового персонажа.');
    }
  }

  levelUp() {
    this.level ++;
    this.attack = Math.ceil(
      Math.max(
        this.attack,
        (this.attack * (80 + this.health)) / 100,
      ),
    );
    this.defence = Math.ceil(
      Math.max(
        this.defence,
        (this.defence * (80 + this.health)) / 100,
      ),
    );
    if (this.health + 80 > 100) {
      this.health = 100;
    } else this.health += 80;
  }
}