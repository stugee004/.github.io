class Ball {

    constructor(){

        this.reset();

        this.radius = 10;
    }

    reset(){

        this.x = canvas.width/2;
        this.y = canvas.height/2;

        this.dx = Math.random()>0.5 ? 9 : -9;
        this.dy = (Math.random()-0.5)*9;
    }

    update(){

        this.x += this.dx;
        this.y += this.dy;

        if(this.y<0 || this.y>canvas.height)
            this.dy *= -1;
            playHit();
    }

    draw(ctx){

        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx.fillStyle="white";
        ctx.fill();

    }

}
