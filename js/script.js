let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];

/**
 * Prepares the page after loading: gets the canvas and connects the touch buttons.
 */
function init() {
  canvas = document.getElementById("canvas");
  bindTouchButtons();
}

/**
 * Starts a new game. Used by START and RESTART.
 */
function startGame() {
  hideScreens();
  initLevel();
  world = new World(canvas, keyboard);
}

/**
 * Goes back from an end screen to the start screen.
 */
function showStartScreen() {
  hideScreens();
  document.getElementById("startScreen").classList.remove("d-none");
}

/**
 * Hides the start screen and both end screens.
 */
function hideScreens() {
  document.getElementById("startScreen").classList.add("d-none");
  document.getElementById("lostScreen").classList.add("d-none");
  document.getElementById("wonScreen").classList.add("d-none");
}

/**
 * Starts an interval and remembers its id so it can be stopped later.
 * @param {Function} fn - Function that runs on every interval.
 * @param {number} time - Time between two runs in milliseconds.
 */
function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}

/**
 * Stops all intervals and the drawing loop of the current game.
 */
function stopGame() {
  intervalIds.forEach((id) => {
    clearInterval(id);
  });
  intervalIds = [];
  cancelAnimationFrame(world.animationFrameId);
}

/**
 * Opens the how to play dialog.
 */
function openHelp() {
  document.getElementById("helpDialog").classList.remove("d-none");
}

/**
 * Closes the how to play dialog.
 */
function closeHelp() {
  document.getElementById("helpDialog").classList.add("d-none");
}

/**
 * Saves whether a game key is pressed.
 * D is only set on a new key press so every press throws exactly one bottle.
 * @param {KeyboardEvent} e - The keyboard event.
 * @param {boolean} isPressed - True on keydown, false on keyup.
 */
function setKey(e, isPressed) {
  if (e.keyCode == 32) {
    keyboard.SPACE = isPressed;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = isPressed;
  }
  if (e.keyCode == 39) {
    keyboard.RIGHT = isPressed;
  }
  if (e.keyCode == 68 && isPressed && !e.repeat) {
    keyboard.D = true;
  }
}

window.addEventListener("keydown", (e) => setKey(e, true));
window.addEventListener("keyup", (e) => setKey(e, false));

/**
 * Connects the four touch buttons with the keyboard keys.
 */
function bindTouchButtons() {
  bindTouchButton("btnLeft", "LEFT");
  bindTouchButton("btnRight", "RIGHT");
  bindTouchButton("btnJump", "SPACE");
  bindTouchButton("btnThrow", "D");
}

/**
 * Sets a key while the touch button is pressed and blocks the context menu.
 * D is reset by the world after throwing, so it is not reset on touchend.
 * @param {string} id - Id of the touch button.
 * @param {string} key - Name of the key in the keyboard object.
 */
function bindTouchButton(id, key) {
  let button = document.getElementById(id);
  button.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard[key] = true;
  });
  button.addEventListener("touchend", (e) => {
    e.preventDefault();
    if (key != "D") {
      keyboard[key] = false;
    }
  });
  button.addEventListener("contextmenu", (e) => e.preventDefault());
}
