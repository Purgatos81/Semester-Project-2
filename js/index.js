import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/common/displayMessage.js";

const productsUrl = baseUrl + "products";

console.log(productsUrl);

(async function () {
    const container = document.querySelector(".featured-container");

    try {
        const response = await fetch(productsUrl);
        const json = await response.json();

        container.innerHTML = "";

        json.forEach(function (product) {
            container.innerHTML += `<a class="featured-product" href="details.html?id=${product.id}">
                                        <img src="${product.image.url}">
                                        <h4>${product.title}</h4>
                                        <p>Price: ${product.price}</p>
                                    </a>`;
        });

        console.log(json);
    } catch (error) {
        console.log(error);
        displayMessage("error", error, ".featured-container");
    }
})();