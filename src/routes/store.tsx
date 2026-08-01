import { createFileRoute } from "@tanstack/react-router";
import { AppFrame } from "@/components/game/AppFrame";
import { Header } from "@/components/game/Header";
import { GameButton } from "@/components/game/GameButton";
import { AudioManager } from "@/lib/game/audio";
import { SaveManager, useSave } from "@/lib/game/save";

export const Route = createFileRoute("/store")({
  head: () => ({
    meta: [
      { title: "Loja Cosmética — Tile Odyssey" },
      {
        name: "description",
        content:
          "Temas, molduras, avatares e efeitos de partículas para deixar a jornada do Tilo com a sua cara.",
      },
      { property: "og:title", content: "Loja Cosmética — Tile Odyssey" },
      {
        property: "og:description",
        content: "Só itens visuais: temas, molduras, avatares e trilhas de partículas.",
      },
    ],
  }),
  component: StorePage,
});

type Item = { id: string; name: string; icon: string; price: number; group: string };

const ITEMS: Item[] = [
  { id: "theme-bosque", name: "Tema Bosque", icon: "🌳", price: 0, group: "Temas" },
  { id: "theme-praia", name: "Tema Praia", icon: "🏖️", price: 300, group: "Temas" },
  { id: "theme-gelo", name: "Tema Gelo", icon: "❄️", price: 450, group: "Temas" },
  { id: "theme-espaco", name: "Tema Estelar", icon: "🌌", price: 700, group: "Temas" },
  { id: "frame-gold", name: "Moldura Dourada", icon: "🖼️", price: 250, group: "Molduras" },
  { id: "frame-leaf", name: "Moldura Folhas", icon: "🍃", price: 180, group: "Molduras" },
  { id: "avatar-fox", name: "Avatar Tilo", icon: "🦊", price: 0, group: "Avatares" },
  { id: "avatar-owl", name: "Avatar Coruja", icon: "🦉", price: 220, group: "Avatares" },
  { id: "avatar-panda", name: "Avatar Panda", icon: "🐼", price: 260, group: "Avatares" },
  { id: "fx-sparkle", name: "Partículas Brilho", icon: "✨", price: 320, group: "Efeitos" },
  { id: "fx-petals", name: "Pétalas ao Vento", icon: "🌸", price: 340, group: "Efeitos" },
  { id: "steps-paw", name: "Pegadas do Tilo", icon: "🐾", price: 200, group: "Efeitos" },
];

const GROUPS = ["Temas", "Molduras", "Avatares", "Efeitos"];

function StorePage() {
  const save = useSave();

  const buy = (item: Item) => {
    if (save.owned.includes(item.id)) {
      SaveManager.update((s) => ({ ...s, equipped: item.id }));
      AudioManager.click();
      return;
    }
    if (save.coins < item.price) return;
    AudioManager.power();
    SaveManager.update((s) => ({
      ...s,
      coins: s.coins - item.price,
      owned: [...s.owned, item.id],
      equipped: item.id,
      avatar: item.group === "Avatares" ? item.icon : s.avatar,
    }));
  };

  return (
    <AppFrame sky={["#ffe6a7", "#fffaf0"]} ground="#cbb98e" accent="#d8a72c">
      <Header title="Loja Cosmética" back="/" />
      <main className="mx-auto w-full max-w-3xl px-4 pb-20 pt-4">
        <p className="rounded-3xl glass p-4 text-sm font-bold shadow-soft">
          Apenas itens visuais — nada aqui afeta a dificuldade do jogo. 🪙 {save.coins}
        </p>
        {GROUPS.map((g) => (
          <section key={g} className="mt-4">
            <h2 className="font-display text-lg font-black">{g}</h2>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              {ITEMS.filter((i) => i.group === g).map((item) => {
                const owned = save.owned.includes(item.id);
                const equipped = save.equipped === item.id;
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 rounded-3xl glass p-3 shadow-soft"
                  >
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gold/25 text-3xl">
                      {item.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display text-sm font-black">{item.name}</p>
                      <p className="text-xs font-semibold text-muted-foreground">
                        {owned ? (equipped ? "Equipado" : "Adquirido") : `🪙 ${item.price}`}
                      </p>
                    </div>
                    <GameButton
                      size="sm"
                      variant={equipped ? "soft" : owned ? "turquoise" : "gold"}
                      disabled={equipped || (!owned && save.coins < item.price)}
                      onClick={() => buy(item)}
                    >
                      {equipped ? "Ativo" : owned ? "Usar" : "Comprar"}
                    </GameButton>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </AppFrame>
  );
}
