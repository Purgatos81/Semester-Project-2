import createLogin from "./components/common/createNav.js";
import { getStoredProducts } from "./utils/addFuntions.js";


const addedCartItems = getStoredProducts();

const cartContainer = document.querySelector(".cart-container");
const totalContainer = document.querySelector(".cart-total-container");
let total = 0;
let cssClass = "fa-trash-alt";

createLogin();

function cartCall() {

    if (addedCartItems.length === 0) {
        cartContainer.innerHTML = `<h2 class="cart-h2">No items in Cart</h2>`;
        totalContainer.innerHTML = "";
    }

    addedCartItems.forEach((cartItem) => {


        cartContainer.innerHTML += `<div class="cart-item-container">
                                        <a class="cart-item-image-a" href="details.html?id=${cartItem.id}">
                                            <img class="cart-img" src="${cartItem.image}">
                                        </a>
                                        <div class="cart-item-text-a" href="details.html?id=${cartItem.id}">
                                            <h4 class="cart-item-title">${cartItem.title}</h4>
                                            <a class="cart-item-prise-p" href="details.html?id=${cartItem.id}">Details</a>
                                            <p class="cart-item-prise-p">$ ${cartItem.price}</p>
                                            <div class="cart-remove-button-container">
                                                <i class="fas ${cssClass}" data-id="${cartItem.id}" data-title="${cartItem.title}" data-link="" data-price="${cartItem.price}" data-image="${cartItem.image}"></i>
                                            </div>
                                        </div>
                                    </div>`;

                                    const addButton = document.querySelectorAll(".cart-remove-button-container i");

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

                                        if(cartItemExists) {
                                            const newAdds = currentStoredProds.filter(adds => adds.id !== id);
                                            saveProds(newAdds);
                                            cartContainer.innerHTML = "";
                                            location.href ="cart.html";
                                        }    

                        
                                    }

                                    function saveProds(prods) {
                                        localStorage.setItem("cart", JSON.stringify(prods));  
                                    }




    });

};

cartCall();

console.log(addedCartItems);


for (let i = 0; i < addedCartItems.length; i++) {
    totalContainer.innerHTML = "";

    total += parseInt (addedCartItems[i].price);
    console.log(typeof total);

    totalContainer.innerHTML = `<h4 class="cart-total-h4">Total $ ${total}</h4>`
};


