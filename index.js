/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top) // Top limit?
  // rocks are 20px high, DODGER is 20px high, GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left) // Left limit
    const dodgerRightEdge = dodgerLeftEdge + 40;// The DODGER is 40 pixels wide -- how do we get the right edge?
    const rockLeftEdge = positionToInteger(rock.style.left)// rock lefe edge
    const rockRightEdge = rockLeftEdge + 20;//The rock is 20 pixel's wide -- how do we get the right edge?
    if ((rockLeftEdge<=dodgerLeftEdge&&rockRightEdge>= dodgerLeftEdge)||(rockLeftEdge>=dodgerLeftEdge&&rockRightEdge<=dodgerRightEdge)||(rockLeftEdge<=dodgerRightEdge&&rockRightEdge>=dodgerRightEdge)) {
      //The rock left edge is <= the DODGER left edge + rock right edge is >= DODGER left edge;
      //The rock left edge is >= the DODGER left edge + rock right edge is <= DODGER right edge;
      //The rock left edge is <= the DODGER right edge + rock right edge is >= the DODGER right edge
      return true
    }
  }
}


function createRock(x) {
  const rock = document.createElement('div')
  rock.className = 'rock' //define rock
  rock.style.left = `${x}px` //css style specifies left position of the element
  var top = 0// Using Var because it is ref later
  rock.style.top = top //css style specifies top position of the element
  GAME.appendChild(rock);//Now that we have a rock, need to append to GAME + move it downwards.
  function moveRock() {
    rock.style.top = `${top+=2}px`//fxn moves rock. (2 pixels /time)
    if (checkCollision(rock)) {
      return endGame();
      //If a rock collides with the DODGER,we should call endGame().
    } else if (top<GAME_HEIGHT) {
      window.requestAnimationFrame(moveRock);
      //Otherwise, if the rock hasn't reached the bottom of the GAME, we want to move it again.
    } else {
      $('rock').remove();
      //If the rock reached the bottom of the GAME, we should remove the rock from the DOM.
    }
    moveRock();
  }

  // We should kick off the animation of the rock around here.
  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision.
  ROCKS.push(rock)

  // Finally, return the rock element you've created.
  return rock
}


/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
}

function moveDodger(e) {
  // implement me!
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */
}

function moveDodgerLeft() {
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
}

function moveDodgerRight() {
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
