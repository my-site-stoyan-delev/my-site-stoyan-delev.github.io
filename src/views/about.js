import { html } from "../api/library.js";


let aboutTemplate = () => html`
<section id="about">
       

    
</section>`;



export function aboutPage(ctx) {
    ctx.render(aboutTemplate());
};



