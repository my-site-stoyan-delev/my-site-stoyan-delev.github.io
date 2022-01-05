import { register } from "../api/userService.js";
import { html } from "../api/library.js";
import { createSubmitHandler } from "../api/util.js";
import { errorMsg, field } from "./common.js";

let registerTemplate = (onRegister, errors, data) => html`
<section id="register">
    <article>
        <h2>Register</h2>
        <form @submit=${onRegister} id="registerForm">

            ${errorMsg(errors)}
            ${field({ label: "Username", name: "username", value: data.username, error: errors.username })}
            ${field({ label: "E-mail", name: "email", value: data.email, error: errors.email })}
            ${field({
            label: "Password", name: "password", type: "password", value: data.email, error: errors.password
            })}
            ${field({ label: "Repeat", name: "repass", type: "password", value: data.repass, error: errors.repass })}

            <input type="submit" value="Register">
        </form>
    </article>
</section>`;



export function registerPage(ctx) {
    update();

    function update(errors = {}, data = {}) {
        ctx.render(registerTemplate(createSubmitHandler(onRegister, "username", "email", "password", "repass"), errors, data));
    }

    async function onRegister(data, event) {

        try {
            let missing = Object.entries(data).filter(([k, v]) => v == "");
            if (missing.length > 0) {
                throw missing.reduce((a, [k]) => Object.assign(a, { [k]: true }), { message: "Please fill all fields!" });
            };

            if (data.password != data.repass) {
                throw {
                    message: "Password does not match!",
                    password: true,
                    repass: true
                };
            };

            await register(data.username, data.email, data.password);
            event.target.reset();
            ctx.updateSession();
            ctx.updateUserNav();
            ctx.page.redirect("/")
        } catch (err) {
            if (err.code == 202) {
                err.username = true;
            } else if (err.code == 203) {
                err.email = true;
            }
            update(err, { username: data.username, email: data.email })
        }
    };
};



