import { notify } from "../library/notify.js";
import { clearUserData, getUserData, setUserData } from "./util.js";

let hostname = "https://parseapi.back4app.com";

async function request(url, options) {
    try {
        let response = await fetch(hostname + url, options);

        if (response.ok == false) {
            let error = await response.json();
            throw {
                message: error.error,
                code: error.code
            };
        };

        return response.json();
    } catch (err) {
        notify(err.message);
        throw err;
    }
};

function createOptions(method = "GET", data) {
    let options = {
        method,
        headers: {
            "X-Parse-Application-Id": "pps7f6uE8mtKCMR25U1fnsTWV4VdudW70jf8XczT",
            "X-Parse-REST-API-Key": "2amNFjNl2hdwpp10VkqI51JsF8VxzOxkCDd25aLJ"
        }
    };

    let userData = getUserData();
    if (userData) {
        options.headers["X-Parse-Session-Token"] = userData.token;
    };

    if (data) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(data);
    }

    return options;
};

export async function get(url) {
    return request(url, createOptions());
};

export async function post(url, data) {
    return request(url, createOptions("POST", data));
};

export async function put(url, data) {
    return request(url, createOptions("PUT", data));
};

export async function del(url) {
    return request(url, createOptions("DELETE"));
};

export async function login(username, password) {
    let result = await post("/login", { username, password })

    let userData = {
        username: result.username,
        id: result.objectId,
        token: result.sessionToken
    };

    setUserData(userData);

    return result;
};

export async function register(username, email, password) {
    let result = await post("/users", { username, email, password })

    let userData = {
        username,
        id: result.objectId,
        token: result.sessionToken
    };

    setUserData(userData);

    return result;
};

export async function logout() {
    await post("/logout");
    clearUserData();
};


