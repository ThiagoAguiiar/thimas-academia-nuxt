import { getAllProfiles } from "~/server/supabase/profile";
import handleResponse from "~/server/utils/response";

export default defineEventHandler(async () => {
  try {
    const profile = await getAllProfiles();

    return handleResponse({
      data: profile,
      msg: "Lista de perfis retornada com sucesso",
      msgType: "SUCCESS",
      status: 200,
    });
  } catch (err) {
    return handleResponse({
      msg: "Erro ao buscar dados dos perfis",
      msgType: "ERROR",
      error: err,
      status: 500,
    });
  }
});
