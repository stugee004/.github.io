class ShopUI {


    constructor(){

        this.visible = false;

        this.create();

    }





    create(){


        const shopElement =
            document.createElement("div");


        shopElement.id = "shopUI";


        shopElement.style.display = "none";



        shopElement.innerHTML = `

            <h2>SHOP</h2>

            <div id="shopBalance">
                Cenes: 0
            </div>

            <div id="shopItems"></div>

            <button id="closeShop">
                Back
            </button>

        `;



        document.body.appendChild(shopElement);



        this.shopElement = shopElement;



        document
            .getElementById("closeShop")
            .onclick = () => {

                this.close();

            };


    }







    open(){


        this.visible = true;


        this.shopElement.style.display = "block";


        this.refresh();


    }







    close(){


        this.visible = false;


        this.shopElement.style.display = "none";


        if(typeof menu !== "undefined"){

            menu.show();

        }


    }







    refresh(){


        if(typeof economy !== "undefined"){

            document
                .getElementById("shopBalance")
                .innerText =
                "Cenes: " + economy.cenes;

        }



        const container =
            document.getElementById("shopItems");


        container.innerHTML = "";



        if(typeof shop === "undefined"){

            return;

        }




        Object.keys(shop.items).forEach(key=>{


            const item =
                shop.items[key];



            const button =
                document.createElement("button");



            button.innerText =
                item.name +
                " - " +
                item.cost +
                " Cenes";



            if(item.owned){

                button.innerText +=
                    " ✓ Owned";

                button.disabled = true;

            }



            button.onclick = ()=>{


                shop.buy(key);


                this.refresh();


            };



            container.appendChild(button);


        });


    }


}




const shopUI =
    new ShopUI();
