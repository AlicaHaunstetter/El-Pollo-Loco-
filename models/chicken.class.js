class Chicken extends MovableObject {
  height = 70;
  width = 70;
  y = 295;

  offset = {
    top: 5,
    left: 30,
    right: 30,
    bottom: 30,
  };

  IMAGES_WALKING_NORMAL = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DEAD_NORMAL = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  IMAGES_WALKING_SMALL = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGES_DEAD_SMALL = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  imagesWalking;
  imagesDead;

  constructor(type) {
    super();
    if (type == "small") {
      this.imagesWalking = this.IMAGES_WALKING_SMALL;
      this.imagesDead = this.IMAGES_DEAD_SMALL;
      this.height = 50;
      this.width = 50;
      this.y = 315;
      this.offset = {
        top: 0,
        left: 21,
        right: 21,
        bottom: 21,
      };
      this.x = 700 + Math.random() * 500;
      this.speed = 0.5 + Math.random() * 0.5;
    } else {
      this.imagesWalking = this.IMAGES_WALKING_NORMAL;
      this.imagesDead = this.IMAGES_DEAD_NORMAL;
      this.x = 200 + Math.random() * 500;
      this.speed = 0.15 + Math.random() * 0.5;
    }
    this.loadImage(this.imagesWalking[0]);
    this.loadImages(this.imagesWalking);
    this.loadImages(this.imagesDead);
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (!this.isDead()) {
        this.moveLeft();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.imagesDead);
      } else {
        this.playAnimation(this.imagesWalking);
      }
    }, 100);
  }
}
