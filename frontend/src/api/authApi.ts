import api from '../utils/api';

// Login user
export const loginUser = async (email: string, password: string) => {
  const response = await api.post('/users/login', { email, password });
  return response.data;
};

// Get current user profile
export const getUserProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

// Update user profile
export const updateUserProfile = async (userData: {
  name?: string;
  email?: string;
  password?: string;
}) => {
  const response = await api.put('/users/profile', userData);
  return response.data;
};

// Register new user (admin only)
export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => {
  const response = await api.post('/users', userData);
  return response.data;
};

// Get all users (admin only)
export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

// Delete user (admin only)
export const deleteUser = async (userId: string) => {
  const response = await api.delete(`/users/${userId}`);
  return response.data;
};