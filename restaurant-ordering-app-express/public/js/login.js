const loginForm = document.getElementById('login-form');



loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const formValues = Object.fromEntries(formData);
    const res = await fetch('/api/auth/login', {
         method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formValues)

    });

    if (!res.ok) {
        const obj = await res.json();
        const error = obj.error;
        console.error('Login Failed with error: ', error);
    } else {
        window.location.href = '/order.html';
    }
});
