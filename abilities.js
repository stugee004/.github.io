class AbilityManager {


    constructor(){


        this.abilities = {


            speedBoost: {

                name:"Speed Boost",

                description:
                    "Increase paddle speed",

                cost:100,

                duration:600

            },


            shield: {

                name:"Energy Shield",

                description:
                    "Creates a temporary paddle shield",

                cost:250,

                duration:500

            },


            gravity: {

                name:"Gravity Field",

                description:
                    "Slightly bends the ball",

                cost:400,

                duration:300

            },


            overdrive: {

                name:"Ball Overdrive",

                description:
                    "Increase ball speed",

                cost:500,

                duration:300

            }


        };



        this.active = {};


        this.load();


    }





    unlock(id){



        const ability =
            this.abilities[id];



        if(!ability){

            return false;

        }



        if(this.isUnlocked(id)){

            return false;

        }



        if(
            economy &&
            economy.spendCenes(
                ability.cost
            )
        ){


            save.data.abilities.push(id);


            save.save();


            return true;


        }


        return false;


    }





    isUnlocked(id){


        return save.data.abilities.includes(id);


    }





    activate(id){


        if(!this.isUnlocked(id)){

            return false;

        }



        const ability =
            this.abilities[id];



        this.active[id] =
        {

            timer:
            ability.duration

        };



        if(typeof playAbility === "function"){

            if(typeof sounds !== "undefined"){
    sounds.ability();
}

        }



        return true;


    }







    update(){



        for(let id in this.active){



            this.active[id].timer--;



            if(
                this.active[id].timer <= 0
            ){


                delete this.active[id];


            }


        }



    }





    hasActive(id){


        return this.active[id] !== undefined;


    }







    applyPlayerEffects(player){



        if(
            this.hasActive(
                "speedBoost"
            )
        ){


            player.speed = 14;


        }

        else{


            player.speed = 8;


        }


    }







    applyBallEffects(ball){



        if(
            this.hasActive(
                "overdrive"
            )
        ){


            ball.speed += 0.01;


        }





        if(
            this.hasActive(
                "gravity"
            )
        ){


            ball.dy +=
                Math.sin(
                    Date.now()/200
                )
                *
                0.02;


        }


    }






    load(){


        if(
            !save.data.abilities
        ){


            save.data.abilities=[];


            save.save();


        }


    }



}





// Global ability system

const abilities =
    new AbilityManager();
