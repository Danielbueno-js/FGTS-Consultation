// utils/fgts-calculator.ts

/**
 * Resultado do cálculo de saque-aniversário do FGTS
 * @interface ResultadoCalculoFGTS
 */
export interface ResultadoCalculoFGTS {
  saldoTotal: number
  valorLiberado: number
  percentualUtilizado: number
  bonusAdicional: number
  faixaAplicada: string
}

/**
 * Calcula o valor disponível para saque-aniversário do FGTS
 * conforme as regras oficiais do governo
 * 
 * @param saldoAtual - Saldo total disponível na conta FGTS
 * @returns Objeto com detalhes do cálculo e valor liberado
 */
export function calcularSaqueAniversario(saldoAtual: number): ResultadoCalculoFGTS {
  let valorSaque = 0
  let percentual = 0
  let adicional = 0
  let faixaDescricao = ''

  // Define as faixas e regras de cálculo
  if (saldoAtual <= 500) {
    // Faixa 1: Até R$ 500
    percentual = 0.5
    valorSaque = saldoAtual * percentual
    faixaDescricao = 'Até R$ 500,00'
  } 
  else if (saldoAtual > 500 && saldoAtual <= 1000) {
    // Faixa 2: R$ 500,01 até R$ 1.000
    percentual = 0.4
    adicional = 50
    valorSaque = (saldoAtual * percentual) + adicional
    faixaDescricao = 'R$ 500,01 a R$ 1.000,00'
  } 
  else if (saldoAtual > 1000 && saldoAtual <= 5000) {
    // Faixa 3: R$ 1.000,01 até R$ 5.000
    percentual = 0.3
    adicional = 150
    valorSaque = (saldoAtual * percentual) + adicional
    faixaDescricao = 'R$ 1.000,01 a R$ 5.000,00'
  } 
  else if (saldoAtual > 5000 && saldoAtual <= 10000) {
    // Faixa 4: R$ 5.000,01 até R$ 10.000
    percentual = 0.2
    adicional = 650
    valorSaque = (saldoAtual * percentual) + adicional
    faixaDescricao = 'R$ 5.000,01 a R$ 10.000,00'
  } 
  else if (saldoAtual > 10000 && saldoAtual <= 15000) {
    // Faixa 5: R$ 10.000,01 até R$ 15.000
    percentual = 0.15
    adicional = 1150
    valorSaque = (saldoAtual * percentual) + adicional
    faixaDescricao = 'R$ 10.000,01 a R$ 15.000,00'
  } 
  else if (saldoAtual > 15000 && saldoAtual <= 20000) {
    // Faixa 6: R$ 15.000,01 até R$ 20.000
    percentual = 0.1
    adicional = 1900
    valorSaque = (saldoAtual * percentual) + adicional
    faixaDescricao = 'R$ 15.000,01 a R$ 20.000,00'
  } 
  else {
    // Faixa 7: Acima de R$ 20.000,01
    percentual = 0.05
    adicional = 2900
    valorSaque = (saldoAtual * percentual) + adicional
    faixaDescricao = 'Acima de R$ 20.000,01'
  }

  // Garante que não ultrapasse o saldo total
  if (valorSaque > saldoAtual) {
    valorSaque = saldoAtual
  }

  // Arredonda para 2 casas decimais
  const valorFinal = Math.round(valorSaque * 100) / 100

  return {
    saldoTotal: saldoAtual,
    valorLiberado: valorFinal,
    percentualUtilizado: percentual * 100,
    bonusAdicional: adicional,
    faixaAplicada: faixaDescricao
  }
}

/**
 * Formata valores em Reais (R$) brasileiro
 * @param valor - Valor numérico a ser formatado
 * @returns String formatada em moeda brasileira
 */
export function formatarReais(valor: number): string {
  // Formatação customizada para evitar dependência de Intl se necessário
  if (isNaN(valor)) return 'R$ 0,00'
  
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

/**
 * Exemplo de uso prático da função
 * Pode ser removido em produção
 */
export function exemplosUso() {
  // Testes com valores diversos
  const exemplos = [300, 800, 2500, 7500, 12000, 18000, 25000]
  
  console.log('=== EXEMPLOS DE CÁLCULO FGTS ===')
  exemplos.forEach(saldo => {
    const resultado = calcularSaqueAniversario(saldo)
    console.log(`Saldo: R$ ${saldo} → Saque: ${formatarReais(resultado.valorLiberado)}`)
  })
}

// Comentário pessoal (opcional - pode ser removido)
/* 
 * Desenvolvido baseado na Portaria MF nº XX/2023
 * Atualizado em: 15/03/2024
 * Por: [Seu Nome] - Time de Produto
 */