class Particle {

    constructor(x, y, vx, vy, size, color, life) {

        this.x = x;
        this.y = y;

        this.vx = vx;
        this.vy = vy;

        this.size = size;

        this.color = color;

        this.life = life;
        this.maxLife = life;

    }

    update() {

        this.x += this.vx;
        this.y += this.vy;

        // Slow down over time
        this.vx *= 0.985;
        this.vy *= 0.985;

        this.life--;

    }

    draw(ctx) {

        const alpha = this.life / this.maxLife;

        ctx.save();

        ctx.globalAlpha = alpha;

        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;

        ctx.fillStyle = this.color;

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.restore();

    }

}


class ParticleSystem {

    constructor() {

        this.particles = [];

    }


    update() {

        for (let i = this.particles.length - 1; i >= 0; i--) {

            this.particles[i].update();

            if (this.particles[i].life <= 0) {

                this.particles.splice(i, 1);

            }

        }

    }


    draw(ctx) {

        this.particles.forEach(particle => {

            particle.draw(ctx);

        });

    }


    // Generic explosion
    burst(x, y, color = "white", amount = 25) {

        for (let i = 0; i < amount; i++) {

            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 1;

            this.particles.push(

                new Particle(

                    x,
                    y,

                    Math.cos(angle) * speed,
                    Math.sin(angle) * speed,

                    Math.random() * 3 + 1,

                    color,

                    Math.random() * 35 + 25

                )

            );

        }

    }


    // Small paddle impact
    paddleHit(x, y, color) {

        this.burst(x, y, color, 12);

    }


    // Ball trail
    ballTrail(ball) {

        this.particles.push(

            new Particle(

                ball.x,
                ball.y,

                0,
                0,

                3,

                "white",

                15

            )

        );

    }


    // Victory fireworks
    firework(x, y) {

        const colors = [

            "cyan",
            "#66ccff",
            "#00ffff",
            "white",
            "#88ffff"

        ];

        this.burst(

            x,
            y,

            colors[
                Math.floor(Math.random() * colors.length)
            ],

            60

        );

    }


    // CPU explosion
    cpuExplosion(x, y) {

        this.burst(x, y, "#ff4444", 35);

    }


    // Constellation sparkle
    sparkle(x, y) {

        this.particles.push(

            new Particle(

                x,
                y,

                (Math.random() - 0.5),

                (Math.random() - 0.5),

                Math.random() * 2 + 1,

                "white",

                25

            )

        );

    }

}
