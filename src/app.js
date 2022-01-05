import decorateContext from "./api/middlewares/render.js";
import addSession from "./api/middlewares/session.js";
import notify from "./api/middlewares/notify.js";
import { page } from "./api/library.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { logout } from "./api/userService.js";
import initialize from "./api/middlewares/render.js";

document.getElementById("logoutBtn").addEventListener("click", onLogout);

page(addSession());
page(decorateContext());
page(notify());
page("/", homePage);
page("/login", loginPage);
page("/register", registerPage);
page("/catalog", catalogPage);
page("/create", createPage);
page("/details/:id",detailsPage);
page("/edit/:id",editPage);




page.start();

async function onLogout() {
    await logout();
    initialize();
    document.getElementById("welcomeMsg").textContent = "Welcome, user!"
    page.redirect("/");
};
