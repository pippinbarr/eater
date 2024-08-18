// The size of a single tile
const tileSize = 32;

// Dimensions of the "world"
const rows = 10;
const columns = 10;

const backgroundColour = "#CE87C9";

// The playerA
const playerA = {
    // Position and size
    x: tileSize / 2,
    y: tileSize / 2,
    size: tileSize,
    // Colour
    fill: "#87ceeb",
    // Sound effect
    moveSFX: undefined
};

// The food
const food = {
    // Position and size
    x: tileSize * 5 + tileSize / 2,
    y: tileSize * 6 + tileSize / 2,
    size: tileSize,
    // Colour
    fill: "#ceeb87",
    // Has it been picked up yet?
    collected: false,
    // Sound effect
    collectSFX: undefined
};

const sunnyDay = {
    setup: setupItsASunnyDay,
    draw: drawItsASunnyDay,
    keyPressed: keyPressedSunnyDay
}

function setupItsASunnyDay() {
    resizeCanvas(tileSize * columns, tileSize * rows);
    playerA.moveSFX = moveSFX;
    food.collectSFX = collectSFX;
}

/**
 * Display the playerA and food, check overlap
 */
function drawItsASunnyDay() {
    background(backgroundColour);

    // Check if the playerA got the food (i.e. is in the same location)
    // Collect it and play the sound if so
    if (playerA.x === food.x && playerA.y === food.y && !food.collected) {
        food.x = floor(random(columns)) * tileSize + tileSize / 2;
        food.y = floor(random(rows)) * tileSize + tileSize / 2;
        playerA.size = constrain(playerA.size + 14, 0, tileSize);
        food.collectSFX.play();
    }

    // The food
    // Only display it if is *hasn't* been collected!
    if (!food.collected) {
        push();
        noStroke();
        fill(food.fill);
        ellipse(food.x, food.y, food.size);
        pop();
    }

    // The playerA
    push();
    noStroke();
    rectMode(CENTER);
    fill(playerA.fill);
    rect(playerA.x, playerA.y, playerA.size, playerA.size);
    pop();
}

/**
 * Respond to a keypress
 */
function keyPressedSunnyDay(event) {
    // Check if it was one of the arrows and choose the move
    // direction
    let move = {
        x: 0,
        y: 0
    };
    if (event.keyCode === RIGHT_ARROW) {
        move.x = tileSize;
    }
    else if (event.keyCode === LEFT_ARROW) {
        move.x = -tileSize;
    }
    else if (event.keyCode === UP_ARROW) {
        move.y = -tileSize;
    }
    else if (event.keyCode === DOWN_ARROW) {
        move.y = tileSize;
    }
    // Apply the movement if there is any
    // and play the sound effect
    if (move.x !== 0 || move.y !== 0) {
        playerA.x += move.x;
        playerA.y += move.y;
        playerA.size = constrain(playerA.size - 2, 0, tileSize);
        playerA.moveSFX.play();

        if (playerA.size === 0) {
            level = bacteriaCity;
            level.setup();
        }
    }
}

