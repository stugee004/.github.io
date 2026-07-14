class SoundManager {


    constructor(){

        this.audio =
            new (window.AudioContext ||
            window.webkitAudioContext)();


        this.volume = 0.3;


    }




    unlock(){

        if(this.audio.state === "suspended"){

            this.audio.resume();

        }

    }





    playTone(
        frequency,
        duration,
        type="sine",
        volume=this.volume
    ){


        this.unlock();


        const oscillator =
            this.audio.createOscillator();


        const gain =
            this.audio.createGain();



        oscillator.type = type;


        oscillator.frequency.value =
            frequency;



        gain.gain.value = volume;



        oscillator.connect(gain);


        gain.connect(
            this.audio.destination
        );



        oscillator.start();



        gain.gain.exponentialRampToValueAtTime(

            0.001,

            this.audio.currentTime + duration

        );



        oscillator.stop(

            this.audio.currentTime + duration

        );


    }






    hit(){


        this.playTone(

            240,

            0.08,

            "square"

        );


        setTimeout(()=>{

            this.playTone(
                400,
                0.05,
                "square"
            );

        },40);


    }





    wall(){


        this.playTone(

            120,

            0.1,

            "triangle"

        );


    }






    score(){


        this.playTone(

            500,

            0.15,

            "sine"

        );


        setTimeout(()=>{


            this.playTone(

                750,

                0.2,

                "sine"

            );


        },100);


    }







    coin(){


        this.playTone(

            800,

            0.08,

            "square"

        );


        setTimeout(()=>{


            this.playTone(

                1200,

                0.15,

                "square"

            );


        },80);


    }







    constellation(){


        const notes = [

            523,
            659,
            784,
            1046

        ];



        notes.forEach((note,index)=>{


            setTimeout(()=>{


                this.playTone(

                    note,

                    0.25,

                    "sine"

                );


            },index*120);


        });


    }








    ability(){


        const notes=[

            300,
            450,
            700

        ];



        notes.forEach((n,i)=>{


            setTimeout(()=>{


                this.playTone(

                    n,

                    0.12,

                    "sawtooth"

                );


            },i*70);


        });


    }







    victory(){


        const melody=[

            523,
            659,
            784,
            1046,
            1318

        ];



        melody.forEach((n,i)=>{


            setTimeout(()=>{


                this.playTone(

                    n,

                    0.3,

                    "triangle",

                    0.4

                );


            },i*180);


        });


    }







    explosion(){


        this.playTone(

            80,

            0.3,

            "sawtooth",

            0.5

        );


    }



}



// Global sound object


const sounds = new SoundManager();





// Compatibility functions
// These match the other files


function playHit(){

    sounds.hit();

}


function playWall(){

    sounds.wall();

}


function playScore(){

    sounds.score();

}


function playCoin(){

    sounds.coin();

}


function playConstellation(){

    sounds.constellation();

}


function playAbility(){

    sounds.ability();

}


function playVictory(){

    sounds.victory();

}


function playExplosion(){

    sounds.explosion();

}
