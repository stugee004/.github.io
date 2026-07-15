// =====================================
// Hyper Pong
// Game Controller V2
// Part 1
// =====================================



// =====================================
// Canvas
// =====================================

const canvas =
    document.getElementById(
        "gameCanvas"
    );

const ctx =
    canvas.getContext("2d");



function resizeCanvas(){

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);




// =====================================
// World
// =====================================

let player;
let cpu;
let ball;

let stars;
let particles;




// =====================================
// Game Data
// =====================================

let playerScore = 0;

let cpuScore = 0;

let winner = "";

let roundDelay = 0;

let roundMessage = "";

let roundTimer = 0;

let serving = false;

let serveTimer = 0;

// =====================================
// Input
// =====================================

const keys = {};



window.addEventListener(
    "keydown",
    e=>{


        if(
            (e.key === "m" || e.key === "M") &&
            typeof State !== "undefined"
        ){

            State.openMenu();

            gameStarted = false;

            return;

        }



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

        keys[e.key]=false;

    }

);




// =====================================
// Creation
// =====================================

function createBackground(){

    stars =
        new Starfield(120);

    particles =
        new ParticleSystem();

}





function createObjects(){

    player =
        new Paddle(

            40,

            canvas.height/2-60,

            "cyan"

        );



    cpu =
        new CPU(

            canvas.width-60,

            canvas.height/2-60,

            save.get(

                "settings.difficulty"

            ) ||

            "medium"

        );



    ball =
        new Ball();

}





// =====================================
// Reset
// =====================================

function resetRound(){

    ball.reset();

    serving = true;

    serveTimer = 120; // 2 seconds

    ball.dx = 0;
    ball.dy = 0;

}





function resetGame(){

    playerScore=0;

    cpuScore=0;

    winner="";



    createObjects();

}





// =====================================
// Initialization
// =====================================

function initializeGame(){

    createBackground();

    createObjects();



    if(

        typeof UI!=="undefined"

    ){

        UI.initialize();

    }



    State.openMenu();

}



initializeGame();
// =====================================
// Update
// =====================================

function update(){

    // UI always updates
    if(typeof UI !== "undefined"){

        UI.update();

    }



    // Background animation always runs
    if(stars){

        stars.update();

    }

    if(particles){

        particles.update();

    }



    // Only gameplay updates while playing
    if(!State.isPlaying()){

        return;

    }
    if(serving){

    serveTimer--;


    if(serveTimer <= 0){

        serving = false;


        ball.reset();

    }


    return;

}


    // -------------------------
    // Player Controls
    // -------------------------

    if(keys["ArrowUp"]){

        player.move(-1);

    }

    if(keys["ArrowDown"]){

        player.move(1);

    }



    player.update();

    cpu.update(ball);

    ball.update();



    ball.checkPaddleCollision(player);

    ball.checkPaddleCollision(cpu);



    // -------------------------
    // Abilities
    // -------------------------

    if(typeof abilities !== "undefined"){

        abilities.update();

    }



    // -------------------------
    // Scoring
    // -------------------------

    if(ball.x < 0){

        cpuScore++;

        if(typeof sounds !== "undefined"){

            sounds.score();

        }

        resetRound();

    }



    if(ball.x > canvas.width){

        playerScore++;

        if(typeof sounds !== "undefined"){

            sounds.score();

        }

        resetRound();

    }



    checkVictory();

}
// =====================================
// Draw
// =====================================


function draw(){



    ctx.fillStyle = "black";


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


    ctx.strokeStyle = "white";

    ctx.globalAlpha = 0.3;


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


    ctx.globalAlpha = 1;





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

    UI.draw();

    if(
    State.is("playing") ||
    State.is("paused") ||
    State.is("victory") ||
    State.is("gameover")
){

    drawScore();

}




 if(
    State.isVictory() ||
    State.isGameOver()
){

    drawVictory();

}



}







// =====================================
// Score
// =====================================


function drawScore(){



    ctx.save();


    ctx.fillStyle = "white";


    ctx.font = "50px Arial";


    ctx.textAlign = "center";



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







// =====================================
// Victory
// =====================================


function checkVictory(){

    if(playerScore >= 5){

        winner = "PLAYER VICTORY";

        State.victory();

        if(typeof economy !== "undefined"){

            economy.victoryReward();

        }

        if(typeof sounds !== "undefined"){

            sounds.victory();

        }

    }



    if(cpuScore >= 5){

        winner = "CPU VICTORY";

        State.gameOver();

        if(typeof sounds !== "undefined"){

            sounds.victory();

        }

    }

}













function drawVictory(){



    ctx.fillStyle =
        "rgba(0,0,0,.6)";


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

        "Press R to restart | Press M for menu",

        canvas.width/2,

        canvas.height/2 + 60

    );



}







// =====================================
// Reset
// =====================================


function resetRound(){

    ball.reset();

    roundTimer = 120; // 2 seconds at 60fps

}






function resetGame(){

    playerScore = 0;

    cpuScore = 0;

    winner = "";



    createObjects();

}







// =====================================
// Loop
// =====================================


function gameLoop(){


    update();

    draw();



    requestAnimationFrame(
        gameLoop
    );


}



gameLoop();
