/**
 * Eater
 * Pippin Barr and Felix Barr
 * 
 */

"use strict";

let level = sunnyDay;

let moveSFX;
let collectSFX;

function preload() {
    moveSFX = loadSound("assets/sounds/move.wav");
    collectSFX = loadSound("assets/sounds/collect.wav")
}

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas();

    level.setup();
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    level.draw();
}

function keyPressed(event) {
    level.keyPressed(event);
}