import { html } from "../api/library.js";





let homeTemplate = () => html`
<section id="home">
    <div class="welcomeMsg">View out more about the work and competencies of the author, just login!</div>
   
</section>`;


export function homePage(ctx) {
    ctx.render(homeTemplate());

};



