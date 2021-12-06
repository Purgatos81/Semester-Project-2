import createLogin from "./components/common/createNav.js";
import { getStoredProducts } from "./utils/addFuntions.js";
import { imgBasicUrl } from "./settings/api.js";

const addedCartItems = getStoredProducts();

const cartContainer = document.querySelector(".cart-container");

createLogin();

if (addedCartItems.length === 0) {
    cartContainer.innerHTML = "<h1>No items in Cart</h1>";
}

addedCartItems.forEach((cartItem) => {
    cartContainer.innerHTML += `<a class="cart-item-container" href="details.html?id=${cartItem.id}">
                                    <img class="cart-img" src="${cartItem.image}">
                                    <h4 class="cart-item-title">${cartItem.title}</h4>
                                    <p class="cart-item-prise-p">${cartItem.price}</p>
                                </a>`;
});

console.log(addedCartItems);