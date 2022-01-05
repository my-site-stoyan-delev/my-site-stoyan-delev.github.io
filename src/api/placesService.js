import * as api from "./api.js";
import { addOwner, endpoints } from "./data.js";

export async function getRecentPlaces() {
    return api.get(endpoints.recent)
};

export async function getPlaces(page, query) {
    if (query) {
        query = {
            name: {
                $text: {
                    $search: {
                        $term: query,
                        $caseSensitive: false
                    }
                }
            }
        }
        return api.get(endpoints.placesSearch(page, query))
    } else {
        return api.get(endpoints.places(page))
    }

};

export async function getPlaceById(id) {
    return api.get(endpoints.placeDetails(id))
};

export async function createPlace(recipe) {
    addOwner(recipe);
    return api.post(endpoints.createPlace, recipe)
};

export async function updatePlace(id, recipe) {
    return api.put(endpoints.placeById + id, recipe)
};

export async function deletePlace(id) {
    return api.del(endpoints.placeById + id)
};




