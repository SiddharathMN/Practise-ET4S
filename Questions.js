class Question {
    constructor(game) {
        this.game = game;
        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);
    }

    question() {
        this.disableKeyListeners();
        this.pauseGame();
    }

    pauseGame() {
        this.game.isPaused = true;
        console.log("Game paused");
    }

    resumeGame() {
        if (this.game.isPaused) {
            this.game.isPaused = false;
            this.game.time += 2000;
            this.enableKeyListeners();
            console.log("Game resumed");
            this.game.lastTime = performance.now(); // Reset lastTime
            requestAnimationFrame(this.game.animate); // Correctly call the animate function
        }
    }

    disableKeyListeners() {
        window.removeEventListener('keydown', this.keyDownHandler);
        window.removeEventListener('keyup', this.keyUpHandler);
    }

    enableKeyListeners() {
        window.addEventListener('keydown', this.keyDownHandler);
        window.addEventListener('keyup', this.keyUpHandler);
    }

    keyDownHandler(e) {
        if (
            (e.key === 'ArrowDown' ||
            e.key === 'ArrowUp' ||
            e.key === 'ArrowLeft' ||
            e.key === 'ArrowRight' ||
            e.key === 'Enter') &&
            this.game.keys.indexOf(e.key) === -1
        ) {
            this.game.keys.push(e.key);
        } else if (e.key === 'd') {
            this.game.debug = !this.game.debug;
        }
    }

    keyUpHandler(e) {
        if (
            e.key === 'ArrowDown' ||
            e.key === 'ArrowUp' ||
            e.key === 'ArrowLeft' ||
            e.key === 'ArrowRight' ||
            e.key === 'Enter'
        ) {
            this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
        }
    }
}

export class Question1 extends Question {
    constructor(game) {
        super(game);
    }

    question() {
        super.question();
        this.showQuestionOverlay();
    }

    showQuestionOverlay() {
        const form = document.getElementById('questionForm1');
        if (form) {
            form.style.display = 'block';
            form.onsubmit = (e) => {
                e.preventDefault();
                this.handleSubmit();
            };
        } else {
            console.error('Form with ID questionForm1 not found.');
        }
    }

    hideQuestionOverlay() {
        const form = document.getElementById('questionForm1');
        if (form) {
            form.style.display = 'none';
        } else {
            console.error('Form with ID questionForm1 not found.');
        }
    }

    handleSubmit() {
        const form = document.getElementById('questionForm1');
        if (form) {
            const formData = new FormData(form);
            const answer = formData.get('answer');
            if(answer=="arrow"){
                this.game.score+=5;
            }
            console.log("Answer submitted:", answer);
            this.hideQuestionOverlay();
            super.resumeGame();
        } else {
            console.error('Form with ID questionForm1 not found.');
        }
    }
}

export class Question2 extends Question {
    constructor(game) {
        super(game);
    }

    question() {
        super.question();
        this.showQuestionOverlay();
    }

    showQuestionOverlay() {
        const form = document.getElementById('questionForm2');
        if (form) {
            form.style.display = 'block';
            form.onsubmit = (e) => {
                e.preventDefault();
                this.handleSubmit();
            };
        } else {
            console.error('Form with ID questionForm2 not found.');
        }
    }

    hideQuestionOverlay() {
        const form = document.getElementById('questionForm2');
        if (form) {
            form.style.display = 'none';
        } else {
            console.error('Form with ID questionForm2 not found.');
        }
    }

    handleSubmit() {
        const form = document.getElementById('questionForm2');
        if (form) {
            const formData = new FormData(form);
            const answer = formData.get('answer');
            if(answer=="id"){
                console.log(this.game.score);
                this.game.score+=5;
                console.log(this.game.score);
            }
            console.log("Answer submitted:", answer);
            this.hideQuestionOverlay();
            super.resumeGame();
        } else {
            console.error('Form with ID questionForm2 not found.');
        }
    }
}

export class Question3 extends Question {
    constructor(game) {
        super(game);
    }

    question() {
        super.question();
        this.showQuestionOverlay();
    }

    showQuestionOverlay() {
        const form = document.getElementById('questionForm3');
        if (form) {
            form.style.display = 'block';
            form.onsubmit = (e) => {
                e.preventDefault();
                this.handleSubmit();
            };
        } else {
            console.error('Form with ID questionForm3 not found.');
        }
    }

    hideQuestionOverlay() {
        const form = document.getElementById('questionForm3');
        if (form) {
            form.style.display = 'none';
        } else {
            console.error('Form with ID questionForm3 not found.');
        }
    }

    handleSubmit() {
        const form = document.getElementById('questionForm3');
        if (form) {
            const formData = new FormData(form);
            const answer = formData.get('answer');
        if(answer=="mtc4" || answer=="mtc3" || answer=="mtc2" || answer=="mtc1"){
                this.game.score+=5;
            }
            console.log("Answer submitted:", answer);
            this.hideQuestionOverlay();
            super.resumeGame();
        } else {
            console.error('Form with ID questionForm3 not found.');
        }
    }
}

