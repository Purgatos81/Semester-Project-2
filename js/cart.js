import createLogin from "./components/common/createNav.js";
import { getStoredProducts } from "./utils/addFuntions.js";

const addedCartItems = getStoredProducts();

const cartContainer = document.querySelector(".cart-container");

createLogin();

addedCartItems.forEach((cartItem) => {
    cartContainer.innerHTML += `<div class="cart-item-container">
                                    <h4 class="cart-item-title">${cartItem.title}</h4>
                                    <p class="cart-item-prise-p">${cartItem.price}</p>
    
                                </div>`;
})