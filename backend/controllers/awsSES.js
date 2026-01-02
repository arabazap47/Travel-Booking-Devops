import nodemailer from "nodemailer";

export const sendBookingEmail = async (email, booking) => {
  const transporter = nodemailer.createTransport({
    host: process.env.AWS_SES_SMTP_HOST,
    port: process.env.AWS_SES_SMTP_PORT,
    secure: false, // TLS
    auth: {
      user: process.env.AWS_SES_SMTP_USER,
      pass: process.env.AWS_SES_SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `Travel Booking <${process.env.SES_SENDER_EMAIL}>`,
    to: email,
    subject: "Booking Confirmed ✅",
    html: `
      <h2>Booking Confirmed 🎉</h2>
      <p><b>Booking ID:</b> ${booking._id}</p>
      <p><b>Hotel:</b> ${booking.hotelName}</p>
      <p><b>Guests:</b> ${booking.guests}</p>
      <br/>
      <p>Thanks for booking with us!</p>
    `,
  });
};
