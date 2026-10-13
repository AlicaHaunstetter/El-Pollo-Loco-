class Character extends MovableObject {
  height = 250;
  width = 125;

  y = 130;

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
  }

  jump() {}
}
