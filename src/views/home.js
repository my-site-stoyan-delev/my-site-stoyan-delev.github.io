import { html } from "../api/library.js";
import { getUserData } from "../api/util.js";




let homeTemplate = (userData) => html`
<section id="home">


    <div class="welcomeMsg">Welcome to Stoyan Delev personal website!</div>
    <button class="welcomeBtn">Continue</button>



</section>`;





export function homePage(ctx) {
    ctx.render(homeTemplate());

    document.querySelector(".welcomeBtn").addEventListener("click", () => {
        ctx.page.redirect("/about")
    })

};



