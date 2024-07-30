import { getUserByEmail } from "~/server/supabase/user";
import handleResponse from "~/server/utils/response";
import { loginSchema } from "~/validations/authSchema";

enum Messages {
  REQUIRED = "Preencha os campos corretamente",
  NOTFOUND = "Email e/ou senha inválidos",
  SUCCESS = "Login realizado com sucesso",
  ERROR = "Erro ao realizar Login. Tente novamente mais tarde",
}

export default defineEventHandler(async (event) => {
  try {
    const { email, password } = await readBody(event);

    const { error } = loginSchema.safeParse({ email, password });

    if (error) {
      return handleResponse({
        status: 400,
        msgType: "ERROR",
        msg: Messages.ERROR,
      });
    }

    // Busca usuário pelo email
    const u = await getUserByEmail(email);

    if (!u) {
      return handleResponse({
        status: 404,
        msgType: "ERROR",
        msg: Messages.NOTFOUND,
      });
    }

    if (!comparePassword(u.password, password) || !u.active) {
      return handleResponse({
        status: 404,
        msgType: "ERROR",
        msg: Messages.NOTFOUND,
      });
    }

    const obj = {
      email: u.email,
      name: u.name,
      userId: u.userId,
      profileId: u.profileId,
      profileData: u.profiles,
      photo: u.photo,
    };

    const token = createJwt(obj, "8h");

    // Salvando o Jwt no navegador
    setCookie(event, "_k-thimas", token);

    // Salvando no storage Nitro
    const storage = useStorage("data");

    const storageData = JSON.stringify({
      token: token,
      createdAt: new Date().toISOString(),
    });

    storage.setItem("_k-thimas", storageData);

    return handleResponse({
      status: 200,
      msg: Messages.SUCCESS,
      msgType: "SUCCESS",
    });
  } catch (err) {
    console.log(err);

    return handleResponse({
      status: 404,
      error: err,
      msg: Messages.ERROR,
      msgType: "ERROR",
    });
  }
});
