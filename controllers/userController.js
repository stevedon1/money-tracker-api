const bcrypt = require('bcrypt');
const User = require('../models/User');

const createUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user
      const newUser = new User({
        name,
        email,
        password: hashedPassword
      });
  
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  }

//   login user
  const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
  
      res.json({ message: 'Login successful!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  }

  module.exports = { createUser, loginUser};