import nodemailer from "nodemailer";
import crypto from "crypto";
import { PrismaClient } from "@prisma/client";
import PasswordResetTokenPort from "../../application/services/PasswordResetTokenPort";

const prisma = new PrismaClient();

class PasswordResetTokenAdapter implements PasswordResetTokenPort {
  generateResetToken(): string {
    return crypto.randomBytes(32).toString("hex");
  }

  async verifyResetToken(token: string): Promise<boolean> {
    const resetRequest = await prisma.passwordReset.findUnique({
      where: { token },
    });
    if (!resetRequest) return false;

    return resetRequest.expiresAt > new Date();
  }

  async sendResetPasswordEmail(email: string): Promise<void> {
    const token = this.generateResetToken();
    const expiresAt = new Date(Date.now() + 3600000); // 1 hora

    // Guardar el token en la tabla passwordReset
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

    const resetLink = `http://localhost:3000/reset-password?token=${token}`; // ajusta a tu frontend

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
}

export default PasswordResetTokenAdapter;
