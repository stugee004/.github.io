class Paddle {

    constructor(x, y, color = "cyan") {

        this.x = x;
        this.y = y;

        this.width = 25;
        this.height = 120;

        this.speed = 7;
        this.velocity = 0;

        this.color = color;

    }


    update() {

        this.y += this.velocity;


        // Keep paddle on screen
        if(this.y < 0) {
            this.y = 0;
        }


        if(this.y + this.height > canvas.height) {
            this.y = canvas.height - this.height;
        }

    }


    draw(ctx) {

        // Glow
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.color;


        // Gradient
        let gradient = ctx.createLinearGradient(
            this.x,
            this.y,
            this.x + this.width,
            this.y
        );


        gradient.addColorStop(0, this.color);
        gradient.addColorStop(0.5, "white");
        gradient.addColorStop(1, this.color);


        ctx.fillStyle = gradient;


        // Rounded paddle
        ctx.beginPath();

        ctx.roundRect(
            this.x,
            this.y,
            this.width,
            this.height,
            12
        );

        ctx.fill();


        // Turn glow off
        ctx.shadowBlur = 0;

    }

}
