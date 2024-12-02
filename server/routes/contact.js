import express from 'express';
import Contact from '../models/Contact.js';
import { sendEmail } from '../utils/email.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    
    // Send email notification with detailed formatting
    await sendEmail({
      to: process.env.ADMIN_EMAIL || 'irwrj@gmail.com',
      subject: 'New Contact Form Submission - Mohan Reddy Marriage Bureau',
      text: `
New Contact Form Submission

Name: ${req.body.name}
Age: ${req.body.age}
Place: ${req.body.place}
Looking for: ${req.body.lookingFor}
Mobile: ${req.body.mobile}

This message was sent from the contact form on your website.
      `,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">New Contact Form Submission</h2>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> ${req.body.name}</p>
            <p><strong>Age:</strong> ${req.body.age}</p>
            <p><strong>Place:</strong> ${req.body.place}</p>
            <p><strong>Looking for:</strong> ${req.body.lookingFor}</p>
            <p><strong>Mobile:</strong> ${req.body.mobile}</p>
          </div>
          <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
            This message was sent from the contact form on your website.
          </p>
        </div>
      `
    });

    res.status(201).json({ 
      success: true, 
      message: 'Contact form submitted successfully. We will contact you soon.' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(400).json({ 
      success: false, 
      error: 'Failed to submit contact form. Please try again.' 
    });
  }
});

export default router;