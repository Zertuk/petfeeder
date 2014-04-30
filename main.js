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


function newWidth() {
	beastWidth = beastWidth + 50;
	beast.style.width = beastWidth + 'px';
	console.log(beastWidth);
}

beast.addEventListener('click', function() {
	newWidth();
})
}