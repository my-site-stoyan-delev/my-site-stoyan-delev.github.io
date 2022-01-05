import { html } from "../api/library.js";
import { createPlace } from "../api/placesService.js";
import { createSubmitHandler } from "../api/util.js";
import { errorMsg, field } from "./common.js";

let createTemplate = (onCreate, errors, data) => html`
<section id="create">
    <article>
        <h2>New Place</h2>
        <form @submit=${onCreate} id="createForm">

            ${errorMsg(errors)}
            ${field({ label: "Name", name: "name", placeholder: "Place", value: data.name, error: errors.name })}
            ${field({ label: "Image", name: "img", placeholder: "Image URL", value: data.img, error: errors.img })}
            ${field({
            label: "Location", type: "textarea", name: "location",
         placeholder: "Enter location on new place", value: data.location, error: errors.location
            })}

            ${field({
            label: "Description", type: "textarea", name: "description",
         placeholder: "Enter more information for this place", value: data.description, error: errors.description
            })}

            <input type="submit" value="Create Place">
        </form>
    </article>
</section>`;



export function createPage(ctx) {
    update();

    function update(errors = {}, data = {}) {
        ctx.render(createTemplate(createSubmitHandler(onCreate, "name", "img", "location", "description"), errors, data));
    }

    async function onCreate(data, event) {
        try {
            let missing = Object.entries(data).filter(([k, v]) => v == "");
            if (missing.length > 0) {
                throw missing.reduce((a, [k]) => Object.assign(a, { [k]: true }), { message: "Please fill all fields!" });
            };

            let recipe = {
                name: data.name,
                img: data.img,
                location: data.location.split("\n").filter(row => row != ""),
                description: data.description.split("\n").filter(row => row != "")
            }

            let result = await createPlace(recipe);
            event.target.reset();
            ctx.page.redirect("/details/" + result.objectId);

        } catch (err) {
            update(err, data)
        }
    };


};



