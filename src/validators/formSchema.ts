
import z from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  value: z
    .string()
    .min(1, "Saldo é obrigatório")
    .refine((val) => {
      const digitsOnly = val.replace(/\D/g, "");
      return Number(digitsOnly) >= 1;
    }, { message: "Valor mínimo é 1" }),
  birthday: z
    .string()
    .min(1, "Data de aniversário é obrigatória")
    .refine((val) => {
      const date = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      date.setHours(0, 0, 0, 0);
      return !isNaN(date.getTime()) && date <= today;
    }, "A data de aniversário deve ser anterior a hoje"),
  phone: z
    .string()
    .min(1, "Telefone é obrigatório")
    .refine((val) => {

      const digitsOnly = val.replace(/\D/g, "");

      return digitsOnly.length === 13;
    }, {
      message: "Telefone inválido, preencha todos os dígitos",
    })
});
