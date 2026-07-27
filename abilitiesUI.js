// =====================================
// Hyper Pong
// Abilities UI
// =====================================

class AbilitiesUI{

    constructor(){

        this.visible = false;

        this.create();

    }





    create(){

        const element =
            document.createElement("div");

        element.id = "abilitiesUI";

        element.style.display = "none";

        element.innerHTML = `

            <h2>ABILITIES</h2>

            <div id="abilitiesBalance">
                Cenes: 0
            </div>

            <div id="abilityItems"></div>

            <button id="closeAbilities">
                ← Back
            </button>

        `;

        document.body.appendChild(element);

        this.element = element;

        document
            .getElementById("closeAbilities")
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
            "abilitiesBalance"
        ).innerText =
            "Cenes: " + balance;



        // ----------------------------
        // Ability List
        // ----------------------------

        const container =
            document.getElementById(
                "abilityItems"
            );

        container.innerHTML = "";



        if(
            typeof abilities === "undefined" ||
            !abilities.abilities
        ){

            container.innerHTML =
                "<p>Abilities unavailable.</p>";

            return;

        }



        Object.keys(
            abilities.abilities
        ).forEach(key=>{

            const ability =
                abilities.abilities[key];



            const card =
                document.createElement("div");

            card.className =
                "abilityItem";



            const title =
                document.createElement("h3");

            title.innerText =
                ability.name;



            const description =
                document.createElement("p");

            description.innerText =
                ability.description ||
                "No description.";



            const button =
                document.createElement("button");



            if(ability.unlocked){

                button.innerText =
                    "✓ UNLOCKED";

                button.disabled = true;

            }
            else{

                button.innerText =
                    "Unlock (" +
                    ability.cost +
                    " Cenes)";

            }



            button.onclick = ()=>{

                abilities.unlock(key);

                this.refresh();

            };



            card.appendChild(title);
            card.appendChild(description);
            card.appendChild(button);

            container.appendChild(card);

        });

    }

}



const abilitiesUI =
    new AbilitiesUI();
