import { html, classMap } from "../api/library.js";

export let spinner = () => html`
<p>Loading &hellip;</p>`;

export let field = ({ label, name, type = "text", value = "", placeholder = " ", error }) => {
    if (type == "textarea") {
        return html`<label class="ml">${label}: <textarea class=${classMap({ error })} name=${name} placeholder=${placeholder}
        .value=${value}></textarea></label>`
    } else {
        return html`
        <label>${label}: <input class=${classMap({ error })} type=${type} name=${name} placeholder=${placeholder}
                .value=${value}></label>`;
    };
};

export let errorMsg = (errors) => {
    if (errors) {
        return html`<p class="error">${errors.message} </p>`
    } else {
        return null;
    }
};


