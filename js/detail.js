import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/common/displayMessage.js";
import createLogin from "./components/common/createNav.js";
import { getStoredProducts } from "./utils/addFuntions.js";
import { imgBasicUrl } from "./settings/api.js";

createLogin();

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

const addedCartItems = getStoredProducts();

if (!id) {
    document.location.href = "/";
}

const productUrl = baseUrl +"products/" + id;

console.log(productUrl);

(async function () {
    try {
        const response = await fetch(productUrl);
        const details = await response.json();
        let cssClass = "fa-cart-plus";

        const doesCartItemExist = addedCartItems.find(function (added) {
            console.log(added);

            return parseInt(added.id) === details.id;
        });

        if(doesCartItemExist) {
            cssClass = "fa-trash-alt";
        }

        document.title = details.title;

        const container = document.querySelector(".detail-container");

        container.innerHTML = `<img class="details-img" src="${imgBasicUrl + details.image_url}" alt="${details.image.alternativeText}">
                                <div class="details-text-container">
                                <h2 class="details-h2">${details.title}</h1>
                                <p class="details-p">${details.description}</p>
                                <div class="price-button-container">
                                <p class="details-price-p">$ ${details.price}</p>
                                <div class="cart-button-container">
                                <i class="fas ${cssClass}" data-id="${details.id}" data-title="${details.title}" data-link="" data-price="${details.price}" data-image="${imgBasicUrl + details.image_url}"></i>
                                </div>
                                </div>
                                </div>`;

                                const addButton = document.querySelectorAll(".cart-button-container i");

                                addButton.forEach((button) => {
                                    button.addEventListener("click", handleClick);
                                })
                                
                                function handleClick() {

                                    this.classList.toggle("fa-trash-alt");
                                    this.classList.toggle("fa-cart-plus");

                                    const id = this.dataset.id;
                                    const title = this.dataset.title;
                                    const price = this.dataset.price;
                                    const image = this.dataset.image;

                                    const currentStoredProds = getStoredProducts();

                                    const cartItemExists = currentStoredProds.find(function(added) {
                                        return added.id === id;
                                    });

                                    if(cartItemExists === undefined) {
                                        const cartItem = { id: id, title: title, price: price, image: image};
                                        currentStoredProds.push(cartItem);
                                        saveProds(currentStoredProds);
                                    }
                                    else {
                                        const newAdds = currentStoredProds.filter(adds => adds.id !== id);
                                        saveProds(newAdds);
                                    }
                                }



                                function saveProds(prods) {
                                    localStorage.setItem("cart", JSON.stringify(prods));
                                }

        console.log(details);
    } catch (error) {
        displayMessage("error", error, ".detail-container");
    }
})();
