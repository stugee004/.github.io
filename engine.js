class GameEngine {

    constructor(){

        this.states = {

            BOOT: "boot",

            MENU: "menu",

            PLAYING: "playing",

            SHOP: "shop",

            ABILITIES: "abilities",

            PAUSED: "paused",

            GAMEOVER: "gameover",

            VICTORY: "victory"

        };



        this.state =
            this.states.BOOT;



        this.systems = [];



        this.lastTime = 0;

        this.deltaTime = 0;



        this.running = false;

    }






    register(system){

        this.systems.push(system);

    }






    setState(newState){

        if(this.state === newState){

            return;

        }



        console.log(
            "STATE:",
            this.state,
            "→",
            newState
        );



        this.state = newState;

    }






    start(){

        if(this.running){

            return;

        }



        this.running = true;



        this.setState(
            this.states.MENU
        );



        requestAnimationFrame(
            this.loop.bind(this)
        );

    }






    loop(timestamp){

        if(!this.running){

            return;

        }



        this.deltaTime =
            (timestamp - this.lastTime) / 1000;



        this.lastTime =
            timestamp;



        this.update();



        this.render();



        requestAnimationFrame(
            this.loop.bind(this)
        );

    }






    update(){

        this.systems.forEach(system=>{

            if(typeof system.update === "function"){

                system.update(
                    this.deltaTime,
                    this.state
                );

            }

        });

    }






    render(){

        this.systems.forEach(system=>{

            if(typeof system.draw === "function"){

                system.draw(
                    ctx,
                    this.state
                );

            }

        });

    }






    pause(){

        this.setState(
            this.states.PAUSED
        );

    }






    resume(){

        this.setState(
            this.states.PLAYING
        );

    }






    togglePause(){

        if(
            this.state ===
            this.states.PAUSED
        ){

            this.resume();

        }
        else if(
            this.state ===
            this.states.PLAYING
        ){

            this.pause();

        }

    }






    stop(){

        this.running = false;

    }

}




const Engine =
    new GameEngine();
