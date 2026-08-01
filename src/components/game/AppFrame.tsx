import { useEffect, type ReactNode } from "react";
import { useSave } from "@/lib/game/save";
import { AudioManager } from "@/lib/game/audio";
import { Scenery } from "./Scenery";

export function AppFrame({
  children,
  sky = ["#8fd8ff", "#d9f6ff"],
  ground = "#63c471",
  accent = "#2fb8a8",
}: {
  children: ReactNode;
  sky?: [string, string];
  ground?: string;
  accent?: string;
}) {
  const { settings } = useSave();

  useEffect(() => {
    AudioManager.setMuted(!settings.sound);
  }, [settings.sound]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("reduce-motion", settings.reduceMotion);
    root.classList.toggle("contrast-boost", settings.highContrast);
    root.style.fontSize = `${16 * settings.uiScale}px`;
    return () => {
      root.style.fontSize = "";
    };
  }, [settings.reduceMotion, settings.highContrast, settings.uiScale]);

  return (
    <div
      className={`min-h-dvh ${settings.leftHanded ? "[--hand:row-reverse]" : "[--hand:row]"}`}
      data-colorblind={settings.colorblind ? "true" : undefined}
    >
      <Scenery sky={sky} ground={ground} accent={accent} />
      {children}
    </div>
  );
}
