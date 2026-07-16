document.addEventListener('click', async function(e) {
    if(e.target.dataset.add) {
        const res = await fetch('/api/cart/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ foodId: e.target.dataset.add })
        })

        if (!res.ok) {
            const obj = await res.json();
            const { error } = obj;
            console.error("Operation failed: add ", error);
        }
        renderCart()
    }
    if(e.target.dataset.remove) {
        const res = await fetch('/api/cart/remove', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ foodId: e.target.dataset.remove })
        })

        if (!res.ok) {
            const obj = await res.json();
            const { error } = obj;
            console.error("Operation failed: remove ", error);
        }
        renderCart()
    }
    if(e.target.dataset.subtract) {
        const res = await fetch('/api/cart/subtract', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ foodId: e.target.dataset.subtract })
        })

        if (!res.ok) {
            const obj = await res.json();
            const { error } = obj;
            console.error("Operation failed: subtract ", error);
        }
        renderCart()
    }
    
});


export async function renderCart() {
    const res = await fetch('/api/cart/all');
    const obj = await res.json();
    const cartItems = obj.items;

    let totalPrice = 0;
    const htmlText = cartItems.map(function (item) {
        const {id, name, quantity, total_amnt} = item;
        totalPrice += total_amnt;
        return `  <div class='selected-food-container'>
                        <div class="selected-food-left">
                            <h3 class="selected-name">${name}</h3>
                            <button class="remove-btn" data-remove="${id}">remove</button>
                        </div>
                        <div class='selected-food-right'>
                            <div class="item-amount">
                                <i class="fa-solid fa-plus add-item" data-add="${id}"></i>
                                <h3 class="item-amount-number">${quantity}</h3>
                                <i class="fa-solid fa-minus subtract-item" data-subtract="${id}"></i>
                            </div>
                            <h3 class="selected-price">$${total_amnt}</h3>
                        </div>
                    </div>
                    `;

    }).join('');
    document.getElementById('selected-food').innerHTML = htmlText;
    document.getElementById('total-price').innerText = `$${totalPrice}`;
}

renderCart();