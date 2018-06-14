'use strict'

window.onload = function () {
    loadKitties();
}

function loadKitties() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://ma-cats-api.herokuapp.com/api/cats?page=1&per_page=50', true);
    xhr.send();

    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
            alert( xhr.status + ': ' + xhr.statusText );
        } else {
            try {
                var kitties = JSON.parse(xhr.responseText);
                displayKitties(kitties);
            } catch (e) {
                console.log( "Некорректный ответ " + e.message );
            }
        }
    }
}

function displayKitties(kitties) {
    var gaeleryItems = document.querySelector("#gallery-items");
    var kittyTamplate = document.getElementById("template-cat").content;

    for(var i = 0; i < kitties.cats.length; i++) {
        gaeleryItems.appendChild(getKittie(kitties.cats[i], kittyTamplate.cloneNode(true)));
	}
}

function getKittie(kitty, template) {
    template.querySelector(".kitty__img img").setAttribute("src", kitty.img_url);
    template.querySelector(".kitty__status p span").innerHTML = kitty.price;
    var kittyDetails = template.querySelector(".kitty__details").children;
	kittyDetails[0].innerHTML = "Kitty " + kitty.id;
    kittyDetails[1].innerHTML = kitty.category;
    kittyDetails[2].innerHTML = kitty.name.toString().toUpperCase();

    return template;
}







