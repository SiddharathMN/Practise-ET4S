import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Background } from './background.js';
import { FlyingEnemy, ClimbingEnemy, GroundEnemy} from './enemies.js';
import { UI } from './UI.js';
import { Question1 ,Question2,Question3} from './Questions.js';

window.addEventListener('load', function() {
    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 500;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.groundMargin = 40;
            this.speed = 0;
            this.maxSpeed = 3;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this);
            this.questions = null;
            this.enemies = [];
            this.particles = [];
            this.collisions = [];
            this.floatingMessages = [];
            this.maxParticles = 50;
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.debug = false;
            this.score = 0;
            this.shadowColor = 'black';
            this.fontColor = 'green';
            this.time = 0;
            this.gameTime = 10000;
            this.maxTime = 120000;
            this.gameOver = false;
            this.lives = 5;
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
            this.isPaused = false;
            this.keys = [];
            this.lastTime = 0;
            this.animate = this.animate.bind(this); // Ensure animate is bound
        }

        update(deltaTime) {
            if (this.time > this.gameTime && this.time % this.gameTime > 0 && this.time % this.gameTime < 1000) {
                if(10000<this.time && this.time<11000){
                this.questions = new Question1(this);}

                if(20000<this.time && this.time<21000){
                this.questions = new Question2(this);}

                if(30000<this.time && this.time<31000){
                this.questions = new Question3(this);
                this.questions.question();
                this.gameOver=true;}
                this.questions.question();
            }

            this.time += deltaTime;

            this.background.update();
            this.player.update(this.keys, deltaTime);
            // handle enemies
            if (this.enemyTimer > this.enemyInterval) {
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(enemy => enemy.update(deltaTime));
            // handle messages
            this.floatingMessages.forEach(message => {
                message.update();
            });
            // handle particles
            this.particles.forEach(particle => particle.update());
            if (this.particles.length > this.maxParticles) {
                this.particles.length = this.maxParticles;
            }

            // handle collision sprites
            this.collisions.forEach(collision => collision.update(deltaTime));
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
            this.particles = this.particles.filter(particle => !particle.markedForDeletion);
            this.collisions = this.collisions.filter(collision => !collision.markedForDeletion);
            this.floatingMessages = this.floatingMessages.filter(message => !message.markedForDeletion);

            console.log('Update time:', this.time);
        }

        draw(context) {
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
            this.particles.forEach(particle => {
                particle.draw(context);
            });
            this.collisions.forEach(collision => {
                collision.draw(context);
            });
            this.floatingMessages.forEach(message => {
                message.draw(context);
            });
            this.UI.draw(context);
            console.log('Draw time:', this.time);
        }

        addEnemy() {
            if (this.speed > 0 && Math.random() < 0.5) {
                this.enemies.push(new GroundEnemy(this));
            } else if (this.speed > 0) {
                this.enemies.push(new ClimbingEnemy(this));
            }
            this.enemies.push(new FlyingEnemy(this));
            console.log('Add enemy time:', this.time);
        }

        animate(timeStamp) {
            if (!this.isPaused) {
                const deltaTime = timeStamp - this.lastTime;
                this.lastTime = timeStamp;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                this.update(deltaTime);
                this.draw(ctx);
                if (!this.gameOver) {
                    requestAnimationFrame(this.animate);
                }
            }
        }

        start() {
            this.lastTime = performance.now(); // Initialize lastTime properly
            requestAnimationFrame(this.animate);
        }
    }

    const game = new Game(canvas.width, canvas.height);
    game.start();
});
