
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
