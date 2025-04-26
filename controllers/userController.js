const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');


// register user
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
      
      // create token 
        const token = jwt.sign(
          { id: newUser._id }, 
          process.env.JWT_SECRET, 
          { expiresIn: '7d' } // (optional) token expires in 7 days
        );

      res.status(201).json({ message: 'User registered successfully!', token });
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
        
            // create token 
            const token = jwt.sign(
              { id: user._id }, 
              process.env.JWT_SECRET, 
              { expiresIn: '7d' } // (optional) token expires in 7 days
            );
            
      res.json({ message: 'Login successful!', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  }

  module.exports = { createUser, loginUser};