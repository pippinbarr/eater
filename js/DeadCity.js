class DeadCity {
    constructor() {
        this.tileSize = 16;

        this.backgroundColour = "#aaaaaa";

        this.player = {
            x: this.tileSize / 2,
            y: this.tileSize / 2,
            emoji: "👹",
            moveSFX: moveSFX
        };

        this.world = [
            [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
            [" ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " "],
            [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
            [" ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " "],
            [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
            [" ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " "],
            [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
            [" ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " "],
            [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
            [" ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " "],
            [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
            [" ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " "],
            [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
            [" ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " "],
            [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
            [" ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " "],
            [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
            [" ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " "],
            [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "]
        ];
        this.columns = this.world[0].length;
        this.rows = this.world.length;
        console.log(this.rows, this.columns);
        this.instructions = "ARROW KEYS to MOVE / HIT to FIGHT";
    }

    setup() {
        resizeCanvas(this.tileSize * this.columns, this.tileSize * this.rows);
        instructions.html(this.instructions);
    }

    draw() {
        background(this.backgroundColour);

        // Debug, draw grid
        // this.drawGrid();

        this.drawTombs();
        this.drawPlayer();
    }

    drawGrid() {
        for (let x = 0; x <= this.columns; x++) {
            line(x * this.tileSize, 0, x * this.tileSize, height);
        }
        for (let y = 0; y <= this.rows; y++) {
            line(0, y * this.tileSize, width, y * this.tileSize);
        }
    }

    drawTombs() {
        for (let row = 0; row < this.world.length; row++) {
            for (let col = 0; col < this.world[row].length; col++) {
                const tile = this.world[row][col];
                const x = this.tileSize / 2 + col * this.tileSize;
                const y = this.tileSize / 2 + row * this.tileSize;
                if (tile !== " ") {
                    push();
                    textAlign(CENTER, CENTER);
                    textSize(this.tileSize);
                    // console.log(x, y, tile);
                    text(tile, x + this.tileSize / 8, y + this.tileSize / 20);
                    pop();
                }
            }
        }
    }

    drawPlayer() {
        push();
        textAlign(CENTER, CENTER);
        textSize(this.tileSize);
        text(this.player.emoji, this.player.x + this.tileSize / 8, this.player.y + this.tileSize / 20);
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
            this.player.moveSFX.play();
        }
    }
}
