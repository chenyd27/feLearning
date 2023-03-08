var button = document.querySelectorAll(".drum");
for (var i = 0; i < button.length; i++) {
    button[i].addEventListener("click", function() {
        var index = this.innerHTML;
        clickButton(index);
        buttonAnimation(index);
    });

}

function clickButton(index) {
    var audio;
    switch (index) {
        case "w":
            {
                audio = new Audio("sounds/crash.mp3");
                break;
            }
        case "a":
            {
                audio = new Audio("sounds/kick-bass.mp3");
                break;
            }
        case "s":
            {
                audio = new Audio("sounds/snare.mp3");
                break;

            }
        case "d":
            {
                audio = new Audio("sounds/tom-1.mp3");
                break;
            }
        case "j":
            {
                audio = new Audio("sounds/tom-2.mp3");
            }
        case "k":
            {
                audio = new Audio("sounds/tom-3.mp3");
                break;
            }
        default:
            {
                audio = new Audio("sounds/tom-4.mp3");
                break;
            }
    }
    audio.play();
}

document.addEventListener("keypress", function(event) {
    clickButton(event.key);
    buttonAnimation(event.key);
})

function buttonAnimation(currentKey) {
    var curr = document.querySelector("." + currentKey);
    curr.classList.add("pressed");
    // timeout function, wait for 1000 ms then implement the function
    setTimeout(function() {
        curr.classList.remove("pressed");
    }, 100);
}