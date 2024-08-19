class BacteriaCity {
    constructor() {
        this.player = {
            x: 160,
            y: 160,
            size: 10,
            angle: 0,
            speed: 5,
            turnSpeed: 0.3,
            health: 5
        }

        this.numBacteria = 10;
        this.bacteria = [];
        this.bacteriaSpeech = [
            "Hello.",
            "Good to see you.",
            "Any questions?",
            "What did you do today?",
            "Is it a good day?"
        ];

        this.numHouses = 5;
        this.houses = [];

        this.ui = {
            currentSpeech: ""
        };

        this.instructions = "LEFT/RIGHT to TURN / UP to MOVE / EAT to LIVE / TOUCH to CHAT";
    }

    setup() {
        resizeCanvas(320, 320);

        this.createBacteria();
        this.createHouses();

        background("#888888");
        this.step();

        instructions.html(this.instructions);
    }

    createBacteria() {
        for (let i = 0; i < this.numBacteria; i++) {
            const bacterium = this.createBacterium();
            this.bacteria.push(bacterium);
        }
    }

    createBacterium() {
        const bacterium = {
            x: random(0, width),
            y: random(0, height),
            angle: random(0, TWO_PI),
            speed: random(1, 4),
            radius: random(2, 6),
            color: color(random(100, 255), random(100, 255), random(100, 255)),
            speech: random(this.bacteriaSpeech)
        };
        bacterium.size = bacterium.radius * 2;
        return bacterium;
    }

    createHouses() {
        for (let i = 0; i < this.numHouses; i++) {
            const house = this.createHouse();
            this.houses.push(house);
        }
    }

    createHouse() {
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

    draw() {

    }

    keyPressed(event) {

        // Check if it was one of the arrows and choose the move
        // direction
        let moved = false;

        if (event.keyCode === RIGHT_ARROW) {
            this.player.angle += this.player.turnSpeed;
            moved = true;
        }
        else if (event.keyCode === LEFT_ARROW) {
            this.player.angle -= this.player.turnSpeed;
            moved = true;
        }
        else if (event.keyCode === UP_ARROW) {
            this.player.x += cos(this.player.angle) * this.player.speed;
            this.player.y += sin(this.player.angle) * this.player.speed;
            this.player.health -= 0.1;
            moved = true;
        }

        this.step();
    }

    step() {
        background("#88888833");
        this.moveBacteria();
        this.checkPlayerBacteriaOverlap();
        this.checkPlayerFoodOverlap();
        this.drawHouses();
        this.drawPlayer();
        this.drawBacteria();
        this.drawUI();
    }

    moveBacteria() {
        for (let bacterium of this.bacteria) {
            this.moveBacterium(bacterium);
        }
    }

    moveBacterium(bacterium) {
        bacterium.x += random(-10, 10);
        bacterium.y += random(-10, 10);
    }

    checkPlayerBacteriaOverlap() {
        this.ui.currentSpeech = "";
        for (let bacterium of this.bacteria) {
            if (this.overlap(this.player, bacterium)) {
                this.ui.currentSpeech = bacterium.speech;
            }
        }
    }

    checkPlayerFoodOverlap() {
        for (let house of this.houses) {
            for (let food of house.foods) {
                if (this.overlap(this.player, food)) {
                    this.player.health++;
                    const oldFoodX = food.x;
                    food.x = -1000;
                    setTimeout(() => {
                        food.x = oldFoodX;
                    }, 10000);
                }
            }
        }
    }

    drawPlayer() {
        push();
        noStroke();

        translate(this.player.x, this.player.y);
        rotate(this.player.angle);

        rectMode(CENTER);
        fill("#87ceeb");
        rect(0, 0, this.player.size);

        fill("#ff0000");
        ellipse(this.player.size / 4, 0, this.player.size / 4);
        pop();
    }

    drawBacteria() {
        for (let bacterium of this.bacteria) {
            this.drawBacterium(bacterium);
        }
    }

    drawBacterium(bacterium) {
        push();
        strokeWeight(1);
        stroke(bacterium.color);
        translate(bacterium.x, bacterium.y);
        rotate(bacterium.angle);
        line(-bacterium.radius, 0, bacterium.radius, 0);
        line(0, -bacterium.radius, 0, bacterium.radius);
        pop();
    }

    drawHouses() {
        for (let house of this.houses) {
            this.drawHouse(house);
        }
    }

    drawHouse(house) {
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

    drawUI() {
        // Health
        push();
        fill(255, 0, 0);
        noStroke();
        translate(width - 20, 20);
        for (let health = 0; health < this.player.health; health++) {
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
        text(this.ui.currentSpeech, 0, 0);
        pop();
    }

    overlap(a, b) {
        const d = dist(a.x, a.y, b.x, b.y);
        return (d < a.size / 2 + b.size / 2);
    }
}