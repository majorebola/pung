'use strict'
window.onload = function() {
  init();
};

var moving = {
	p1: {
		up: false,
		down: false
	}, 
	p2: {
		up: false,
		down: false
	}
}

var init = function() { 
	var b = new Ball(1, 'ball', {x: 50, y: 50}, {x: 1, y: 0.7, speed: 0.4});

	var p1 = new Bar(1, 10, 20, 20, 'bar1');
	var p2 = new Bar(1, 90, 20, 20, 'bar2');
	p1.drawBar();
	p2.drawBar();

	var interval = window.setInterval(function() {
		repeater(b, p1, p2);
	}, 20);

	document.addEventListener('keydown', function(event) {
		switch (event.which) {
			case 65:
				moving.p1.down = true;
				break;
			case 81:
				moving.p1.up = true;
				break;
			case 76:
				moving.p2.down = true;
				break;
			case 79:
				moving.p2.up = true;
				break;
		}
	});
	document.addEventListener('keyup', function(event) {
		switch (event.which) {
			case 65:
				moving.p1.down = false;
				break;
			case 81:
				moving.p1.up = false;
				break;
			case 76:
				moving.p2.down = false;
				break;
			case 79:
				moving.p2.up = false;
				break;
		}
	});
};

var x = 0.8;
var y = 0;
var points1 = 0;
var points2 = 0;

var moveUp = function(player){
	player.y = player.y - 1;
	player.drawBar('bar1');
};
var moveDown = function(player) {
	player.y = player.y + 1;
	player.drawBar('bar1');
}

var checkConflictX = function(ball){
	return ball.position.x > 98 || ball.position.x < 0;
};
var checkConflictY = function(ball) {
	return ball.position.y > 98 || ball.position.y < 0;
};
var checkConflictPlayer = function(b, p) {
	return (b.position.x <= p.x+1 && b.position.x >= p.x-1 && b.position.y >= p.y && b.position.y <= p.y+p.h);
};

var repeater = function(ball, player1, player2) {
	if(checkConflictX(ball)) {
		ball.direction.x = -ball.direction.x;
	}
	if(checkConflictPlayer(ball, player1)) {
		ball.conflictWithPlayer(player1);
	}
	if(checkConflictPlayer(ball, player2)) {
		ball.conflictWithPlayer(player2);
	}
	if(checkConflictY(ball)) {
		ball.direction.y = -ball.direction.y;
	}
	movePlayers(player1, player2);
	ball.move();
	ball.drawBall('ball');
	if(ball.position.x < 0) {
		points2++;
	}
	if(ball.position.x >98) {
		points1++;
	}

	drawPoints();
}

var movePlayers = function(p1, p2) {
	if(moving.p1.down) {
		moveDown(p1);
	}
	if(moving.p1.up) {
		moveUp(p1);
	}
	if(moving.p2.down) {
		moveDown(p2);
	}
	if(moving.p2.up) {
		moveUp(p2);
	}
};

var drawPoints = function () {
	document.getElementById('points1').innerHTML = 'Player 1: ' + points1;
	document.getElementById('points2').innerHTML = 'Player 2: ' + points2;
};

class Ball {
	constructor (id, element, position, direction) {
		this.id = id;
		this.position = position;
		this.element = element;
		this.direction = direction;
	}
	move () {
		this.position.x += this.direction.x * this.direction.speed;
		this.position.y += this.direction.y * this.direction.speed;
	}
	drawBall() {
		document.getElementById(this.element).style.top = this.position.y +"%";
		document.getElementById(this.element).style.left = this.position.x + "%";
	}
	conflictWithPlayer(player) {
		var delta = this.position.y - (player.y + player.h/2);
		this.direction.y = delta/4;
		this.direction.x = -this.direction.x;
		this.direction.speed += 0.02;
	}
}

class Bar {
	constructor (id, x, y, h, element) {
		this.id = id;
		this.x = x;
		this.y = y;
		this.h = h;
		this.element = element;
	}
	move(y) {
		this.y += y;
	}
	drawBar() {
		document.getElementById(this.element).style.top = this.y +"%";
		document.getElementById(this.element).style.left = this.x + "%";
		document.getElementById(this.element).style.height = this.h +"%";
	}
}

