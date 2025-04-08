import User from "../../../domain/entities/User";
import UserRepositoryPort from "../../../domain/repositories/UserRepositoryPort";
import { prisma } from "../prisma/Prisma";

export class UserRepositoryAdapter implements UserRepositoryPort {

  /**
   * Saves a new user.
   * @param user The user to be saved.
   * @returns The saved user.
   */
  async saveUser(user: User): Promise<User> {
    await prisma.usuario.create({
      data: {
        nombre: user.name,
        email: user.email,
        contrasena: user.password,
      },
    });
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userRecord = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!userRecord) return null;

    return new User(
      userRecord.nombre,
      userRecord.email,
      userRecord.contrasena
    );
  }

  async findById(id: string): Promise<User | null> {
    const userRecord = await prisma.usuario.findUnique({
      where: { id },
    });

    if (!userRecord) return null;

    return new User(
      userRecord.nombre,
      userRecord.email,
      userRecord.contrasena
    );
  }

}