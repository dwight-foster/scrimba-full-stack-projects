import { renderCart } from "./cart.js";

const checkoutForm = document.getElementById('checkout-form');
const blurOverlay = document.getElementById('blur-overlay');
const yourOrder = document.getElementById('your-order');

document.getElementById('order-btn').addEventListener('click', async function() {
    const res = await fetch('/api/cart/all');
    const obj = await res.json();
    const cartItems = obj.items;
    if (cartItems.length !== 0) {
        checkoutForm.style.display = 'block';
        blurOverlay.style.display = 'block';
    } 

});

document.getElementById('exit').addEventListener('click', function() {
    checkoutForm.style.display = 'none';
    blurOverlay.style.display = 'none';
})

checkoutForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const payForm = new FormData(checkoutForm);
    const name = payForm.get('name-input');
    checkoutForm.style.display = 'none';
    blurOverlay.style.display = 'none';
    yourOrder.style.display = 'none';
    document.getElementById('order-success').style.display = 'flex';
    document.getElementById('success-msg').innerText = `Thanks ${name}! Your order is on its way!`
});

document.getElementById('new-order').addEventListener('click', async function() {
    const res = await fetch('/api/cart/clear', {
            method: 'DELETE'
            });
    if (!res.ok) {
        const obj = await res.json();
        const { error } = obj;
        console.error("Error clearing the cart: ", error)
    }
    document.getElementById('order-success').style.display = 'none';
    yourOrder.style.display = 'block';
    renderCart();
});