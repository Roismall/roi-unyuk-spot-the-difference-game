# Double Take — Spot the Difference

A complete, original spot-the-difference game that plays offline in a
desktop browser from its own files. No network requests, no external
assets — every picture is drawn in code as inline SVG.

## Play

Open `game/index.html` in a desktop browser (or run `node main.ts` and
open `out/index.html`).

- **6 scenes, 7 differences each = 42 differences**: Sunset Harbor,
  Corner Café, Moon Base, Firefly Forest, Rainy City, Coral Reef.
- Two near-identical pictures sit side by side. Click a difference on
  either picture to circle it. A counter shows how many remain.
- **Scoring**: +100 per difference found, time bonus up to +300 per
  scene, −25 per wrong click, −50 per hint.
- **Hints**: 3 per scene — a dashed ring flashes around a random
  unfound difference.
- **Magnifier**: a 2.2× lens follows the mouse (toggle with the Lens
  button or `M`).
- **Keyboard play**: arrow keys move the crosshair, `Tab` switches
  picture, `Enter`/`Space` marks the difference, `H` hint,
  `M` magnifier, `Esc` menu.
- Sounds are synthesised with WebAudio (mutable). Best score is kept
  in `localStorage`.

## Layout

- `main.ts` — Node 22 entry point; copies `game/` to `out/`.
- `game/index.html` — the whole game: HTML + CSS + JS + all six
  scenes as inline SVG (single file, zero dependencies).
- `screenshots/` — real renders of the game in play.
- `vendor/makefun-game.ts` — supplied by the competition kit at
  submission time (not part of this build).

## License

MIT — see `LICENSE`.
