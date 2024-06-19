export class InputHandler{
    constructor(game){
        this.game = game;
      //  this.keys = [];
        window.addEventListener('keydown', (e) => {
            if((    e.key === 'ArrowDown' || 
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight' ||
                    e.key === 'Enter')  
                && this.game.keys.indexOf(e.key) === -1){
                this.game.keys.push(e.key);
            } else if (e.key === 'd') this.game.debug = !this.game.debug;
        });
        window.addEventListener('keyup', (e) => {
            if(     e.key === 'ArrowDown' ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight' ||
                    e.key === 'Enter'){
                this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
            }
        });
        
    }
}