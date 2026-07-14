// =====================================
// Hyper Pong Main Game Controller
// =====================================


// Canvas

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




// =====================================
// Game State
// =====================================


let gameStarted = false;

let gameOver = false;

let winner = "";



let player;

let cpu;

let ball;

let stars;

let particles;



let playerScore = 0;

let cpuScore = 0;



// =====================================
// Controls
// =====================================


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



        if(typeof sounds !== "undefined"){

            sounds.unlock();

        }


    }
);



window.addEventListener(
    "keyup",
    e=>{

        keys[e.key] = false;

    }
);




// =====================================
// Create Game
// =====================================


function createGame(){



    player =
        new Paddle(

            40,

            canvas.height / 2 - 60,

            "cyan"

        );



    cpu =
        new CPU(

            canvas.width - 60,

            canvas.height / 2 - 60,

            save.get(
                "settings.difficulty"
            ) || "medium"

        );



    ball =
        new Ball();



    stars =
        new Starfield(120);



    particles =
        new ParticleSystem();



}




createGame();




// =====================================
// Start Game
// =====================================


function startGame(){


    gameStarted = true;


    gameOver = false;


    winner = "";


    resetGame();


}





// =====================================
// Update
// =====================================


function update(){


    if(!gameStarted){

        return;

    }



    if(gameOver){

        if(particles){

            particles.update();

        }


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



    if(typeof abilities !== "undefined"){

        abilities.applyPlayerEffects(
            player
        );

    }




    cpu.update(ball);



    ball.update();




    if(typeof abilities !== "undefined"){

        abilities.applyBallEffects(
            ball
        );

        abilities.update();

    }




    ball.checkPaddleCollision(
        player
    );


    ball.checkPaddleCollision(
        cpu
    );





    // Scoring


    if(ball.x < 0){


        cpuScore++;


        if(typeof economy !== "undefined"){

            economy.scoreReward();

        }


        if(typeof playScore === "function"){

            playScore();

        }


        resetRound();


    }






    if(ball.x > canvas.width){


        playerScore++;


        if(typeof economy !== "undefined"){

            economy.scoreReward();

        }


        if(typeof playScore === "function"){

            playScore();

        }


        resetRound();


    }






    checkVictory();



    stars.update();



    if(particles){

        particles.update();

    }


}





// =====================================
// Draw
// =====================================


function draw(){



    ctx.fillStyle="black";


    ctx.fillRect(

        0,

        0,

        canvas.width,

        canvas.height

    );



    if(stars){

        stars.draw(ctx);

    }



    // Center line


    ctx.globalAlpha=.3;


    ctx.strokeStyle="white";


    ctx.setLineDash(
        [10,10]
    );


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





    if(player){

        player.draw(ctx);

    }



    if(cpu){

        cpu.draw(ctx);

    }



    if(ball){

        ball.draw(ctx);

    }



    if(particles){

        particles.draw(ctx);

    }



    drawScore();



    if(gameOver){

        drawVictory();

    }


}





// =====================================
// Score
// =====================================


function drawScore(){


    ctx.save();


    ctx.fillStyle="white";


    ctx.font="50px Arial";


    ctx.textAlign="center";



    ctx.fillText(

        playerScore,

        canvas.width/2-80,

        70

    );



    ctx.fillText(

        cpuScore,

        canvas.width/2+80,

        70

    );


    ctx.restore();


}




// =====================================
// Victory
// =====================================


function checkVictory(){


    if(playerScore >= 5){


        endGame(
            "PLAYER VICTORY"
        );


    }



    if(cpuScore >= 5){


        endGame(
            "CPU VICTORY"
        );


    }


}





function endGame(text){


    gameOver = true;


    winner = text;



    if(
        text === "PLAYER VICTORY" &&
        typeof economy !== "undefined"
    ){

        economy.victoryReward();

    }



    if(typeof playVictory === "function"){

        playVictory();

    }


}







function drawVictory(){


    ctx.save();



    ctx.fillStyle =
        "rgba(0,0,0,.6)";


    ctx.fillRect(

        0,

        0,

        canvas.width,

        canvas.height

    );



    ctx.fillStyle="white";


    ctx.textAlign="center";


    ctx.font="70px Arial";


    ctx.fillText(

        winner,

        canvas.width/2,

        canvas.height/2

    );



    ctx.font="30px Arial";


    ctx.fillText(

        "Press R to restart",

        canvas.width/2,

        canvas.height/2+60

    );



    ctx.restore();


}




// =====================================
// Reset
// =====================================


function resetRound(){


    ball.reset();



}





function resetGame(){



    playerScore=0;


    cpuScore=0;


    gameOver=false;


    winner="";



    createGame();


}

// =====================================
// Full Game Reset
// =====================================

function resetGame(){


    playerScore = 0;

    cpuScore = 0;

    gameOver = false;

    winner = "";


    player = new Paddle(
        40,
        canvas.height / 2 - 60,
        "cyan"
    );


    cpu = new CPU(
        canvas.width - 60,
        canvas.height / 2 - 60,
        save.get("settings.difficulty") || "medium"
    );


    ball = new Ball();


}

// =====================================
// Main Loop
// =====================================


function gameLoop(){


    update();


    draw();


    requestAnimationFrame(
        gameLoop
    );


}



gameLoop();
