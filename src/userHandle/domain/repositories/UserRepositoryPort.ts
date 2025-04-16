import type User from "../entities/User";

interface UserRepositoryPort {
  saveUser(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findByResetToken(token: string): Promise<User | null>;
  updatePassword(email: string, password: string): Promise<void>;
  updateUser(userId: string, data: Partial<User>): Promise<void>;
}

export default UserRepositoryPort;
