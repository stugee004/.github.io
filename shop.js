// =====================================
// Hyper Pong Shop System
// =====================================

class Shop {


    constructor(){


        this.items = {


            galaxyPaddle: {

                name: "Galaxy Paddle",

                description:
                    "A cosmic glowing paddle",

                cost: 600,

                owned: false

            },


            goldenBall: {

                name: "Golden Ball",

                description:
                    "A legendary golden ball",

                cost: 400,

                owned: false

            },


            starTrail: {

                name: "Star Trail",

                description:
                    "Leaves a trail of stars",

                cost: 300,

                owned: false

            }


        };



        this.load();


    }







    buy(itemName){


        const item =
            this.items[itemName];



        if(!item){

            console.log(
                "Item does not exist"
            );

            return false;

        }




        if(item.owned){


            console.log(
                "Already owned"
            );


            return false;

        }





        let balance = 0;



        if(typeof economy !== "undefined"){

            balance =
                economy.cenes;

        }





        if(balance >= item.cost){


            economy.cenes -= item.cost;



            item.owned = true;



            this.save();



            if(typeof sounds !== "undefined"){

                sounds.coin();

            }



            console.log(
                item.name +
                " purchased!"
            );


            return true;


        }



        console.log(
            "Not enough Cenes"
        );


        return false;


    }







    equip(itemName){


        const item =
            this.items[itemName];



        if(
            !item ||
            !item.owned
        ){

            return;

        }



        console.log(
            item.name +
            " equipped"
        );



        this.save();


    }







    load(){


        const saved =
            localStorage.getItem(
                "shopData"
            );



        if(!saved){

            return;

        }




        try{


            const data =
                JSON.parse(saved);



            Object.keys(data)
            .forEach(key=>{


                if(this.items[key]){


                    this.items[key].owned =
                        data[key].owned || false;


                }


            });



        }
        catch(error){


            console.log(
                "Shop save corrupted, resetting"
            );


            localStorage.removeItem(
                "shopData"
            );


        }


    }







    save(){


        localStorage.setItem(

            "shopData",

            JSON.stringify(
                this.items
            )

        );


    }







    getOwned(){


        return Object.values(
            this.items
        )
        .filter(
            item=>item.owned
        );


    }


}





const shop =
    new Shop();
