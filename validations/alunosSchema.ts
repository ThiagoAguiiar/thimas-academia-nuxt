import { z } from "zod";

export const createAlunoSchema = z.object({
  name: z.string().min(3, "O campo Nome é obrigatório"),
  email: z.string().email("Preencha o campo com um email válido"),
  password: z.string().min(6, "A senha deve ter no mínimo 8 caracteres"),
  phoneNumber: z.string().min(12, "O campo Telefone é obrigatório"),
  cpf: z.string().min(14, "O campo CPF é obrigatório"),
  address: z.string().min(1, "O campo Endereço é obrigatório"),
  CEP: z.string().min(9, "O campo CEP é obrigatório"),
  city: z.string().min(1, "O campo Cidade é obrigatório"),
  state: z.string().min(1, "O campo Estado é obrigatório"),
  number: z.string().min(1, 'O campo Número é obrigatório'),	
});
