import type RefreshTokenRepositoryPort from "../../../application/repositories/RefreshTokenRepositoryPort";
import type { RefreshTokenWithUser } from "../../../application/types/RefreshTokenResponse";

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
	async getRefreshToken(token: string): Promise<RefreshTokenWithUser | null> {
		const record = await prisma.refreshToken.findUnique({
			where: { token },
			include: { usuario: true },
		});

		if (!record) return null;

		return {
			token: record.token,
			expiresAt: record.expiresAt,
			user: {
				id: record.usuario.id,
				nombre: record.usuario.nombre,
				email: record.usuario.email,
				fecha_creacion: record.usuario.fecha_creacion,
			},
		};
	}

	async deleteRefreshToken(token: string): Promise<boolean> {
		try {
			await prisma.refreshToken.delete({
				where: { token },
			});
			return true;
		} catch (error: unknown) {
			if (
				typeof error === "object" &&
				error !== null &&
				"code" in error &&
				(error as { code?: string }).code === "P2025"
			) {
				return false;
			}

			throw error;
		}
	}
	async getRefreshTokenByUserId(
		id: string,
	): Promise<RefreshTokenWithUser | null> {
		const record = await prisma.refreshToken.findUnique({
			where: { usuarioId: id },
			include: { usuario: true },
		});

		if (!record) return null;

		return {
			token: record.token,
			expiresAt: record.expiresAt,
			user: {
				id: record.usuario.id,
				nombre: record.usuario.nombre,
				email: record.usuario.email,
				fecha_creacion: record.usuario.fecha_creacion,
			},
		};
	}
	async deleteRefreshTokenByUserId(id: string): Promise<boolean> {
		try {
			await prisma.refreshToken.delete({
				where: { usuarioId: id },
			});
			return true;
		} catch (error: unknown) {
			if (
				typeof error === "object" &&
				error !== null &&
				"code" in error &&
				(error as { code?: string }).code === "P2025"
			) {
				return false;
			}
			throw error;
		}
	}
}
