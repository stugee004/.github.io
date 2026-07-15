class Menu {


    constructor(){


        this.visible = true;


        this.buttons = [

            {
                text: "PLAY",
                action: ()=>{

                    this.startGame();

                }

            },


            {
                text: "SHOP",
                action: ()=>{

                    this.openShop();

                }

            },


            {
                text: "ABILITIES",
                action: ()=>{

                    this.openAbilities();

                }

            }


        ];



    }








    clickSound(){


        if(typeof sounds !== "undefined"){


            sounds.unlock();


            sounds.playTone(
                600,
                0.08,
                "square"
            );


        }


    }









    startGame(){



        this.clickSound();



        this.visible = false;



        if(typeof startGame === "function"){

            startGame();

        }



    }









    openShop(){



        this.clickSound();



        if(typeof shopUI !== "undefined"){


            shopUI.open();


        }
        else{


            console.log(
                "Shop UI not loaded"
            );


        }


    }









    openAbilities(){



        this.clickSound();



        if(typeof abilitiesUI !== "undefined"){


            abilitiesUI.open();


        }
        else{


            console.log(
                "Abilities UI not loaded"
            );


        }


    }








    draw(ctx){



        if(!this.visible){

            return;

        }



        ctx.fillStyle="white";


        ctx.font="50px Arial";


        ctx.textAlign="center";



        ctx.fillText(

            "HYPER PONG",

            canvas.width/2,

            150

        );



        this.buttons.forEach(

            (button,index)=>{


                ctx.font="30px Arial";



                ctx.fillText(

                    button.text,

                    canvas.width/2,

                    260 + index*70

                );


            }

        );



    }









    handleClick(x,y){



        if(!this.visible){

            return;

        }



        this.buttons.forEach(

            (button,index)=>{


                const buttonY =
                    230 + index*70;



                if(
                    y > buttonY &&
                    y < buttonY + 50
                ){


                    button.action();


                }



            }

        );



    }



}





const menu =
    new Menu();
