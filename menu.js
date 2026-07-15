class MenuManager {


    constructor(){


        this.screen = "menu";


        this.createMenu();


    }







    createMenu(){


        const menu =
            document.createElement("div");


        menu.id = "mainMenu";


        menu.innerHTML = `

            <h1>HYPER PONG</h1>


            <div id="cenes">
                0
            </div>



            <button id="playButton">
                PLAY
            </button>



            <button id="difficultyButton">
                Difficulty: Medium
            </button>



            <button id="shopButton">
                Shop
            </button>



            <button id="abilitiesButton">
                Abilities
            </button>

        `;



        document.body.appendChild(menu);



        this.menu = menu;



        this.connectButtons();


    }







    clickSound(){


        if(typeof sounds !== "undefined"){


            sounds.playTone(

                600,

                0.08,

                "square"

            );


        }


    }







    startSound(){


        if(typeof sounds !== "undefined"){


            sounds.unlock();


            sounds.playTone(

                800,

                0.1,

                "square"

            );


        }


    }







    connectButtons(){



        document
        .getElementById(
            "playButton"
        )
        .onclick = ()=>{


            this.startSound();


            this.startGame();


        };







        document
        .getElementById(
            "difficultyButton"
        )
        .onclick = ()=>{


            this.clickSound();


            this.changeDifficulty();


        };







        document
        .getElementById(
            "shopButton"
        )
        .onclick = ()=>{


            this.clickSound();


            this.openShop();


        };







        document
        .getElementById(
            "abilitiesButton"
        )
        .onclick = ()=>{


            this.clickSound();


            this.openAbilities();


        };


    }







    startGame(){



        this.screen =
            "game";



        this.menu.style.display =
            "none";





        if(typeof resetGame === "function"){


            resetGame();


        }



        gameStarted = true;



    }








    changeDifficulty(){



        let current =
            save.get(
                "settings.difficulty"
            );



        let next;



        if(current === "easy"){


            next = "medium";


        }

        else if(current === "medium"){


            next = "hard";


        }

        else{


            next = "easy";


        }






        save.set(

            "settings.difficulty",

            next

        );







        let display =
            next.charAt(0).toUpperCase()
            +
            next.slice(1);






        document
        .getElementById(
            "difficultyButton"
        )
        .innerText =

            "Difficulty: "
            +
            display;



    }








    openShop(){



        console.log(
            "Shop opened"
        );



        if(typeof shopUI !== "undefined"){


            shopUI.open();


        }



    }








    openAbilities(){



        console.log(
            "Abilities opened"
        );



        if(typeof abilitiesUI !== "undefined"){


            abilitiesUI.open();


        }



    }








    show(){



        this.menu.style.display =
            "block";


    }








    hide(){



        this.menu.style.display =
            "none";


    }



}







const menu =
    new MenuManager();
