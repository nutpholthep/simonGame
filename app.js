$(document).ready(function(){
    let level = 0;
    let started = false;  
    let btnOfClours = ["red","blue","green","yellow"];
    let gamePattern =[];
    let userClickedPattern = [];

    $(".btn").click(function(e){
        let userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);

        console.log(userClickedPattern);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length-1);
    });

    $(document).keypress(function(){
        if(!started){
            $("#level-title").text("Level "+ level);
            nextSequence();
            started = true;
        }
        // nextSequence();
    });

    function nextSequence(){
        userClickedPattern = [];
        $("#level-title").text("Level "+ level);
        let randomNumber = Math.floor(Math.random() *4);
        let randomChosenColour = btnOfClours[randomNumber];
        gamePattern.push(randomChosenColour);
        $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChosenColour);
        level++;
        // console.log(gamePattern);
    }
 
function playSound(color){
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function animatePress(currentColor){
   $("#"+currentColor).addClass("pressed");
       setTimeout(function(){
         $("#"+currentColor).removeClass("pressed");
       },300);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        
        if(gamePattern.length === userClickedPattern.length){
            // console.log("BR");
            setTimeout(function(){
                    nextSequence();
                },1000);
        }
    }else{
        playSound("wrong");
        $("body").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        startOver();
    }
// console.log(currentLevel);
}

function startOver(){
    level = 0;
    started = false;
    gamePattern =[];
}


});