class Game{
    constructor(){
        this.ingame = true;
        this.canvas = document.getElementById("table")
        this.ctx = this.canvas.getContext("2d")
        this.height = this.canvas.height
        this.width = this.canvas.width
        this.score = 0
        this.level = 10
        this.over = true
        
        this.w = 10
        this.snake = new snake(40,10,this.w, this.w, 'red')
        this.food = new food(50,50, this.w, 'yellow')
        this.wall = [new wall(0,0,this.w, this.height, 'blue'), new wall(this.width-this.w-(this.width%this.w), 0, this.w, this.height, 'blue'),
                    new wall(0,0,this.width,this.w, 'blue'), new wall(0, this.height-this.w-(this.height%10), this.width-(this.width%10), this.w, 'blue')]
        this.terrain = new terrain(this.w, this.w, this.width-(this.width%10)- this.w, this.height-(this.height%10)-this.w, 'green')
        this.frames = 0
    }

    restart(){
        this.snake = new snake(40,10,this.w, this.w, 'red')
        this.score = 0
        this.over = false
    }

    refresh(key){
        if(!this.over){
            this.snake.refresh(key)

            if(this.snake.collision_detect(this.food)){
                this.snake.eat()
                var a = Math.trunc(Math.random()*(this.height-20)+10)
                var b = Math.trunc(Math.random()*(this.width-20)+10)
                
                this.food.x = b-(b%10)
                this.food.y = a-(a%10)
                this.draw()
                this.score = this.score + this.level
            }
            if(((this.snake.head.x < this.terrain.x | this.snake.head.x > this.terrain.w - this.snake.w) & this.snake.dy == 0) | ((this.snake.head.y < this.terrain.y | this.snake.head.y > this.terrain.h-this.snake.w) & this.snake.dx == 0)){
                this.snake.alive = false
                this.snake.head.next.prev = null
                this.snake.head = this.snake.head = this.snake.head.next
                
            }

            if(!this.snake.alive){
                this.over = true
            }
        }
    }
    draw(){
        this.frames += 1
        this.terrain.draw(this.ctx)
        this.snake.draw(this.ctx)
        for(var i in this.wall){
            this.wall[i].draw(this.ctx)
        }
        this.food.draw(this.ctx)

        this.ctx.fillStyle = 'white'
        this.ctx.font = '9px Arial'
        this.ctx.fillText('Score:'+String(this.score), this.terrain.w-45, this.terrain.y-1)
        if(this.over & this.frames%7 < 4){
            this.ctx.font = '15px Arial'
            this.ctx.fillText('Press enter to start', this.width/2-60, this.height/2-5)
        }
    
    }


}