import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../../components/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '../../components/ui/form'
import { Input } from '../../components/ui/input'
import { formSchema } from '../../validators/formSchema'
import { usePhoneValidation } from '@/hook/useValidationPhone'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'


export const Route = createFileRoute('/_FormSimulation/simulation')({
  component: Simulation,
})

export function Simulation() {
  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      value: Number(""),
      birthday: "",
      phone: Number(""),
    },
  })

  function onSubmit(values: {
    name: string
    value: number
    birthday: string
    phone: number
  }) {
    navigate({
      to: "/result",
      search: {
        name: values.name,
        value: String(values.value),
        birthday: values.birthday,
        phone: String(values.phone),
      },
    })
  }

  // const { data: isValidPhone, isFetching } = usePhoneValidation();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-lg space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qual seu name?</FormLabel>
                <FormControl>
                  <Input placeholder="ex: Guilherme Neves" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => {
              const { ref, onChange, onBlur, ...rest } = field
              const { refetch, data, error } = usePhoneValidation(field.value)

              return (
                <FormItem>
                  <FormLabel>Qual seu telefone?</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ex: (21) 98765-9087"
                      {...rest}
                      ref={ref}
                      onChange={onChange}
                      onBlur={async () => {
                        onBlur() // mantém blur do RHF
                        if (field.value) {
                          const { data } = await refetch()
                          if (!data?.valid) {
                            form.setError("phone", {
                              type: "manual",
                              message: "Telefone inválido",
                            })
                          } else {
                            form.clearErrors("phone")
                          }
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />


          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qual seu saldo?</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="ex: R$ 5.000,00"
                    min="0"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qual seu mês de aniversário?</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange} // conecta com RHF
                    value={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="01">Janeiro</SelectItem>
                      <SelectItem value="02">Fevereiro</SelectItem>
                      <SelectItem value="03">Março</SelectItem>
                      <SelectItem value="04">Abril</SelectItem>
                      <SelectItem value="05">Maio</SelectItem>
                      <SelectItem value="06">Junho</SelectItem>
                      <SelectItem value="07">Julho</SelectItem>
                      <SelectItem value="08">Agosto</SelectItem>
                      <SelectItem value="09">Setembro</SelectItem>
                      <SelectItem value="10">Outubro</SelectItem>
                      <SelectItem value="11">Novembro</SelectItem>
                      <SelectItem value="12">Dezembro</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg"
        >
          Ver Proposta
        </Button>
      </form>
    </Form>
  )
}