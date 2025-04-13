import User from "../../../domain/entities/User";
import type UserRepositoryPort from "../../../domain/repositories/UserRepositoryPort";
import { prisma } from "../prisma/Prisma";

/**
 * UserRepositoryAdapter is an implementation of UserRepositoryPort that uses Prisma to interact with the database.
 */
export class UserRepositoryAdapter implements UserRepositoryPort {
  /**
   * Saves a new user.
   * @param user The user to be saved.
   * @returns The saved user.
   */
  async saveUser(user: User): Promise<User> {
    const newUser = await prisma.usuario.create({
      data: {
        nombre: user.name,
        email: user.email,
        contrasena: user.password,
      },
    });
    return new User(
      newUser.nombre,
      newUser.email,
      newUser.contrasena,
      newUser.id,
    );
  }

  /**
   * Finds a user by email.
   * @param email The email of the user to be found.
   * @returns The found user or null if not found.
   */
  async findByEmail(email: string): Promise<User | null> {
    const userRecord = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!userRecord) return null;

    return new User(
      userRecord.nombre,
      userRecord.email,
      userRecord.contrasena,
      userRecord.id,
    );
  }

  /**
   * Finds a user by ID.
   * @param id The ID of the user to be found.
   * @returns The found user or null if not found.
   */
  async findById(id: string): Promise<User | null> {
    const userRecord = await prisma.usuario.findUnique({
      where: { id },
    });

    if (!userRecord) return null;

    return new User(userRecord.nombre, userRecord.email, userRecord.contrasena);
  }

  /**
   * Finds a user by reset token.
   * @param token The reset token of the user to be found.
   * @returns The found user or null if not found.
   */
  async findByResetToken(token: string): Promise<User | null> {
    const resetRequest = await prisma.passwordReset.findUnique({
      where: { token },
    });

    if (!resetRequest) return null;

    const userRecord = await prisma.usuario.findUnique({
      where: { email: resetRequest.email },
    });

    if (!userRecord) return null;

    return new User(
      userRecord.nombre,
      userRecord.email,
      userRecord.contrasena,
      userRecord.id,
    );
  }

  /**
   * Updates the password of a user.
   * @param email The email of the user whose password is to be updated.
   * @param password The new password.
   */
  async updatePassword(email: string, password: string): Promise<void> {
    await prisma.usuario.update({
      where: { email },
      data: { contrasena: password },
    });
  }
}
