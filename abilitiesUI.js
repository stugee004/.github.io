class AbilitiesUI {


    constructor(){


        this.visible = false;


        this.create();


    }







    create(){



        const abilities =
            document.createElement("div");



        abilities.id = "abilitiesUI";


        abilities.style.display =
            "none";




        abilities.innerHTML = `


            <h2>ABILITIES</h2>



            <div id="abilitiesBalance">
                Cenes: 0
            </div>



            <div id="abilityItems"></div>



            <button id="closeAbilities">
                Back
            </button>



        `;



        document.body.appendChild(
            abilities
        );



        this.abilities =
            abilities;





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



        this.abilities.style.display =
            "block";



        open(){


    this.visible = true;


    this.abilities.style.display =
        "block";


    this.refresh();


}



        this.refresh();



    }









    close(){



        this.visible = false;



        this.abilities.style.display =
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
            "abilitiesBalance"
        )
        .innerText =

            "Cenes: "
            +
            balance;







        const container =
            document.getElementById(
                "abilityItems"
            );



        container.innerHTML = "";







        if(typeof abilities === "undefined"){


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

                ability.name
                +
                " - "
                +
                ability.cost
                +
                " Cenes";








            if(ability.unlocked){



                button.innerText +=
                    " ✓ Unlocked";



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
