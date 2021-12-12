import createLogin from "./components/common/createNav.js";
import { getStoredProducts } from "./utils/addFuntions.js";


const addedCartItems = getStoredProducts();

const cartContainer = document.querySelector(".cart-container");
const totalContainer = document.querySelector(".cart-total-container");
let total = 0;

createLogin();

if (addedCartItems.length === 0) {
    cartContainer.innerHTML = `<h2 class="cart-h2">No items in Cart</h2>`;
    totalContainer.innerHTML = "";
}

addedCartItems.forEach((cartItem) => {
    cartContainer.innerHTML += `<div class="cart-item-container">
                                    <a class="cart-item-image-a" href="details.html?id=${cartItem.id}">
                                    <img class="cart-img" src="${cartItem.image}">
                                    </a>
                                    <a class="cart-item-text-a" href="details.html?id=${cartItem.id}">
                                    <h4 class="cart-item-title">${cartItem.title}</h4>
                                    <p class="cart-item-prise-p">$ ${cartItem.price}</p>
                                    </a>
                                </div>`;




});

console.log(addedCartItems);

for (let i = 0; i < addedCartItems.length; i++) {

    total += parseInt (addedCartItems[i].price);
    console.log(typeof total);

    totalContainer.innerHTML = `<h4 class="cart-total-h4">Total $ ${total}</h4>`
};



