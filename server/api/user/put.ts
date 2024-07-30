import { getUserByEmail, updateUser } from "~/server/supabase/user";
import handleResponse from "~/server/utils/response";
import { profileFormSchema } from "~/validations/settingsSchema";

export default defineEventHandler(async (event) => {
  try {
    const data = await readBody(event);

    const { error } = profileFormSchema.safeParse(data);

    let hash = "";

    if (error) {
      return handleResponse({
        msg: "Preencha os campos corretamente",
        msgType: "WARNING",
        status: 400,
      });
    }

    if (!!data.password.length !== !!data.newPassword.length) {
      return handleResponse({
        msg: "É necessário preencher a senha atual e a nova senha para atualizá-la",
        msgType: "WARNING",
        status: 400,
      });
    }

    const u = await getUserByEmail(data.email);

    if (!u) {
      return handleResponse({
        msg: "Usuário não encontrado",
        msgType: "WARNING",
        status: 400,
      });
    }

    if (!!u.password.length && !!data.password.length) {
      if (!comparePassword(u.password, data.password)) {
        return handleResponse({
          msg: "Senha atual informada está incorreta",
          msgType: "WARNING",
          status: 400,
        });
      }

      hash = hashPassword(data.newPassword);
    }

    const user = await updateUser({
      cpf: data.cpf,
      email: data.email,
      name: data.name,
      phoneNumber: data.phoneNumber,
      password: data.password,
      newPassword: hash,
      photo: data.photo,
      profileId: data.profileId,
      userId: data.userId,
    });

    return handleResponse({
      data: user,
      msg: "Usuário atualizado com sucesso",
      msgType: "SUCCESS",
      status: 200,
    });
  } catch (err) {
    return handleResponse({
      msg: "Erro ao atualizar dados do usuário",
      msgType: "ERROR",
      error: err,
      status: 500,
    });
  }
});
