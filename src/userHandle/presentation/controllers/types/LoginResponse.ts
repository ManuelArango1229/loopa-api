export type LoginResponse = {
  accessToken: string;
  user: { id: string; name: string; email: string };
};
