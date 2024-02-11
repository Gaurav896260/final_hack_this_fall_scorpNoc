
// Import Axios
import axios from 'axios';
import { signup } from './controllers/authcontrollers';
// Function to extract data from the signup form
// Frontend (signupJS.js)
async function handleSignupFormSubmit() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
  
    // Validate password match
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  
    try {
      const response = await axios.post('/signup', { email, password });
      console.log('Signup response:', response.data);
      alert('Signup successful!');
      // Optionally, redirect the user or perform other actions based on the response
    } catch (error) {
      console.error('Error submitting signup form:', error);
      // Handle error appropriately
      alert('Signup failed. Please try again.');
    }
  }
  
  // Backend (authController.js)
  export async function signup(req, res) {
    try {
      let obj = req.body;
      let user = await userModel.create(obj);
      console.log("backend data:", user);
      res.json({
        message: "User signed up",
        data: user
      });
    } catch (error) {
      res.json({
        message: "Error occurred",
        error: error.message
      });
    }
  }
  // Add event listener for the signup button click
  const signupButton = document.querySelector('.button1');
  signupButton.addEventListener('click', handleSignupFormSubmit);
  













