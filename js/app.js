// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
   this.x = x;
   this.y = y;
   this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed*dt);
    if (this.x>500) {
        this.x=0;
    }
    this.collision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if(this.x>505){
        x=0;
    }
};
Enemy.prototype.collision = function () {
    if (player.y + 131 >= this.y + 90 &&
        player.y + 73 <= this.y + 135 &&
        player.x + 25 <= this.x + 88 &&
        player.x + 76 >= this.x + 11) {
// reset player location
     player.y = 400;
     player.x= 200;
}
  
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function (x,y){
this.x = x;
this.y = y;
this.sprite ='images/char-princess-girl.png';
};
Player.prototype.update= function(){
};
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(key){
 if (key == 'left') {
     this.x = this.x - 50;
     if (this.x<0) {
         this.x = 400;
     }
 }
 else if(key == 'right'){
    this.x = this.x + 50;
    if (this.x>400) {
        this.x = 0;
    }
 }else if(key == 'up'){
    this.y = this.y - 50;
    if (this.y<0) {
        this.y = 400;
    }
 }else if(key == 'down'){
    this.y = this.y + 50;
    if (this.y>400) {
        this.y = 400;
    }
 }
 updatescore();
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies= [];
// Place the player object in a variable called player
var player = new Player(200,400);
// generate Enemies
var generateEnemies = function(n){    
   for (let i = 0; i <= n; i++) {
    allEnemies[i] = new Enemy(0,Math.random()*(200)+30,Math.random()*(100)+50);
       allEnemies.push(allEnemies[i]);
   }
}
// score 
let score = 0;
//number of enimies
let n = 1;
//create score div and set its value
let scoreDiv = document.createElement('div');
document.body.append(scoreDiv);
scoreDiv.innerText = `Your score = ${score}`;
//update score when player win
function updatescore() {
    if (player.y< 50) {
        score ++;
        scoreDiv.innerText = `Your score = ${score}`;
    //reset player position
        player.x =200;
        player.y=400;
    //remove enimies and create new ones
        allEnemies=[];
        generateEnemies(++n);
    }
}
generateEnemies(n);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

