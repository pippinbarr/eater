/**
 * Ideas:
 * Click on devil to make him jump and he goes hooooo
 */

class DeadCity {
    constructor() {
        this.tileSize = 16;

        this.backgroundColour = "#aaaaaa";

        this.player = undefined;
        this.playerSymbols = ["👹", "🐕", "🐈", "🐈‍⬛", "🦖", "🦕"];

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
            [" ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", "👹", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " ", "🪦", " "],
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

        this.instructions = "ARROW KEYS to MOVE / HIT to FIGHT";
    }

    setup() {
        resizeCanvas(this.tileSize * this.columns, this.tileSize * this.rows);
        instructions.html(this.instructions);
        this.setupWorld();
        this.addMonsters();
        this.ui = {
            text: ""
        };
    }

    setupWorld() {
        // Process the world data into a more complex representation
        for (let r = 0; r < this.world.length; r++) {
            for (let c = 0; c < this.world[r].length; c++) {
                let symbol = this.world[r][c];
                this.world[r][c] = this.createCell(symbol, r, c);
            }
        }
    }

    createCell(symbol, row, col) {
        let cellData = {
            symbol: symbol,
            row: row,
            col: col
        };
        switch (symbol) {
            case "🪦":
                cellData.inscription = "TOTO";
                break;
            case "👹":
                this.player = {
                    symbol: symbol,
                    row: row,
                    col: col
                };
        };
        return cellData;
    }

    addMonsters() {
        const numMonsters = 20;
        const monsters = ["🧟", "👻", "🧛", "💀", "👺"];
        for (let i = 0; i < numMonsters; i++) {
            let r = undefined;
            let c = undefined;
            do {
                r = floor(random(0, this.rows));
                c = floor(random(0, this.columns));
            } while (this.world[r][c].symbol !== " ")
            this.world[r][c].symbol = random(monsters);
        }
    }

    draw() {
        background(this.backgroundColour);

        this.drawWorld();
        this.drawUI();
    }

    drawWorld() {
        for (let row = 0; row < this.world.length; row++) {
            for (let col = 0; col < this.world[row].length; col++) {
                const cell = this.world[row][col];
                const x = this.tileSize / 2 + col * this.tileSize;
                const y = this.tileSize / 2 + row * this.tileSize;

                push();
                textAlign(CENTER, CENTER);
                textSize(this.tileSize);
                text(cell.symbol, x + this.tileSize / 8, y + this.tileSize / 20);
                pop();
            }
        }
    }

    drawUI() {
        if (this.ui.text !== "") {
            const y = this.player.row > this.rows / 2 ? height * 0.1 : height * 0.9;
            // Background
            push();
            noStroke();
            fill(0, 127);
            rectMode(CENTER);
            rect(width / 2, y, width, height * 0.2);
            pop();

            //Text
            push();
            textSize(18);
            textStyle(BOLD);
            fill("#ffffff");
            textAlign(CENTER, CENTER);
            text(this.ui.text, width / 2, y);
            pop();
        }
    }

    keyPressed(event) {
        // Check if it was one of the arrows and choose the move
        // direction
        let move = {
            x: 0,
            y: 0
        };
        if (event.keyCode === RIGHT_ARROW) {
            move.x = 1;
        }
        else if (event.keyCode === LEFT_ARROW) {
            move.x = -1;
        }
        else if (event.keyCode === UP_ARROW) {
            move.y = -1;
        }
        else if (event.keyCode === DOWN_ARROW) {
            move.y = 1;
        }
        else if (event.keyCode === ENTER) {
            this.player.symbol = random(this.playerSymbols);
            this.set(this.player.row, this.player.col, this.player.symbol);
        }

        // Apply the movement if there is any
        // and play the sound effect
        if (move.x !== 0 || move.y !== 0) {
            this.ui.text = "";
            let newR = constrain(this.player.row + move.y, 0, this.rows - 1);
            let newC = constrain(this.player.col + move.x, 0, this.columns - 1);
            let target = this.world[newR][newC];

            if (newR === this.player.row && newC === this.player.col) {
                return;
            }

            switch (target.symbol) {
                // Standard move
                case " ":
                    this.set(newR, newC, this.player.symbol);
                    this.set(this.player.row, this.player.col, " ");
                    this.player.col = newC;
                    this.player.row = newR;
                    break;

                case "🪦":
                    this.ui.text = "The gravestone reads:\n" + target.inscription;
                    break;

                default:
                    // Must be a monster
                    this.set(newR, newC, " ");
                    // this.set(this.player.row, this.player.col, " ");
                    // this.player.col = newC;
                    // this.player.row = newR;
                    break;
            }
        }
    }

    set(r, c, symbol) {
        this.world[r][c].symbol = symbol;
    }
}
