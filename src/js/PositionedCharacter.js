import Character from "./Character";

export default class PositionedCharacter {
  constructor(character, position) {
    if (!(character instanceof Character)) {
      throw new Error(
        "Персонаждолжен быть экземпляром класса Character "
      );
    }

    if (typeof position !== "number") {
      throw new Error("Должнобыть введено число");
    }

    this.character = character;
    this.position = position;
  }
}
