class CPU extends Paddle {

    constructor(x, y) {
        super(x, y);

        this.speed = 7;
    }

    update(ball){

        // If the ball is moving away, return to center
        if(ball.dx < 0){

            const target = canvas.height / 2;

            if(this.y + this.height/2 < target)
                this.y += this.speed;
            else
                this.y -= this.speed;

            return;
        }

        // Predict where the ball will cross the CPU's x-position
        let predictedY = ball.y +
            (this.x - ball.x) * (ball.dy / ball.dx);

        // Add a small random error so it isn't perfect
        predictedY += (Math.random() - 0.5) * 50;

        if(this.y + this.height/2 < predictedY)
            this.y += this.speed;

        if(this.y + this.height/2 > predictedY)
            this.y -= this.speed;

        // Keep paddle on screen
        if(this.y < 0)
            this.y = 0;

        if(this.y + this.height > canvas.height)
            this.y = canvas.height - this.height;
    }
}

}
