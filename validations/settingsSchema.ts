import { z } from "zod";

export const profileFormSchema = z.object({
  name: z.string().min(3, "Digite um nome válido"),
  email: z.string().email("Digite um email válido"),
  phoneNumber: z.string().min(15, "Digite um telefone válido"),
  cpf: z.string().min(14, "Digite um CPF válido"),
});

export const invitePeopleSchema = z.object({
  email: z.string().email("Digite um email válido"),
  role: z.string().min(1, "Selecione uma opção válida"),
});
