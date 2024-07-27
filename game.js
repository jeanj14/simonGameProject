var buttonColours = ["red", "blue", "green", "yellow"];
var gameSounds = {"red" : "./sounds/red.mp3", //object used to store the file locations of each audio file
//the color             directory
//is the key           is the value
    "blue"  : "./sounds/blue.mp3",
    "green" : "./sounds/green.mp3",
    "yellow" : "./sounds/yellow.mp3",
    "gameover" : "./sounds/wrong.mp3"
};
var userChosenColour = [];
var gamePattern = [];

var started = false;

var level = 0;

//the keydown event handler to start the game
$(document).on("keydown", function(){
    if (!started){
        $("#level-title").text("Level "+ level);
        nextSequence();
        started = true;
    }

});

//the button click event handler to detect button clicks
$(".btn").click(function () {
    var clickedColour = $(this).attr("id");
    userChosenColour.push(clickedColour);
    animatePress(clickedColour);
    console.log(userChosenColour);
    checkAnswer(userChosenColour.length - 1, clickedColour)


});

function startOver(){
    level = 0;
    gamePattern = [];
    userChosenColour = [];
    started = false;
}

//the function to validate the user's clicks and return appropriate response
function checkAnswer(currentLevel, key){
    if (userChosenColour[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        playSound(key);
        if (userChosenColour.length === gamePattern.length){

            setTimeout(nextSequence, 1000);
            return true;
        }

    } else {
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        playSound("gameover");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        console.log("failure");
        startOver();
        return false;
    }
}

//the function that will display the next pattern in the sequence
function nextSequence(){
    userChosenColour = [];

    level++;
    $("#level-title").text("Level "+ level);


    var randomVariable = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomVariable];
    gamePattern.push(randomChosenColour);
    currentColour = $("#"+randomChosenColour);
    currentColour.animate({opacity: 0}).animate({opacity: 1}); 
    playSound(randomChosenColour);
}

//the function that will play the appropriate sound for the function
function playSound(key){
    var colourSound = new Audio(gameSounds[key]);
    colourSound.play();
}

//the function that will play the appropriate sound for the function
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){ $("#"+currentColour).removeClass("pressed"); },100);
}


