function randomNumber() {
    var index = Math.floor(Math.random() * 6) + 1;
    return index;
}

function changeImg() {
    var img = document.querySelectorAll("img");
    var list = [];
    for (var i = 0; i < img.length; i++) {
        var randomIndex = randomNumber();
        list.push(randomIndex);
        img[i].setAttribute("src", "images/dice" + randomIndex + ".png");
    }
    var index = 0;
    for (var i = 1; i < list.length; i++) {
        if (list[i] > list[index]) index = i;
    }
    var content = document.querySelector("h1");
    content.innerHTML = "Player " + (index + 1) + " Wins!";
}

changeImg();