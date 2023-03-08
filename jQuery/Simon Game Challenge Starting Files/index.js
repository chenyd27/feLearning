var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$("#green").on("click", function(e) {
    musicOn("green");
    handler("green");
    nextSequence();
});
$("#red").on("click", function(e) {
    musicOn("red");
    handler("red");
    nextSequence();
});
$("#blue").on("click", function(e) {
    musicOn("blue");
    handler("blue");
    nextSequence();
});
$("#yellow").on("click", function(e) {
    musicOn("yellow");
    handler("yellow");
    nextSequence();
});

function randomNumber() {
    return Math.floor(Math.random() * 4);
}

function nextSequence() {
    if (userClickedPattern[userClickedPattern.length - 1] != gamePattern[gamePattern.length - 1]) {
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        musicOn("wrong");
        $("h1").text("Game over, press to restart");
        initialize();
    } else {
        var randomChosenColour = buttonColours[randomNumber()];
        gamePattern.push(randomChosenColour);
        $("#" + randomChosenColour).fadeOut().fadeIn();
        $("h1").text("Level " + level);
        level++;
    }
}

function musicOn(index) {
    var audio;
    switch (index) {
        case "blue":
            audio = new Audio("sounds/blue.mp3");
            break;
        case "green":
            audio = new Audio("sounds/green.mp3");
            break;
        case "red":
            audio = new Audio("sounds/red.mp3");
            break;
        case "yellow":
            audio = new Audio("sounds/yellow.mp3");
            break;
        case "wrong":
            audio = new Audio("sounds/wrong.mp3");
            break;
        default:
            audio = new Audio("sounds/wrong.mp3");
            break;
    }
    audio.play();
}



function handler(e) {
    var userChosenColor = e;
    userClickedPattern.push(userChosenColor);
    $("#" + e).addClass("pressed");
    setTimeout(function() { $("#" + e).removeClass("pressed"); }, 100);
    console.log(gamePattern);
}

function initialize() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    var randomChosenColour = buttonColours[randomNumber()];
    gamePattern.push(randomChosenColour);
    for (var i = 0; i < 2; i++) {
        $("#" + randomChosenColour).fadeOut().fadeIn();
    }
}

initialize();