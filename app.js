$(document).ready(function () {
    let level = 0;
    let started = false;
    let btnOfClours = ["red", "blue", "green", "yellow"];
    let gamePattern = [];
    let userClickedPattern = [];

    $(".btn").click(function (e) {
        let userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);

        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
    });

    $(document).keypress(async function () {
        if (!started) {
            $("#level-title").text("Level " + level);
            await nextSequence();
            started = true;
        }
    });

    async function nextSequence() {
        userClickedPattern = [];
        $("#level-title").text("Level " + level);
        let randomNumber = Math.floor(Math.random() * 4);
        let randomChosenColour = btnOfClours[randomNumber];
        gamePattern.push(randomChosenColour);
        $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChosenColour);
        level++;
    }

    function playSound(color) {
        var audio = new Audio("sounds/" + color + ".mp3");
        audio.play();
    }

    function animatePress(currentColor) {
        $("#" + currentColor).addClass("pressed");
        setTimeout(function () {
            $("#" + currentColor).removeClass("pressed");
        }, 100);
    }

    async function pattern() {
        const interval = 1000; 

        for (const patternOfColor of gamePattern) {
            await new Promise(resolve => {
                setTimeout(() => {
                    playSound(patternOfColor);
                    $("#" + patternOfColor).fadeIn(100).fadeOut(100).fadeIn(100).fadeIn(100);
                    resolve();
                }, interval);
            });
        }
    }

    async function checkAnswer(currentLevel) {
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
            if (gamePattern.length === userClickedPattern.length) {
                await pattern();
                setTimeout(nextSequence, 1000);
            }
        } else {
            playSound("wrong");
            $("body").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).addClass("game-over");
            $("h1").text("Game Over, Press Any Key to Restart");
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 200);
            startOver();
        }
    }

    function startOver() {
        level = 0;
        started = false;
        gamePattern = [];
    }
});