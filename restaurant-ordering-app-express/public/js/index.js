import { renderGreeting, checkAuth } from "./authUI.js";

const logoutBtn = document.getElementById('logout-btn');


async function init() {
    const name = await checkAuth();
    renderFoodItems();
    renderGreeting(name);
}

init();

logoutBtn.addEventListener('click', async () => {
    const res = await fetch('/api/auth/logout');
    if (!res.ok) {
        const obj = await res.json();
        console.error('Error Logging out: ', obj.error);
    } else {
        window.location.href = '/';
    }


})



async function renderFoodItems() {
    const res = await fetch('/api/food/all');
    const obj = await res.json();
    const { items } = obj;
    const htmlText = items.map(function (item) { 
        const {emoji, name, ingredients, price, id} = item;
        return `                <div class="food-item">
                    <h3 class="emoji">${emoji}</h3>
                    <div class="food-info">
                        <h3 class="food-name">${name}</h3>
                        <p class="food-description">${ingredients}</p>
                        <h3 class="food-price">${price}</h3>
                    </div>
                    <i class="fa-solid fa-circle-plus" data-add="${id}"></i>
                </div>`;
    }).join('');
    document.getElementById('food-options').innerHTML = htmlText;

}


