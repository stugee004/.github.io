class Starfield {

    constructor(count = 180) {

        this.stars = [];

        this.shootingStars = [];

        this.constellation = null;

        this.constellationProgress = 0;

        this.constellationTimer = 0;

        this.constellationName = "";


        for(let i = 0; i < count; i++){

            this.stars.push({

                x: Math.random() * canvas.width,

                y: Math.random() * canvas.height,

                size: Math.random() * 2 + 0.5,

                brightness: Math.random() * 0.7 + 0.3,

                speed: Math.random() * 0.01 + 0.003,

                direction: Math.random() > 0.5 ? 1 : -1

            });

        }


        // Small chance on start
        if(Math.random() < 0.1){

            this.spawnConstellation();

        }

    }



    constellations(){

        return [

            {
                name:"Big Dipper",
                stars:[
                    [0,0],
                    [50,-20],
                    [100,0],
                    [150,40],
                    [200,80],
                    [150,120],
                    [90,110]
                ]
            },


            {
                name:"Orion",
                stars:[
                    [40,0],
                    [100,60],
                    [160,0],
                    [100,120],
                    [100,200],
                    [50,260],
                    [150,260]
                ]
            },


            {
                name:"Cassiopeia",
                stars:[
                    [0,50],
                    [60,0],
                    [120,60],
                    [180,0],
                    [240,50]
                ]
            },


            {
                name:"Leo",
                stars:[
                    [0,30],
                    [70,70],
                    [140,50],
                    [200,120],
                    [120,170],
                    [50,130]
                ]
            },


            {
                name:"Scorpius",
                stars:[
                    [20,0],
                    [60,60],
                    [80,130],
                    [140,170],
                    [220,210],
                    [260,270]
                ]
            },


            {
                name:"Crux",
                stars:[
                    [100,0],
                    [100,140],
                    [20,70],
                    [180,70]
                ]
            },


            {
                name:"Pegasus",
                stars:[
                    [0,0],
                    [130,0],
                    [160,100],
                    [30,130]
                ]
            },


            {
                name:"Ursa Minor",
                stars:[
                    [0,0],
                    [40,40],
                    [90,80],
                    [140,120],
                    [190,150]
                ]
            },


            {
                name:"Aquarius",
                stars:[
                    [0,20],
                    [60,80],
                    [120,30],
                    [190,100],
                    [140,170]
                ]
            },


            {
                name:"Ursa Major",
                stars:[
                    [0,80],
                    [70,40],
                    [140,70],
                    [210,30],
                    [270,80]
                ]
            }

        ];

    }



    spawnConstellation(){

        const list = this.constellations();

        const chosen =
            list[Math.floor(Math.random()*list.length)];


        const offsetX =
            Math.random() * (canvas.width - 350) + 40;


        const offsetY =
            Math.random() * (canvas.height - 300) + 40;


        this.constellation =
            chosen.stars.map(point => {

                return {

                    x: point[0] + offsetX,

                    y: point[1] + offsetY

                };

            });


        this.constellationName = chosen.name;


        this.constellationProgress = 0;

        this.constellationTimer = 900;


        if(typeof playConstellation === "function"){

            playConstellation();

        }

    }



    spawnShootingStar(){

        this.shootingStars.push({

            x: Math.random()*canvas.width,

            y:0,

            speed:8,

            length:80

        });

    }



    update(){

        // Star twinkle

        this.stars.forEach(star=>{

            star.brightness +=
                star.speed * star.direction;


            if(star.brightness >= 1){

                star.brightness = 1;

                star.direction = -1;

            }


            if(star.brightness <= 0.2){

                star.brightness = 0.2;

                star.direction = 1;

            }

        });



        // Shooting stars

        this.shootingStars.forEach((s,index)=>{

            s.x -= s.speed;

            s.y += s.speed;


            if(s.x < -100 || s.y > canvas.height){

                this.shootingStars.splice(index,1);

            }

        });



        if(Math.random()<0.002){

            this.spawnShootingStar();

        }



        // Constellation reveal

        if(this.constellation){

            this.constellationProgress += 0.03;


            this.constellationTimer--;


            if(this.constellationTimer<=0){

                this.constellation=null;

            }

        }


        else if(Math.random()<0.0005){

            this.spawnConstellation();

        }

    }





    draw(ctx){

        // Normal stars

        ctx.fillStyle="white";


        this.stars.forEach(star=>{

            ctx.globalAlpha =
                star.brightness;


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



        // Shooting stars

        ctx.globalAlpha=0.8;

        this.shootingStars.forEach(s=>{


            ctx.strokeStyle="white";

            ctx.lineWidth=2;


            ctx.beginPath();

            ctx.moveTo(
                s.x,
                s.y
            );


            ctx.lineTo(
                s.x+s.length,
                s.y-s.length
            );


            ctx.stroke();


        });




        // Constellation

        if(this.constellation){


            const visible =
                Math.floor(
                    this.constellation.length *
                    this.constellationProgress
                );



            ctx.globalAlpha=0.8;

            ctx.strokeStyle="cyan";

            ctx.lineWidth=2;


            ctx.beginPath();


            for(let i=0;i<visible;i++){


                const star =
                    this.constellation[i];


                if(i===0){

                    ctx.moveTo(
                        star.x,
                        star.y
                    );

                }
                else{

                    ctx.lineTo(
                        star.x,
                        star.y
                    );

                }

            }


            ctx.stroke();



            ctx.globalAlpha=1;


            for(let i=0;i<visible;i++){


                const star =
                    this.constellation[i];


                ctx.shadowBlur=15;

                ctx.shadowColor="cyan";

                ctx.fillStyle="white";


                ctx.beginPath();


                ctx.arc(
                    star.x,
                    star.y,
                    5,
                    0,
                    Math.PI*2
                );


                ctx.fill();


                ctx.shadowBlur=0;


                if(typeof particles !== "undefined"){

                    if(Math.random()<0.1){

                        particles.sparkle(
                            star.x,
                            star.y
                        );

                    }

                }

            }

        }


        ctx.globalAlpha=1;

    }

}
