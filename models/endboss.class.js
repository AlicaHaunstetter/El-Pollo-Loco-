class Endboss extends MovableObject {
  height = 400;
  width = 300;
  y = -15;
  speed = 2;
  damagePerHit = 20;

  offset = {
    top: 70,
    left: 20,
    right: 20,
    bottom: 30,
  };

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_WALK = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  world;
  hadFirstContact = false;

  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALK);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 2300;
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.hadFirstContact && this.currentImage >= this.IMAGES_ALERT.length && !this.isDead()) {
        if (this.distanceToCharacter() > 0) {
          this.moveRight();
          this.otherDirection = true;
        } else {
          this.moveLeft();
          this.otherDirection = false;
        }
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        this.playDeadAnimation();
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (!this.hadFirstContact) {
        this.checkFirstContact();
      } else if (this.currentImage < this.IMAGES_ALERT.length) {
        this.playAnimation(this.IMAGES_ALERT);
      } else if (this.isNearCharacter()) {
        this.playAnimation(this.IMAGES_ATTACK);
      } else {
        this.playAnimation(this.IMAGES_WALK);
      }
    }, 200);
  }

  checkFirstContact() {
    if (this.world.character.x > this.x - 620) {
      this.hadFirstContact = true;
      this.currentImage = 0;
    }
  }

  isNearCharacter() {
    return Math.abs(this.distanceToCharacter()) < 240;
  }

  distanceToCharacter() {
    let characterCenter = this.world.character.x + this.world.character.width / 2;
    let bossCenter = this.x + this.width / 2;
    return characterCenter - bossCenter;
  }
}
