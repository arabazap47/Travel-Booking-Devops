import nodemailer from "nodemailer";

export const sendBookingEmail = async (to, booking) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "email-smtp.ap-south-1.amazonaws.com", // Mumbai SES
      port: 587,
      secure: false,
      auth: {
        user: process.env.SES_EMAIL_USER, // ✅ match .env
        pass: process.env.SES_EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `Travel Booking <${process.env.SES_SENDER_EMAIL}>`,
      to,
      subject: "Booking Confirmed ✅",
      html: `
        <h2>Booking Confirmed 🎉</h2>
        <p><b>Hotel:</b> ${booking.hotel.name}</p>
        <p><b>Location:</b> ${booking.hotel.location}</p>
        <p><b>Check-in:</b> ${booking.checkin}</p>
        <p><b>Check-out:</b> ${booking.checkout}</p>
        <p><b>Guests:</b> ${booking.guests}</p>
        <p><b>Booking Ref:</b> ${booking.ref}</p>
        <p><b>Amount Paid:</b> ₹${booking.amount}</p>
        <br/>
        <p>Thanks for booking with us!</p>
      `,
    });

    console.log("✅ Booking email sent successfully");
console.log("📨 Message ID:", info.messageId);

  } catch (error) {
    console.error("❌ SES email error:", error);
    throw error; // important so controller knows it failed
  }
};
