import { html, until } from "../api/library.js";
import { getRecentPlaces } from "../api/placesService.js";
import { spinner } from "./common.js";

let homeTemplate = () => html`
<section id="home">
    
        
        <div class="welcomeMsg">Welcome to Stoyan Delev personal website!</div>
        <button class="welcomeBtn">Continue</button>

    
</section>`;



export function homePage(ctx) {
    ctx.render(homeTemplate());
};

// async function loadRecipes() {
//     let { results: recipes } = await getRecentPlaces();

//     if (recipes.length == 0) {
//         return html`<p>No favorite place found. Be the first to post a new favorite!</p>`
//     } else {
//         return recipes.reduce((acc, current) => {
//             if(acc.length > 0) {
//                 acc.push(html`<div class="recent-space"></div>`);
//             };
//             acc.push(recipePreview(current));
            
//             return acc;
//         }, [])
//     };

// };


