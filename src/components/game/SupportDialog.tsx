import { useEffect, useState } from "react";
import { Check, Copy, Heart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GameButton } from "./GameButton";

export const PIX_CODE =
  "00020101021126420014br.gov.bcb.pix0120olirumdev1@gmail.com5204000053039865802BR5918MURILO SILVA - PIJ6008BRASILIA62070503***630432FF";

export function SupportDialog({
  trigger,
}: {
  trigger?: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2500);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PIX_CODE);
    } catch {
      const el = document.createElement("textarea");
      el.value = PIX_CODE;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      el.remove();
    }
    setCopied(true);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ?? (
          <GameButton variant="coral" size="icon" aria-label="Apoiar o projeto">
            <Heart className="h-5 w-5 fill-current" />
          </GameButton>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md rounded-3xl">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-black">
            ❤️ Apoie o projeto
          </DialogTitle>
          <DialogDescription className="font-semibold">
            O Tile Odyssey é gratuito e sem anúncios. Se ele te diverte, um Pix de qualquer valor
            ajuda a manter novas fases chegando.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-2xl bg-foreground/5 p-3 text-sm font-bold">
          <p>
            Favorecido: <span className="text-muted-foreground">MURILO SILVA - PIJ</span>
          </p>
        </div>

        <div className="rounded-2xl border border-foreground/10 bg-card/70 p-3">
          <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">
            Pix copia e cola
          </p>
          <p className="mt-1 break-all font-mono text-[10px] leading-tight text-muted-foreground">
            {PIX_CODE}
          </p>
        </div>

        <GameButton variant={copied ? "primary" : "gold"} size="lg" onClick={copy} className="w-full">
          {copied ? (
            <>
              <Check className="h-5 w-5" /> Código Pix copiado!
            </>
          ) : (
            <>
              <Copy className="h-5 w-5" /> Copiar código Pix
            </>
          )}
        </GameButton>
        {copied && (
          <p className="text-center text-xs font-bold text-muted-foreground">
            Cole no app do seu banco em “Pix copia e cola”. Obrigado! 🦊
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
