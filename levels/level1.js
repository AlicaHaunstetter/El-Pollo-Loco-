const level1 = new Level(
  [
    new Chicken("normal"),
    new Chicken("normal"),
    new Chicken("normal"),
    new Chicken("small"),
    new Chicken("small"),
    new Endboss(),
  ],
  [new Cloud()],

  [
    new BackgroundObject("img/5_background/layers/air.png", -720),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -20),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -720),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -720),
    new BackgroundObject("img/5_background/layers/air.png", 0),
    new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/air.png", 720),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 720),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 720),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 720),
    new BackgroundObject("img/5_background/layers/air.png", 720 * 2),
    new BackgroundObject(
      "img/5_background/layers/3_third_layer/1.png",
      720 * 2,
    ),
    new BackgroundObject(
      "img/5_background/layers/2_second_layer/1.png",
      720 * 2,
    ),
    new BackgroundObject(
      "img/5_background/layers/1_first_layer/1.png",
      720 * 2,
    ),

    new BackgroundObject("img/5_background/layers/air.png", 720 * 3),
    new BackgroundObject(
      "img/5_background/layers/3_third_layer/2.png",
      720 * 3,
    ),
    new BackgroundObject(
      "img/5_background/layers/2_second_layer/2.png",
      720 * 3,
    ),
    new BackgroundObject(
      "img/5_background/layers/1_first_layer/2.png",
      720 * 3,
    ),
  ],
  [
    new CollectableObject("coin", 400, 150),
    new CollectableObject("coin", 480, 100),
    new CollectableObject("coin", 560, 150),
    new CollectableObject("coin", 1200, 150),
    new CollectableObject("coin", 1280, 150),
  ],
  [
    new CollectableObject("bottle", 300, 290),
    new CollectableObject("bottle", 800, 290),
    new CollectableObject("bottle", 1000, 290),
    new CollectableObject("bottle", 1500, 290),
    new CollectableObject("bottle", 1800, 290),
  ],
);
