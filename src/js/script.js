'use strict'

window.onload = function () {
	
	var imagesList = getElem('.gallery__item', 'img');

	bgColor(imagesList);

}

function getElem (selector1, selector2) {
	var itemsList = document.querySelectorAll(selector1);
	var res = [];
	for (var i = 0; i < itemsList.length; i++) {
		var a = itemsList[i].querySelector(selector2);
		res.push(a);	
	}
	return res;
}

function bgColor (ar){
	var color = ['#fde9e4', ' #fae1ca', '#faeefa', '#dfdffa', '#d3e8ff'];
	color.forEach(function(item, j){

		var array = enumeration(ar, 5, j);
		array.forEach(function (item) {
			item.style.backgroundColor = color[j];
		});
	
	});
	
};

function enumeration (ar, n, j) {
	var res =[];
	for (var i = 0; i < ar.length/n; i++) {

		if (ar[j + i*n] !== undefined) {
			res.push(ar[j + i*n]);
		};
	}
	return (res);
};