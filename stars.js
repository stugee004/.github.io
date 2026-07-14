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

    }


    draw(ctx){

        ctx.fillStyle = "white";

        this.stars.forEach(star => {

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

        ctx.globalAlpha = 1;

    }

}
