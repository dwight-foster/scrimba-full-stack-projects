import { menuArray} from "./data.js";

const checkoutForm = document.getElementById('checkout-form');
const cart = {};
menuArray.forEach(function(item) {
    cart[item.id] = 0;
});

document.addEventListener('click', function(e) {
    switch(e.target.dataset.add) {
        case "0":
            cart[0] += 1; 
            renderCart(cart, menuArray);
            break;
        case "1":
            cart[1] += 1;
            renderCart(cart, menuArray);
            break;
        case "2":
            cart[2] += 1;
            renderCart(cart, menuArray);
            break;
    }
    switch(e.target.dataset.remove) {
        case "0":
            cart[0] = 0; 
            renderCart(cart, menuArray);
            break;
        case "1":
            cart[1] = 0;
            renderCart(cart, menuArray);
            break;
        case "2":
            cart[2] = 0;
            renderCart(cart, menuArray);
            break;
    }
    
});

document.getElementById('order-btn').addEventListener('click', function() {
    if (cart[0] !== 0 || cart[1] !== 0 || cart[2] !== 0) {
        checkoutForm.style.display = 'block';
        document.getElementById('blur-overlay').style.display = 'block';
    } 

});


checkoutForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const payForm = new FormData(checkoutForm);
    const name = payForm.get('name-input');
    checkoutForm.style.display = 'none';
    document.getElementById('blur-overlay').style.display = 'none';
    document.getElementById('your-order').style.display = 'none';
    document.getElementById('order-success').style.display = 'flex';
    document.getElementById('success-msg').innerText = `Thanks ${name}! Your order is on its way!`
});

document.getElementById('new-order').addEventListener('click', function() {
    menuArray.forEach(function(item) {
            cart[item.id] = 0;
    });
    document.getElementById('order-success').style.display = 'none';
    document.getElementById('your-order').style.display = 'block';
    renderCart(cart, menuArray);
});


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
        return `  <div class='selected-food-container'>
                        <div class="selected-food-left">
                            <h3 class="selected-name">${name}</h3>
                            <button class="remove-btn" data-remove="${id}">remove</button>
                        </div>
                        <div class='selected-food-right'>
                            <div class="item-amount">
                                <i class="fa-solid fa-plus add-item"></i>
                                <h3 class="item-amount-number">${cart[id]}</h3>
                            </div>
                            <h3 class="selected-price">$${price * cart[id]}</h3>
                        </div>
                    </div>
                    `;

    }).join('');
    document.getElementById('selected-food').innerHTML = htmlText;
    document.getElementById('total-price').innerText = `$${totalPrice}`;
}

renderFoodItems(menuArray);