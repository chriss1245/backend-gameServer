
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