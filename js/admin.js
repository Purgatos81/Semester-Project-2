// import createLogin from "./components/common/createNav.js";
import { createAdminLogin } from "./components/common/createNav.js";
import displayMessage from "./components/common/displayMessage.js";
import { baseUrl } from "./settings/api.js";
import { getToken } from "./utils/storage.js";
import logoutButton from "./components/common/logoutButton.js";

const token = getToken();

if (!token) {
    location.href = "index.html";
}

createAdminLogin();
logoutButton();

const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const image = document.querySelector("#image");
const description = document.querySelector("#description");
const message = document.querySelector(".message-container");

form.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    const titleValue = title.value.trim();
    const priceValue = parseFloat(price.value);
    const imageValue = image.value.trim();
    const descriptionValue = description.value.trim();

    console.log("priceValue", priceValue);

    if (titleValue.length === 0 || priceValue === 0 || imageValue.length === 0 || isNaN(priceValue) || descriptionValue.length === 0) {
        return displayMessage("warning", "Please supply proper values", ".message-container");
    }

    addProduct(titleValue, priceValue, imageValue, descriptionValue);
}

async function addProduct(title, price, image, description) {
    const url = baseUrl + "products";

    const data = JSON.stringify({ title: title, price: price, image_url: image, description: description });

    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        if (json.created_at) {
            displayMessage("success", "Product created", ".message-container");
            form.reset();
        }

        if (json.error) {
            displayMessage("error", json.message, ".message-container");
        }

        console.log(json);
    } catch (error) {
        console.log(error);
        displayMessage("error", "An error occured", ".message-container");
    }
}