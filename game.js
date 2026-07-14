const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = new Paddle(20, canvas.height / 2 - 60);
const cpu = new CPU(canvas.width - 40, canvas.height / 2 - 60, "medium");
const ball = new Ball();

function gameLoop() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player.update();
    cpu.update(ball);
    ball.update();

    player.draw(ctx);
    cpu.draw(ctx);
    ball.draw(ctx);

    requestAnimationFrame(gameLoop);
}

gameLoop();
