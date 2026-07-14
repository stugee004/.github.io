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


        if(this.y < 0) {
            this.y = 0;
        }


        if(this.y + this.height > canvas.height) {
            this.y = canvas.height - this.height;
        }

    }


    draw(ctx) {

        // Outer glow
        ctx.shadowBlur = 25;
        ctx.shadowColor = this.color;


        // Main gradient
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


        // Main paddle
        ctx.beginPath();

        ctx.roundRect(
            this.x,
            this.y,
            this.width,
            this.height,
            12
        );

        ctx.fill();


        // Inner outline
        ctx.shadowBlur = 0;

        ctx.strokeStyle = this.color;
        ctx.lineWidth = 4;

        ctx.beginPath();

        ctx.roundRect(
            this.x + 3,
            this.y + 3,
            this.width - 6,
            this.height - 6,
            10
        );

        ctx.stroke();


        // Reset canvas settings
        ctx.shadowBlur = 0;
        ctx.lineWidth = 1;

    }

}
