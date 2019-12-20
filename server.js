const express    = require('express')
const app 		   = express();
const functions  = require('./functions');

global.turns_points_arr = new Array();

const bodyParser = require('body-parser');

app.use(express.static('public'));

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})



app.post('/', function (req, res) {
  let name = req.body.name;
  turns_points_arr.length = 0;
  res.redirect('/simulator?name=' + name+'&turn=0&turn_hit=0');

})

app.get('/simulator', function (req, res) {
  
  var name = req.query.name;
  var turn = parseInt(req.query.turn);
  var turn_hit = parseInt(req.query.turn_hit);
  var completed = false;

  // check if a third hit was allowed
  if(turn==11){
    completed = true;
  }

  if(!completed){
      turns_points_arr = functions.hitAndSaveHit(turns_points_arr,turn,turn_hit);

      // check if strike to skip to next frame
      if(turn_hit==0 && turns_points_arr[turn][0]==10){
          turn_hit = 0;
          turn++;
      }
      else{
          // change the num of hits
          if(turn_hit==1){
            turn_hit = 0;
            turn++;
          }
          else{
            turn_hit++;
          }

      }

      score_arr = new Array();


      // update frame display number
      var frame = turn+1;

      // check if the end has been reached
      if(turn==10){
        var last_frame_score = turns_points_arr[9][0] + turns_points_arr[9][1];
        if(last_frame_score==10){
            //allow for one more hit
            turn++;
        }
        else{
            // get score up to the last turn with flag of last turn
            score_arr = functions.getScoreArray(turns_points_arr, 9, true);
            completed = true;
        }
      }
      else{
        if(turn > 0){
            score_arr = functions.getScoreArray(turns_points_arr, turn-1, false);
        }
      }
    }

  

  res.render('simulator', {name: name, turn: turn, turn_hit: turn_hit, hits: turns_points_arr, frame: frame, score: score_arr, completed: completed, error: null});

})

app.post('/simulator', function (req, res) {

  var name = req.body.name;
  var turn = parseInt(req.body.turn);
  var turn_hit = parseInt(req.body.turn_hit);

  res.redirect('/simulator?name=' + name +'&turn='+turn+"&turn_hit="+turn_hit);

});



app.listen(3000, function () {
})

