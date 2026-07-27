// =====================================
// Hyper Pong
// Shop UI
// =====================================

class ShopUI{

    constructor(){

        this.visible = false;

        this.create();

    }





    create(){

        const element =
            document.createElement("div");

        element.id = "shopUI";

        element.style.display = "none";

        element.innerHTML = `

            <h2>SHOP</h2>

            <div id="shopBalance">
                Cenes: 0
            </div>

            <div id="shopItems"></div>

            <button id="closeShop">
                ← Back
            </button>

        `;

        document.body.appendChild(element);

        this.element = element;

        document
            .getElementById("closeShop")
            .onclick = ()=>{

                this.close();

            };

    }





    open(){

        this.visible = true;

        this.element.style.display = "block";

        this.refresh();

    }





    close(){

        this.visible = false;

        this.element.style.display = "none";

        if(typeof State !== "undefined"){

            State.openMenu();

        }

    }





    refresh(){

        // ----------------------------
        // Balance
        // ----------------------------

        let balance = 0;

        if(typeof economy !== "undefined"){

            balance = economy.cenes;

        }

        document.getElementById(
            "shopBalance"
        ).innerText =
            "Cenes: " + balance;



        // ----------------------------
        // Item List
        // ----------------------------

        const container =
            document.getElementById(
                "shopItems"
            );

        container.innerHTML = "";



        if(typeof shop === "undefined"){

            container.innerHTML =
                "<p>Shop unavailable.</p>";

            return;

        }



        Object.keys(shop.items).forEach(key=>{

            const item =
                shop.items[key];



            const card =
                document.createElement("div");

            card.className = "shopItem";



            const title =
                document.createElement("h3");

            title.innerText =
                item.name;



            const description =
                document.createElement("p");

            description.innerText =
                item.description;



            const button =
                document.createElement("button");



            if(item.owned){

                button.innerText =
                    "✓ OWNED";

                button.disabled = true;

            }
            else{

                button.innerText =
                    "Buy (" +
                    item.cost +
                    " Cenes)";

            }



            button.onclick = ()=>{

                const purchased =
                    shop.buy(key);

                if(purchased){

                    this.refresh();

                }

            };



            card.appendChild(title);

            card.appendChild(description);

            card.appendChild(button);

            container.appendChild(card);

        });

    }

}



const shopUI =
    new ShopUI();
