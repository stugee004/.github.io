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




// =====================================
// Input
// =====================================

const keys = {};



window.addEventListener(

    "keydown",

    e=>{

        keys[e.key]=true;



        if(

            e.key==="r" ||

            e.key==="R"

        ){

            if(

                State.isVictory() ||

                State.isGameOver()

            ){

                State.startGame();

            }

        }



        if(

            typeof sounds!=="undefined"

        ){

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

}





function resetGame(){

    playerScore = 0;

    cpuScore = 0;

    winner = "";



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

}
