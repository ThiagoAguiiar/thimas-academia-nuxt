import { GoogleGenerativeAI } from "@google/generative-ai";
import handleResponse from "~/server/utils/response";
import { ICResponse, IIAResponse } from "~/types/data/response";

import formatDate from "~/utils/formatDate";

export default defineEventHandler(
  async (event): Promise<ICResponse<IIAResponse>> => {
    const runtime = useRuntimeConfig();

    const body = await readBody(event);

    if (!body.message) {
      return handleResponse({
        status: 400,
        msg: "O campo 'message' é obrigatório.",
        msgType: "ERROR",
      });
    }

    const genAI = new GoogleGenerativeAI(runtime.public.geminiAiAccessKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({ history: [] });

    const result = await chat.sendMessage(body.message);
    const response = result.response;

    const date = new Date();

    return handleResponse({
      data: { value: response.text(), createdAt: formatDate(date).string },
      status: 200,
      msg: "Sucesso",
      msgType: "SUCCESS",
    });
  },
);
