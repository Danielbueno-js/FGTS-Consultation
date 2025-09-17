export function formatMoney(value: string | number): string {
  const number =
    typeof value === "string" ? parseInt(value.replace(/\D/g, "")) : value;

  if (isNaN(number)) return "0,00";

  return (number / 100).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatMoneyInput(value: string): string {
  const onlyNumbers = value.replace(/\D/g, "");
  if (!onlyNumbers) return "";

  const number = parseInt(onlyNumbers, 10);
  return (
    "R$ " +
    (number / 100).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}