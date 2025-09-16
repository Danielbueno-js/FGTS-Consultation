import { createFileRoute, useNavigate } from '@tanstack/react-router'
import logo from '../logo.svg'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../components/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '../components/ui/form'
import { Input } from '../components/ui/input'

//? validação dos campos do formulário
export const formSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  valor: z.coerce.number().positive("Valor deve ser um número positivo"),
  aniversario: z
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
});

export const Route = createFileRoute('/')({
  component: FormSimulationPage,
})

function FormSimulationPage() {
  const navigate = useNavigate()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: '',
      valor: Number(''),
      aniversario: '',
    },
  })

  function onSubmit(values: { nome: string; valor: number; aniversario: string }) {
    navigate({
      to: '/result',
      search: {
        nome: values.nome,
        valor: String(values.valor),
        aniversario: values.aniversario,
      },
    })
  }

  return (
    <div className="bg-neutral-50 rounded-2xl w-full h-full text-center flex flex-col items-center justify-center min-h-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white p-6 rounded shadow-md w-full max-w-sm space-y-4"
        >
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Digite seu nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="valor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Digite o valor"
                    min="0"
                    step="any"
                    {...field}
                    onChange={e => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="aniversario"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de aniversário</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Ver simulação
          </Button>
        </form>
      </Form>
    </div>
  )
}