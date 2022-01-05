import { render } from "../library.js";
import { getUserData } from "../util.js";





export default function initialize() {

    let root = document.querySelector("main");
    updateUserNav();

    return function (ctx, next) {
        ctx.render = boundRender;
        ctx.updateUserNav = updateUserNav;

        next();
    };

    function updateUserNav() {
        let userData = getUserData();

        if (userData) {
            document.getElementById("user").style.display = "inline-block";
            document.getElementById("guest").style.display = "none";
            document.getElementById("welcomeMsg").textContent =`Welcome, ${userData.username}!`
        } else {
            document.getElementById("user").style.display = "none";
            document.getElementById("guest").style.display = "inline-block";
        
        };
    }

    function boundRender(content) {
        render(content, root);
    };

};

