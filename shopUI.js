class ShopUI {


    constructor(){

        this.visible = false;

        this.create();


    }







    create(){


        const shop =
            document.createElement("div");


        shop.id = "shopUI";


        shop.style.display = "none";



        shop.innerHTML = `

            <h2>SHOP</h2>


            <div id="shopBalance">
                Cenes: 0
            </div>


            <div id="shopItems"></div>



            <button id="closeShop">
                Back
            </button>

        `;



        document.body.appendChild(shop);



        this.shop = shop;



        document
        .getElementById(
            "closeShop"
        )
        .onclick = ()=>{


            this.close();


        };


    }









    open(){


        this.visible = true;


        this.shop.style.display =
            "block";



        open(){


    this.visible = true;


    this.shop.style.display =
        "block";


    this.refresh();


}


        this.refresh();


    }








    close(){


        this.visible = false;


        this.shop.style.display =
            "none";



        if(menu){

            menu.show();

        }



    }









    refresh(){



        let balance = 0;



        if(typeof economy !== "undefined"){


            balance =
                economy.cenes;


        }






        document
        .getElementById(
            "shopBalance"
        )
        .innerText =

            "Cenes: "
            +
            balance;







        const container =
            document.getElementById(
                "shopItems"
            );



        container.innerHTML = "";






        if(typeof shop === "undefined"){

            return;

        }








        Object.keys(
            shop.items
        )
        .forEach(key=>{


            const item =
                shop.items[key];



            const button =
                document.createElement(
                    "button"
                );



            button.innerText =

                item.name
                +
                " - "
                +
                item.cost
                +
                " Cenes";







            if(item.owned){


                button.innerText +=
                    " ✓ Owned";


                button.disabled =
                    true;


            }







            button.onclick = ()=>{


                shop.buy(key);


                this.refresh();



            };



            container.appendChild(
                button
            );



        });



    }



}






const shopUI =
    new ShopUI();
