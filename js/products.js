import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/common/displayMessage.js";
import createLogin from "./components/common/createNav.js";
import { imgBasicUrl } from "./settings/api.js";
import { getUsername } from "./utils/storage.js";

const productsUrl = baseUrl + "products";
const username = getUsername();

createLogin();

console.log(productsUrl);

(async function () {
    const container = document.querySelector(".products-container");

    try {
        const response = await fetch(productsUrl);
        const json = await response.json();

        container.innerHTML = "";

        json.forEach(function (product) {
            if(username) {
                container.innerHTML += `<a class="featured-product" href="edit.html?id=${product.id}">
                                        <img class="featured-img" src="${imgBasicUrl + product.image_url}">
                                        <h4 class="featured-h4">${product.title}</h4>
                                        <p class="featured-p">$ ${product.price}</p>
                                        </a>`;
            } else {
                container.innerHTML += `<div class="product-card-container">
                                        <a class="product-card" href="details.html?id=${product.id}">
                                        <img class="product-img" src="${imgBasicUrl + product.image_url}">
                                        <h4 class="product-h4" >${product.title}</h4>
                                        <p class="product-p" >Price: ${product.price}</p>
                                        </a></div>`;
            }                        
        });

        console.log(json);
    } catch (error) {
        console.log(error);
        displayMessage("error", error, ".products-container");
    }
})();