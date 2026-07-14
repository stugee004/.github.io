class Starfield {

    constructor(count){

        this.stars = [];

        for(let i = 0; i < count; i++){

            this.stars.push({

                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,

                size: Math.random() * 2.5 + 0.5,

                brightness: Math.random() * 0.8 + 0.2,

                speed: Math.random() * 0.01 + 0.003,

                direction: Math.random() > 0.5 ? 1 : -1
            });

        }


        this.constellation = null;
        this.constellationTimer = 0;


        // 5% chance when game starts
        if(Math.random() < 0.05){
            this.spawnConstellation();
        }

    }


    spawnConstellation(){

        // Big Dipper shape
        this.constellation = [

            {x:700,y:120},
            {x:760,y:100},
            {x:820,y:120},
            {x:870,y:170},
            {x:920,y:210},
            {x:860,y:250},
            {x:800,y:240}

        ];

        this.constellationTimer = 900;

    }


    update(){

        this.stars.forEach(star => {

            star.brightness += star.speed * star.direction;


            if(star.brightness >= 1){

                star.brightness = 1;
                star.direction = -1;

            }


            if(star.brightness <= 0.2){

                star.brightness = 0.2;
                star.direction = 1;

            }

        });


        if(this.constellation){

            this.constellationTimer--;

            if(this.constellationTimer <= 0){

                this.constellation = null;

            }

        }


        // Small chance for a new constellation
        if(!this.constellation && Math.random() < 0.0005){

            this.spawnConstellation();

        }

    }


    draw(ctx){

        ctx.fillStyle="white";


        this.stars.forEach(star=>{

            ctx.globalAlpha = star.brightness;

            ctx.beginPath();

            ctx.arc(
                star.x,
                star.y,
                star.size,
                0,
                Math.PI*2
            );

            ctx.fill();

        });


        // Draw constellation
        if(this.constellation){

            ctx.globalAlpha = 0.5;

            ctx.strokeStyle="white";
            ctx.lineWidth=1;


            ctx.beginPath();

            this.constellation.forEach((star,index)=>{

                if(index===0){

                    ctx.moveTo(star.x,star.y);

                } else {

                    ctx.lineTo(star.x,star.y);

                }

            });


            ctx.stroke();


            // constellation stars
            ctx.globalAlpha=1;

            this.constellation.forEach(star=>{

                ctx.beginPath();

                ctx.arc(
                    star.x,
                    star.y,
                    4,
                    0,
                    Math.PI*2
                );

                ctx.fill();

            });

        }


        ctx.globalAlpha=1;

    }

}
