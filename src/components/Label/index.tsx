import type { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: string;
}

export function Label({ children }: LabelProps) {
  return <label className="py-2 font-bold">{children}</label>;
}
