import { login } from "../api/userService.js";
import { html } from "../api/library.js";
import { createSubmitHandler } from "../api/util.js";
import { errorMsg, field } from "./common.js";

let loginTemplate = (onLogin, errors, data) => html`
<section id="login">
    <article>
        <h2>Login</h2>
        <form @submit=${onLogin} id="loginForm">

            ${errorMsg(errors)}
            ${field({ label: "Username", name: "username", value: data.username, error: errors.username })}
            ${field({ label: "Password", name: "password", type: "password", error: errors.password })}


            <input type="submit" value="Login">
        </form>
    </article>
</section>`;



export function loginPage(ctx) {
    update();

    function update(errors = {}, data = {}) {
        ctx.render(loginTemplate(createSubmitHandler(onLogin, "username", "password"), errors, data));
    }

    async function onLogin({ username, password }, event) {

        try {
            if (username == "" || password == "") {
                throw {
                    message: "Please fill all fields!",
                    username: true,
                    password: true
                };

            };

            await login(username, password);
            event.target.reset();
            ctx.updateSession();
            ctx.updateUserNav();
            ctx.page.redirect("/")
        } catch (err) {
            update(err, { username })
        }
    };
};



