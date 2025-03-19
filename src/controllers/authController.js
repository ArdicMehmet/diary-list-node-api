import {
  registerUser,
  loginUser,
  logoutUser,
  refreshTokenUser,
} from '../services/auth.js';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await registerUser(name, email, password);
    res.status(201).json(result);
  } catch (error) {
    console.error('🚨 Register sırasında hata:', error);
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.json(result);
  } catch (error) {
    console.error('🚨 Login sırasında hata:', error);
    res.status(401).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const result = await logoutUser(refreshToken);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const result = await refreshTokenUser(refreshToken);
    res.json(result);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};
