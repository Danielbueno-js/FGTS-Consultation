import * as React from "react";
import { cn } from "@/lib/utils";
import { IMaskInput } from "react-imask";

interface InputProps extends React.ComponentProps<"input"> {
  mask?: string; // máscara opcional
  onAccept?: (value: string) => void; // callback do IMaskInput
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, mask, onAccept, value, ...props }, ref) => {
    const ConvertedValue = value != null ? String(value) : ""; 

    if (mask) {
      return (
        <IMaskInput
          {...props}
          type={type}
          mask={mask}
          onAccept={onAccept}
          inputRef={ref}
          value={ConvertedValue} 
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-11 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
            className
          )}
        />
      );
    }

    return (
      <input
        {...props}
        type={type}
        ref={ref}
        value={ConvertedValue} // mesma conversão para string
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-11 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
          className
        )}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
