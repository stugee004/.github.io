// =====================================
// Hyper Pong
// Abilities UI
// =====================================

class AbilitiesUI {


    constructor(){

        this.visible = false;

        this.create();

    }



    create(){


        const element =
            document.createElement("div");


        element.id =
            "abilitiesUI";


        element.style.display =
            "none";


        element.innerHTML = `

            <h2>ABILITIES</h2>

            <div id="abilitiesBalance">
                Cenes: 0
            </div>


            <div id="abilityItems"></div>


            <button id="closeAbilities">
                Back
            </button>

        `;



        document.body.appendChild(element);



        this.element =
            element;



        document
        .getElementById(
            "closeAbilities"
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



        const balanceText =
            document.getElementById(
                "abilitiesBalance"
            );


        if(balanceText){

            balanceText.innerText =
                "Cenes: " + balance;

        }





        const container =
            document.getElementById(
                "abilityItems"
            );


        if(!container){

            return;

        }



        container.innerHTML = "";



        if(typeof abilities === "undefined"){

            container.innerHTML =
                "No abilities available";

            return;

        }



        Object.keys(
            abilities.abilities
        )
        .forEach(key=>{


            const ability =
                abilities.abilities[key];



            const button =
                document.createElement(
                    "button"
                );



            button.innerText =

                ability.name +

                " - " +

                ability.cost +

                " Cenes";




            if(ability.unlocked){


                button.innerText +=
                    " ✓";


                button.disabled =
                    true;


            }



            button.onclick = ()=>{


                abilities.unlock(key);


                this.refresh();


            };



            container.appendChild(
                button
            );


        });


    }



}



const abilitiesUI =
    new AbilitiesUI();
