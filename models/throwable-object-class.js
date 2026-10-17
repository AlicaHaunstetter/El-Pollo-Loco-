class ThrowableObject extends MovableObject {
  constructor() {
    super().loadImage(
      "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    );
    this.x = 100;
    this.height = 100;
    this.width = 100;
    this.throw(100, 150);
  }

  throw(x, y) {
    this.x = x;
    this.y = y;
    this.speedY = 30;
    this.applyGravity();
  }
}
