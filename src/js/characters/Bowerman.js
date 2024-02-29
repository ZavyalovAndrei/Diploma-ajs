import Character from "../Character";

export class Bowerman extends Character {
    constructor(level) {
        super(level);
        this.attack = 25;
        this.defence = 25;
        this.health = 100;
        this.type = "bowerman";
    }
}