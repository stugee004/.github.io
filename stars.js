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

        // 5% chance when the game starts
        if(Math.random() < 0.05){
            this.spawnConstellation();
        }

    }

    spawnConstellation(){

        const constellations = [

            // Big Dipper
            [
                [0,0],[60,-20],[120,0],
                [170,50],[220,90],[160,130],[100,120]
            ],

            // Orion
            [
                [0,0],[60,50],[120,0],
                [60,120],[60,200],[0,260],[120,260]
            ],

            // Cassiopeia
            [
                [0,50],[60,0],[120,60],
                [180,0],[240,50]
            ],

            // Leo
            [
                [20,20],[80,70],[150,60],
                [200,120],[120,160],[60,130]
            ],

            // Scorpius
            [
                [20,0],[50,50],[70,120],
                [120,160],[190,180],[220,240]
            ],

            // Crux
            [
                [100,0],[100,120],
                [30,60],[170,60]
            ],

            // Pegasus
            [
                [0,0],[120,0],[150,100],[30,120]
            ],

            // Ursa Minor
            [
                [0,0],[40,30],[80,70],
                [120,110],[160,140]
            ],

            // Aquarius
            [
                [0,20],[60,70],[120,30],
                [180,90],[130,160]
            ],

            // Ursa Major
            [
                [0,80],[60,50],[130,70],
                [200,30],[250,80]
            ]

        ];

        const pattern = constellations[
            Math.floor(Math.random() * constellations.length)
        ];

        // Random location on the screen
        const offsetX = Math.random() * (canvas.width - 300) + 25;
        const offsetY = Math.random() * (canvas.height - 300) + 25;

        this.constellation = pattern.map(star => ({
            x: star[0] + offsetX,
            y: star[1] + offsetY
        }));

        this.constellationTimer = 900;

        // Optional sound
        if(typeof playConstellation === "function"){
            playConstellation();
        }

    }

    update(){

        this.stars.forEach(star=>{

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

        // Small chance each frame
        if(!this.constellation && Math.random() < 0.0005){
            this.spawnConstellation();
        }

    }

    draw(ctx){

        ctx.fillStyle = "white";

        // Normal stars
        this.stars.forEach(star=>{

            ctx.globalAlpha = star.brightness;

            ctx.beginPath();

            ctx.arc(
                star.x,
                star.y,
                star.size,
                0,
                Math.PI * 2
            );

            ctx.fill();

        });

        // Draw constellation
        if(this.constellation){

            ctx.globalAlpha = 0.45;

            ctx.strokeStyle = "white";
            ctx.lineWidth = 1.5;

            ctx.beginPath();

            this.constellation.forEach((star,index)=>{

                if(index === 0){
                    ctx.moveTo(star.x, star.y);
                }else{
                    ctx.lineTo(star.x, star.y);
                }

            });

            ctx.stroke();

            // Bright stars
            ctx.globalAlpha = 1;

            this.constellation.forEach(star=>{

                ctx.beginPath();

                ctx.arc(
                    star.x,
                    star.y,
                    4,
                    0,
                    Math.PI * 2
                );

                ctx.fill();

            });

        }

        ctx.globalAlpha = 1;

    }

}
