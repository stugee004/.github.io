// =====================================
// Hyper Pong
// Paddle
// =====================================

class Paddle{

    constructor(x,y,color="cyan",isPlayer=false){

        this.isPlayer = isPlayer;
        
        this.x = x;
        this.y = y;

        this.width = 18;
        this.height = 120;

        this.speed = 8;

        this.baseColor = color;
        this.color = color;

        this.glowColor = color;

        this.glow = 0;

        this.score = 0;

        this.isGalaxy = false;

        this.stars = [];

        for(let i=0;i<15;i++){

            this.stars.push({

                x:Math.random(),

                y:Math.random(),

                size:1+Math.random()*2,

                alpha:0.4+Math.random()*0.6

            });

        }

    }





    updateAppearance(){

        this.color = this.baseColor;

        this.glowColor = this.baseColor;

        this.isGalaxy = false;



        if(

    this.isPlayer &&

    typeof shop !== "undefined" &&

    shop.items &&

    shop.items.galaxyPaddle &&

    shop.items.galaxyPaddle.owned

){

            this.isGalaxy = true;

            this.glowColor = "#66DDFF";

        }

    }





    move(direction){

        this.y += direction * this.speed;

        this.keepOnScreen();

    }





    update(){

        this.updateAppearance();

        if(this.glow>0){

            this.glow-=0.05;

        }

        this.keepOnScreen();

    }





    center(){

        this.y=

            canvas.height/2-

            this.height/2;

    }





    keepOnScreen(){

        if(this.y<0){

            this.y=0;

        }

        if(this.y+this.height>canvas.height){

            this.y=

                canvas.height-

                this.height;

        }

    }





    hitEffect(){

        this.glow=1;

    }





    draw(ctx){

        ctx.save();



        ctx.shadowBlur=

            25+

            this.glow*30;



        ctx.shadowColor=

            this.glowColor;



        // ----------------------------
        // Galaxy Paddle
        // ----------------------------

        if(this.isGalaxy){

            const gradient=

                ctx.createLinearGradient(

                    this.x,

                    this.y,

                    this.x,

                    this.y+this.height

                );



            gradient.addColorStop(

                0,

                "#00FFFF"

            );



            gradient.addColorStop(

                .5,

                "#3399FF"

            );



            gradient.addColorStop(

                1,

                "#8844FF"

            );



            ctx.fillStyle=

                gradient;

        }

        else{

            ctx.fillStyle=

                this.color;

        }



        this.roundRect(

            ctx,

            this.x,

            this.y,

            this.width,

            this.height,

            10

        );



        ctx.fill();



        // ----------------------------
        // Stars
        // ----------------------------

        if(this.isGalaxy){

            ctx.shadowBlur=0;

            ctx.fillStyle="white";



            for(const star of this.stars){

                ctx.globalAlpha=

                    star.alpha;



                ctx.beginPath();

                ctx.arc(

                    this.x+

                    star.x*this.width,

                    this.y+

                    star.y*this.height,

                    star.size,

                    0,

                    Math.PI*2

                );

                ctx.fill();

            }

        }



        // ----------------------------
        // Highlight
        // ----------------------------

        ctx.globalAlpha=.35;

        ctx.fillStyle="white";



        this.roundRect(

            ctx,

            this.x+4,

            this.y+8,

            this.width-8,

            this.height-16,

            6

        );



        ctx.fill();



        ctx.restore();

    }





    roundRect(ctx,x,y,w,h,r){

        ctx.beginPath();

        ctx.moveTo(x+r,y);

        ctx.lineTo(x+w-r,y);

        ctx.quadraticCurveTo(

            x+w,

            y,

            x+w,

            y+r

        );

        ctx.lineTo(x+w,y+h-r);

        ctx.quadraticCurveTo(

            x+w,

            y+h,

            x+w-r,

            y+h

        );

        ctx.lineTo(x+r,y+h);

        ctx.quadraticCurveTo(

            x,

            y+h,

            x,

            y+h-r

        );

        ctx.lineTo(x,y+r);

        ctx.quadraticCurveTo(

            x,

            y,

            x+r,

            y

        );

        ctx.closePath();

    }

}
