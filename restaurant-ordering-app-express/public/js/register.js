const registerForm = document.getElementById('register-form');



registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(registerForm);
    const formValues = Object.fromEntries(formData);
    const res = await fetch('/api/auth/register', {
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
        window.location.href = '/';
        console.log('success');
    }
});
