const playerB = {
    x: 160,
    y: 160,
    size: 10,
    angle: 0,
    speed: 5,
    turnSpeed: 0.3,
    health: 5
};

const numBacteria = 10;
const bacteria = [];
const bacteriaSpeech = [
    "Hello.",
    "Good to see you.",
    "Any questions?",
    "What did you do today?",
    "Is it a good day?"
];

const numHouses = 5;
const houses = [];
const ui = {
    currentSpeech: ""
};

const bacteriaCity = {
    setup: setupBacteriaCity,
    draw: drawBacteriaCity,
    keyPressed: keyPressedBacteriaCity
}

function setupBacteriaCity() {
    resizeCanvas(320, 320);

    createBacteria();
    createHouses();

    background("#888888");
    updateBacteriaCity();
}

function createBacteria() {
    for (let i = 0; i < numBacteria; i++) {
        const bacterium = createBacterium();
        bacteria.push(bacterium);
    }
}

function createBacterium() {
    const bacterium = {
        x: random(0, width),
        y: random(0, height),
        angle: random(0, TWO_PI),
        speed: random(1, 4),
        radius: random(2, 6),
        color: color(random(100, 255), random(100, 255), random(100, 255)),
        speech: random(bacteriaSpeech)
    };
    bacterium.size = bacterium.radius * 2;
    return bacterium;
}

function createHouses() {
    for (let i = 0; i < numHouses; i++) {
        const house = createHouse();
        houses.push(house);
    }
}

function createHouse() {
    const house = {
        x: random(0, width),
        y: random(0, height),
        size: random(30, 60),
        color: color(random(50, 150), random(50, 150), random(100, 200)),
        foods: []
    };
    for (let i = 0; i < 3; i++) {
        const food = {
            x: house.x + random(-house.size / 3, house.size / 3),
            y: house.y + random(-house.size / 3, house.size / 3),
            size: 5
        };
        house.foods.push(food);
    }
    return house;
}

function drawBacteriaCity() {

}

function keyPressedBacteriaCity() {

    // Check if it was one of the arrows and choose the move
    // direction
    let moved = false;

    if (event.keyCode === RIGHT_ARROW) {
        playerB.angle += playerB.turnSpeed;
        moved = true;
    }
    else if (event.keyCode === LEFT_ARROW) {
        playerB.angle -= playerB.turnSpeed;
        moved = true;
    }
    else if (event.keyCode === UP_ARROW) {
        playerB.x += cos(playerB.angle) * playerB.speed;
        playerB.y += sin(playerB.angle) * playerB.speed;
        playerB.health -= 0.1;
        moved = true;
    }

    updateBacteriaCity();
}

function updateBacteriaCity() {
    background("#88888833");
    moveBacteria();
    checkplayerBBacteriaOverlap();
    checkplayerBFoodOverlap();
    drawHouses();
    drawplayerB();
    drawBacteria();
    drawUI();
}

function moveBacteria() {
    for (let bacterium of bacteria) {
        moveBacterium(bacterium);
    }
}

function moveBacterium(bacterium) {
    bacterium.x += random(-10, 10);
    bacterium.y += random(-10, 10);
}

function checkplayerBBacteriaOverlap() {
    ui.currentSpeech = "";
    for (let bacterium of bacteria) {
        if (overlap(playerB, bacterium)) {
            ui.currentSpeech = bacterium.speech;
        }
    }
}

function checkplayerBFoodOverlap() {
    for (let house of houses) {
        for (let food of house.foods) {
            if (overlap(playerB, food)) {
                playerB.health++;
                const oldFoodX = food.x;
                food.x = -1000;
                setTimeout(() => {
                    food.x = oldFoodX;
                }, 10000);
            }
        }
    }
}

function drawplayerB() {
    push();
    noStroke();

    translate(playerB.x, playerB.y);
    rotate(playerB.angle);

    rectMode(CENTER);
    fill("#87ceeb");
    rect(0, 0, playerB.size, playerB.size);

    fill("#ff0000");
    ellipse(playerB.size / 4, 0, playerB.size / 4);
    pop();
}

function drawBacteria() {
    for (let bacterium of bacteria) {
        drawBacterium(bacterium);
    }
}

function drawBacterium(bacterium) {
    push();
    strokeWeight(1);
    stroke(bacterium.color);
    translate(bacterium.x, bacterium.y);
    rotate(bacterium.angle);
    line(-bacterium.radius, 0, bacterium.radius, 0);
    line(0, -bacterium.radius, 0, bacterium.radius);
    pop();
}

function drawHouses() {
    for (let house of houses) {
        drawHouse(house);
    }
}

function drawHouse(house) {
    push();
    noStroke();
    fill(house.color);
    translate(house.x, house.y);
    ellipse(0, 0, house.size);
    pop();

    for (let food of house.foods) {
        push();
        noStroke();
        fill("brown");
        ellipse(food.x, food.y, food.size);
        pop();
    }
}

function drawUI() {
    // Health
    push();
    fill(255, 0, 0);
    noStroke();
    translate(width - 20, 20);
    for (let health = 0; health < playerB.health; health++) {
        ellipse(0, 0, 10);
        translate(-15, 0);
    }
    pop();

    // Speech
    push();
    noFill();
    stroke(255);
    translate(width / 2, height - 20);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(18);
    text(ui.currentSpeech, 0, 0);
    pop();
}

function overlap(a, b) {
    const d = dist(a.x, a.y, b.x, b.y);
    return (d < a.size / 2 + b.size / 2);
}