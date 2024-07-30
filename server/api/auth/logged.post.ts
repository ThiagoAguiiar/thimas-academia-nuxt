import handleResponse from "~/server/utils/response";
import useVerification from "~/server/utils/useVerification";
import { Status } from "~/types/data/response";

enum Messages {
  NOTFOUND = "Token Jwt não encontrado",
  EXPIRED = "Token expirado",
  ERROR = "Não foi possível verificar o token",
  SUCCESS = "Autenticação bem sucedidad",
}

export default eventHandler(async (event) => {
  const { token } = await readBody(event);

  if (!token) {
    return handleResponse({
      data: false,
      msg: Messages.NOTFOUND,
      msgType: "WARNING",
      status: Status.NOTFOUND,
    });
  }

  try {
    const isValid = await useVerification(token);
    const storage = useStorage("data");

    if (isValid) {
      return handleResponse({
        data: true,
        msg: Messages.SUCCESS,
        msgType: "SUCCESS",
        status: Status.SUCCESS,
      });
    }

    await storage.removeItem("_k-thimas");

    return handleResponse({
      data: false,
      msg: Messages.NOTFOUND,
      msgType: "DEFAULT",
      status: Status.NOTFOUND,
    });
  } catch (err) {
    handleResponse({
      data: false,
      error: err,
      msg: Messages.ERROR,
      msgType: "ERROR",
      status: Status.NOTFOUND,
    });
  }
});
