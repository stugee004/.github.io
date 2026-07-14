// ============================
// Hyper Pong Game Engine
// ============================


// Canvas setup

const canvas = document.getElementById("gameCanvas");

const ctx = canvas.getContext("2d");



function resizeCanvas(){

    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);



// ============================
// Game Objects
// ============================


let player;

let cpu;

let ball;

let stars;

let particles;



let playerScore = 0;

let cpuScore = 0;


let gameOver = false;

let winner = "";




// ============================
// Input
// ============================


const keys = {};



window.addEventListener(
    "keydown",
    e=>{

        keys[e.key] = true;


        if(
            e.key === "r" ||
            e.key === "R"
        ){

            resetGame();

        }

    }
);



window.addEventListener(
    "keyup",
    e=>{

        keys[e.key] = false;

    }
);



// ============================
// Setup
// ============================


function setup(){


    player = new Paddle(

        40,

        canvas.height / 2 - 60,

        "cyan"

    );



    cpu = new CPU(

        canvas.width - 60,

        canvas.height / 2 - 60,

        "medium"

    );



    ball = new Ball();



    stars = new Starfield();



    particles = new ParticleSystem();



}



setup();



// ============================
// Update
// ============================


function update(){


    if(gameOver){

        particles.update();

        return;

    }



    // Player movement


    if(keys["ArrowUp"]){

        player.move(-1);

    }


    if(keys["ArrowDown"]){

        player.move(1);

    }



    player.update();


    cpu.update(ball);



    ball.update();



    // Collision


    ball.checkPaddleCollision(player);

    ball.checkPaddleCollision(cpu);



    // Scores


    if(ball.x < 0){

        cpuScore++;

        scoreEffect("CPU");

        resetRound();

    }



    if(ball.x > canvas.width){

        playerScore++;

        scoreEffect("PLAYER");

        resetRound();

    }



    stars.update();


    particles.update();


}






// ============================
// Drawing
// ============================


function draw(){


    // Space background

    ctx.fillStyle="black";

    ctx.fillRect(

        0,
        0,
        canvas.width,
        canvas.height

    );



    stars.draw(ctx);



    // Middle line

    ctx.globalAlpha=.3;

    ctx.strokeStyle="white";

    ctx.setLineDash([10,10]);

    ctx.beginPath();

    ctx.moveTo(
        canvas.width/2,
        0
    );

    ctx.lineTo(
        canvas.width/2,
        canvas.height
    );

    ctx.stroke();


    ctx.setLineDash([]);


    ctx.globalAlpha=1;



    player.draw(ctx);

    cpu.draw(ctx);

    ball.draw(ctx);


    particles.draw(ctx);



    drawScore();



    if(gameOver){

        drawVictory();

    }


}







// ============================
// Score
// ============================


function drawScore(){


    ctx.save();


    ctx.fillStyle="white";

    ctx.font="50px Arial";

    ctx.textAlign="center";



    ctx.fillText(

        playerScore,

        canvas.width/2 - 80,

        70

    );


    ctx.fillText(

        cpuScore,

        canvas.width/2 + 80,

        70

    );


    ctx.restore();


}







// ============================
// Victory
// ============================


function checkVictory(){


    if(playerScore >= 5){

        endGame("PLAYER VICTORY");

    }



    if(cpuScore >= 5){

        endGame("CPU VICTORY");

    }


}



function endGame(text){


    gameOver = true;

    winner = text;



    particles.firework(

        canvas.width/2,

        canvas.height/2

    );


}



function drawVictory(){


    ctx.save();


    ctx.fillStyle="rgba(0,0,0,.5)";

    ctx.fillRect(

        0,
        0,
        canvas.width,
        canvas.height

    );



    ctx.fillStyle="white";


    ctx.font="70px Arial";


    ctx.textAlign="center";



    ctx.fillText(

        winner,

        canvas.width/2,

        canvas.height/2

    );



    ctx.font="30px Arial";


    ctx.fillText(

        "Press R to restart",

        canvas.width/2,

        canvas.height/2 + 60

    );


    ctx.restore();


}







// ============================
// Reset
// ============================


function resetRound(){


    ball.reset();


}



function resetGame(){


    playerScore = 0;

    cpuScore = 0;


    gameOver = false;

    winner="";


    ball.reset();


}







// ============================
// Effects
// ============================


function scoreEffect(team){


    particles.burst(

        canvas.width/2,

        canvas.height/2,

        team==="PLAYER"
        ? "cyan"
        : "red",

        50

    );


}






// ============================
// Main Loop
// ============================


function gameLoop(){


    update();

    draw();


    requestAnimationFrame(
        gameLoop
    );


}



gameLoop();
