import { useEffect, useState } from "react";
import { Maximize, Minimize, Download, Check } from "lucide-react";
import { GameButton } from "./GameButton";
import { useFullscreen, useInstallPrompt } from "@/lib/pwa";

export function FullscreenButton({ label = false, className }: { label?: boolean; className?: string }) {
  const { isFullscreen, supported, toggle } = useFullscreen();
  if (!supported) return null;
  return (
    <GameButton
      variant="soft"
      size={label ? "md" : "icon"}
      onClick={toggle}
      aria-label={isFullscreen ? "Sair da tela cheia" : "Tela cheia"}
      title={isFullscreen ? "Sair da tela cheia" : "Tela cheia"}
    >
      {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
      {label && <span>{isFullscreen ? "Sair da tela cheia" : "Tela cheia"}</span>}
    </GameButton>
  );
}

export function InstallButton({ className }: { className?: string }) {
  const { canInstall, installed, install } = useInstallPrompt();
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (installed) setDone(true);
  }, [installed]);

  if (done)
    return (
      <GameButton variant="soft" size="md" className={className} disabled>
        <Check className="h-5 w-5" /> App instalado
      </GameButton>
    );

  return (
    <GameButton
      variant="turquoise"
      size="md"
      className={className}
      onClick={() => void install()}
      disabled={!canInstall}
      title={canInstall ? "Instalar o app" : "Use o menu do navegador para instalar"}
    >
      <Download className="h-5 w-5" /> {canInstall ? "Instalar app" : "Instalar (veja como)"}
    </GameButton>
  );
}
