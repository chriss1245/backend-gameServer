class Interface{

    constructor(){
        // Creating instances of Game and Score
        this.game = new Game()
        this.score = new Score('scores', 'snake')

        // Requesting the top scores
        this.score.setUpHighScores()

        // event listeners
        addEventListener('keydown', this._keypressedHandler.bind(this))
        
    }

    run(){
        // gameloop
        this.gameloop = setInterval(this._run.bind(this), 100)
        
        
    }

    _run(){
        // condition for ending the game and trigger of addNewHIghScore method
        
        if (this.game.over & !this.game.snake.alive){
            clearInterval(this.gameloop)
            this.score.addNewHighScores(this.game.score)
            this.score.showTopTen()
            
        } 

        // updating the state of the game
        this.game.refresh()

        // rendering the game
        this.game.draw()
    }

    _keypressedHandler(keypressed){
        if(keypressed.key != 'Enter'){
            this.game.snake.turn(keypressed)
        } else if(keypressed.key == 'Enter' & this.game.over & !this.game.snake.alive){
            this.score.setUpHighScores()
            this.game.restart()
            this.run()
            
        }else if (keypressed.key == 'Enter' & this.game.over & this.game.snake.alive){
            this.score.setUpHighScores()
            this.game.over = false
        }
        keypressed.stopPropagation()
    }

}

myInterface = new Interface()

myInterface.run()