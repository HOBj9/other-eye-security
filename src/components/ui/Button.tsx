import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
  }
>;

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-l from-[#5B57B8] to-[#706BCF] text-white shadow-[0_10px_30px_rgba(112,107,207,0.35)] hover:opacity-95',
  secondary:
    'border border-white/20 bg-white/10 text-white hover:bg-white/15',
  ghost: 'text-white/90 hover:bg-white/10',
};

export function Button({
  children,
  className = '',
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
