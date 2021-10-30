var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern =[]
var userClickedPattern = []
var level = 0
var initial = 0
var userLevel = 0
var fail = false

$(document).keydown(function(){
    startGame()
})

//detect when user has pressed a button
$(".btn").click(function(event){   
    if (initial > 0 ) {
        
        var userChosenColour = this.id
        animate(userChosenColour)
        userClickedPattern.push(userChosenColour)
      
        checkAnswer()
    }
      
})

function checkAnswer(){
    if (gamePattern[userLevel] === userClickedPattern[userLevel]){
        if (userClickedPattern.length > gamePattern.length ){
            gameFails()
        }else{
            nextSequence()
        }
        
    }else{
        gameFails()
    }
    

}
function nextSequence(){

    if (userLevel == level) { //only activated if player clears challenge
    setTimeout(upLevel, 2000)

    }else{
        userLevel += 1
    }
    
}
function upLevel(){
    var randomNumber = Math.floor(Math.random() * 4) ;
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    animate(randomChosenColour)
    level += 1
    userLevel = 0
    userClickedPattern =[]
    $("h1").text("LEVEL "+ level)
}

function startGame(){
    if (initial == 0) {
    initial += 1
    var randomNumber = Math.floor(Math.random() * 4) ;
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    animate(randomChosenColour)
    $("h1").text("LEVEL "+ level)
    }
}



function gameFails(){
    $("h1").text('YOU FAILED')
    $("body").addClass("red")
    setTimeout(gameResets,3000)  
    
}
function gameResets(){
    location.reload()
    //  gamePattern =[]
    //  userClickedPattern = []
    //  level = 0
    //  initial = 0
    //  userLevel = 0
    //  $("h1").text("Press A Key to Start")
    //  $("body").addClass("nice")
}
function animate(btn){
    let audio = new Audio(`sounds/${btn}.mp3`);
    audio.play();

    let activeButton = $(`#${btn}`);
    activeButton.addClass("pressed");
    setTimeout(function(){
    activeButton.removeClass("pressed")
    },200)
}
