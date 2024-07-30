import handleResponse from "~/server/utils/response";

export default defineEventHandler(async (event) => {
  const storage = useStorage("data");

  storage.removeItem("_k-thimas");
  deleteCookie(event, "_k-thimas");

  return handleResponse({
    msg: "Usuário desconectado com sucesso",
    msgType: "SUCCESS",
    status: 200,
  });
});
