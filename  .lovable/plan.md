# Plano de Atualização Visual: Tile Explorer (Estilo Premium 3D)

Com base nas imagens de referência e nas preferências confirmadas (Visual 3D Moderno, Raposa Detalhada, Peças de Marfim e Cenário de Montanhas Rico), o design será elevado para um nível comercial AAA.

## 1. Mascote Tilo (Raposa Detalhada)
- **Visual:** Adição de texturas de pelo, sombras profundas e roupas com mais detalhes (textura de tecido, fivelas brilhantes).
- **Expressividade:** Olhar mais vivo com brilho nos olhos e animações sutis de orelhas.
- **Arquivo:** `src/components/game/Mascot.tsx`

## 2. Peças do Jogo (Marfim Moderno 3D)
- **Visual:** Base branca brilhante com profundidade aumentada, bordas arredondadas "suaves" e acabamento de porcelana/marfim.
- **Símbolos:** Renderização dos símbolos com efeito de profundidade (3D embutido ou saltado) e cores vibrantes.
- **Efeitos:** Brilho (specular highlight) mais acentuado no topo para parecer material premium.
- **Arquivo:** `src/components/game/Tile.tsx`

## 3. Cenário (Montanhas & Florestas Ricas)
- **Visual:** Fundo mais detalhado com camadas extras de paralaxe (cachoeiras distantes, templos em ruínas escondidos entre árvores).
- **Elementos:** Sol com raios volumétricos, nuvens com sombras e vegetação mais densa.
- **Arquivo:** `src/components/game/Scenery.tsx`

## 4. Interface (Moderno Premium 3D)
- **Componentes:** Botões com efeito 3D real (sombras de profundidade que reagem ao clique) e acabamento "glossy".
- **Design:** Uso de bordas arredondadas amplas e tipografia com contornos suaves.
- **Arquivo:** `src/styles.css`, `src/components/game/GameButton.tsx`, `src/components/game/Header.tsx`

---

## Detalhes Técnicos

### Mascot (SVG Refinement)
- Implementar gradientes radiais para profundidade do pelo.
- Adicionar pequenas "specs" de luz nos olhos para vida.
- Detalhar o chapéu com costuras visíveis via paths SVG.

### Tiles (CSS/JSX)
- Ajustar `box-shadow` para um efeito de profundidade 3D mais realista.
- Usar `radial-gradient` no "gloss" para simular reflexo de luz pontual.
- Refinar as placas de cores para tons mais "candy" e saturados.

### Scenery (Enhanced SVG)
- Adicionar novos elementos como `path` para cachoeiras e pequenos templos distantes.
- Aumentar a opacidade e saturação das cores base.
