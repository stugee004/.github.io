class Abilities {


    constructor(){


        this.abilities = {


            speedBoost: {

                name: "Speed Boost",

                description:
                    "Makes the paddle move faster",

                cost: 300,

                unlocked: false

            },



            bigPaddle: {

                name: "Big Paddle",

                description:
                    "Increases paddle size",

                cost: 500,

                unlocked: false

            },



            ballControl: {

                name: "Ball Control",

                description:
                    "Improves ball control",

                cost: 700,

                unlocked: false

            }



        };



        this.load();



    }









    unlock(name){



        const ability =
            this.abilities[name];



        if(!ability){

            console.log(
                "Ability not found"
            );

            return;

        }







        if(ability.unlocked){


            console.log(
                "Already unlocked"
            );


            return;

        }







        if(
            typeof economy === "undefined"
        ){

            return;

        }







        if(
            economy.cenes >= ability.cost
        ){



            economy.cenes -=
                ability.cost;



            ability.unlocked = true;






            if(typeof sounds !== "undefined"){


                sounds.ability();


            }






            this.save();



            console.log(

                ability.name +
                " unlocked!"

            );



        }
        else{


            console.log(
                "Not enough Cenes"
            );


        }



    }









    applyPlayerEffects(player){



        if(
            !player
        ){

            return;

        }






        if(
            this.abilities.speedBoost.unlocked
        ){



            player.speed =
                8;



        }







        if(
            this.abilities.bigPaddle.unlocked
        ){



            player.height =
                150;



        }





    }









    applyBallEffects(ball){



        if(
            !ball
        ){

            return;

        }





        if(
            this.abilities.ballControl.unlocked
        ){



            ball.speed =
                Math.min(
                    ball.speed,
                    10
                );



        }



    }









    update(){



        // Reserved for future abilities

        // cooldowns, temporary effects, etc.



    }









    getUnlocked(){



        return Object.values(

            this.abilities

        )
        .filter(

            ability=>ability.unlocked

        );


    }









    load(){



        const saved =
            localStorage.getItem(
                "abilitiesData"
            );



        if(saved){


            const data =
                JSON.parse(saved);



            Object.assign(

                this.abilities,

                data

            );


        }



    }









    save(){



        localStorage.setItem(

            "abilitiesData",

            JSON.stringify(
                this.abilities
            )

        );


    }



}






const abilities =
    new Abilities();
