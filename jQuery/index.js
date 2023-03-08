var content = $("h1"); // select all h1
content.addClass("big-title margin-100");

content.text("Bye");
$("button").html("<em>Hey</em>"); // change the text into html model

$("img").attr("src", "kick.png");
$("a").attr("href", "www.baidu.com");
console.log($("a").attr("href"));

// all button
$("button").on("click", function() {
    $("h1").slideUp().slideDown().animate({ opacity: 0.5, margin: "20%" })
})

$("h1").on("mouseover", function() {
    $("h1").css("color", "purple");
})

$("input").keyup(function() {
    var inputText = $(this).val();
    console.log(inputText);
    $("h1").show();
});