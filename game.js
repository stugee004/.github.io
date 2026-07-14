const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const stars = new Starfield(120);
const player = new Paddle(
    30,
    canvas.height/2-60,
    "cyan"
);
const cpu = new CPU(
    canvas.width-55,
    canvas.height/2-60,
    "red"
);
const ball = new Ball();

let playerScore = 0;
let cpuScore = 0;

let gameOver = false;
let winnerText = "";

let cenes = 0;

let keys = {};

window.addEventListener("keydown", function(event) {
    keys[event.key] = true
});

window.addEventListener("keyup", function(event) {
    keys[event.key] = false;
});

function drawWinner(){

    if(gameOver){

        ctx.fillStyle = "white";
        ctx.font = "50px Arial";
        ctx.textAlign = "center";

        ctx.fillText(
            winnerText,
            canvas.width / 2,
            canvas.height / 2
        );

        ctx.font = "25px Arial";

        ctx.fillText(
            "Press R to restart",
            canvas.width / 2,
            canvas.height / 2 + 60
        );

    }

}

function drawScore(){

    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.textAlign = "center";

    ctx.fillText(
        playerScore,
        canvas.width / 4,
        50
    );

    ctx.fillText(
        cpuScore,
        canvas.width * 3 / 4,
        50
    );

}

function resetBall(){

    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;

    ball.dx = 0;
    ball.dy = 0;

    setTimeout(()=>{

        ball.dx = Math.random() > .5 ? 6 : -6;
        ball.dy = (Math.random()-0.5)*6;

    },1000);

}

function scoreCheck(){

    if(ball.x < 0){

        cpuScore++;
        resetBall();

    }


    if(ball.x > canvas.width){

        playerScore++;
        resetBall();

    }


    // Win condition
    if(playerScore >= 10){

        gameOver = true;
        winnerText = "PLAYER VICTORY!";
        playVictory();

    }


    if(cpuScore >= 10){

        gameOver = true;
        winnerText = "CPU VICTORY!";
        playDefeat();

    }

}
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
        playHit();

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
        playHit();

        // Add spin without flipping vertical direction
        let hit = ball.y - (cpu.y + cpu.height / 2);

        ball.dy += hit * 0.05;

        if(ball.dy > 8) ball.dy = 8;
        if(ball.dy < -8) ball.dy = -8;
    }

}

function gameLoop() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw space background
    stars.update();
    stars.draw(ctx);
    
    controlPlayer();

     if(!gameOver){
    
    player.update();
    cpu.update(ball);
    ball.update();

    scoreCheck();
    checkCollision();

     }
         
    player.draw(ctx);
    cpu.draw(ctx);
    ball.draw(ctx);

    drawScore();
    drawWinner();
         
    document.addEventListener("keydown", function(event){

    if(event.key === "r" && gameOver){

        playerScore = 0;
        cpuScore = 0;

        gameOver = false;
        winnerText = "";

        resetBall();

    }

});
    
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
