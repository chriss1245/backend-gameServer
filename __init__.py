from flask import Flask, redirect, url_for, render_template, request
from flask_assets import Environment, Bundle
from flask import jsonify, make_response
import json


app = Flask(__name__)


@app.route("/", methods = ['POST', 'GET'])
def home():
    return render_template('index.html')

@app.route("/snake", methods=["POST", "GET"])
def snake():
    return render_template('/games/snake/snake.html')



bundles ={
    'index_css': Bundle(
        'style/index.css',
        output='gen/index.css'),
    'snake_css': Bundle(
        'games/snake/style/snake.css',
        output='gen/snake.css'
    ),
    'snake_js': Bundle(
        'games/snake/scripts/snake.js',
        'games/snake/scripts/game.js',
        'games/snake/scripts/assets.js',
        'games/snake/scripts/main.js',
        output='gen/snake.js'
    )
}

assets = Environment(app)
assets.register(bundles)


#js python comunication
@app.route('/getScore')
def getScore():
    return jsonify({'result':app.current_scores})

@app.route('/setScore')
def setScore():
    app.current_scores = json.loads(request.args.get('newScore'))
    game = json.loads(request.args.get('game'))
    setUpdateDB()
    return make_response(jsonify({"message": "OK"}), 200)


#pseudo database
def getUpdateDB():
    with open(file = 'scores_db.txt', mode='r') as score:
        app.current_scores = json.loads(score.read())


def setUpdateDB():
    with open(file='scores_db.txt', mode = 'w') as score:
        score.write(json.dumps(app.current_scores))


#getUpdateDB()   


#if (__name__ == "__main__"):
 #      app.run(debug=True)

