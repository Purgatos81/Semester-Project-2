import { baseUrl } from "./settings/api.js";
import { saveToken, saveUser } from "./utils/storage.js";
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

        console.log(json);

        if (json.user) {

            saveToken(json.jwt);
            saveUser(json.user);

            location.href ="/";
        }

        if (json.error) {
            displayMessage("warning", "Invalid login details", ".login-message-container");
        }


    } catch (error) {
        console.log(error);
    }
}