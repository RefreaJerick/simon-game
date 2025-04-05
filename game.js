var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

  level++;
  $("#level-title").text("Level " + level);

  userClickedPattern = [];
}

function playSound(name) {
  var tileSound = new Audio("./sounds/" + name + ".mp3");
  tileSound.play();
} 

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    var wrongSound = new Audio("./sounds/wrong.mp3");
    wrongSound.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Space bar to Restart");
    startOver();
    bgMusic.pause();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  gameStarted = true;
}

$(".btn").click(function () {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

var gameStarted = true;
var bgMusic = new Audio("./sounds/vibe-mountain.mp3");
var buttonDisabled = true;

if (buttonDisabled) {
  $(".btn").addClass("disabled");
}

$(document).keydown(function (event) {
  if (event.key == " ") {
    if (gameStarted) {
      $(".btn").removeClass("disabled");
      gameStarted = false;
      nextSequence();
      $("#level-title").text("Level " + level);
      bgMusic.currentTime = 0;
      bgMusic.play();
    }
  }
})