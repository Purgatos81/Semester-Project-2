import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/common/displayMessage.js";

const form = document.querySelector("form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const message = document.querySelector(".login-message-container");

form.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    if(usernameValue.length === 0 || passwordValue.length === 0) {
        return displayMessage("warning", "Invalid values", ".login-message-container");
    }

    runLogin(usernameValue, passwordValue);

}

async function runLogin(username, password) {
    const url = baseUrl + "auth/local";

    const data = JSON.stringify({ identifier: username, password: password});

    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        if (json.user) {
            displayMessage("success", "Login success", ".login-message-container");
        }

        if (json.error) {
            displayMessage("warning", "Invalid login details", ".login-message-container");
        }

        console.log(json);
    } catch (error) {
        console.log(error);
    }
}