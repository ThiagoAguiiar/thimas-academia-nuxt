import {
  getSolicitation,
  updateSolicitation,
} from "~/server/supabase/solicitation";
import { getUserByEmail, updateUser } from "~/server/supabase/user";
import handleResponse from "~/server/utils/response";

export default defineEventHandler(async (event) => {
  try {
    const { email, token } = getQuery(event);

    if (!email || !token) {
      return handleResponse({
        status: 400,
        msg: "Solicitação inválida",
        msgType: "ERROR",
      });
    }

    const solicitation = await getSolicitation(
      email.toString(),
      token.toString(),
    );

    if (!solicitation) {
      return handleResponse({
        status: 404,
        msg: "Solicitação não encontrada ou inválida",
        msgType: "ERROR",
      });
    }

    // Verificando se a data de expiração passou e se a solicitação não foi aceita
    if (solicitation.isValidate) {
      return handleResponse({
        status: 400,
        msg: "Este token já foi utilizado. Solicite um novo ou tente novamente",
        msgType: "WARNING",
      });
    }

    // Verificando se a data de expiração passou
    const timeStampToDate = new Date(solicitation.createdAt).getTime();
    const timeStampNow = new Date().getTime();

    if (timeStampToDate + 3600000 < timeStampNow) {
      return handleResponse({
        status: 400,
        msg: "Este token expirou. Solicite um novo ou tente novamente",
        msgType: "WARNING",
      });
    }

    // Sucesso! -> Atualiza a solicitação para validada e modifica o perfil do usuário
    const u = await getUserByEmail(email.toString());

    if (!u) {
      return handleResponse({
        status: 404,
        msg: "Token inválido",
        msgType: "ERROR",
      });
    }

    await updateUser({
      ...u,
      profileId: "d1f09fe2-5743-4a1d-b6af-d6898fce0195",
      newPassword: "",
    });

    await updateSolicitation({
      ...solicitation,
      isValidate: true,
    });

    return handleResponse({
      msg: "Solicitação validada com sucesso",
      msgType: "SUCCESS",
      status: 200,
    });
  } catch (err) {
    return handleResponse({
      status: 500,
      msg: "Erro ao verificar solicitação",
      msgType: "ERROR",
    });
  }
});
