// =====================================
// Hyper Pong
// Shop UI
// =====================================

class ShopUI {


    constructor(){

        this.visible = false;

        this.create();

    }





    create(){


        const element =
            document.createElement("div");


        element.id =
            "shopUI";


        element.style.display =
            "none";



        element.innerHTML = `

            <h2>SHOP</h2>


            <div id="shopBalance">
                Cenes: 0
            </div>


            <div id="shopItems"></div>


            <button id="closeShop">
                Back
            </button>


        `;



        document.body.appendChild(
            element
        );



        this.element =
            element;



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


        this.element.style.display =
            "block";


        this.refresh();


    }





    close(){


        this.visible = false;


        this.element.style.display =
            "none";



        if(typeof State !== "undefined"){

            if(typeof shopUI !== "undefined"){
    shopUI.close();
}

if(typeof abilitiesUI !== "undefined"){
    abilitiesUI.close();
}

if(typeof State !== "undefined"){
    State.openMenu();
}

        }


    }





    refresh(){


        let balance = 0;



        if(typeof economy !== "undefined"){

            balance =
                economy.cenes;

        }



        const balanceElement =
            document.getElementById(
                "shopBalance"
            );


        if(balanceElement){

            balanceElement.innerText =
                "Cenes: " + balance;

        }





        const container =
            document.getElementById(
                "shopItems"
            );



        if(!container){

            return;

        }



        container.innerHTML = "";



        if(typeof shop === "undefined"){


            container.innerHTML =
                "Shop unavailable";


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

                item.name +

                " - " +

                item.cost +

                " Cenes";




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
