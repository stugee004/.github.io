// =====================================
// Hyper Pong
// Ball
// Part 1 / 4
// =====================================

class Ball{

    constructor(){

        this.radius = 10;

        this.baseSpeed = 14;

        this.speed = this.baseSpeed;

        this.x = canvas.width / 2;

        this.y = canvas.height / 2;

        this.dx = this.speed;

        this.dy = 0;

        this.color = "#FFFFFF";

        this.glowColor = "cyan";

        this.hitCooldown = 0;

        this.trailTimer = 0;

        this.trail = [];

        this.reset();

    }





    updateAppearance(){

        // ----------------------------
        // Defaults
        // ----------------------------

        this.color = "#FFFFFF";

        this.glowColor = "cyan";



        if(
            typeof shop !== "undefined" &&
            shop.items &&
            shop.items.goldenBall &&
            shop.items.goldenBall.owned
        ){

            this.color = "#FFD700";

            this.glowColor = "#FFD700";

        }

    }





    reset(){

        this.x = canvas.width / 2;

        this.y = canvas.height / 2;

        this.speed = this.baseSpeed;



        const direction =
            Math.random() > 0.5 ? 1 : -1;



        const angle =
            (Math.random() - 0.5) *
            Math.PI / 3;



        this.dx =
            Math.cos(angle) *
            this.speed *
            direction;



        this.dy =
            Math.sin(angle) *
            this.speed;



        this.hitCooldown = 0;

        this.trail.length = 0;

    }
        // =====================================
    // Update
    // =====================================

    update(){

        this.updateAppearance();



        // ----------------------------
        // Star Trail Cosmetic
        // ----------------------------

        if(
            typeof shop !== "undefined" &&
            shop.items &&
            shop.items.starTrail &&
            shop.items.starTrail.owned
        ){

            this.trailTimer++;

            if(this.trailTimer >= 2){

                this.trailTimer = 0;

                this.trail.push({

                    x: this.x,
                    y: this.y,

                    size: 4 + Math.random()*2,

                    alpha: 1

                });

            }

        }



        // Fade existing stars

        for(let i=this.trail.length-1;i>=0;i--){

            const star = this.trail[i];

            star.alpha -= 0.03;

            star.size *= 0.97;

            if(star.alpha <= 0){

                this.trail.splice(i,1);

            }

        }



        if(this.trail.length > 40){

            this.trail.shift();

        }



        // ----------------------------
        // Hit cooldown
        // ----------------------------

        if(this.hitCooldown > 0){

            this.hitCooldown--;

        }



        // ----------------------------
        // Move
        // ----------------------------

        this.x += this.dx;

        this.y += this.dy;



        // ----------------------------
        // Top Wall
        // ----------------------------

        if(this.y - this.radius <= 0){

            this.y = this.radius;

            this.dy *= -1;

            this.playWallSound();

        }



        // ----------------------------
        // Bottom Wall
        // ----------------------------

        if(this.y + this.radius >= canvas.height){

            this.y =
                canvas.height - this.radius;

            this.dy *= -1;

            this.playWallSound();

        }



        // ----------------------------
        // Ball Trail Particles
        // ----------------------------

        if(
            typeof particles !== "undefined" &&
            typeof particles.ballTrail === "function"
        ){

            particles.ballTrail(this);

        }

    }
        // =====================================
    // Paddle Collision
    // =====================================

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



        // Maximum bounce angle
        const angle =
            hitPosition *
            Math.PI / 4;



        const direction =
            this.dx > 0 ? -1 : 1;



        // Gradually increase speed
        this.speed = Math.min(
            this.speed + 0.25,
            24
        );



        this.dx =
            Math.cos(angle) *
            this.speed *
            direction;



        this.dy =
            Math.sin(angle) *
            this.speed;



        this.hitCooldown = 8;



        // Paddle particles

        if(
            typeof particles !== "undefined" &&
            typeof particles.paddleHit === "function"
        ){

            particles.paddleHit(

                this.x,

                this.y,

                paddle.color

            );

        }



        // Paddle sound

        if(
            typeof sounds !== "undefined" &&
            typeof sounds.hit === "function"
        ){

            sounds.hit();

        }

    }





    checkPaddleCollision(paddle){

        if(

            this.x + this.radius >
            paddle.x &&

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

        if(
            typeof sounds !== "undefined" &&
            typeof sounds.wall === "function"
        ){

            sounds.wall();

        }

    }
        // =====================================
    // Draw
    // =====================================

    draw(ctx){

        // ----------------------------
        // Draw Star Trail
        // ----------------------------

        for(const star of this.trail){

            ctx.save();

            ctx.translate(
                star.x,
                star.y
            );

            ctx.globalAlpha =
                star.alpha;

            ctx.strokeStyle =
                "#FFF8AA";

            ctx.lineWidth = 2;

            ctx.beginPath();

            ctx.moveTo(
                -star.size,
                0
            );

            ctx.lineTo(
                star.size,
                0
            );

            ctx.moveTo(
                0,
                -star.size
            );

            ctx.lineTo(
                0,
                star.size
            );

            ctx.stroke();

            ctx.restore();

        }



        // ----------------------------
        // Ball
        // ----------------------------

        ctx.save();

        ctx.shadowBlur = 25;
        ctx.shadowColor = this.glowColor;

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



        // ----------------------------
        // Golden Ball Shine
        // ----------------------------

        if(this.color === "#FFD700"){

            ctx.fillStyle =
                "rgba(255,255,255,.65)";

            ctx.beginPath();

            ctx.arc(

                this.x - this.radius/3,

                this.y - this.radius/3,

                this.radius/3,

                0,

                Math.PI*2

            );

            ctx.fill();

        }



        ctx.restore();

    }

}
