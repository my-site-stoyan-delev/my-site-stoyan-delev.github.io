import { getPlaceById, updatePlace } from '../api/placesService.js';
import { html } from '../library/lit-html/lit-html.js';
import { createSubmitHandler } from '../api/util.js';
import { errorMsg, field } from './common.js';


const editTemplate = (onSubmit, errors, data) => html`
<section id="edit">
    <article>
        <h2>Edit Place</h2>
        <form @submit=${onSubmit} id="createForm">
            ${errorMsg(errors)}
            ${field({ label: 'Name', name: 'name', placeholder: 'Place', value: data.name, error: errors.name })}
            ${field({ label: 'Image', name: 'img', placeholder: 'Image URL', value: data.img, error: errors.img })}
            ${field({
                label: 'Location',
                type: 'textarea',
                name: 'location',
                placeholder: 'Enter location on new place',
                value: data.location,
                error: errors.location })}
            ${field({
                label: 'Description',
                type: 'textarea',
                name: 'description',
                placeholder: 'Enter more information for this place',
                value: data.description,
                error: errors.description })}
            <input type="submit" value="Save Changes">
        </form>
    </article>
</section>`;

export async function editPage(ctx) {
    const recipeId = ctx.params.id;
    const recipe = await getPlaceById(recipeId);
    recipe.location = recipe.location.join('\n');
    recipe.description = recipe.description.join('\n');

    update();

    function update(errors = {}, data = recipe) {
        ctx.render(editTemplate(createSubmitHandler(onSubmit, 'name', 'img', 'location', 'description'), errors, data));
    }

    async function onSubmit(data, event) {
        try {
            const missing = Object.entries(data).filter(([k, v]) => v == '');

            if (missing.length > 0) {
                throw missing.reduce((a, [k]) => Object.assign(a, { [k]: true }), { message: 'Please fill all fields!' }); 
            }

            const recipe = {
                name: data.name,
                img: data.img,
                location: data.location.split('\n').filter(r => r != ''),
                description: data.description.split('\n').filter(r => r != '')
            };

            const result = await updatePlace(recipeId, recipe);
            event.target.reset();
            ctx.notify('Recipe updated');
            ctx.page.redirect('/details/' + recipeId);
        } catch (err) {
            update(err, data);
        }
    }
}



