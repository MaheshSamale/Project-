const API_URL = 'http://localhost:4000/users';

export async function login(email, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();
  if (result.error) throw new Error(result.error);
  return result.data;  // { token, user info }
}

export async function register(email, password,role) {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, role }),
  });

  const result = await response.json();
  if (result.error) throw new Error(result.error);
  return result.data;  
}


