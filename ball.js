class Ball {


    constructor(){

        this.trail = [];
        
        if(this.color === "#FFD700"){

    ctx.shadowBlur = 25;
    ctx.shadowColor = "#FFD700";

}
else{

    ctx.shadowBlur = 0;

}

        this.radius = 10;

        this.speed = 14;


        this.x = canvas.width / 2;
        this.y = canvas.height / 2;


        this.dx = this.speed;
        this.dy = 0;


        this.color = "white";


        this.trailTimer = 0;


        this.hitCooldown = 0;


        this.reset();

        ctx.shadowBlur = 0;
    }


    updateAppearance(){

    this.color = "white";


    if(
        typeof shop !== "undefined" &&
        shop.items &&
        shop.items.goldenBall &&
        shop.items.goldenBall.owned
    ){

        this.color = "#FFD700";

    }

}

    // ----------------------------
// Star Trail
// ----------------------------

if(
    typeof shop !== "undefined" &&
    shop.items &&
    shop.items.starTrail &&
    shop.items.starTrail.owned
){

    this.trail.push({

        x: this.x,

        y: this.y,

        size: 4,

        alpha: 1

    });

}



// Update stars

for(let i=this.trail.length-1;i>=0;i--){

    const star = this.trail[i];

    star.alpha -= 0.03;

    star.size *= 0.97;

    if(star.alpha<=0){

        this.trail.splice(i,1);

    }

}



// Prevent unlimited stars

if(this.trail.length>40){

    this.trail.shift();

}

    reset(){


        this.x = canvas.width / 2;

        this.y = canvas.height / 2;



        this.speed = 14;



        const direction =
            Math.random() > 0.5 ? 1 : -1;



        const angle =
            (Math.random() - 0.5)
            *
            Math.PI / 3;



        this.dx =
            Math.cos(angle)
            *
            this.speed
            *
            direction;



        this.dy =
            Math.sin(angle)
            *
            this.speed;



        this.hitCooldown = 0;


    }








    update(){


        this.updateAppearance();
        
        this.x += this.dx;

        this.y += this.dy;



        if(this.hitCooldown > 0){

            this.hitCooldown--;

        }






        // Top wall


        if(
            this.y - this.radius <= 0
        ){


            this.y = this.radius;


            this.dy *= -1;


            this.playWallSound();


        }






        // Bottom wall


        if(
            this.y + this.radius >= canvas.height
        ){


            this.y =
                canvas.height - this.radius;



            this.dy *= -1;


            this.playWallSound();


        }







        this.trailTimer++;




        if(
            this.trailTimer % 2 === 0 &&
            typeof particles !== "undefined"
        ){


            particles.ballTrail(this);


        }



    }








    bounce(paddle){



        if(this.hitCooldown > 0){

            return;

        }



        const hitPosition =
            (
                this.y -
                (
                    paddle.y +
                    paddle.height / 2
                )
            )
            /
            (
                paddle.height / 2
            );





        const angle =
            hitPosition *
            Math.PI / 4;





        const direction =
            this.dx > 0 ? -1 : 1;





        this.speed += 0.25;





        this.dx =
            Math.cos(angle)
            *
            this.speed
            *
            direction;



        this.dy =
            Math.sin(angle)
            *
            this.speed;







        this.hitCooldown = 8;





        if(typeof particles !== "undefined"){

            particles.paddleHit(

                this.x,

                this.y,

                paddle.color

            );

        }






        if(typeof sounds !== "undefined"){

            sounds.hit();

        }



    }









    checkPaddleCollision(paddle){



        if(


            this.x + this.radius > paddle.x &&


            this.x - this.radius <
            paddle.x + paddle.width &&


            this.y + this.radius >
            paddle.y &&


            this.y - this.radius <
            paddle.y + paddle.height



        ){


            this.bounce(paddle);


        }



    }









    playWallSound(){



        if(typeof sounds !== "undefined"){

            sounds.wall();

        }


    }









    draw(ctx){



        ctx.save();

// ----------------------------
// Star Trail
// ----------------------------

for(const star of this.trail){

    ctx.save();

    ctx.globalAlpha = star.alpha;

    ctx.fillStyle = "#FFF8AA";

    ctx.beginPath();

    ctx.arc(

        star.x,

        star.y,

        star.size,

        0,

        Math.PI*2

    );

    ctx.fill();

    ctx.restore();

}

        ctx.shadowBlur = 25;

        ctx.shadowColor = "cyan";



        ctx.fillStyle = this.color;




        ctx.beginPath();



        ctx.arc(

            this.x,

            this.y,

            this.radius,

            0,

            Math.PI * 2

        );



        ctx.fill();







        ctx.shadowBlur = 0;



        ctx.fillStyle = this.color;



        ctx.beginPath();



        ctx.arc(

            this.x,

            this.y,

            this.radius / 2,

            0,

            Math.PI * 2

        );



        ctx.fill();




        ctx.restore();



    }



}
