import { getUsername } from "../../utils/storage.js";

export default function createLogin() {

    const container = document.querySelector(".login-li-container");

    const username = getUsername();

    let authLink = `<a class="nav-a" href="login.html"><i class="fas fa-user-cog" id="nav-icon"></i>Login</a>`

    if(username) {
        authLink = `<a class="nav-a" href="admin.html"><i class="fas fa-user-cog" id="nav-icon"></i>${username}</a>`
    }

    container.innerHTML = `${authLink}`

}

export function createAdminLogin() {

    const container = document.querySelector(".login-li-container");

    const username = getUsername();

    let authLink = `<a class="active nav-a" href="login.html"><i class="fas fa-user-cog" id="nav-icon"></i>Login</a>`

    if(username) {
        authLink = `<a class="active nav-a" href="admin.html"><i class="fas fa-user-cog" id="nav-icon"></i>${username}</a>`
    }

    container.innerHTML = `${authLink}`

}