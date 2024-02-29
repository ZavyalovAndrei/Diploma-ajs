import Character from "../Character";

export class Magician extends Character {
    constructor(level) {
        super(level);
        this.attack = 10;
        this.defence = 40;
        this.health = 100;
        this.type = "magician";
    }
}