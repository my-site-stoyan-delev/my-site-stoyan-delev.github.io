import { html, until } from "../api/library.js";
import { getRecentPlaces } from "../api/placesService.js";
import { spinner } from "./common.js";

let homeTemplate = (recipePromise) => html`
<section id="home">
    <div class="hero">
        <h2>Welcome to My Favorite Places!</h2>
    </div>
    <header class="section-title">Recently added places:</header>
    <div class="recent-recipes">

        ${until(recipePromise, spinner())}


    </div>
    <!-- <footer class="section-title">
        <p>Browse all recipes in the <a href="/catalog">Catalog</a></p>
    </footer> -->
</section>`;

let recipePreview = (recipe) => html`
<a class="card" href="/details/${recipe.objectId}">
    <article class="recent">
        <div class="recent-preview"><img src=${recipe.img}></div>
        <div class="recent-title">${recipe.name}</div>
    </article>
</a>`;

export function homePage(ctx) {
    ctx.render(homeTemplate(loadRecipes()));
};

async function loadRecipes() {
    let { results: recipes } = await getRecentPlaces();

    if (recipes.length == 0) {
        return html`<p>No favorite place found. Be the first to post a new favorite!</p>`
    } else {
        return recipes.reduce((acc, current) => {
            if(acc.length > 0) {
                acc.push(html`<div class="recent-space"></div>`);
            };
            acc.push(recipePreview(current));
            
            return acc;
        }, [])
    };

};


