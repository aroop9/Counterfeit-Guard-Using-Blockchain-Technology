const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware

const app = express();
const PORT = process.env.PORT || 9000;


mongoose.connect('mongodb+srv://prabhat123:Prabhat123@cluster0.0opvzup.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
});

// Define User schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  confirmPassword: String,
  email: String
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors()); // Enable CORS for all routes

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (user) {
      res.send({ success: true, message: 'Login successful' });
    } else {
      res.status(401).send({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send({ success: false, message: 'Server error' });
  }
});
// Signup route
app.post('/signup', async (req, res) => {
  const { username, password,confirmPassword,email } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).send({ success: false, message: 'Username already exists' });
    } else {
      const newUser = new User({ username, password,confirmPassword, email });
      await newUser.save();
      res.send({ success: true, message: 'Signup successful' });
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send({ success: false, message: 'Server error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});