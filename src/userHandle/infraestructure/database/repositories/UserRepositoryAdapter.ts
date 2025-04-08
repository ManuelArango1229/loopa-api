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
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userRecord = await prisma.user.findUnique({
      where: { email },
    });

    if (!userRecord) return null;

    return new User(
      userRecord.name,
      userRecord.email,
      userRecord.password
    );
  }

  async findById(id: string): Promise<User | null> {
    const userRecord = await prisma.user.findUnique({
      where: { id },
    });

    if (!userRecord) return null;

    return new User(
      userRecord.name,
      userRecord.email,
      userRecord.password
    );
  }

}