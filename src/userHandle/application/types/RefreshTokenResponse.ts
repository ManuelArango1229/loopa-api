export type RefreshTokenWithUser = {
  token: string;
  expiresAt: Date;
  user: {
    id: string;
    nombre: string;
    email: string;
    fecha_creacion: Date;
  };
};
