import Character from "../Character";

export class Daemon extends Character {
    constructor(level) {
        super(level);
        this.attack = 10;
        this.defence = 10;
        this.health = 100;
        this.type = "daemon";
    }
}