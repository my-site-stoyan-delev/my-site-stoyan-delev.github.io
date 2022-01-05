let container = document.createElement('div');
container.id = 'notification';

let list = document.createElement('ul');
list.addEventListener("click", onClick);
container.appendChild(list);

document.body.appendChild(container);

export function notify(message) {
    let liItem = document.createElement('li');
    liItem.className = 'notification';
    liItem.textContent = message + " \u2716";
    list.appendChild(liItem);

    setTimeout(() => liItem.remove(), 3000);
};

function onClick(event) {
    if (event.target.tagName =='LI') {
        event.target.remove();
    };

};

//style for notification
/*
#notification {
    position: fixed;
    right: 20%;
    top: 80px;
}

.notification {
    list-style: none;
    background-color: rgb(255, 194, 194);
    box-shadow: 0 0 8px 8px rgba(0, 0, 0, 0.2), 12px 12px 20px 0 rgba(0, 0, 0, 0.19);
    padding: 16px 32px;
    border-radius: 8px;
    margin-bottom: 16px;
    cursor: pointer;
}
*/