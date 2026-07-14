class Shop {


    constructor(){


        this.items = {


            // Abilities

            speedBoost: {

                name:"Speed Boost",

                type:"ability",

                cost:100

            },


            shield: {

                name:"Energy Shield",

                type:"ability",

                cost:250

            },


            gravity: {

                name:"Gravity Field",

                type:"ability",

                cost:400

            },


            overdrive: {

                name:"Ball Overdrive",

                type:"ability",

                cost:500

            },




            // Paddle cosmetics


            neonBlue: {

                name:"Neon Blue Paddle",

                type:"paddle",

                color:"cyan",

                cost:200

            },


            plasmaRed: {

                name:"Plasma Red Paddle",

                type:"paddle",

                color:"red",

                cost:300

            },


            galaxy: {

                name:"Galaxy Paddle",

                type:"paddle",

                color:"purple",

                cost:600

            },




            // Ball cosmetics


            goldenBall: {

                name:"Golden Ball",

                type:"ball",

                color:"gold",

                cost:400

            },


            starBall: {

                name:"Star Ball",

                type:"ball",

                color:"white",

                cost:700

            }


        };


    }






    buy(id){


        const item =
            this.items[id];



        if(!item){

            console.log(
                "Item does not exist"
            );

            return false;

        }





        if(this.owned(id)){


            return false;


        }







        if(
            economy.spendCenes(
                item.cost
            )
        ){



            this.addOwnership(id);



            if(typeof playCoin === "function"){

                playCoin();

            }



            return true;


        }



        return false;


    }







    addOwnership(id){



        const item =
            this.items[id];



        if(
            item.type === "ability"
        ){


            if(
                !save.data.abilities.includes(id)
            ){


                save.data.abilities.push(id);


            }


        }





        if(
            item.type === "paddle"
        ){


            save.data.cosmetics.paddles.push(
                id
            );


        }





        if(
            item.type === "ball"
        ){


            save.data.cosmetics.balls.push(
                id
            );


        }



        save.save();



    }







    owned(id){


        const item =
            this.items[id];



        if(
            item.type === "ability"
        ){


            return save.data.abilities.includes(id);


        }



        if(
            item.type === "paddle"
        ){


            return save.data.cosmetics.paddles.includes(id);


        }





        if(
            item.type === "ball"
        ){


            return save.data.cosmetics.balls.includes(id);


        }



        return false;


    }







    getItem(id){


        return this.items[id];


    }







    listItems(){


        return Object.keys(
            this.items
        );


    }



}






// Global shop

const shop =
    new Shop();
