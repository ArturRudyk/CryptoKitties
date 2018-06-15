'use strict'

window.onload = function () {
    loadKitties();
    addFilterCategoriesEvents();
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
                displayCategories(kitties);
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
    template.children[0].setAttribute("data-category", kitty.category);
    template.querySelector(".kitty__img img").setAttribute("src", kitty.img_url);
    template.querySelector(".kitty__status p span").innerHTML = kitty.price;
    var kittyDetails = template.querySelector(".kitty__details").children;
	kittyDetails[0].innerHTML = "Kitty " + kitty.id;
    kittyDetails[1].innerHTML = kitty.category;
    kittyDetails[2].innerHTML = kitty.name.toString().toUpperCase();

    return template;
}

function displayCategories(kitties) {
    var categories = [];
    for(var i = 0; i < kitties.cats.length; i++) {
        categories.push(kitties.cats[i].category);
    }
    categories = unique(categories);

    var filter__categories = document.querySelector("#filter__categories");
    var filterCategoryTamplate = document.getElementById("template-filter-category").content;

    for(var i = 0; i < categories.length; i++) {
        filter__categories.appendChild(getFilterCategory(categories[i], filterCategoryTamplate.cloneNode(true)));
    }

}

function getFilterCategory(category, template) {
    template.children[0].setAttribute("data-category", category);
    template.children[0].innerHTML = category;
    return template;
}

function unique(arr) {
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
        var str = arr[i];
        obj[str] = true;
    }
    return Object.keys(obj);
}

function addFilterCategoriesEvents() {
    var filter__categories = document.querySelector(".filter__categories");

    filter__categories.addEventListener("click", function(e) {
        if(!e.target.classList.contains("filter__btn")) {
            return;
        } else {
            e.target.classList.toggle("js-category-hidden");
            e.target.classList.toggle("category-hidden");
            redisplayKitties();
        }
    });
}

function redisplayKitties() {
    var uncheckedCategories = [];
    var filter__categories = document.querySelector(".filter__categories").children;

    for(var i = 0; i < filter__categories.length; i++) {
        if(filter__categories[i].classList.contains("js-category-hidden")) {
            uncheckedCategories.push(filter__categories[i].getAttribute("data-category"))
        }
    }

    var gaeleryItems = document.querySelector("#gallery-items").children;

    for(var i = 0; i < gaeleryItems.length; i++) {
        gaeleryItems[i].classList.remove("hidden");
        if(uncheckedCategories.length != filter__categories.length) {
            for(var j = 0; j < uncheckedCategories.length; j++) {
                if(uncheckedCategories[j] == gaeleryItems[i].getAttribute("data-category")) {
                    gaeleryItems[i].classList.add("hidden");
                }
            }
        }
    }
}



