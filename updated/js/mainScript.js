function allDisplay(element) {
	document.getElementById("cardPECSS").style.display="block";
	document.getElementById("cardVirtual").style.display="block";
  document.getElementById("cardLameBot").style.display="block";
  document.getElementById("cardNCR").style.display="block";
  document.getElementById("cardMime").style.display="block";
  document.getElementById("cardBrailleIO").style.display="block";
	ColorChange(element);
}

function UXDisplay(element) {
	document.getElementById("cardPECSS").style.display="block";
	document.getElementById("cardVirtual").style.display="None";
  document.getElementById("cardLameBot").style.display="None";
  document.getElementById("cardNCR").style.display="block";
  document.getElementById("cardMime").style.display="block";
  document.getElementById("cardBrailleIO").style.display="block";
	ColorChange(element);
}

function SoftwareDisplay(element) {
	document.getElementById("cardPECSS").style.display="block";
	document.getElementById("cardVirtual").style.display="block";
  document.getElementById("cardLameBot").style.display="block";
  document.getElementById("cardNCR").style.display="None";
  document.getElementById("cardMime").style.display="block";
  document.getElementById("cardBrailleIO").style.display="None";
	ColorChange(element);
}

function HardwareDisplay(element) {
	document.getElementById("cardPECSS").style.display="None";
	document.getElementById("cardVirtual").style.display="block";
  document.getElementById("cardLameBot").style.display="None";
  document.getElementById("cardNCR").style.display="None";
  document.getElementById("cardMime").style.display="block";
  document.getElementById("cardBrailleIO").style.display="block";
	ColorChange(element);
}

// Code for Category Selection Coloring
function ColorChange(element){
	var children = element.parentElement.children;
	for (var i = 0; i < children.length; i++) {
  	var childElem = children[i];
	  // console.log(childElem);
		childElem.childNodes[1].classList.remove("selectedCategoryButton");
	}
	element.childNodes[1].classList.add("selectedCategoryButton");
}


// CODE FOR RAINBOW TEXT
$('.txt').html(function(i, html) {
  var chars = $.trim(html).split("");
  return '<span>' + chars.join('</span><span>') + '</span>';
});


//Code for hoverAnimation
function hoverEnter(element){
	// var x = element.childNodes[3].childNodes[1].childNodes[1].width;
	console.log(element.childNodes[3]);
	// element.childNodes[3].childNodes[3].width=x;
	element.childNodes[3].childNodes[1].style.opacity=0;
	element.childNodes[3].childNodes[3].style.opacity=1;
	element.childNodes[3].childNodes[1].style.transition = "opacity 0.5s";
	element.childNodes[3].childNodes[3].style.transition = "opacity 0.5s";
}


function hoverExit(element){
	element.childNodes[3].childNodes[1].style.opacity=1;
	element.childNodes[3].childNodes[3].style.opacity=0;
	element.childNodes[3].childNodes[1].style.transition = "opacity 0.5s";
	element.childNodes[3].childNodes[3].style.transition = "opacity 0.5s";

}
