const myslide1 = document.querySelectorAll('.myslide1'),
	  dot = document.querySelectorAll('.dot1');
let counter = 1;
slidefun(counter);

let timer = setInterval(autoSlide, 8000);
function autoSlide() {
	counter += 1;
	slidefun(counter);
}
function plusSlides(n) {
	counter += n;
	slidefun(counter);
	resetTimer();
}
function currentSlide(n) {
	counter = n;
	slidefun(counter);
	resetTimer();
}
function resetTimer() {
	clearInterval(timer);
	timer = setInterval(autoSlide, 8000);
}

function slidefun(n) {
	
	let i;
	for(i = 0;i<myslide1.length;i++){
		myslide1[i].style.display = "none";
	}
	for(i = 0;i<dot.length;i++) {
		dot[i].className = dot[i].className.replace(' active', '');
	}
	if(n > myslide1.length){
	   counter = 1;
	   }
	if(n < 1){
	   counter = myslide1.length;
	   }
	myslide1[counter - 1].style.display = "block";
	dot[counter - 1].className += " active";
}