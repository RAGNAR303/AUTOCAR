import type { ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
}

export function Button({
  children,
  className,
  variant,
  ...props
}: ButtonProps) {
  const buttonClass = clsx(
    `font-medium px-3 py-1  flex items-center justify-center gap-1
        uppercase text-xl rounded border-2 
        transition-all duration-300 hover:bg-transparent `,
    {
      "hover:text-red-700 bg-red-700 border-red-700 ": variant === "default",
      "hover:text-green-500 bg-green-500 border-green-500 ":
        variant === "whatsapp",
      "text-zinc-800  hover:text-zinc-300  bg-white border-white ":
        variant === "google",
    }
  );

  return (
    <button
      className={`${buttonClass} ${className ?? ""} bg-green-500 `}
      {...props}
    >
      {children}
    </button>
  );
}
