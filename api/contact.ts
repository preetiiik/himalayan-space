// @ts-nocheck

import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    })
  }

  try {
    const {
      missionType,
      name,
      email,
      countryCode,
      phone,
      message,
    } = req.body || {}

    // Required fields
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be filled.',
      })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address.',
      })
    }

    // Phone validation
    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Phone number must contain 10 digits.',
      })
    }

    // Check email configuration
    if (
      !process.env.EMAIL_USER ||
      !process.env.EMAIL_PASSWORD ||
      !process.env.RECEIVER_EMAIL
    ) {
      console.error('Missing email environment variables.')

      return res.status(500).json({
        success: false,
        message: 'Email service is not configured.',
      })
    }

    // Gmail transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      replyTo: email,
      subject: `New Contact Inquiry from ${name}`,

      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 650px; margin: 0 auto; color: #222;">

          <h2 style="margin-bottom: 20px;">
            New Contact Inquiry
          </h2>

          ${
            missionType
              ? `<p><strong>Mission Type:</strong> ${missionType}</p>`
              : ''
          }

          <p>
            <strong>Name:</strong> ${name}
          </p>

          <p>
            <strong>Email:</strong> ${email}
          </p>

          <p>
            <strong>Phone:</strong> ${countryCode || ''} ${phone}
          </p>

          <p>
            <strong>Message:</strong>
          </p>

          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px;">
            ${message}
          </div>

          <hr style="margin-top: 25px;" />

          <p style="color: #777; font-size: 12px;">
            This message was submitted through the
            Himalayan Space contact form.
          </p>

        </div>
      `,
    })

    console.log('Himalayan Space contact email sent successfully.')

    return res.status(200).json({
      success: true,
      message: 'Your inquiry has been sent successfully.',
    })
  } catch (error) {
    console.error('Contact form error:', error)

    return res.status(500).json({
      success: false,
      message: 'Unable to send your inquiry. Please try again later.',
    })
  }
}