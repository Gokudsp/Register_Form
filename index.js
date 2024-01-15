const express = require('express');
const mongoose = require('mongoose');
const bodyParser =require('body-parser');
require('dotenv').config();
// Connect to MongoDB
mongoose.connect(process.env.DBURL,
{ useNewUrlParser: true, 
  useUnifiedTopology: true 
 
})

  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Create a user schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  Phone: Number
});

const User = mongoose.model('User', userSchema);

// Create Express app
const app = express();


// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));


// Handle form submission
app.post('/register', async (req, res) => {
  const { name, email, password,Phone } = req.body;

  try {
    // Create a new user
    const user = new User({ name, email, password,Phone });
    await user.save();
    res.send('Registration successful!');
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).send('An error occurred while registering the user.');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
