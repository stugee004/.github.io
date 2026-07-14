class Starfield {

    constructor(count){

        this.stars = [];

        for(let i = 0; i < count; i++){

            this.stars.push({

                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,

                size: Math.random() * 3 + 1,

                brightness: Math.random(),

                speed: Math.random() * 0.03 + 0.01
            });

        }

    }


    update(){

        this.stars.forEach(star => {

            star.brightness += star.speed;

            if(star.brightness > 1 || star.brightness < 0){

                star.speed *= -1;

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
