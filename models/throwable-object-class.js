class ThrowableObject extends MovableObject {
  constructor(x, y, otherDirection) {
    super().loadImage(
      "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    );
    this.x = x;
    this.y = y;
    this.otherDirection = otherDirection;
    this.height = 100;
    this.width = 100;
    this.throw();
  }

  throw() {
    this.speedY = 20;
    this.applyGravity();
    setInterval(() => {
      if (this.otherDirection) {
        this.x -= 10;
      } else {
        this.x += 10;
      }
    }, 30);
  }
}
