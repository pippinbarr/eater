class SunnyDay {
    constructor() {
        this.tileSize = 32;
        this.rows = 10;
        this.columns = 10;

        this.backgroundColour = "#ce87c9";

        this.player = {
            x: this.tileSize / 2,
            y: this.tileSize / 2,
            size: this.tileSize,
            shrinkRate: 1,
            colour: "#87ceeb",
            moveSFX: moveSFX
        };

        this.food = {
            x: undefined,
            y: undefined,
            size: this.tileSize,
            colour: "#ceeb87",
            collectSFX: collectSFX
        };

        this.instructions = "ARROW KEYS to MOVE / EAT to LIVE";
    }

    setup() {
        resizeCanvas(this.tileSize * this.columns, this.tileSize * this.rows);
        instructions.html(this.instructions);
        this.resetFood();
    }

    draw() {
        background(this.backgroundColour);

        this.checkFood();
        this.drawFood();
        this.drawPlayer();
    }

    checkFood() {
        // Check if the playerA got the food (i.e. is in the same location)
        // Collect it and play the sound if so
        if (this.player.x === this.food.x && this.player.y === this.food.y) {
            this.resetFood();
            this.player.size = constrain(this.player.size + 14, 0, this.tileSize);
            this.food.collectSFX.play();
        }
    }

    resetFood() {
        this.food.x = floor(random(this.columns)) * this.tileSize + this.tileSize / 2;
        this.food.y = floor(random(this.rows)) * this.tileSize + this.tileSize / 2;
    }

    drawFood() {
        push();
        noStroke();
        fill(this.food.colour);
        ellipse(this.food.x, this.food.y, this.food.size);
        pop();
    }

    drawPlayer() {
        push();
        noStroke();
        rectMode(CENTER);
        fill(this.player.colour);
        rect(this.player.x, this.player.y, this.player.size);
        pop();
    }

    keyPressed(event) {
        // Check if it was one of the arrows and choose the move
        // direction
        let move = {
            x: 0,
            y: 0
        };
        if (event.keyCode === RIGHT_ARROW) {
            move.x = this.tileSize;
        }
        else if (event.keyCode === LEFT_ARROW) {
            move.x = -this.tileSize;
        }
        else if (event.keyCode === UP_ARROW) {
            move.y = -this.tileSize;
        }
        else if (event.keyCode === DOWN_ARROW) {
            move.y = this.tileSize;
        }
        // Apply the movement if there is any
        // and play the sound effect
        if (move.x !== 0 || move.y !== 0) {
            this.player.x += move.x;
            this.player.y += move.y;
            this.player.size = constrain(this.player.size - this.player.shrinkRate, 0, this.tileSize);
            this.player.moveSFX.play();

            if (this.player.size <= 0) {
                level = new BacteriaCity();
                level.setup();
            }
        }
    }
}