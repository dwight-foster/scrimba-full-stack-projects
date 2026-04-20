import { menuArray} from "./data.js";

const cart = {};


function renderFoodItems(items) {
    const htmlText = items.map(function (item) { 
        const {emoji, name, ingredients, price, id} = item;
        return `                <div class="food-item">
                    <h3 class="emoji">${emoji}</h3>
                    <div class="food-info">
                        <h3 class="food-name">${name}</h3>
                        <p class="food-description">${ingredients.join()}</p>
                        <h3 class="food-price">${price}</h3>
                    </div>
                    <i class="fa-solid fa-circle-plus" data-add="${id}"></i>
                </div>`;
    }).join('');
    document.getElementById('food-options').innerHTML = htmlText;

}

function renderCart(cart, items) {
    const cartItems = items.filter(function (item) {
        return cart[item.id] > 0;
    });

    let totalPrice = 0;
    const htmlText = cartItems.map(function (item) {
        const {emoji, name, ingredients, price, id} = item;
        totalPrice += price * cart[id];
        return `    <div class="selected-food">
                        <div class="selected-food-left">
                            <h3 class="selected-name">${name}</h3>
                            <button class="remove-btn" data-remove="${id}">remove</button>
                        </div>
                        <h3 class="selected-price">$${price * cart[id]}</h3>
                    </div>
                    `;

    }).join();
    document.getElementById('cart').innerHTML = htmlText;
    document.getElementById('total-price').innerText = `$${totalPrice}`;
}

renderFoodItems(menuArray);