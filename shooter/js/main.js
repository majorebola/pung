'use strict'
window.onload = function() {
  init();
};

const LIMIT_X_MIN = 2;
const LIMIT_X_MAX = 95;
const LIMIT_Y_MIN = 10;
const LIMIT_Y_MAX = 85;
var init = function() {

	var astro = new Astro('astro', 40, 60, 90, 1);

	var interval = window.setInterval(function() {
		repeater(astro);
	}, 20);

	inputListener();
};


var repeater = function(astro) {
	if(input.left) {
		astro.rotateLeft(3);
	}
	if(input.right) {
		astro.rotateRight(3);
	}
	if(input.up) {
		astro.moveForward(1);
	}
	if(input.space) {
		astro.shoot();
	}
	astro.draw();
};

var input = {
	up: false,
	down: false,
	left: false,
	right: false
}

class Bullet {
	constructor(element, x, y, h, s) {
		this.x = x;
		this.y = y;
		this.heading = h;
		this.speed = s;
		this.element = element;

		this.element.className = 'bullet';
		this.element.style.top = this.y + "%";
		this.element.style.left = this.x + "%";
		this.move();
	}
	move() {
		var radians = this.heading * (Math.PI/180);
		var sin = Math.sin(radians);
		var cos = Math.cos(radians);
		this.x += cos*this.speed;
		this.y += sin*this.speed;
		this.draw();
		var me = this;
		if(this.x > 0 && this.x < 100 && this.y > 0 && this.y < 100) {
			setTimeout(function(){
				console.log('moving');
				me.move();
			}, 20, this);		
		} else {
			var warfield = document.getElementById('warfield');
			warfield.removeChild(this.element);
		}
	}
	draw() {
		this.element.style.top = this.y +"%";
		this.element.style.left = this.x + "%";
		this.element.style.transform = "rotate(" + this.heading + "deg)";
	}
}

class Astro {
	constructor(element, x, y, h, s) {
		this.x = x;
		this.y = y;
		this.heading = h;
		this.speed = s;
		this.element = element;
		this.width;
		this.height;
		this.center;
	}
	rotateLeft(degree) {
		this.heading -= degree;
		if (this.heading <= 0) {
			this.heading += 360;
		}
	}
	rotateRight(degree) {
		this.heading += degree;
		if (this.heading >= 360) {
			this.heading -= 360;
		}
	}
	moveForward(distance) {
		var radians = this.heading * (Math.PI/180);
		var sin = Math.sin(radians);
		var cos = Math.cos(radians);
		var newX = this.x + cos*distance;
		var newY = this.y + sin*distance;
		document.getElementById('log').innerHTML = "X: " + newX + " | Y: " + newY + " <br>sin: " + sin + " | cos: " + cos;
		if(newX > LIMIT_X_MIN && newX < LIMIT_X_MAX && newY > LIMIT_Y_MIN && newY < LIMIT_Y_MAX) {
			this.x = newX;
			this.y = newY;
		}
	}
	shoot() {
		console.log("shoot");
		var warfield = document.getElementById('warfield');
		var bulletElement = document.createElement('div');
		warfield.appendChild(bulletElement);
		new Bullet(bulletElement, this.x, this.y, this.heading, 1);

	}

	draw() {
		document.getElementById(this.element).style.top = this.y +"%";
		document.getElementById(this.element).style.left = this.x + "%";
		document.getElementById(this.element).style.transform = "rotate(" + this.heading + "deg)";
	}
}


var inputListener = function() {
	document.addEventListener('keydown', function(event) {
		switch (event.which) {
			case 87:
				input.up = true;
				break;
			case 83:
				input.down = true;
				break;
			case 65:
				input.left = true;
				break;
			case 68:
				input.right = true;
				break;
			case 32: 
				input.space = true;
				break;
		}
	});
	document.addEventListener('keyup', function(event) {
		switch (event.which) {
			case 87:
				input.up = false;
				break;
			case 83:
				input.down = false;
				break;
			case 65:
				input.left = false;
				break;
			case 68:
				input.right = false;
				break;
			case 32: 
				input.space = false;
				break;
		}
	});
};
