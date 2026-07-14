const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = new Paddle(20, canvas.height / 2 - 60);
const cpu = new CPU(canvas.width - 40, canvas.height / 2 - 60, "medium");
const ball = new Ball();

stars.update();
stars.draw(ctx);

let keys = {};

window.addEventListener("keydown", function(event) {
    keys[event.key] = true;
});

window.addEventListener("keyup", function(event) {
    keys[event.key] = false;
});


function checkCollision(){

    // Player paddle
    if(
        ball.x - ball.radius < player.x + player.width &&
        ball.x + ball.radius > player.x &&
        ball.y > player.y &&
        ball.y < player.y + player.height
    ){

        // Reverse horizontal direction
        ball.dx *= -1;

        // Add spin without flipping vertical direction
        let hit = ball.y - (player.y + player.height / 2);

        ball.dy += hit * 0.05;

        if(ball.dy > 8) ball.dy = 8;
        if(ball.dy < -8) ball.dy = -8;
    }


    // CPU paddle
    if(
        ball.x + ball.radius > cpu.x &&
        ball.x - ball.radius < cpu.x + cpu.width &&
        ball.y > cpu.y &&
        ball.y < cpu.y + cpu.height
    ){

        // Reverse horizontal direction
        ball.dx *= -1;

        // Add spin without flipping vertical direction
        let hit = ball.y - (cpu.y + cpu.height / 2);

        ball.dy += hit * 0.05;

        if(ball.dy > 8) ball.dy = 8;
        if(ball.dy < -8) ball.dy = -8;
    }

}

function gameLoop() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    controlPlayer();
    
    player.update();
    cpu.update(ball);
    ball.update();

    checkCollision();
    player.draw(ctx);
    cpu.draw(ctx);
    ball.draw(ctx);

    requestAnimationFrame(gameLoop);
}

gameLoop();

function controlPlayer() {

    player.velocity = 0;

    if(keys["ArrowUp"]) {
        player.velocity = -player.speed;
    }

    if(keys["ArrowDown"]) {
        player.velocity = player.speed;
    }

}
