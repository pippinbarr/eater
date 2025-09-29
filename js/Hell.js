/**
 * Ideas:
 * - Flame emojis everywhere? Or something else?
 * - Sparkly firebits everywhere?
 * - Mouse movement
 * - Demons? The devil?
 * - What do you eat? Fire? Very special mouth.
 * - What do you look like? Ghost?
 * - Talk to the devils?
 * - Die if you don't eat enough fire?
 * - Performance???
 */

class Hell {
    constructor() {
        this.tileSize = 16;

        this.backgroundColour = "#ff0000";

        this.instructions = "ARROW KEYS to MOVE / HIT to FIGHT";

        this.setup();
        colorMode(HSB);

        this.demons = [];
        for (let i = 0; i < 5; i++) {
            this.demons.push({
                x: random(0, width),
                y: random(0, height),
                vx: random(-5, 5),
                vy: random(-5, 5)
            })
        }

    }

    setup() {
        noCursor();
        instructions.html(this.instructions);
    }

    draw() {
        if (random() < 0.01) background(this.backgroundColour);



        // Fire
        for (let i = 0; i < 500; i++) {
            push();
            stroke(random(50, 70), 100, random(80, 100));
            strokeWeight(1);
            const x = random(0, width)
            const y = random(0, height)
            line(x, y, x, y + random(-20, 30));
            pop();
        }

        // Player
        for (let x = 0; x < 30; x++) {
            for (let y = 0; y < 30; y++) {
                point(mouseX + random(-x, x), mouseY + random(-y, y));
            }
        }

        // Demons
        for (let demon of this.demons) {
            const x = random(0, width);
            const y = random(0, width);
            for (let i = 0; i < 500; i++) {
                push();
                stroke(random(200, 210), 100, 100);
                strokeWeight(1);
                point(demon.x + random(-20, 20), demon.y + random(-20, 20));
                pop();
            }
            demon.x += demon.vx;
            demon.y += demon.vy;

            if (demon.x > width) demon.x = 0;
            if (demon.x < 0) demon.x = width;
            if (demon.y > height) demon.y = 0;
            if (demon.y < 0) demon.y = height;
        }
    }

    keyPressed(event) {

    }
}
