import z from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  value: z.coerce.number().positive("Valor deve ser um número positivo"),
  birthday: z
    .string()
    .min(1, "Data de aniversário é obrigatória")
    .refine((val) => {
      const date = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      date.setHours(0, 0, 0, 0);

      if (isNaN(date.getTime())) return false;
      if (date.getTime() === today.getTime()) return false;
      if (date > today) return false;

      return true;
    }, "A data de aniversário deve ser anterior a hoje"),
  phone: z.number().min(1000000000, "Telefone é obrigatório"),
});