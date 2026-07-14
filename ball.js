class Ball {

    constructor(){

        this.radius = 10;

        this.speed = 7;

        this.x = canvas.width / 2;
        this.y = canvas.height / 2;


        this.dx = this.speed;
        this.dy = 0;


        this.color = "white";


        this.trailTimer = 0;


        this.reset();

    }



    reset(){

        this.x = canvas.width / 2;
        this.y = canvas.height / 2;


        this.speed = 7;


        // Random starting direction

        const direction =
            Math.random() > 0.5 ? 1 : -1;


        const angle =
            (Math.random() - 0.5) * Math.PI / 3;


        this.dx =
            Math.cos(angle) *
            this.speed *
            direction;


        this.dy =
            Math.sin(angle) *
            this.speed;

    }



    update(){


        this.x += this.dx;

        this.y += this.dy;



        // Top and bottom bounce

        if(this.y - this.radius <= 0){

            this.y = this.radius;

            this.dy *= -1;


            this.wallSound();

        }



        if(this.y + this.radius >= canvas.height){

            this.y =
                canvas.height - this.radius;


            this.dy *= -1;


            this.wallSound();

        }



        // Trail particles

        this.trailTimer++;


        if(
            this.trailTimer % 2 === 0 &&
            typeof particles !== "undefined"
        ){

            particles.ballTrail(this);

        }


    }



    bounce(paddle){


        // Distance from paddle center

        const hitPosition =
            (this.y -
            (paddle.y + paddle.height/2))
            /
            (paddle.height/2);



        // Limit extreme angles

        const angle =
            hitPosition *
            Math.PI / 3;



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



        // Effect

        if(typeof particles !== "undefined"){

            particles.paddleHit(
                this.x,
                this.y,
                paddle.color
            );

        }



        if(typeof playHit === "function"){

            playHit();

        }

    }




    checkPaddleCollision(paddle){


        if(

            this.x + this.radius > paddle.x &&

            this.x - this.radius < paddle.x + paddle.width &&

            this.y + this.radius > paddle.y &&

            this.y - this.radius < paddle.y + paddle.height

        ){

            this.bounce(paddle);

        }

    }




    wallSound(){

        if(typeof playWall === "function"){

            playWall();

        }

    }





    draw(ctx){


        ctx.save();


        ctx.shadowBlur = 25;

        ctx.shadowColor = "cyan";


        ctx.fillStyle = this.color;



        ctx.beginPath();


        ctx.arc(

            this.x,
            this.y,
            this.radius,
            0,
            Math.PI*2

        );


        ctx.fill();



        // Bright center

        ctx.shadowBlur = 0;

        ctx.fillStyle="white";


        ctx.beginPath();


        ctx.arc(

            this.x,
            this.y,
            this.radius/2,
            0,
            Math.PI*2

        );


        ctx.fill();



        ctx.restore();


    }

}
