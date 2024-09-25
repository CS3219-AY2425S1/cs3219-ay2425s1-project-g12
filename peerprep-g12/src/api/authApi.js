// src/api/authApi.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/auth'; // Replace with your backend API base URL

// Login API function
export async function login(email, password) {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // Contains accessToken and user data
  } catch (error) {
    console.error('Login error:', error);
    throw error.response.data || { message: 'Login failed' };
  }
}

// Verify Token API function
export async function verifyToken(token) {
  try {
    const response = await axios.get(`${API_URL}/verify-token`, {
      headers: {
        Authorization: `Bearer ${token}`, // Send token as Bearer token
      },
    });
    return response.data;
  } catch (error) {
    console.error('Token verification error:', error);
    throw error.response.data || { message: 'Token verification failed' };
  }
}