import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/common/displayMessage.js";
import createLogin from "./components/common/createNav.js";
import { imgBasicUrl } from "./settings/api.js";

const productsUrl = baseUrl + "products";

createLogin();

console.log(productsUrl);

(async function () {
    const container = document.querySelector(".products-container");

    try {
        const response = await fetch(productsUrl);
        const json = await response.json();

        container.innerHTML = "";

        json.forEach(function (product) {
            container.innerHTML += `<a class="product-card" href="details.html?id=${product.id}">
                                        <img src="${imgBasicUrl + product.image_url}">
                                        <h4>${product.title}</h4>
                                        <p>Price: ${product.price}</p>
                                    </a>`;
        });

        console.log(json);
    } catch (error) {
        console.log(error);
        displayMessage("error", error, ".products-container");
    }
})();