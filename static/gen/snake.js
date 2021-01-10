
class body{
    constructor(x,y,w,h,next = null, prev= null){
        this.x = x
        this.y = y
        this.w = w 
        this.h = h
        this.next = next
        this.prev = prev
    }

}

class snake{
    constructor(x,y,w, h, color){
        this.dx = w
        this.dy = 0
        this.w = w
        this.h = h
        this.color = color
        this.size = 1
        this.head = new body(x,y,w,w)
        this.tail = this.head
        this.alive = true
        this.eat()
        this.eat()
        }

    refresh(){
        
        if(this.alive){
            this.move()

            
            if (this._collision_withitself()){
                this.alive=false
            }
        }
    }

    draw(ctx){
            
            var current = this.head
            ctx.fillStyle=this.color
            ctx.fillRect(current.x, current.y, this.w, this.h)
            ctx.fillStyle='black'
            ctx.fillRect(current.x+2, current.y+2,2,2)
            ctx.fillStyle='red'
            while (current.next != null){
                current = current.next
                ctx.fillRect(current.x, current.y, this.w, this.h)
            }
        
            
        
    }

    turn(keypressed){

        if(keypressed.key =='ArrowUp' & this.dy == 0){
           
            this.dx = 0
            this.dy = -this.w

        }else if(keypressed.key =='ArrowDown' & this.dy == 0){
            this.dx = 0
            this.dy = this.w
        }else if(keypressed.key == 'ArrowRight' & this.dx == 0){
            this.dy = 0
            this.dx = this.w
        }else if(keypressed.key =='ArrowLeft' & this.dx == 0){
            this.dy = 0
            this.dx = -this.w
        }
      
    }   
    move(){
        
        var newNode = new body(this.head.x+this.dx,this.head.y+this.dy, this.w, this.h)
        this.head.prev = newNode
        newNode.next = this.head
        this.head = newNode
        
        if(this.size > 1){
        this.tail.prev.next = null
        this.tail = this.tail.prev
        }else{
            this.tail= this.head
            this.head.next = null
        }
        
        
    }

    eat(){          

        var newNode = new body(this.x +this.dx, this.y + this.dy, this.w, this.h)
        this.tail.next = newNode
        newNode.prev = this.tail
        this.tail = newNode
        this.size = this.size+1
        
    }

    collision_detect(obj){
        if(obj.x == this.head.x+this.head.w & obj.y == this.head.y & this.dy==0){
            return true
        }else if(obj.x + obj.w == this.head.x & obj.y == this.head.y & this.dy==0){
            return true
        }else if(obj.y  == this.head.y+this.head.h & obj.x == this.head.x & this.dx==0){
            return true
        }else if(obj.y + obj.h == this.head.y & obj.x == this.head.x & this.dx==0){
            return true
        }
        return false
    }
    _collision_withitself(){
        if(this.size > 4){
            
            var currentNode = this.head.next.next.next
            if(this.collision_detect(currentNode)){
                return true
            }
            while(currentNode.next!=null){
                currentNode = currentNode.next
                if(this.collision_detect(currentNode)){
                    return true
                }
            }

        }
        return false
    }
}


class food{
    constructor(x1,y1,w, color){
        this.x = x1
        this.y = y1
        this.w = w
        this.h = w
        this.color = color
    }

    draw(ctx){
        ctx.fillStyle = this.color
        ctx.fillRect(this.x+2, this.y+2, this.w-4, this.w-4)
    }
}

class wall{
    constructor(x,y,w,h,color){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.color = color
    }

    draw(ctx){
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.w, this.h)
    }
}

class terrain{
    constructor(x,y,w,h,color){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.color = color
    }
    draw(ctx){
        ctx.fillStyle= this.color
        ctx.fillRect(this.x,this.y,this.w, this.h)
    }
}

class game{
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














mygame = new game()
var addedNewHighScore = false
var score
fetch('http://127.0.0.1:5000/getScore?').then((response) => {
    return response.json();
  }).then((myJson) => {
    score = myJson['result']})

addEventListener('keydown', aux)


function addNewHighScore(newScore){
    var index = 0
    while(newScore[1] < score[index][1]){
        index = index + 1
    }
    slice1 = score.slice(0,index)
    slice2 = score.slice(index)
    slice2.pop()
    
    score = slice1.concat([newScore].concat(slice2))
    
    fetch('http://127.0.0.1:5000/setScore?newScore='+JSON.stringify(score))
}

function play(){
    
    mygame.refresh()
    mygame.draw()
    if ((mygame.over & mygame.score > score[9][1]) & (!addedNewHighScore)){
        addNewHighScore([prompt('Type your name winner'), mygame.score])


        
        
        addedNewHighScore = true
        var s = ''
        for(i in score){
            s = s + String(score[i][0])+': ' + String(score[i][1]) + '<br>'
        }
        document.getElementById('scores').innerHTML = s
    }
}
var lastrender = 0

function aux(keypressed){
    mygame.snake.turn(keypressed)
    if(keypressed.key == 'Enter'){
        mygame.restart()
        addedNewHighScore = false
        fetch('http://127.0.0.1:5000/getScore?').then((response) => {return response.json()}).then((myJson) => {score = myJson['result']})
    }
}


setInterval(play, 100);