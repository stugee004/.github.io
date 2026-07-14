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
        if(Math.random() < 1){
            this.spawnConstellation();
        }

    }


    spawnConstellation(){

    const constellations = [

        // Big Dipper
        [
            [700,120],[760,100],[820,120],
            [870,170],[920,210],[860,250],[800,240]
        ],


        // Orion
        [
            [700,100],[760,150],[820,100],
            [760,220],[760,300],[700,360],
            [820,360]
        ],


        // Cassiopeia (W shape)
        [
            [700,150],[760,100],[820,160],
            [880,100],[940,150]
        ],


        // Leo
        [
            [720,120],[780,170],[850,160],
            [900,220],[820,260],[760,230]
        ],


        // Scorpius
        [
            [750,100],[780,150],[800,220],
            [850,260],[920,280],[950,340]
        ],


        // Crux Southern Cross
        [
            [800,100],[800,220],
            [730,160],[870,160]
        ],


        // Pegasus
        [
            [700,120],[820,120],
            [850,220],[730,240],
            [700,120]
        ],


        // Ursa Minor
        [
            [760,100],[800,130],
            [840,170],[880,210],
            [920,240]
        ],


        // Aquarius
        [
            [720,130],[780,180],
            [840,140],[900,200],
            [850,270]
        ],


        // Ursa Major simplified
        [
            [700,200],[760,170],
            [830,190],[900,150],
            [950,200]
        ]

    ];


    this.constellation =
        constellations[
            Math.floor(Math.random()*constellations.length)
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
