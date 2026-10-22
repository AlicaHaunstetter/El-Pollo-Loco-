class CollectableObject extends MovableObject {
  IMAGES_COIN = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  IMAGES_BOTTLE = ["img/6_salsa_bottle/1_salsa_bottle_on_ground.png"];

  images;

  constructor(type, x, y) {
    super();
    if (type == "coin") {
      this.images = this.IMAGES_COIN;
      this.width = 100;
      this.height = 100;
      this.offset = {
        top: 35,
        left: 35,
        right: 35,
        bottom: 35,
      };
    } else {
      this.images = this.IMAGES_BOTTLE;
      this.width = 80;
      this.height = 80;
      this.offset = {
        top: 15,
        left: 35,
        right: 15,
        bottom: 9,
      };
    }
    this.loadImage(this.images[0]);
    this.loadImages(this.images);
    this.x = x;
    this.y = y;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.images);
    }, 300);
  }
}
