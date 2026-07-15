class StateManager {

    constructor(){

        this.current = "boot";

        this.previous = null;

        this.listeners = [];

    }





    onChange(callback){

        this.listeners.push(callback);

    }





    change(state){

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





    openShop(){

        this.change("shop");

    }





    openAbilities(){

        this.change("abilities");

    }





    victory(){

        this.change("victory");

    }





    gameOver(){

        this.change("gameover");

    }





    back(){

        switch(this.previous){

            case "menu":
                this.openMenu();
                break;

            case "playing":
                this.startGame();
                break;

            default:
                this.openMenu();

        }

    }





    is(state){

        return this.current === state;

    }

}





const State = new StateManager();
