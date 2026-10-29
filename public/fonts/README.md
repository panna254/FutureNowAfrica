# Font assets and provenance

These self-hosted fonts were converted from the installed Kali Linux font files
for FutureNow Africa. They reproduce the configured GNOME font families:
Cantarell for interface/document text and Fira Code Medium for restrained metadata.
The desktop's point sizes are not used as website sizes.

Read-only GNOME settings were verified on 25 October 2026, then rechecked outside
the sandbox after its dconf runtime restriction produced warnings:

- `org.gnome.desktop.interface font-name`: `Cantarell 11`
- `org.gnome.desktop.interface document-font-name`: `Cantarell 11`
- `org.gnome.desktop.interface monospace-font-name`: `Fira Code Medium 10`

Separate Fontconfig generic matches were `DejaVu Sans` Book (`sans`), `DejaVu
Serif` Book (`serif`), and `DejaVu Sans Mono` Book (`monospace`). These are fallback
results, not the configured GNOME font families. Interface and document settings
match, so the site uses one sans family for both roles.

## Included files

- `cantarell-variable.woff2`: Cantarell **0.311**, from Debian/Kali package
  `fonts-cantarell 0.311-3`. The original variable `wght` axis spans **100,800**,
  with default 400. The website uses **400, 500, 600, and 700**; intermediate
  weights are supported by the variable font. Normal style only; no italic face.
  All **1,307 glyphs** and **1,223 Unicode mappings** are retained. Size:
  **92,468 bytes**.
- `fira-code-medium.woff2`: Fira Code Medium, internal font version **6.002**,
  from package `fonts-firacode 6.2-3`. Static **500** weight, normal style only;
  no italic face. All **2,030 glyphs** and **1,586 Unicode mappings** are retained.
  Size: **102,880 bytes**.

## Source files and integrity

Cantarell source:
`/usr/share/fonts/opentype/cantarell/Cantarell-VF.otf`, 169,912 bytes.

- Source SHA-256: `e1c3ec3f2a9cfe7241fbdf7606247416c502255cac9d0ac60061a44eeb250eab`
- WOFF2 SHA-256: `25c4d8366f09733c2ea19f37769d2efe8e9adc784ecd0bf058d507aa1fbd7791`

Fira Code source:
`/usr/share/fonts/truetype/firacode/FiraCode-Medium.ttf`, 282,440 bytes.

- Source SHA-256: `eb68fad91cc56c382e627cb0b3b07f492bf6affb521e9a22d41fff9d67a3bfc1`
- WOFF2 SHA-256: `e9b26ac23610682082e4e0cc25a1b44715dd4f25d2a53950e4eb33aa45fb54aa`

Conversion uses the locally available FontTools/Brotli WOFF2 support. It preserves
the font designs, glyph coverage, layout features, hinting, naming, licensing
metadata, and variable axis; no subsetting or design edits were applied.

Verification against the source files confirmed identical name and cmap tables,
glyph order, metrics, and layout tables. Cantarell's CFF2 outlines and variation
tables are byte-identical. For Fira Code, all glyph coordinates, contour endpoints,
point flags, bounds, composite transforms, and hinting instructions are unchanged.
WOFF2 reconstructs the TrueType `glyf`/`loca` representation, so those serialized
tables are not byte-identical. In both fonts, `head` differs only in its checksum
adjustment and WOFF2 compression flag (bit 11); timestamps are preserved. This is
lossless WOFF2 packaging, not a redesigned or reduced character-set font.

## Licensing

Both fonts are licensed under **SIL Open Font License 1.1**. The bundled notices
are unchanged copies of the installed package copyright files:

- `Cantarell-LICENSE.txt` ← `/usr/share/doc/fonts-cantarell/copyright`
- `FiraCode-LICENSE.txt` ← `/usr/share/doc/fonts-firacode/copyright`

The notices and license may be copied with the fonts. OFL permits bundling and
redistribution with software when the applicable copyright notice and license
remain included. Keep these license files and the font metadata when deploying or
redistributing the website. The fonts remain under OFL; this does not require the
website itself to use that license. No Reserved Font Names are specified in these
applicable license notices.

Primary upstream references:

- [Cantarell source and project information](https://gitlab.gnome.org/GNOME/cantarell-fonts)
- [Cantarell license, official GNOME mirror](https://github.com/GNOME/cantarell-fonts/blob/master/COPYING)
- [Fira Code 6.2 license](https://github.com/tonsky/FiraCode/blob/6.2/LICENSE)
- [OFL FAQ: webfonts and WOFF conversion](https://openfontlicense.org/ofl-faq/)

## Loading and fallbacks

The global stylesheet loads these assets from the same server as the site with
`@font-face`; no external font service or runtime font dependency is used.
Cantarell uses `font-display: swap` and is preloaded in `index.html` so text remains
visible and the primary font request starts early. Fira Code also uses
`font-display: swap` and is not preloaded; it is requested only on pages with
metadata accents (programme identifiers, approach steps and article dates).
Deploy the entire
`public/fonts` output, including its license files.

Tailwind's shared sans and monospace tokens provide system fallback stacks. Main
interface text and form controls inherit the sans stack; metadata uses the mono
token at weight 500. `system-ui`, Segoe UI, Cascadia Code, DejaVu Sans Mono, and the
generic fallbacks are resilience options, **not the verified GNOME fonts**. A
fallback remains readable while fonts load or if a font request fails.
No synthetic italic or bold faces are requested.
