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

}
