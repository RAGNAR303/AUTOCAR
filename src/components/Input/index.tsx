import type { InputHTMLAttributes } from "react";
import type { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  error?: string;
  rules?: RegisterOptions;
  register: UseFormRegister<any>;
}

export function Input({
  className,
  name,
  error,
  register,
  rules,
  ...props
}: InputProps) {
  return (
    <div className="w-full relative">
      <input
        {...props}
        className={`outline-none px-2 mx-auto w-full flex drop-shadow shadow p-1 
                  rounded  bg-zinc-800/80 ${className ?? ""}`}
        {...register(name, rules)}
        id={name}
      />
      {error && (
        <span
          className="text-red-500 bg-red-200 text-[10px] 
      absolute px-1 rounded -bottom-5"
        >
          {error}
        </span>
      )}
    </div>
  );
}
