import { html, until, render } from "../api/library.js";
import { spinner } from "./common.js";
import { createComment, getCommentsByPlaceId } from "../api/commentService.js";
import { createSubmitHandler } from "../api/util.js";


let commentsTemplate = (commentsPromise, hasUser, active, onToggle, onSubmit) => html`

    <div class="section-title">Comments</div>
    
    ${hasUser ? commentForm(active, onToggle, onSubmit) : null}
    
    <div class="comments">
        <ul>
            ${until(commentsPromise, spinner())}
        </ul>
    </div>`;

let commentForm = (active, onToggle, onSubmit) => {
    if (active) {
        return html`
        <article class="new-comment">
            <h2>New comment</h2>
            <form @submit=${onSubmit} id="commentForm">
                <textarea name="content" placeholder="Type comment"></textarea>
                <input type="submit" value="Add comment">
            </form>
        </article>`;
    } else {
        return html`
        <article class="new-comment">
            <form><button @click=${onToggle} class="button">Add comment</button></form>
        </article>
`;
    }
}

let commentCard = (comment) => html`
<li class="comment">
    <header>${comment.owner.username}<span class="comment-date">${(new Date(comment.createdAt)).toLocaleString()}</span>
    </header>
    <p>${comment.content}</p>
</li>`;


export function commentsView(ctx, recipeId) {
    let parent = document.getElementById("comments-container");
    let commentsPromise = getCommentsByPlaceId(recipeId);

    update();

    function update(active = false) {
        let result = commentsTemplate(loadComments(commentsPromise), ctx.user, active,
            onToggle, createSubmitHandler(onSubmit, "content"));

        render(result, parent)
    };

    function onToggle(event) {
        event.preventDefault();
        update(true);
    };

    // function onToggle() {
    //     update(true);
    // };

    async function onSubmit({ content }) {
        if (content == "") {
            return;
        };

        let result = await createComment(recipeId, { content })
        result.owner = { username: ctx.user.username }
        result.content = content;

        (await commentsPromise).results.unshift(result);
        update();

    };
};

async function loadComments(commentsPromise) {
    let { results: comments } = await commentsPromise;

    return comments.map(commentCard)
};
