class Economy {


    constructor(){


        this.cenes = 0;


        this.totalWins = 0;


        this.constellationsFound = [];


        this.load();


    }





    addCenes(amount){


        this.cenes += amount;


        this.save();



        if(typeof playCoin === "function"){

            playCoin();

        }


        this.updateDisplay();


    }





    spendCenes(amount){


        if(this.cenes >= amount){


            this.cenes -= amount;


            this.save();


            this.updateDisplay();


            return true;


        }


        return false;


    }





    victoryReward(){


        this.totalWins++;


        this.addCenes(50);


        this.save();


    }





    scoreReward(){


        this.addCenes(10);


    }





    discoverConstellation(name){



        if(
            !this.constellationsFound.includes(name)
        ){


            this.constellationsFound.push(name);


            this.addCenes(100);



            this.save();


            return true;


        }



        return false;


    }





    hasConstellation(name){


        return this.constellationsFound.includes(name);


    }







    save(){


        const data = {


            cenes:this.cenes,


            wins:this.totalWins,


            constellations:
                this.constellationsFound


        };



        localStorage.setItem(

            "hyperPongSave",

            JSON.stringify(data)

        );


    }







    load(){


        const data =
            localStorage.getItem(
                "hyperPongSave"
            );



        if(data){


            const saved =
                JSON.parse(data);



            this.cenes =
                saved.cenes || 0;



            this.totalWins =
                saved.wins || 0;



            this.constellationsFound =
                saved.constellations || [];


        }


    }







    updateDisplay(){


        const display =
            document.getElementById(
                "cenes"
            );



        if(display){


            display.textContent =
                this.cenes;


        }


    }


}






// Global economy object

const economy =
    new Economy();


// Load display immediately

economy.updateDisplay();
