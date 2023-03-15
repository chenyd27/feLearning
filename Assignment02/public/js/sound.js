var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var startTime = 0;
var endTime = 0;
var timeCost = 0;
var userName = $("#data").text();
userName = userName.replace(/^\s+|\s+$/g, '');

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
    if (startTime === 0 && level === 1) startTime = new Date();
    if (userClickedPattern[userClickedPattern.length - 1] != gamePattern[gamePattern.length - 1]) {
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 100);
        musicOn("wrong");
        $("h1").text("Fail , press to restart");
        initialize();
    } else {
        var randomChosenColour = buttonColours[randomNumber()];
        gamePattern.push(randomChosenColour);
        $("#" + randomChosenColour).fadeOut().fadeIn();
        level++;
        if (level === 15) {
            endTime = new Date();
            timeCost = endTime - startTime;
            $("h1").text("Congraduation! You finish the game; The time cose is " + (timeCost / 1000) + " seconds");
            // 将值设置到表单域中
            var input = document.getElementById('message-input');
            let person = {
                time: (timeCost / 1000),
                userName: userName
            };
            input.value = JSON.stringify(person);
            level = 0;
            startTime = 0;
            $("#button-box").removeClass("hidden");
            $("#container").hide();
            $("h2").addClass("hidden");
        } else {
            $("h1").text("Level " + level);
        }
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
    setTimeout(function() {
        $("#" + e).removeClass("pressed");
    }, 100);
}

function initialize() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    var randomChosenColour = buttonColours[randomNumber()];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut().fadeIn();
}

initialize();