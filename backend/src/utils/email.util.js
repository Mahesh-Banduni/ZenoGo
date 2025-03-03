const nodemailer = require('nodemailer');
const crypto = require('crypto');

//Temporary in-memory storage for OTPs
global.otpStorage = {};

// Nodemailer configuration for SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // Replace with your SMTP server
  port: process.env.SMTP_PORT,  // Use 587 for STARTTLS or 465 for SSL/TLS
  secure: true,                // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER, // SMTP user
    pass: process.env.SMTP_PASS, // SMTP password
  },
});

// Generate a random 6-digit OTP
const generateOTP = () => crypto.randomInt(100000, 999999).toString();

// Function to send OTP via email and store it temporarily
const sendOTP = async (email) => {
  const otp = generateOTP();
  const expiryTime = Date.now() + 180 * 60 * 1000; // OTP valid for 10 minutes

  // Store OTP and expiry in memory
  global.otpStorage[email] = { otp, expiry: expiryTime };
  //console.log(global.otpStorage);

  // Email content
  const mailOptions = {
    from: '"Propertymela" <pgoyal_realestate@propertymela.in>', // Sender's email
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    //console.log(`OTP sent to ${email}`);
    return { success: true, message: 'OTP sent successfully.' };
  } catch (error) {
    //console.error('Error sending OTP:', error);
    return { success: false, message: 'Failed to send OTP.' };
  }
};

// Function to verify OTP
const verifyOTP = (email, userInputOtp) => {
  //console.log(global.otpStorage);
  const storedData = global.otpStorage[email];
  if (!storedData) {
    return { success: false, message: 'No OTP found for this email.' };
  }

  const { otp, expiry } = storedData;

  // Check for expiry
  if (Date.now() > expiry) {
    delete global.otpStorage[email]; // Clean up expired OTP
    return { success: false, message: 'OTP has expired.' };
  }

  // Validate OTP
  if (otp === userInputOtp) {
    delete global.otpStorage[email]; // OTP verified and cleared
    return { success: true, message: 'OTP verified successfully.' };
  }

  return { success: false, message: 'Invalid OTP.' };
};

// Function to send Contact Us inquiry email
const sendContactUsEmail = async (userDetails) => {
  const { fullName, email, phone, message } = userDetails;

  const mailOptions = {
    from: `"Contact Us Query" <pgoyal_realestate@propertymela.in>`,
    to: process.env.ADMIN_EMAIL, // Admin's email
    subject: `New Contact Us Inquiry from ${fullName}`,
    html: `
      <h2>Contact Us Inquiry</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    //ll.log('Contact Us inquiry email sent to admin.');
    return { success: true, message: 'Thankyou. Your message has been sent to our team. We will contact you soon.' };
  } catch (error) {
    //console.error('Error sending Contact Us inquiry email:', error);
    return { success: false, message: 'Failed to send inquiry.' };
  }
};

//module.exports = { sendOTP, verifyOTP };
module.exports ={sendContactUsEmail, sendOTP, verifyOTP};
