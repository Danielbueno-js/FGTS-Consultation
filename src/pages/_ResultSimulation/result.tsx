import { createFileRoute } from '@tanstack/react-router'
import iconSvg from '@/assets/logoIcon.svg'
import { useFormStore } from '@/store/formStore';

export const Route = createFileRoute('/_ResultSimulation/result')({
  component: Result,
})

function Result() {

  const { name, fgtsValueWithdraw } = useFormStore();


  return (
    <div className="flex flex-col w-full max-w-2xl p-10 md:p-0">

      <div className="text-center">
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
              Olá, {name}!
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
      </div>
         <div className="flex flex-row justify-center items-center bg-white p-8 gap-14 rounded-2xl shadow-md w-full"> 
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm font-bold text-[#00908a]">
              Você pode receber até
            </p>
            <div className='flex flex-row gap-1'>
              <p className="text-4xl font-extrabold text-[#00908a]">
                R$ 
              </p>
              <p className="text-4xl font-extrabold text-[#00908a]">
                {fgtsValueWithdraw}
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-400">
            <p className='text-xs font-bold text-[#00908a]' >Esta simulação traz valores aproximados.</p>Para calcular o valor exato,  <p className='text-xs font-bold text-[#00908a]' >entre em contato com o<br/> Smile Co. e consulte seu saldo no app do FGTS.</p>
          </p>
        </div>
    </div>
  )
}
