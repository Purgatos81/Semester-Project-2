import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/common/displayMessage.js";
import createLogin from "./components/common/createNav.js";

const productsUrl = baseUrl + "products";

createLogin();

console.log(productsUrl);

(async function () {
    const container = document.querySelector(".featured-container");

    try {
        const response = await fetch(productsUrl);
        const json = await response.json();
        const products = json;

        container.innerHTML = "";

        products.forEach(function (product) {
            if (product.featured === true) {
                console.log(product.image_url);
            container.innerHTML += `<a class="featured-product" href="details.html?id=${product.id}">
                                        <img src=${product.image.url}/>
                                        <h4>${product.title}</h4>
                                        <p>Price: ${product.price}</p>
                                    </a>`;
            }       
        });

        console.log(json);
    } catch (error) {
        console.log(error);
        displayMessage("error", error, ".featured-container");
    }
})();