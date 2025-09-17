import { IMaskInput } from "react-imask";
import { forwardRef } from "react";

// Componente que aplica máscara e mantém os estilos
const MaskedInput = forwardRef<HTMLInputElement, {
  value?: string;
  onAccept?: (value: string) => void;
  placeholder?: string;
  mask?: string;
}>(({ value, onAccept, placeholder, mask = "(00) 00000-0000" }, ref) => {
  return (
    <IMaskInput
      mask={mask}
      value={value}
      onAccept={onAccept}
      inputRef={ref}
      placeholder={placeholder}
      className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-11 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40"
    />
  );
});

export { MaskedInput };
