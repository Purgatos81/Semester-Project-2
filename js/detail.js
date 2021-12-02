import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/common/displayMessage.js";
import createLogin from "./components/common/createNav.js";
import { imgBasicUrl } from "./settings/api.js";

createLogin();

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

if (!id) {
    document.location.href = "/";
}

const productUrl = baseUrl +"products/" + id;

console.log(productUrl);

(async function () {
    try {
        const response = await fetch(productUrl);
        const details = await response.json();

        document.title = details.title;

        const container = document.querySelector(".detail-container");

        container.innerHTML = `<h2 class="details-h2">${details.title}</h1>
                                <p class="details-p">${details.description}</p>
                                <img class="details-img" src="${imgBasicUrl + details.image_url}">
                                <p class="details-price-p">$ ${details.price}</p>
                                <div class="cart-button-container">
                                <i class="fas fa-cart-plus" data-id="${details.id}" data-title="${details.title}" data-link="" data-price="${details.price}"></i>
                                </div>`;

                                const addButton = document.querySelectorAll(".cart-button-container i");

                                addButton.forEach((button) => {
                                    button.addEventListener("click", handleClick);
                                })
                                
                                function handleClick() {
                                    console.log(event);
                                    this.classList.toggle("fa-trash-alt");
                                    this.classList.toggle("fa-cart-plus");
                                }
        console.log(details);
    } catch (error) {
        displayMessage("error", error, ".detail-container");
    }
})();
