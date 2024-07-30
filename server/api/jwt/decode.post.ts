import handleResponse from "~/server/utils/response";
import { IAuthDecodeToken } from "~/types/data/auth";

export default defineEventHandler(async (event) => {
  try {
    const { token } = await readBody(event);

    if (token) {
      return handleResponse({
        msg: "Token decodificado com sucesso!",
        msgType: "SUCCESS",
        data: { ...(await decodeJwt<IAuthDecodeToken>(token)) },
        status: 200,
      });
    }

    return handleResponse({
      msg: "Token inválido",
      msgType: "ERROR",
      status: 404,
    });
  } catch (err) {
    return handleResponse({
      msg: "Token inválido",
      msgType: "ERROR",
      status: 500,
    });
  }
});
