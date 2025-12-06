const API_URL = 'http://localhost:4000/users';

// Candidate login
export async function userCandidateLogin(email, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();
  if (result.error) throw new Error(result.error);
  return result; // entire result { status, data, error }
}

// Candidate registration
export async function userCandidateRegister(name, email, password) {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  const result = await response.json();
  if (result.error) throw new Error(result.error);
  return result; // entire result { status, data, error }
}
