import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/common/displayMessage.js";
import createLogin from "./components/common/createNav.js";
import { getToken } from "./utils/storage.js";
import deleteButton from "./components/products/deleteButton.js";

const token = getToken();

if (!token) {
    location.href = "index.html";
}

createLogin();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const productUrl = baseUrl + "products/" + id;

const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const image = document.querySelector("#image");
const description = document.querySelector("#description");
const featured = document.querySelector("#featured")
const idInput = document.querySelector("#id");
const message = document.querySelector(".message-container");
const loading = document.querySelector(".loader");
const toggle = document.querySelector(".toggle-button-container");

(async function () {
    try {
        const response = await fetch(productUrl);
        const details = await response.json();

        title.value = details.title;
        price.value = details.price;
        image.value = details.image_url;
        description.value = details.description;
        featured.value = details.featured;
        idInput.value = details.id;

        deleteButton(details.id);

        console.log(details);
        console.log(featured.value);
        if (featured.value === "true" ) {
            toggle.innerHTML = `<p class="toggle-p">Toggle Featured Off</p>
                                <i id="toggle-button" class="fas fa-toggle-on"></i>`;
        } else {
            toggle.innerHTML = `<p class="toggle-p">Toggle Featured On</p>
                                <i id="toggle-button" class="fas fa-toggle-off"></i>`;
        }
    } catch (error) {
        console.log(error);
    } finally {
        loading.style.display = "none";
        form.style.display = "flex";
    }
    const toggleButton = document.querySelector("#toggle-button");

    toggleButton.onclick = function() {toggleFunction()};

    function toggleFunction() {
        console.log(event);

        if (featured.value === "false") {
            featured.value = true;
            toggle.innerHTML = `<p class="toggle-p">Toggle Featured Off</p>
                                <i id="toggle-button" class="fas fa-toggle-on"></i>`;
        } else {
            featured.value = false;
            toggle.innerHTML = `<p class="toggle-p">Toggle Featured On</p>
                                <i id="toggle-button" class="fas fa-toggle-off"></i>`;
        }

    }

    console.log(toggleButton);
})();

form.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    const titleValue = title.value.trim();
    const priceValue = parseFloat(price.value);
    const imageValue = image.value.trim();
    const descriptionValue = description.value.trim();
    const featuredValue = featured.value.trim();
    const idValue = idInput.value;

    if (titleValue.length === 0 || priceValue === 0 || imageValue.length === 0 || isNaN(priceValue) || descriptionValue.length === 0 || featuredValue.length === 0 ) {
        return displayMessage("warning", "Please supply proper values", ".message-container");
    }

    updateProduct(titleValue, priceValue, imageValue, descriptionValue, featuredValue, idValue);
}

async function updateProduct(title, price, image, description, featured, id) {
    const url = baseUrl + "products/" + id;
    const data = JSON.stringify({ title: title, price: price, image_url: image, description: description, featured: featured });


    const options = {
        method: "PUT",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();
        console.log(json);

        if (json.updated_at) {
            displayMessage("success", "Product updated", ".message-container");
        }

        if (json.error) {
            displayMessage("error", json.message, ".message-container");
        }
    } catch (error) {
        console.log(error);
    }
}