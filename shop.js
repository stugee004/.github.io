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

            return;

        }







        if(item.owned){


            console.log(
                "Already owned"
            );


            return;


        }







        let balance = 0;



        if(typeof economy !== "undefined"){


            balance =
                economy.cenes;


        }







        if(balance >= item.cost){



            economy.cenes -= item.cost;



            item.owned = true;




            if(typeof sounds !== "undefined"){


                sounds.coin();


            }






            this.save();



            console.log(
                item.name +
                " purchased!"
            );



        }
        else{


            console.log(
                "Not enough Cenes"
            );


        }



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





        if(typeof sounds !== "undefined"){


            sounds.ability();


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



        if(saved){


            const data =
                JSON.parse(saved);



            Object.assign(
                this.items,
                data
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
