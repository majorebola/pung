'use strict'
window.onload = function() {
  init();
};

const LIMIT_X_MIN = 0;
const LIMIT_X_MAX = 100;
const LIMIT_Y_MIN = 0;
const LIMIT_Y_MAX = 100;
var init = function() {

	var astro = new Astro(document.getElementById('astro'), 40, 60, 90, 1, 60);

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
	if(input.down) {
		astro.moveBackward(1);
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
		if(this.x > 0 && this.x < 99 && this.y > 0 && this.y < 99) {
			setTimeout(function(){
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
	constructor(element, x, y, heading, speed, size) {
		this.x = x;
		this.y = y;
		this.heading = heading;
		this.speed = speed;
		this.element = element;
		this.size = size;
		this.context = this.element.getContext('2d');
		this.firstDraw();
		this.calculateSize();
	}
	rotateLeft(degree) {
		this.heading -= degree;
		if (this.heading <= 0) {
			this.heading += 360;
		}
		var radians = this.heading * (Math.PI/180);
		this.context.rotate(radians);
		this.calculatePosition();
		this.calculateSize();
	}
	rotateRight(degree) {
		this.heading += degree;
		if (this.heading >= 360) {
			this.heading -= 360;
		}
		var radians = this.heading * (Math.PI/180);
		this.context.rotate(radians);
		this.calculatePosition();
		this.calculateSize();
	}
	moveForward(distance) {
		this.move(distance, 1);
	}
	moveBackward(distance) {
		this.move(distance, -1);
	}

	calculateSize() {
		var warfield = document.getElementById('warfield');
		var pixelOnPercY = warfield.offsetHeight/100;
		var pixelOnPercX = warfield.offsetWidth/100;
		var bounds = this.element.getBoundingClientRect();
		this.sizeY = bounds.height / pixelOnPercY;
		this.sizeX = bounds.width / pixelOnPercX;
	}

	calculatePosition() {
		var log = document.getElementById('log');
		log.innerHTML = "X: " + this.x + " | Y: " + this.y + "<br>wX: " + this.sizeX + " | wY: " + this.sizeY + "<br>deg: " + this.heading + " | sin: " + Math.sin(this.heading * Math.PI/180);
	}

	move(distance, versus) {
		var radians = this.heading * (Math.PI/180);
		var sin = Math.sin(radians);
		var cos = Math.cos(radians);
		var newX = this.x + cos*distance*versus;
		var newY = this.y + sin*distance*versus;
		this.calculateSize();
		if(newX > LIMIT_X_MIN && (newX + this.sizeX) < LIMIT_X_MAX && newY > LIMIT_Y_MIN && (newY + this.sizeY) < LIMIT_Y_MAX) {
			this.x = newX;
			this.y = newY;
		}
		this.calculatePosition();
	}
	shoot() {
		console.log("shoot");
		var warfield = document.getElementById('warfield');
		var bulletElement = document.createElement('div');
		warfield.appendChild(bulletElement);
		new Bullet(bulletElement, (this.x + this.sizeX/2 -0.5), (this.y + this.sizeY/2 - 0.5), this.heading, 1);

	}

	firstDraw() {
		this.context.beginPath();
		this.context.moveTo(0, 0);
		this.context.lineTo(0, 50);
		this.context.lineTo(50, 50);
		this.context.lineTo(0, 0);
		this.context.lineWidth = 5;
		this.context.strokeStyle = 'blue';
		this.context.stroke();
		this.context.closePath();

/*		this.element.style.borderTop = this.size + "px solid transparent";
		this.element.style.borderBottom = this.size + "px solid transparent";
		this.element.style.borderLeft = this.size + "px solid white";
*/	}

	draw() {
		this.element.style.top = this.y +"%";
		this.element.style.left = this.x + "%";
//		this.element.style.transform = "rotate(" + this.heading + "deg)";		
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
