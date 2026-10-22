class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBarHealth = new StatusBar("heart", 50, 0, 100);
  statusBarCoin = new StatusBar("coin", 50, 45, 0);
  statusBarBottle = new StatusBar("bottle", 50, 90, 0);
  statusBarEndboss = new StatusBar("endboss", 470, 0, 100);
  throwableObjects = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarCoin);
    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusBarEndboss);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        enemy.world = this;
      }
    });
  }

  run() {
    setInterval(() => {
      this.checkJumpOnChicken();
      this.checkCollisions();
      this.checkCollectables();
      this.checkThrowObjects();
      this.checkBottleHits();
    }, 100);

    setInterval(() => {
      this.checkJumpOnChicken();
    }, 1000 / 60);
  }

  checkThrowObjects() {
    if (this.keyboard.D && this.character.bottles > 0) {
      let x = this.character.x + 70;
      if (this.character.otherDirection) {
        x = this.character.x - 40;
      }
      let bottle = new ThrowableObject(x, this.character.y + 20, this.character.otherDirection);
      this.throwableObjects.push(bottle);
      this.character.bottles--;
      this.statusBarBottle.setPercentage(this.character.bottles * 20);
    }
    this.keyboard.D = false;
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !enemy.isDead() && !this.character.isHurt()) {
        this.character.hit();
        this.statusBarHealth.setPercentage(this.character.energy);
      }
    });
  }

  checkBottleHits() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (enemy instanceof Endboss && !enemy.isDead() && bottle.isColliding(enemy)) {
          enemy.hit();
          this.statusBarEndboss.setPercentage(enemy.energy);
          this.throwableObjects.splice(this.throwableObjects.indexOf(bottle), 1);
        }
      });
    });
  }

  checkCollectables() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        this.character.coins++;
        this.statusBarCoin.setPercentage(this.character.coins * 10);
        this.level.coins.splice(this.level.coins.indexOf(coin), 1);
      }
    });

    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle) && this.character.bottles < 5) {
        this.character.bottles++;
        this.statusBarBottle.setPercentage(this.character.bottles * 20);
        this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
      }
    });
  }

  checkJumpOnChicken() {
    this.level.enemies.forEach((enemy) => {
      if (
        enemy instanceof Chicken &&
        !enemy.isDead() &&
        this.character.isColliding(enemy) &&
        this.character.speedY < 0
      ) {
        this.killChicken(enemy);
      }
    });
  }

  killChicken(chicken) {
    chicken.energy = 0;
    this.character.speedY = 15;
    setTimeout(() => {
      let index = this.level.enemies.indexOf(chicken);
      this.level.enemies.splice(index, 1);
    }, 2000);
  }
}
