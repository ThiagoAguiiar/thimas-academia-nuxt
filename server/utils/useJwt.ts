import jwt from "jsonwebtoken";
import jwtDecode from "jwt-decode";

export const createJwt = (user: any, expires: number | string) => {
  const runtime = useRuntimeConfig();

  return jwt.sign({ user }, runtime.public.jwtSecret, {
    expiresIn: expires,
  });
};

export const decodeJwt = async <T>(token: string) => {
  return await jwtDecode<T>(token);
};

