var buttonColours = ["red","blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;

var delayInMilliseconds = 100;
var started = false;



function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomColourChooser = buttonColours[randomNumber];
    gamePattern.push(randomColourChooser);
    $("#" + randomColourChooser).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColourChooser);



}

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length-1);

    playSound(userChosenColor);
});

function playSound(name) {
    var audio = new Audio("./sounds/"+ name +".mp3");
    audio.play();
}

function animatePress(currentColor) {
    // Originally had . not #. However, we are selecting by ID to modify class. Not by class to modify class.
    $("#"+ currentColor).addClass("pressed")
    setTimeout(function(){
        $("#"+ currentColor).removeClass("pressed");
    }, delayInMilliseconds);
}

$(document).on("keydown", function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function checkAnswer (currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success")
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence();
            }, delayInMilliseconds*10);
            
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game over, press any key to restart.")
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, delayInMilliseconds*2);
        
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}