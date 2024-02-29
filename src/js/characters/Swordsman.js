import Character from "../Character";

export class Swordsman extends Character {
    constructor(level) {
        super(level);
        this.attack = 40;
        this.defence = 10;
        this.health = 100;
        this.type = "swordsman";
    }
}