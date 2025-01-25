const AuthService = require('./auth.service');

exports.register = async (req, res) => {
  try {
    const user = await AuthService.register(req.body);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await AuthService.login(email, password);
    res.status(200).json({ message: 'Login successful', user, token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await AuthService.getProfile(req.user.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
