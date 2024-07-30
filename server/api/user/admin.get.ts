import { getUserByProfile } from "~/server/supabase/user";
import handleResponse from "~/server/utils/response";

export default defineEventHandler(async () => {
  try {
    const user = await getUserByProfile("administrator");

    return handleResponse({
      msg: "Lista de usuários retornada com sucesso",
      msgType: "SUCCESS",
      status: 200,
      data: user,
    });
  } catch (err) {
    return handleResponse({
      msg: "Erro ao buscar informações",
      msgType: "ERROR",
      status: 500,
      error: err,
    });
  }
});
