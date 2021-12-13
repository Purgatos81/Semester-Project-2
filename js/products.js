import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/common/displayMessage.js";
import createLogin from "./components/common/createNav.js";
import { imgBasicUrl } from "./settings/api.js";
import { getUsername } from "./utils/storage.js";

const productsUrl = baseUrl + "products";
const search = document.querySelector(".search");
const username = getUsername();


createLogin();

console.log(productsUrl);

async function prodCall() {
    const container = document.querySelector(".products-container");

    try {
        const response = await fetch(productsUrl);
        const json = await response.json();
        let bson = json;

        container.innerHTML = "";

        bson.forEach(function (product) {
            if(username) {
                container.innerHTML += `<div class="product-card-container">
                                        <a class="product-card" href="edit.html?id=${product.id}">
                                        <img class="product-img" src="${imgBasicUrl + product.image_url}">
                                        <h4 class="product-h4">${product.title}</h4>
                                        <p class="product-p">$ ${product.price}</p>
                                        </a>
                                        </div>`;
            } else {
                container.innerHTML += `<div class="product-card-container">
                                        <a class="product-card" href="details.html?id=${product.id}">
                                        <img class="product-img" src="${imgBasicUrl + product.image_url}">
                                        <h4 class="product-h4" >${product.title}</h4>
                                        <p class="product-p" >Price: ${product.price}</p>
                                        </a></div>`;
            }     
            search.onkeyup = function () {
                // console.log(event);
            
                const searchValue = event.target.value.trim().toLowerCase();
            
                const filteredProducts = json.filter(function (prod) {
                    if (prod.title.toLowerCase().startsWith(searchValue)) {
                        return true;
                    }
                });
            
                console.log(filteredProducts);
            
                bson = filteredProducts;

                container.innerHTML = "";

                bson.forEach(function (product) {
                    if(username) {
                        container.innerHTML += `<div class="product-card-container">
                                                <a class="product-card" href="edit.html?id=${product.id}">
                                                <img class="product-img" src="${imgBasicUrl + product.image_url}">
                                                <h4 class="product-h4">${product.title}</h4>
                                                <p class="product-p">$ ${product.price}</p>
                                                </a>
                                                </div>`;
                    } else {
                        container.innerHTML += `<div class="product-card-container">
                                                <a class="product-card" href="details.html?id=${product.id}">
                                                <img class="product-img" src="${imgBasicUrl + product.image_url}">
                                                <h4 class="product-h4" >${product.title}</h4>
                                                <p class="product-p" >Price: ${product.price}</p>
                                                </a></div>`;
                    }    
            
            });
            // console.log(json);
            // prodCall();                
        }});

    } catch (error) {
        console.log(error);
        displayMessage("error", error, ".products-container");
    }

};

prodCall();

// alt="${product.image.alternativeText}"