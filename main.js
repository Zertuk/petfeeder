var startX = 0;
var startY = 0;
var offSetX = 0;
var offSetY = 0;
var dragElement;
var oldZIndex = 0;

initDragDrop();

function initDragDrop() {
	document.onmousedown = OnMouseDown;
	document.onmouseup = OnMouseUp;
}

function OnMouseDown(e) {
	if (e == null) {
		e = window.event;
	}
	var target = e.target != null ? e.target : e.srcElement;

	if ((e.button == 1 && window.event != null || e.button ==0) && target.className == 'drag') {
		startX = e.clientX;
		startY = e.clientY;

		offSetX = ExtractNumber(target.style.left);
		offSetY = ExtractNumber(target.style.top);

		oldZIndex = target.style.zIndex;
		target.style.zindex = 10000;

		dragElement = target;

		document.onmousemove = OnMouseMove;

		document.body.focus();

		document.onselectstart = function () {
			return false;
		}
		target.ondragstart = function() {
			return false;
		}
		return false;
	}
}

function OnMouseMove(e) {
	if (e == null) {
		var e = window.event;
	}

	dragElement.style.left = (offSetX + e.clientX - startX) + 'px';
	dragElement.style.top = (offSetY + e.clientY - startY) + 'px';	
}

function OnMouseUp(e) {
	if (dragElement != null) {
		dragElement.style.zIndex = oldZIndex;

		document.onmousemove = null;
		document.onselectstart = null;
		dragElement.ondragstart = null;

		dragElement = null;

	}
}

function ExtractNumber(value) {
	var n = parseInt(value);

	return n == null || isNaN(n) ? 0: n;
}

window.onload = function() {
var beastWidth = 150;
var beast = document.getElementById('monster');
var explode = document.createElement('audio');
explode.src = 'explode.wav'
var eatSound = document.createElement('audio');
eatSound.src = 'yum.mp3';

var food = document.getElementById('food');
var foodX = food.clientWidth;
var foodY = food.clientHeight;
console.log(foodX);
console.log(foodY);

var beastX = beast.clientWidth;
var beastY = beast.clientHeight;
console.log(beastX);
console.log(beastY);

// function checkDistance() {
// 	dist = food.distanceTo(beast);
// 	if (dist < 50) {
// 		console.log('collide');
// 	}
// 	else {
// 		console.log('no collide')
// 	}
// }

function addWidth() {
	if (beastWidth < 700) {
	beastWidth = beastWidth + 50;
	beast.style.width = beastWidth + 'px';
	beastX = beast.clientWidth;
	beastY = beast.clientHeight;
	// checkDistance();
	eatSound.play();
	}
	else {
		beast.src = 'explosion.png'
		explode.play();
	}
	
}

function subWidth() {
	beastWidth = beastWidth - 50;
	beast.style.width = beastWidth + 'px';
}

beast.addEventListener('click', function() {
	addWidth();
})
}