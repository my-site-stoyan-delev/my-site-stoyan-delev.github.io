import { html } from "../api/library.js";
import { createPlace } from "../api/placesService.js";
import { createSubmitHandler } from "../api/util.js";
import { errorMsg, field } from "./common.js";

let createTemplate = (onCreate, errors, data) => html`
<section id="create">
    

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



