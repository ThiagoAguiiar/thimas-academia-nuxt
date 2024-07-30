import { IAuthDecodeToken, IStorageToken } from "~/types/data/auth";

// Verifica se o token é válido
export default async function useVerification(t1: string): Promise<boolean> {
  const t2 = await useStorage("data").getItem<IStorageToken>("_k-thimas");

  if (t2) {
    const d1 = await decodeJwt<IAuthDecodeToken>(t1);
    const d2 = await decodeJwt<IAuthDecodeToken>(t2.token);

    if (deepEqual(d1, d2)) {
      const createdAt = t2.createdAt;
      const expiresAt = d1.exp;

      const time = new Date(createdAt).getTime() + 8 * 60 * 60 * 1000;

      if (time < expiresAt * 1000) return false;

      return true;
    }

    return false;
  }

  return false;
}

function deepEqual(obj1: IAuthDecodeToken, obj2: IAuthDecodeToken) {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}
