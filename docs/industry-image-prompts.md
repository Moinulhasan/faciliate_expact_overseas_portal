# Industry image prompt pack

32 images: **2 per industry × 16 industries**. Generate, drop into `resources/images/industries/`, run `npm run images`. The site picks them up automatically — no code change.

---

## 1. Output spec (read before generating)

| | Scene shot | Detail shot |
|---|---|---|
| File name | `{slug}.jpg` | `{slug}-detail.jpg` |
| Aspect | **3:2 landscape** | **3:2 landscape** |
| Minimum size | **2400 × 1600 px** (upscale if the tool outputs less) | 2400 × 1600 px |
| Format | JPG q≥90 or PNG | same |
| Used on | Industry cards (16:9), home bento (16:10), industry hero (4:3), related cards | Industry overview section (3:2) |

**Crop-safe zone — this is what makes it "pixel perfect" across every slot:**

```
┌──────────────────────────────────────────┐
│ 12%  margin — sky / background only       │
│   ┌──────────────────────────────────┐   │
│   │  SUBJECT ZONE: centre 60% wide,  │   │  ← faces, hands, the main tool/action
│   │  between 15% and 65% height      │   │
│   └──────────────────────────────────┘   │
│ bottom 30% — floor / soft foreground      │  ← dark gradient + role chips sit here
└──────────────────────────────────────────┘
```

- Nothing important in the **bottom 30%**: every slot overlays a dark gradient and text there.
- Nothing important in the **outer 15% left/right**: the 4:3 hero crop removes it.
- Keep the horizon/eye-line roughly at **40% from the top**.

## 2. Shared style block (paste into every prompt)

> documentary editorial photograph, South Asian (Bangladeshi) workers in a real modern workplace abroad, natural dignified expressions, candid moment, not looking at camera, correct and complete safety gear for the trade, soft directional natural light (late golden hour or bright overcast), 35mm lens, f/2.8, eye level, gentle shallow depth of field, realistic skin texture, colour grade with deep forest-green shadows and warm neutral highlights, low saturation, clean uncluttered background, premium corporate annual-report look, 3:2 landscape, subject centred in the middle 60% of the frame, empty quiet foreground in the bottom third

**Negative / avoid:**

> text, letters, logos, brand names, watermarks, flags, signage, neon, oversaturated colours, HDR halo, cartoon, 3D render, illustration, plastic skin, extra fingers, distorted hands, distorted tools, wrong or missing PPE, children, stereotypes, poverty imagery, crowds, people facing the camera, dutch angle, fisheye, vignette

### Generator settings
- **Midjourney v7:** prompt + `--ar 3:2 --style raw --stylize 100 --no text,logo,watermark,flag` → upscale (Creative ×2).
- **GPT-image / DALL·E:** size `1536×1024`, then upscale ×2 (e.g. Topaz, Upscayl) to ≥ 2400 px wide.
- **Adobe Firefly:** Content type *Photo*, aspect *Landscape 3:2*, Visual intensity low; put the negatives in *Exclude*.
- Generate 4 variations per prompt and keep the one whose subject sits best in the safe zone.
- Use **one tool and one seed/style reference for the whole set** so lighting and grade match.

## 3. Prompts

`{STYLE}` = the shared style block above.

| slug | Scene (`{slug}.jpg`) | Detail (`{slug}-detail.jpg`) |
|---|---|---|
| `construction` | Two construction workers in hard hats and hi-vis vests reviewing drawings on a large modern infrastructure site, cranes and concrete structure behind, {STYLE} | Close-up of a mason's gloved hands setting a block with a trowel, fresh mortar, shallow depth of field, {STYLE} |
| `oil-gas` | Technicians in flame-retardant coveralls and hard hats walking along pipework at a refinery at golden hour, {STYLE} | Close-up of a welder's helmet and arc sparks on a steel pipe joint, controlled sparks, {STYLE} |
| `mep` | Electrician and HVAC technician installing ducting and cable trays in a new commercial building ceiling, ladder, {STYLE} | Close-up of hands terminating colour-coded wires in a distribution panel with insulated tools, {STYLE} |
| `engineering-technical` | Engineer with a tablet beside a CNC machine in a bright modern workshop, colleague checking a part, {STYLE} | Close-up of a digital caliper measuring a machined metal part on a clean bench, {STYLE} |
| `manufacturing` | Production line workers in uniforms and hairnets assembling components at a clean, well-lit factory line, {STYLE} | Close-up of a quality inspector's gloved hands checking a component against a checklist, {STYLE} |
| `agriculture` | Farm workers harvesting in long greenhouse rows of tomatoes, morning light through the glass roof, {STYLE} | Close-up of hands placing freshly picked produce into a crate, soil and leaves, {STYLE} |
| `hospitality` | Hotel restaurant staff in smart uniforms setting tables in an elegant dining room before service, {STYLE} | Close-up of a chef's hands plating a dish in a professional stainless-steel kitchen, {STYLE} |
| `healthcare` | Nurse in scrubs assisting an elderly patient walking in a bright modern hospital corridor, {STYLE} | Close-up of a caregiver's hands holding an elderly person's hands, warm and gentle, {STYLE} |
| `beauty-wellness` | Beauty therapist preparing a treatment room in a calm luxury hotel spa, folded towels and soft lighting, {STYLE} | Close-up of a hairdresser's hands cutting hair with scissors and comb, salon bokeh, {STYLE} |
| `education` | Teacher guiding students at a bright modern classroom whiteboard, students seen from behind, {STYLE} | Close-up of an instructor's hand demonstrating on a technical training model at a workbench, {STYLE} |
| `security` | Uniformed security guard at the glass entrance of a modern corporate building at dusk, calm and professional, {STYLE} | Close-up of a security operator's hands at a control desk with CCTV monitors softly out of focus, {STYLE} |
| `facility-management` | Facility team in uniforms maintaining a polished modern mall atrium, cleaning machine and maintenance cart, {STYLE} | Close-up of a technician's hands replacing an air filter in a ceiling unit, {STYLE} |
| `transport-logistics` | Warehouse worker driving a forklift between tall racking in a large modern distribution centre, {STYLE} | Close-up of a hand scanning a barcode on a parcel with a handheld scanner, {STYLE} |
| `drivers` | Professional chauffeur in a dark suit standing beside a black sedan at a modern hotel entrance, {STYLE} | Close-up of a driver's hands on a steering wheel, city lights bokeh through the windscreen, {STYLE} |
| `retail` | Sales associate arranging products on shelves in a bright premium supermarket aisle, {STYLE} | Close-up of hands at a modern point-of-sale terminal handing over a receipt, {STYLE} |
| `office-admin` | Administrative staff working at a clean modern open-plan office, monitors and documents, {STYLE} | Close-up of hands organising documents in labelled folders on a tidy desk, {STYLE} |

## 4. After generating

```bash
# 1. put files here (names must match the slug exactly)
resources/images/industries/construction.jpg
resources/images/industries/construction-detail.jpg
...
# 2. build AVIF + WebP (480/800/1200/1600 px) + blur placeholders + manifest
npm run images
# 3. reload the page — no deploy of code needed, only public/img/*
```

The three interim photos (`construction`, `oil-gas`, `security`) are the old site's images; replacing them works the same way.

## 5. Honesty note

AI images are **illustrative only**. Don't use them as "our workers", in testimonials or on the About/team page (CLAUDE.md §1.4, §13). Replace them with real, consented photos of deployed workers when you have them; the pipeline is the same.
