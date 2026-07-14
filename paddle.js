class Paddle {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.width = 18;
        this.height = 120;

        this.speed = 7;

        this.velocity = 0;

        this.ability = null;
    }

    update() {
        this.y += this.velocity;

        if(this.y < 0)
            this.y = 0;

        if(this.y + this.height > canvas.height)
            this.y = canvas.height - this.height;
    }

    draw(ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }
}
