import { deleteUser } from "~/server/supabase/user";
import handleResponse from "~/server/utils/response";

export default defineEventHandler(async (event) => {
  try {
    const { userId } = await readBody(event);

    if (!userId) {
      return handleResponse({
        msg: "Usuário não encontrado",
        msgType: "WARNING",
        status: 404,
      });
    }

    await deleteUser(userId);

    return handleResponse({
      msg: "Usuário removido com sucesso",
      msgType: "SUCCESS",
      status: 200,
    });
  } catch (err) {
    return handleResponse({
      msg: "Erro ao remover usuário",
      msgType: "ERROR",
      error: err,
      status: 500,
    });
  }
});
