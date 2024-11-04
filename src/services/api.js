import axios from 'axios';

const API = axios.create({ baseURL: 'https://dear-diary-backend-ckgr.onrender.com/api' });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Auth
export const loginUser = async (userData) => {
  try {
    const response = await API.post('/auth/login', userData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await API.post('/auth/register', userData);
    return response;
  } catch (error) {
    throw error;
  }
};

// Diaries
export const getDiaries = () => API.get('/diaries');
export const createDiary = (diaryData) => API.post('/diaries/create', { ...diaryData });
export const updateDiary = (id, updatedData) => API.put(`/diaries/${id}`, { ...updatedData });
export const deleteDiary = (id) => API.delete(`/diaries/${id}`);
export const getDiary = (id) => API.get(`/diaries/${id}`);

// Email
export const sendEmail = (emailData) => API.post('/send-email', { ...emailData });
