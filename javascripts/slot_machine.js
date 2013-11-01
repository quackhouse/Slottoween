SlotMachine = function() {


  mySlotMachine = this;
  this.handle = document.getElementsByClassName('handle')[0];
  this.handle.addEventListener("click", mySlotMachine.start);

  this.roller1 = new Roller(1);
  this.roller2 = new Roller(2);
  this.roller3 = new Roller(3);
  var button1 = document.getElementById('roller-1');
  button1.addEventListener("click", function(){
    mySlotMachine.stopRoller(1);

  });

  var button2 = document.getElementById('roller-2');
  button2.addEventListener("click", function(){
    mySlotMachine.stopRoller(2);
  });

  var button3 = document.getElementById('roller-3');
  button3.addEventListener("click", function(){
    mySlotMachine.stopRoller(3);
  });

  this.totalGames = 0;
  this.gamesWon = 0;

  this.coin = new Audio("audio/coin.wav");
  this.spinner = new Audio("audio/item_box.mp3");
  this.spinner.loop = true;
  this.lose = new Audio("audio/lose.wav");
  this.win = new Audio("audio/win.wav");


};

SlotMachine.prototype.playCoin = function() {
  this.coin.play();
};

SlotMachine.prototype.playSpin = function() {
  var delay = Math.floor((Math.random()*500));

  setTimeout(function(){
    mySlotMachine.spinner.play();
  }, delay);
};

SlotMachine.prototype.stopSpin = function() {
  this.spinner.pause();
};

SlotMachine.prototype.playLose = function() {
  this.lose.play();
};

SlotMachine.prototype.playWin = function() {
  this.win.play();
};

SlotMachine.prototype.start = function() {
  console.log("started");

  mySlotMachine.roller1.spin();
  mySlotMachine.roller2.spin();
  mySlotMachine.roller3.spin();
  mySlotMachine.playSpin();
};



SlotMachine.prototype.stopRoller =  function(rollerNumber) {
  rollerName = "roller" + rollerNumber;
  if(this[rollerName].spinning === true) {
    this[rollerName].stop();
    this.playCoin();
    if(!this.roller1.spinning && !this.roller2.spinning && !this.roller3.spinning){
      this.stopSpin();
      this.checkWinOrLose();
    }
  }
};

SlotMachine.prototype.checkWinOrLose = function() {

  var totalGames = document.getElementsByClassName("total-games")[0];
  var gamesWon = document.getElementsByClassName("games-won")[0];
  this.totalGames += 1;
  if(this.roller1.value == this.roller2.value == this.roller3.value) {
    this.playWin();
    alert("you won!");
    this.gamesWon += 1;
    gamesWon = this.gamesWon;
  }
  else {
    this.playLose();
    alert("you lose");
  }
  totalGames.textContent = this.totalGames;
};



