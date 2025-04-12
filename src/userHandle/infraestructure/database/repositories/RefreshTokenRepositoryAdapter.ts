import type RefreshTokenRepositoryPort from "../../../application/repositories/RefreshTokenRepositoryPort";

import { prisma } from "../prisma/Prisma";
export class RefreshTokenRepositoryAdapter
  implements RefreshTokenRepositoryPort
{
  async saveRefreshToken(userId: string, token: string): Promise<void> {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 365);
    await prisma.refreshToken.create({
      data: {
        token: token,
        expiresAt: expiresAt,
        usuario: {
          connect: { id: userId },
        },
      },
    });
  }

  getRefreshToken(token: string): Promise<string | null> {
    throw new Error("Method not implemented.");
  }
  deleteRefreshToken(token: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
