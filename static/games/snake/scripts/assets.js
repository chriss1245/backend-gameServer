class Score{
    constructor(htmlid, gameid){
        this.htmlid = htmlid
        this.scores = null
        this.game = gameid
        this.setUpHighScores()
    }

    showTopTen(){
        // Writes in the html element scores the top ten of the game
        var s = ''
        for(var i in this.scores){
            s = s + String(this.scores[i][0])+': ' + String(this.scores[i][1]) + '<br><br>'
        }
        document.getElementById(this.htmlid).innerHTML = s
    }
         
    setUpHighScores(){
        // Gets the highScores from the server
        fetch('/getScore?game='+JSON.stringify(this.game)).then((response) => {
            return response.json();
        }).then((myJson) => {
            this.scores = myJson['result']}).then(this.showTopTen.bind(this))
        
    }

    addNewHighScores(newscore){
        // Updates the High socores in the server

        if (newscore > this.scores[9][1]){

            var newScore = [prompt('You are in the top ten. Type your name:'), newscore]

            var index = 0
            while(newScore[1] < this.scores[index][1]){
                index = index + 1
            }
            var slice1 = this.scores.slice(0,index)
            var slice2 = this.scores.slice(index)
            slice2.pop()
            
            this.scores = slice1.concat([newScore].concat(slice2))
            
            fetch('/setScore?newScore='+JSON.stringify(this.scores)+'&game='+JSON.stringify(this.game))
            
        }
        
    }


}

