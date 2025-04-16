import type User from "../entities/User";

interface UserRepositoryPort {
  saveUser(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}

export default UserRepositoryPort;
