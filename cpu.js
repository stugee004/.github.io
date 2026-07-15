class CPU extends Paddle {


    constructor(x, y, difficulty = "medium") {


        super(x, y, "red");


        this.difficulty = difficulty;


        this.speed = 6;


        this.reactionDelay = 0;


        this.targetY = y;


        this.errorAmount = 40;



        this.setDifficulty();


    }



    setDifficulty(){


        if(this.difficulty === "easy"){

            this.speed = 2;

            this.reactionDelay = 30;

            this.errorAmount = 100;

        }


        if(this.difficulty === "medium"){

            this.speed = 3;

            this.reactionDelay = 15;

            this.errorAmount = 50;

        }


        if(this.difficulty === "hard"){

            this.speed = 4;

            this.reactionDelay = 5;

            this.errorAmount = 20;

        }


        if(this.difficulty === "impossible"){

            this.speed = 5;

            this.reactionDelay = 0;

            this.errorAmount = 5;

        }

    }




    update(ball){


        super.update();



        this.reactionDelay--;



        // Only think after reaction delay

        if(this.reactionDelay <= 0){


            this.calculateTarget(ball);


            this.reactionDelay = 
                this.difficulty === "easy" ? 30 :
                this.difficulty === "medium" ? 15 :
                5;


        }




        // Move toward target


        const center =
            this.y + this.height / 2;



        if(center < this.targetY - 10){

            this.y += this.speed;

        }


        else if(center > this.targetY + 10){

            this.y -= this.speed;

        }



        this.keepOnScreen();


    }





    calculateTarget(ball){



        // If ball is moving away, return center

        if(ball.dx < 0){


            this.targetY =
                canvas.height / 2;


            return;

        }



        // Predict ball position


        let time =
            (this.x - ball.x) /
            ball.dx;



        let predictedY =
            ball.y +
            ball.dy * time;



        // Bounce prediction

        while(
            predictedY < 0 ||
            predictedY > canvas.height
        ){

            if(predictedY < 0){

                predictedY =
                    -predictedY;

            }


            if(predictedY > canvas.height){

                predictedY =
                    canvas.height -
                    (predictedY - canvas.height);

            }

        }



        // Add human error

        predictedY +=
            (Math.random() - 0.5)
            *
            this.errorAmount;



        this.targetY = predictedY;


    }




    draw(ctx){


        super.draw(ctx);


        // CPU label

        ctx.save();


        ctx.fillStyle="red";


        ctx.font="14px Arial";


        ctx.fillText(
            "CPU",
            this.x - 5,
            this.y - 10
        );


        ctx.restore();


    }


}
