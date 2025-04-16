import nodemailer from "nodemailer";
import crypto from "crypto";
import { PrismaClient } from "@prisma/client";
import PasswordResetTokenPort from "../../application/services/PasswordResetTokenPort";

/**
 * PasswordResetTokenAdapter is a class that implements the PasswordResetTokenPort interface.
 */
const prisma = new PrismaClient();

/**
 * This class is responsible for generating, verifying, sending, and deleting password reset tokens.
 */
class PasswordResetTokenAdapter implements PasswordResetTokenPort {
  /**
   * Generates a random reset token using crypto.
   * @returns {string} The generated reset token.
   */
  generateResetToken(): string {
    return crypto.randomBytes(32).toString("hex");
  }

  /**
   * Verifies if the provided reset token is valid and not expired.
   * @param {string} token - The reset token to verify.
   * @returns {Promise<boolean>} - Returns true if the token is valid and not expired, otherwise false.
   */
  async verifyResetToken(token: string): Promise<boolean> {
    const resetRequest = await prisma.passwordReset.findUnique({
      where: { token },
    });
    if (!resetRequest) return false;

    return resetRequest.expiresAt > new Date();
  }

  /**
   * Sends a password reset email to the user with the provided email address.
   * @param {string} email - The email address of the user to send the reset link to.
   * @returns {Promise<void>} - Returns a promise that resolves when the email is sent.
   */
  async sendResetPasswordEmail(email: string): Promise<void> {
    const token = this.generateResetToken();
    const expiresAt = new Date(Date.now() + 3600000); // 1 hora

    await prisma.passwordReset.create({
      data: {
        email,
        token,
        expiresAt,
      },
    });

    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        }
      });

    /**
     * The reset link that the user will click to reset their password.
     */
    const resetLink = `http://localhost:3000/reset-password/${token}`;

    await transporter.sendMail({
      from: `"Habit Tracker" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Restablece tu contraseña",
      html: `
        <h2>Hola</h2>
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="${resetLink}">${resetLink}</a>
      `,
    });
  }

  /**
   * Deletes the password reset token from the database.
   * @param {string} token - The reset token to delete.
   * @returns {Promise<void>} - Returns a promise that resolves when the token is deleted.
   */
  async deleteResetToken(token: string): Promise<void> {
    await prisma.passwordReset.delete({
      where: { token },
    });
  }
}

export default PasswordResetTokenAdapter;
