const userService = require('../services/user.service');
const { generateToken } = require('../utils/jwt.utils');

exports.getUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

exports.login = (req, res) => {
  const { username } = req.body;
  const token = generateToken({ username });
  res.json({ token });
};
