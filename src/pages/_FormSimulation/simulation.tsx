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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import iconSvg from '@/assets/logoIcon.svg'
import { useFormStore } from '@/store/formStore'
import { calcularSaqueAniversario } from '@/utils/FGTSCalculator'

export const Route = createFileRoute('/_FormSimulation/simulation')({
  component: Simulation,
})

export function Simulation() {
  const navigate = useNavigate()

  const setName = useFormStore((state) => state.setName);
  const setPhone = useFormStore((state) => state.setPhone);
  const setBirthday = useFormStore((state) => state.setBirthday);
  const setFgtsValueWithDraw = useFormStore((state) => state.setFgtsValueWithdraw);


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      value: "",
      birthday: "",
      phone: "",
    },
  })


  function onSubmit(values: {
    name: string;
    value: string;
    birthday: string;
    phone: string;
  }) {


    const normalizedPhone = values.phone.replace(/\s/g, "");

    const saldoAtual = Number(values.value.toString().replace(/\D/g, ""));

    const resultado = calcularSaqueAniversario(saldoAtual);

    setName(values.name);
    setPhone(normalizedPhone);
    setBirthday(values.birthday);
    setFgtsValueWithDraw(resultado.valorLiberado.toString());

    navigate({
      to: "/result",
      search: {
        name: values.name,
        value: resultado.valorLiberado.toString(),
        birthday: values.birthday,
        phone: normalizedPhone, //? usa telefone de forma que a API aceite
      },
    });
  }


  return (
    <div className="flex flex-col w-full max-w-2xl p-10 md:p-0">
      <div className="flex items-center flex-col sm:flex-row sm:justify-center gap-8 mb-6">
        <div className='flex flex-col items-end '>
          <h1 className="flex flex-col italic text-4xl font-bold gap-2 text-white">
            <div className='flex flex-row gap-2'>
              <img
                src={iconSvg}
                className="w-5 h-5 filter brightness-0 invert"
              />
              <p className="font-extrabold text-sm text-white/80">SMILE Co.</p>
            </div>
            Use uma grana<br />que já é sua e<br /> saia do aperto.
          </h1>
        </div>

        <div className='flex flex-row items-end gap-2'>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col items-center gap-3">
              <div className="mt-1 flex items-center justify-center w-4 h-4 border-2 border-[#00908a]">
                <span className="text-[#00908a] text-sm font-bold">$</span>
              </div>
              <div className="h-full w-[1px] mt-2 mb-1 bg-[#00908a] rounded-md" />
            </div>

            <div className="flex flex-col items-start gap-3">
              <p className="font-extrabold text-white/80">Saque Aniversário</p>
              <p className="text-white/80">
                <span className="font-extrabold">insira seus dados</span> verefique o<br /> quanto voce poderá receber!
              </p>
            </div>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col bg-white p-8 gap-4 rounded-2xl shadow-md w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="min-h-[80px] pb-2">
                  <FormLabel className="font-semibold text-gray-700 text-sm">Qual seu nome?</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="ex: Guilherme Neves"
                      className="h-11 border-gray-300 focus:border-blue-500 text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-bold" />
                </FormItem>

              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => {
                return (
                  <FormItem className="min-h-[80px] pb-2">
                    <FormLabel className="font-semibold text-gray-700 text-sm">Qual seu telefone?</FormLabel>
                    <FormControl>
                      <Input
                        id="phone"
                        mask="+ 55 (00) 00000-0000"
                        placeholder="ex: + 55 (21) 98765-9087"
                        className="h-11 border-gray-300 focus:border-blue-500 text-sm"
                        {...field}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage className="text-xs font-bold" />
                  </FormItem>
                )
              }}
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem className="min-h-[80px] pb-2 ">
                  <FormLabel className="font-semibold text-gray-700 text-sm">Qual seu saldo?</FormLabel>
                  <FormControl>
                    <Input
                      id="value"
                      mask="R$ 00.000,00"
                      placeholder="ex: R$ 5.000,00"
                      className="h-11 border-gray-300 focus:border-blue-500 text-sm"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-bold" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birthday"
              render={({ field }) => (
                <FormItem className="min-h-[80px] pb-2">
                  <FormLabel className="font-semibold text-gray-700 text-sm">Qual seu mês de aniversário?</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger className="h-11 w-full border-gray-300 focus:border-blue-500 text-sm">
                        <SelectValue placeholder="Selecione..." id="birthday"/>
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
                  <FormMessage className="text-xs font-bold" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-center pt-2">
            <Button
              type="submit"
              className="cursor-pointer h-12 w-auto rounded-sm bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-8 text-sm transition-colors"
            >
              Ver Proposta
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}