module.exports = {

	getRandomPin: function (remainingPins) {
	    return Math.round(Math.random() * remainingPins);
	},

	hitAndSaveHit: function (hitArray,turn, turn_hit) {
	    var max_pins_remaining = 10;

	    if(turn_hit==1){
	      max_pins_remaining -= hitArray[turn][0];
	    }
	    else{
	      hitArray[turn] = new Array();
	    }

	    var pins_hit = module.exports.getRandomPin(max_pins_remaining);

	    hitArray[turn][turn_hit] = pins_hit;

	    // update next hit if this is a strike
	    if(turn_hit==0 && pins_hit==10){
	        hitArray[turn][turn_hit+1] = 0;
	    }

	    return hitArray;
	},

	getScoreArray: function (hitArray, turn, is_last_turn, is_extra_turn_on_ten){

	    var scoreArray = new Array();

	    var current_score = 0;

	    for(var i=0; i < turn; i++){
	    
	        current_score += hitArray[i][0] + hitArray[i][1];

	        // check if it's a strike 
	        if(hitArray[i][0] == 10){
	            current_score += hitArray[i+1][0] + hitArray[i+1][1];
	            scoreArray[i] = current_score;
	        }
	        // check if it's a spare
	        else if(hitArray[i][1]==10){
	            current_score += hitArray[i+1][0];
	            scoreArray[i] = current_score;
	        }
	        else{
	            scoreArray[i] = current_score;
	        }
	    }

	    if(is_last_turn){
	        current_score += hitArray[turn][0] + hitArray[turn][1];
	        scoreArray[turn] = current_score;
	    }

	    return scoreArray;
	}
};