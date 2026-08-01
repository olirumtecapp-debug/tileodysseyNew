import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { AudioManager } from "@/lib/game/audio";

const gameButton = cva(
  "relative inline-flex select-none items-center justify-center gap-2 rounded-2xl font-display font-extrabold tracking-wide transition-all duration-150 active:translate-y-1 active:shadow-none disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50",
  {
    variants: {
      variant: {
        primary: "bg-emerald text-white shadow-pop hover:brightness-105",
        gold: "bg-gold text-gold-foreground shadow-pop hover:brightness-105",
        turquoise: "bg-turquoise text-white shadow-pop hover:brightness-105",
        coral: "bg-coral text-white shadow-pop hover:brightness-105",
        soft: "glass text-foreground shadow-soft hover:brightness-[1.03]",
        ghost: "text-foreground hover:bg-foreground/5",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-6 text-base",
        lg: "h-14 px-8 text-lg",
        xl: "h-20 px-12 text-2xl",
        icon: "h-11 w-11 min-h-11 min-w-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type GameButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof gameButton> & { asChild?: boolean };

export function GameButton({
  className,
  variant,
  size,
  asChild,
  onClick,
  ...props
}: GameButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(gameButton({ variant, size }), className)}
      onClick={(e) => {
        AudioManager.click();
        onClick?.(e);
      }}
      {...props}
    />
  );
}
