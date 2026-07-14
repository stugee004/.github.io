class CPU extends Paddle {

constructor(x,y,color="red",difficulty="medium"){

    super(x,y,color);

    this.difficulty = difficulty;


    if(difficulty==="easy"){
        this.speed = 3;
        this.error = 250;
    }

    if(difficulty==="medium"){
        this.speed = 5;
        this.error = 120;
    }

    if(difficulty==="hard"){
        this.speed = 7;
        this.error = 40;
    }

}

    update(ball) {

        // Return to center if the ball is moving away
        if (ball.dx < 0) {

            const target = canvas.height / 2;

            if (this.y + this.height / 2 < target) {
                this.y += this.speed;
            } else {
                this.y -= this.speed;
            }

        } else {

            // Predict where the ball will arrive
            let predictedY = ball.y +
                (this.x - ball.x) * (ball.dy / ball.dx);

            // Add some inaccuracy
            predictedY += (Math.random()-0.5)*this.error;

            if (this.y + this.height / 2 < predictedY) {
                this.y += this.speed;
            }

            if (this.y + this.height / 2 > predictedY) {
                this.y -= this.speed;
            }

        }

        // Keep paddle on screen
        if (this.y < 0) {
            this.y = 0;
        }

        if (this.y + this.height > canvas.height) {
            this.y = canvas.height - this.height;
        }

    }

}
