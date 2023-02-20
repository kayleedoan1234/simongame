
var buttonColours = ["red","blue","green","yellow"];
var gamePattern =[];
var userClickedPattern = [];
//Keep track of whether the game has started or not
var started = false;
var level = 0;


$(document).keypress(function(){
    if (!started){
        //h1 will change from "Press a key to start" to "Level 0"
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

//When a button got clicked
$(".btn").click(function(){
    // create userChosenColor to store the id of the button that got clicked
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length -1);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length == gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();        
    }
}

function nextSequence(){
    //user has to retype the pattern again
    userClickedPattern =[];
    level++;
    //Update h1 from level n to level n+1
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    //Animate a flash to the button selected (randomChosenColor)
    $('#'+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

//Play sound for the button color
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
audio.play()}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);
}

function startOver(){
    level = 0;
    gamePattern= [];
    started = false;
}
