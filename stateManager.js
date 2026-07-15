// =====================================
// Hyper Pong
// State Manager V2
// =====================================

class StateManager {

    constructor(){

        this.states = [

            "boot",
            "menu",
            "playing",
            "paused",
            "shop",
            "abilities",
            "victory",
            "gameover",
            "settings",
            "achievements",
            "credits"

        ];

        this.current = "boot";
        this.previous = null;

        this.listeners = [];

    }



    //=========================
    // Events
    //=========================

    onChange(callback){

        if(typeof callback === "function"){

            this.listeners.push(callback);

        }

    }



    //=========================
    // Change State
    //=========================

    change(state){

        if(!this.states.includes(state)){

            console.warn(

                "Unknown state:",

                state

            );

            return;

        }

        if(this.current === state){

            return;

        }

        this.previous = this.current;
        this.current = state;

        console.log(

            `State: ${this.previous} → ${this.current}`

        );

        if(typeof Engine !== "undefined"){

            Engine.setState(state);

        }

        this.listeners.forEach(listener=>{

            listener(

                this.current,

                this.previous

            );

        });

    }



    //=========================
    // Navigation
    //=========================

    boot(){

        this.change("boot");

    }

    openMenu(){

        this.change("menu");

    }

    startGame(){

        if(typeof sounds !== "undefined"){

            sounds.unlock();

        }

        if(typeof resetGame === "function"){

            resetGame();

        }

        if(typeof gameStarted !== "undefined"){

            gameStarted = true;

        }

        this.change("playing");

    }

    pause(){

        this.change("paused");

    }

    resume(){

        this.change("playing");

    }

    togglePause(){

        if(this.isPaused()){

            this.resume();

        }

        else if(this.isPlaying()){

            this.pause();

        }

    }

    openShop(){

        this.change("shop");

    }

    openAbilities(){

        this.change("abilities");

    }

    openSettings(){

        this.change("settings");

    }

    openAchievements(){

        this.change("achievements");

    }

    openCredits(){

        this.change("credits");

    }

    victory(){

        this.change("victory");

    }

    gameOver(){

        this.change("gameover");

    }



    //=========================
    // Helpers
    //=========================

    is(state){

        return this.current === state;

    }

    isMenu(){

        return this.current === "menu";

    }

    isPlaying(){

        return this.current === "playing";

    }

    isPaused(){

        return this.current === "paused";

    }

    isShop(){

        return this.current === "shop";

    }

    isAbilities(){

        return this.current === "abilities";

    }

    isVictory(){

        return this.current === "victory";

    }

    isGameOver(){

        return this.current === "gameover";

    }



    //=========================
    // Back Navigation
    //=========================

    back(){

        switch(this.previous){

            case "playing":

                this.resume();
                break;

            case "shop":

                this.openShop();
                break;

            case "abilities":

                this.openAbilities();
                break;

            case "settings":

                this.openSettings();
                break;

            default:

                this.openMenu();

        }

    }

}



const State = new StateManager();



// Automatically enter the menu

State.openMenu();
