import axios from 'axios';

const API_BASE = 'http://localhost:4000/users/candidates';


export async function loginCandidate(email, password) {
  const res = await axios.post(`${API_BASE}/login`, { email, password });
  if (res.data.status !== 'success') throw new Error(res.data.error);
  return res.data.data;
}

export async function registerCandidate({
  full_name,
  email,
  password,
  profile_photo_url = "",
  phone_no = "",
  skills_json = [],
  education_json = [],
  experience_json = [],
  links_json = []
}) {
  const payload = {
    full_name,
    email,
    password,
    profile_photo_url,
    phone_no,
    skills_json: JSON.stringify(skills_json),
    education_json: JSON.stringify(education_json),
    experience_json: JSON.stringify(experience_json),
    links_json: JSON.stringify(links_json)
  };
  const res = await axios.post(`${API_BASE}/register`, payload);
  if (res.data.status !== 'success') throw new Error(res.data.error);
  return res.data.data;
}

export async function getCandidateProfile(token, user_id) {
  const res = await axios.get(`${API_BASE}/profile/`, { headers: { token, user_id } });
  if (res.data.status !== 'success') throw new Error(res.data.error);
  return res.data.data;
}

export async function updateCandidateProfile(profile, token, user_id) {
  const res = await axios.put(`${API_BASE}/profile`, profile, { headers: { token, user_id } });
  if (res.data.status !== 'success') throw new Error(res.data.error);
  return res.data.data;
}
