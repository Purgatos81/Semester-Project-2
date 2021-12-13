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
    const container = document.querySelector(".featured-container");

    try {
        const response = await fetch(productsUrl);
        const json = await response.json();

        container.innerHTML = "";

      

        json.forEach(function (product) {
            if (product.featured === true) {
                // console.log(product);
                // console.log(product.image);
                if(username) {
                    container.innerHTML += `<a class="featured-product" href="edit.html?id=${product.id}">
                                            <img class="featured-img" src="${imgBasicUrl + product.image_url}">
                                            <h4 class="featured-h4">${product.title}</h4>
                                            <p class="featured-p">$ ${product.price}</p>
                                            </a>`;
                } else {            
                        container.innerHTML += `<a class="featured-product" href="details.html?id=${product.id}">
                        <img class="featured-img" src="${imgBasicUrl + product.image_url}">
                        <h4 class="featured-h4">${product.title}</h4>
                        <p class="featured-p">$ ${product.price}</p>
                        </a>`
            ;}

            }       
        });

        console.log(json);
    } catch (error) {
        console.log(error);
        displayMessage("error", error, ".featured-container");
    }
})();

// alt="${product.image.alternativeText}"