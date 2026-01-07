import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "email-smtp.ap-south-1.amazonaws.com", // MUMBAI
  port: 587,
  secure: false,
  auth: {
    user: process.env.SES_EMAIL_USER,
    pass: process.env.SES_EMAIL_PASS,
  },
});

// export const sendBookingEmail = async (to, booking) => {
//   await transporter.sendMail({
//     from: "Travel Booking <arabazpinjar@gmail.com>",
//     to,
//     subject: "Hotel Booking Confirmation 🎉",
//     html: `
//       <h2>Your booking is confirmed!</h2>
//       <p><b>Hotel:</b> ${booking.hotel.name}</p>
//       <p><b>Location:</b> ${booking.hotel.location}</p>
//       <p><b>Check-in:</b> ${booking.checkin}</p>
//       <p><b>Check-out:</b> ${booking.checkout}</p>
//       <p><b>Guests:</b> ${booking.guests}</p>
//       <p><b>Booking ID:</b> ${booking.ref}</p>
//       <br/>
//       <p>Thank you for booking with us 😊</p>
//     `,
//   });
// };
export const sendBookingEmail = async (to, booking) => {
  try {
    console.log("📧 Sending email to:", to);

    const info = await transporter.sendMail({
      from: "Travel Booking <arabazpinjar@gmail.com>",
      to,
      subject: "Hotel Booking Confirmation 🎉",
      html: `<h2>Booking confirmed</h2>`,
    });

    console.log("✅ Email sent:", info.messageId);
  } catch (err) {
    console.error("❌ Email error:", err);
    throw err;
  }
};

