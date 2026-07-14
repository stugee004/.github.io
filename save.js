class SaveSystem {


    constructor(){

        this.key = "hyperPongSave";

        this.version = 1;


        this.defaultData = {

            version: this.version,


            economy: {

                cenes: 0,

                wins: 0,

                losses: 0

            },


            discoveries: {


                constellations: []

            },


            cosmetics: {


                paddles: [],

                balls: []

            },


            abilities: [],



            settings: {

                difficulty: "medium",

                sound: true

            }


        };


        this.data = this.load();


    }





    load(){


        const saved =
            localStorage.getItem(
                this.key
            );



        if(!saved){


            return structuredClone(
                this.defaultData
            );


        }



        try{


            const parsed =
                JSON.parse(saved);



            // If game updates later

            return this.merge(

                structuredClone(
                    this.defaultData
                ),

                parsed

            );



        }

        catch(error){


            console.warn(
                "Save file corrupted. Creating new save."
            );


            return structuredClone(
                this.defaultData
            );


        }


    }





    save(){


        localStorage.setItem(

            this.key,

            JSON.stringify(
                this.data
            )

        );


    }





    merge(defaults, saved){


        for(let key in saved){


            if(
                typeof saved[key] === "object" &&
                saved[key] !== null &&
                !Array.isArray(saved[key])
            ){


                defaults[key] =
                    this.merge(

                        defaults[key],

                        saved[key]

                    );


            }

            else{


                defaults[key] =
                    saved[key];


            }


        }


        return defaults;


    }





    reset(){


        localStorage.removeItem(
            this.key
        );


        this.data =
            structuredClone(
                this.defaultData
            );


    }





    get(path){


        let current =
            this.data;



        for(let item of path.split(".")){


            if(current[item] === undefined){

                return null;

            }


            current =
                current[item];


        }



        return current;


    }





    set(path,value){


        const parts =
            path.split(".");


        let current =
            this.data;



        for(let i=0;i<parts.length-1;i++){


            if(!current[parts[i]]){


                current[parts[i]] = {};


            }


            current =
                current[parts[i]];


        }



        current[
            parts[parts.length-1]
        ] = value;



        this.save();


    }





    add(path,amount){


        const current =
            this.get(path);



        if(typeof current === "number"){


            this.set(

                path,

                current + amount

            );


        }


    }


}





// Global save object

const save =
    new SaveSystem();
