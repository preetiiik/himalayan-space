// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const nodemailer = require("nodemailer");

// dotenv.config();

// const app = express();

// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL || "http://localhost:5173",
//   })
// );

// app.use(express.json());

// app.post("/api/contact", async (req, res) => {
//   try {
//     const {
//       name,
//       email,
//       countryCode,
//       phone,
//       message,
//     } = req.body;

//     // Basic backend validation
//     if (!name || !email || !phone || !message) {
//       return res.status(400).json({
//         success: false,
//         message: "All required fields must be filled.",
//       });
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!emailRegex.test(email)) {
//       return res.status(400).json({
//         success: false,
//         message: "Please enter a valid email address.",
//       });
//     }

//     if (!/^\d{10}$/.test(phone)) {
//       return res.status(400).json({
//         success: false,
//         message: "Phone number must contain 10 digits.",
//       });
//     }

//     // Gmail transporter
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//     });

//     // Send inquiry to your business email
//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: process.env.RECEIVER_EMAIL,
//       replyTo: email,
//       subject: `New Contact Inquiry from ${name}`,

//       html: `
//         <div style="font-family: Arial, sans-serif; line-height: 1.6;">
//           <h2>New Contact Inquiry</h2>

//           <p>
//             <strong>Name:</strong> ${name}
//           </p>

//           <p>
//             <strong>Email:</strong> ${email}
//           </p>

//           <p>
//             <strong>Phone:</strong> ${countryCode} ${phone}
//           </p>

//           <p>
//             <strong>Message:</strong>
//           </p>

//           <p>${message}</p>

//           <hr />

//           <p>
//             This message was submitted through the
//             Himalayan Space contact form.
//           </p>
//         </div>
//       `,
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Your inquiry has been sent successfully.",
//     });
//   } catch (error) {
//     console.error("Contact form error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Unable to send your inquiry. Please try again later.",
//     });
//   }
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Backend running on port ${PORT}`);
// });

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);

app.use(express.json());

app.post("/api/contact", async (req, res) => {
  try {
    const {
      missionType,
      name,
      email,
      countryCode,
      phone,
      message,
    } = req.body;

    // Basic backend validation
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Phone number must contain 10 digits.",
      });
    }

    // Gmail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Send inquiry to your business email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      replyTo: email,
      subject: `New Contact Inquiry from ${name}`,

      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New Contact Inquiry</h2>

          <p>
            <strong>Name:</strong> ${name}
          </p>

          ${missionType ? `<p><strong>Mission Type:</strong> ${missionType}</p>` : ''}

          <p>
            <strong>Email:</strong> ${email}
          </p>

          <p>
            <strong>Phone:</strong> ${countryCode} ${phone}
          </p>

          <p>
            <strong>Message:</strong>
          </p>

          <p>${message}</p>

          <hr />

          <p>
            This message was submitted through the
            Himalayan Space contact form.
          </p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Your inquiry has been sent successfully.",
    });
  } catch (error) {
    console.error("Contact form error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to send your inquiry. Please try again later.",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});