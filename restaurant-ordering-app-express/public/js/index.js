import { menuArray} from "../data.js";



const cart = {};
menuArray.forEach(function(item) {
    cart[item.id] = 0;
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
                    <i class="fa-solid fa-circle-plus" data-add="${id + 1}"></i>
                </div>`;
    }).join('');
    document.getElementById('food-options').innerHTML = htmlText;

}


renderFoodItems(menuArray);