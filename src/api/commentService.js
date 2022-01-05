import * as api from "./api.js";
import { addOwner, createPointer, endpoints } from "./data.js";

export function getCommentsByPlaceId(recipeId) {
    return api.get(endpoints.commentsByPlace(recipeId));
};

export function createComment(recipeId, comment) {
    comment.places = createPointer("Places", recipeId)
    addOwner(comment);
    return api.post(endpoints.comments, comment)
};

