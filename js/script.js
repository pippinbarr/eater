/**
 * Eater
 * Pippin Barr and Felix Barr
 * 
 */

"use strict";

let level = undefined;

let moveSFX;
let collectSFX;

let instructions;

function preload() {
    moveSFX = loadSound("assets/sounds/move.wav");
    collectSFX = loadSound("assets/sounds/collect.wav")
}

function setup() {
    let canvas = createCanvas(400, 400);
    instructions = createP();

    level = new DeadCity();
    level.setup();
}

function draw() {
    level.draw();
}

function keyPressed(event) {
    level.keyPressed(event);
}