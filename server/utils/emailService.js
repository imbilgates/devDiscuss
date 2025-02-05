import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendEmail = async (to, subject, commenterName, commentText) => {

  // RESOLVING Dirname for ES module
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Correctly construct the relative path to the email template
  const templatePath = path.join(__dirname, "../templates/emailTemplate.html");

  let emailHtml;
  try {
    emailHtml = fs.readFileSync(templatePath, "utf-8");
  } catch (err) {
    console.error("Error loading email template:", err);
    return;
  }

  // Replace placeholders with actual data
  emailHtml = emailHtml
    .replace("{{ commenterName }}", commenterName)
    .replace("{{ commentText }}", commentText);

  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    html: emailHtml, // Use the HTML content
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
