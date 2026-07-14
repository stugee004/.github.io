class Paddle {

    constructor(x, y, color = "cyan") {

        this.x = x;
        this.y = y;


        this.width = 18;
        this.height = 120;


        this.speed = 8;


        this.color = color;


        this.glow = 0;


        this.score = 0;

    }



    move(direction){


        this.y += direction * this.speed;


        this.keepOnScreen();

    }



    update(){


        // Slowly fade hit glow

        if(this.glow > 0){

            this.glow -= 0.05;

        }


        this.keepOnScreen();

    }



    keepOnScreen(){


        if(this.y < 0){

            this.y = 0;

        }


        if(this.y + this.height > canvas.height){

            this.y =
                canvas.height - this.height;

        }

    }



    hitEffect(){


        this.glow = 1;


    }




    draw(ctx){


        ctx.save();


        // Outer glow

        ctx.shadowBlur =
            25 + this.glow * 30;


        ctx.shadowColor =
            this.color;



        ctx.fillStyle =
            this.color;



        // Rounded paddle

        this.roundRect(
            ctx,
            this.x,
            this.y,
            this.width,
            this.height,
            10
        );


        ctx.fill();



        // Inner highlight

        ctx.shadowBlur = 0;


        ctx.fillStyle="white";


        this.roundRect(

            ctx,

            this.x + 4,

            this.y + 8,

            this.width - 8,

            this.height - 16,

            6

        );


        ctx.globalAlpha = 0.35;


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
