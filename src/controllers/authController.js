import {
  registerUser,
  loginUser,
  logoutUser,
  refreshTokenUser,
  addUserInfo,
} from '../services/auth.js';

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const result = await registerUser(name, email, password);

  if (!result.status) {
    return res
      .status(result.statusCode || 400)
      .json({ message: result.message });
  }

  res.status(201).json(result);
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await loginUser(email, password);

  if (result.error) {
    return res
      .status(result.statusCode || 401)
      .json({ message: result.message });
  }

  res.json(result);
};

export const addUserInfoController = async (req, res) => {
  const userInfo = req.body;
  const user = req.user;
  const result = await addUserInfo(user, userInfo);
  res.status(201).json({
    message: true,
    data: result,
  });
};
export const getUserController = async (req, res) => {
  const user = req.user;
  res.status(201).json({
    message: true,
    data: user,
  });
};
export const logout = async (req, res) => {
  const { refreshToken } = req.body;
  const result = await logoutUser(refreshToken);

  if (result.error) {
    return res
      .status(result.statusCode || 400)
      .json({ message: result.message });
  }

  res.json(result);
};

export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  const result = await refreshTokenUser(refreshToken);

  if (result.error) {
    return res
      .status(result.statusCode || 403)
      .json({ message: result.message });
  }

  res.json(result);
};
