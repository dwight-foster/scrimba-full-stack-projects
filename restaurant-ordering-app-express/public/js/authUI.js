export async function checkAuth() {
  try {
    const res = await fetch('/api/auth/me');

    if (!res.ok) {
      console.warn('Unexpected response:', res.status);
      return false;
    } 
    
    const user = await res.json();
    if (!user.isLoggedIn) {
      return false;
    }
    return user.name;

  } catch (err) {
    console.log(err, 'Auth check failed');
    return false; 
  }
}

export function renderGreeting(name) {
  if (name) {
      document.getElementById('greeting').textContent = `Welcome, ${name}!`;
  } else {
    window.location.href = '/';
  }
}
