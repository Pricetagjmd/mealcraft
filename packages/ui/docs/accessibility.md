# Voxel Design System - Accessibility Guidelines

## WCAG 2.1 AA Compliance

This document defines the approved color pairings, typography, and accessibility requirements for the Voxel Design System.

---

## Typography

### Font Roles

| Use | Font | Size | Notes |
|-----|------|------|-------|
| Headings | VT323 | 28-42px | Pixelated but legible |
| Body | Space Mono | 14px | Monospace retro feel, readable |
| Labels | VT323 | 14px minimum | Small UI elements, ALL CAPS |
| Micro labels | Press Start 2P | 12px minimum | Decorative badges only |

### Minimum Text Size

**Critical:** No text below 12px anywhere in the application.

### Press Start 2P Restriction

**Original spec used Press Start 2P at 10px for labels.** This fails WCAG 2.1 minimum text size guidelines on mobile devices.

**Solution:** VT323 at 14px minimum replaces Press Start 2P for all functional labels. Press Start 2P is retained only for decorative or non-essential micro-labels at 12px minimum.

### Usage Guidelines

| Element | Font | Size | Class |
|---------|------|------|-------|
| Page titles | VT323 | 42px | `.text-heading-xl` |
| Section headings | VT323 | 40px | `.text-heading-lg` |
| Subheadings | VT323 | 32px | `.text-heading-md` |
| Small headings | VT323 | 28px | `.text-heading-sm` |
| Body text | Space Mono | 14px | `.text-body` |
| Button labels | VT323 | 14px | `.text-label` |
| Form labels | VT323 | 14px | `.text-label` |
| Nav items | VT323 | 14px-16px | `.text-label` / `.text-label-lg` |
| Decorative badges | Press Start 2P | 12px | `.text-badge` |

### NOT Allowed

- Press Start 2P for functional labels (buttons, nav, forms)
- Any text below 12px
- Press Start 2P below 12px

---

### Contrast Requirements

| Text Type | Minimum Ratio |
|-----------|---------------|
| Normal text (< 18px) | 4.5:1 |
| Large text (>= 18px or >= 14px bold) | 3.0:1 |
| UI components and graphical objects | 3.0:1 |

---

## Color Palette (Design System 4.1)

| Color | Hex | Purpose |
|-------|-----|---------|
| Grass (Primary) | `#5D8E22` | Main buttons, success states, positive progress |
| Dirt (Secondary) | `#8B5E3C` | Footers, borders, ground elements |
| Sky (Background) | `#C4E5F2` | App background (day mode) |
| Stone (Surface) | `#7E7E7E` | Card backgrounds, modal surfaces |
| Obsidian (Text) | `#1A1A1A` | Main text color |
| Lava (Accent Warning) | `#CF5C28` | Warnings, delete actions, destructive confirmations |
| Ember (Accent Hot) | `#E8913A` | Hot/popular recipes, trending badges |
| Wood (Inventory) | `#A07449` | Inventory drawer background, chest UI |
| Cobble (Disabled) | `#B0B0B0` | Disabled buttons, inactive elements, placeholder text |
| Redstone (Offline) | `#CC3333` | Offline indicator bar, sync error states |
| White | `#FFFFFF` | Light text on Stone; WCAG contrast |
| Diamond | `#4aedd9` | Accent, info |
| Gold | `#fcdb43` | Warning, highlight |
| Water | `#3f76e4` | Info, links |

Note: Lava and Ember are distinct tokens; do not use the same color for destructive actions and popular content.

---

## Approved Color Pairings

### Dark Backgrounds

| Background | Text Color | Ratio | Normal Text | Large Text |
|------------|------------|-------|-------------|------------|
| Obsidian | White | 16.1:1 | PASS | PASS |
| Obsidian | Gold | 13.1:1 | PASS | PASS |
| Obsidian | Diamond | 10.9:1 | PASS | PASS |
| Obsidian | Ember | 5.2:1 | PASS | PASS |
| Obsidian | Grass | 4.7:1 | PASS | PASS |
| Cobble | White | 7.4:1 | PASS | PASS |
| Cobble | Diamond | 5.0:1 | PASS | PASS |

### Light Backgrounds

| Background | Text Color | Ratio | Normal Text | Large Text |
|------------|------------|-------|-------------|------------|
| White | Obsidian | 16.1:1 | PASS | PASS |
| Sky | Obsidian | 12.8:1 | PASS | PASS |
| Gold | Obsidian | 13.1:1 | PASS | PASS |
| Diamond | Obsidian | 10.9:1 | PASS | PASS |
| Ember | Obsidian | 5.2:1 | PASS | PASS |

### Limited Use (Large Text Only)

| Background | Text Color | Ratio | Normal Text | Large Text |
|------------|------------|-------|-------------|------------|
| Stone | White | 4.0:1 | FAIL | PASS |
| White | Grass | 3.4:1 | FAIL | PASS |
| Sky | Grass | 3.2:1 | FAIL | PASS |

---

## Usage Restrictions

### 1. Stone Surfaces

**White text ONLY** on Stone backgrounds.

```css
/* CORRECT */
.bg-stone {
  color: white; /* 4.0:1 - passes large text */
}

/* INCORRECT - DO NOT USE */
.bg-stone {
  color: var(--obsidian); /* ~2.0:1 - FAILS */
}
```

**Why:** Obsidian on Stone has insufficient contrast (~2.0:1), failing both normal and large text requirements.

### 2. Grass Foreground

**Large text ONLY** (>= 18px or >= 14px bold)

```css
/* CORRECT */
.text-grass {
  font-size: 18px; /* or 14px with font-weight: bold */
}

/* INCORRECT - DO NOT USE */
.label {
  color: var(--grass);
  font-size: 14px; /* Body text - FAILS at 3.4:1 */
}
```

**Allowed uses:**
- Headings (h1-h3)
- Large buttons
- Icons
- Focus indicators

**NOT allowed for:**
- Body text
- Form labels
- Small buttons
- Navigation items

---

## Focus Indicators

All interactive elements must have visible focus indicators for keyboard navigation.

### Specification

| Property | Value |
|----------|-------|
| Style | 2px dashed |
| Color | Grass (`#5D8E22`) |
| Offset | 2px |

### Implementation

```css
/* CSS */
button:focus-visible,
a:focus-visible,
input:focus-visible {
  outline: 2px dashed var(--grass);
  outline-offset: 2px;
}
```

```tsx
/* React/TypeScript */
import { focus } from '@mealcraft/ui/tokens';

const focusStyle = {
  outline: `${focus.width}px ${focus.style} ${focus.color}`,
  outlineOffset: `${focus.offset}px`,
};
```

### Utility Class

```html
<button class="focus-voxel">Click me</button>
```

---

## Programmatic Validation

### Check if a pairing is compliant

```typescript
import { isPairingCompliant } from '@mealcraft/ui/accessibility';

// Normal text
isPairingCompliant('white', 'obsidian', 'normal'); // true
isPairingCompliant('white', 'stone', 'normal');    // false
isPairingCompliant('grass', 'sky', 'normal');      // false

// Large text
isPairingCompliant('white', 'stone', 'large');     // true
isPairingCompliant('grass', 'sky', 'large');       // true
```

### Get compliant colors for a background

```typescript
import { getCompliantTextColors } from '@mealcraft/ui/accessibility';

getCompliantTextColors('obsidian', 'normal');
// ['white', 'gold', 'diamond', 'ember', 'grass']

getCompliantTextColors('stone', 'large');
// ['white']
```

### Calculate contrast ratio

```typescript
import { contrastRatio, validateContrast } from '@mealcraft/ui/accessibility';

const ratio = contrastRatio('#FFFFFF', '#1A1A1A'); // 16.1

const result = validateContrast('#FFFFFF', '#7E7E7E');
// {
//   ratio: 4.0,
//   normalTextCompliant: false,
//   largeTextCompliant: true,
//   level: 'large-only'
// }
```

---

## Testing

Run accessibility tests:

```bash
cd packages/ui
pnpm test src/accessibility
```

### Automated Audit

Use axe-core or similar tools to verify zero contrast violations:

```typescript
import { axe } from 'vitest-axe';

it('should have no accessibility violations', async () => {
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

## Disabled States

All disabled interactive elements must be clearly distinguishable from enabled states.

### Specification

| Property | Value |
|----------|-------|
| Background | `#B0B0B0` (Cobble disabled variant) |
| Opacity | 60% |
| Box shadow | None |
| Cursor | `not-allowed` |
| Pointer events | None |

### Implementation

```css
/* CSS */
.voxel-disabled,
button:disabled,
[aria-disabled="true"] {
  background-color: var(--disabled-bg);
  opacity: var(--disabled-opacity);
  box-shadow: none;
  cursor: not-allowed;
  pointer-events: none;
}
```

```tsx
/* React/TypeScript */
import { disabled, disabledStyleRN } from '@mealcraft/ui/tokens';

// CSS values
const disabledStyle = {
  backgroundColor: disabled.background,
  opacity: disabled.opacity,
  cursor: disabled.cursor,
  boxShadow: disabled.shadow,
};

// React Native
const rnDisabledStyle = disabledStyleRN;
```

### Utility Class

```html
<button class="voxel-interactive" disabled>Cannot click</button>
<div class="voxel-disabled">Disabled content</div>
```

### Accessibility Notes

- Disabled elements should use `aria-disabled="true"` in addition to the `disabled` attribute when applicable
- The 60% opacity ensures sufficient visual distinction while maintaining readability
- The lighter Cobble variant (`#B0B0B0`) provides adequate contrast with remaining text

---

## Interactive Elements

Interactive elements (buttons, cards, inputs) follow consistent styling.

### Specification

| Property | Value |
|----------|-------|
| Border | 3px solid `#1A1A1A` (Obsidian) |
| Border radius | 4px (voxel feel, not pill) |
| Box shadow | `4px 4px 0px 0px rgba(0, 0, 0, 0.8)` |

### Size Variants

| Variant | Border | Shadow |
|---------|--------|--------|
| Small | 2px | `2px 2px 0px 0px rgba(0, 0, 0, 0.8)` |
| Default | 3px | `4px 4px 0px 0px rgba(0, 0, 0, 0.8)` |
| Large | 4px | `6px 6px 0px 0px rgba(0, 0, 0, 0.8)` |

### Implementation

```css
/* CSS */
.voxel-interactive {
  border: var(--border-voxel);
  border-radius: var(--radius-voxel);
  box-shadow: var(--shadow-voxel);
}
```

```tsx
/* React/TypeScript */
import { borderVoxel, borderRadius, shadowsCSS } from '@mealcraft/ui/tokens';

const interactiveStyle = {
  border: `${borderVoxel.width}px ${borderVoxel.style} ${borderVoxel.color}`,
  borderRadius: `${borderRadius.voxel}px`,
  boxShadow: shadowsCSS.voxel,
};
```

### Utility Classes

```html
<button class="voxel-interactive">Default button</button>
<button class="voxel-interactive-sm">Small button</button>
<button class="voxel-interactive-lg">Large button</button>
```

---

## Skeleton Loading

Skeleton placeholders indicate loading content with a pulsing animation.

### Specification

| Property | Value |
|----------|-------|
| Background | Stone (`#7E7E7E`) |
| Opacity range | 0.4 - 0.7 |
| Animation duration | 1.5s |
| Animation timing | ease-in-out, infinite |

### Implementation

```css
/* CSS */
@keyframes skeleton-pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.7; }
}

.skeleton-voxel {
  background-color: var(--skeleton-bg);
  animation: skeleton-pulse var(--skeleton-duration) ease-in-out infinite;
  border-radius: var(--radius-voxel);
}
```

```tsx
/* React/TypeScript */
import { skeleton } from '@mealcraft/ui/tokens';

const skeletonStyle = {
  backgroundColor: skeleton.background,
  animation: `skeleton-pulse ${skeleton.duration}ms ease-in-out infinite`,
};
```

### Utility Classes

```html
<div class="skeleton-voxel">Loading block</div>
<div class="skeleton-text">Loading text line</div>
<div class="skeleton-card">Loading card</div>
```

---

## Noise Texture

Subtle noise overlay adds texture to Stone/Wood surfaces for a more authentic voxel feel.

### Specification

| Property | Value |
|----------|-------|
| Type | SVG fractal noise filter |
| Opacity | 5% (subtle) or 10% (heavy) |
| Position | Absolute overlay |
| Pointer events | None (click-through) |

### Implementation

```css
/* CSS */
.texture-noise {
  position: relative;
}
.texture-noise::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,..."); /* SVG noise */
  opacity: 0.05;
  pointer-events: none;
  border-radius: inherit;
}
```

### Utility Classes

```html
<div class="bg-stone texture-noise">Stone with subtle texture</div>
<div class="bg-cobble texture-noise-heavy">Cobble with heavier texture</div>
```

---

## Dark Mode (Post-MVP)

Dark mode is deferred. When implementing:

1. **Invert semantic mappings**
   - Light mode: Obsidian backgrounds, light text
   - Dark mode: Sky/White backgrounds, Obsidian text

2. **Re-validate all contrast ratios**
   - Each pairing must meet AA requirements in both modes

3. **Consider alternative focus color**
   - Diamond (`#4aedd9`) may work better on dark backgrounds

4. **Test thoroughly**
   - Run automated audits for both modes
   - Manual testing with screen readers

---

## Quick Reference

### Safe Pairings (Use Anywhere)

| Combination | Use For |
|-------------|---------|
| White on Obsidian | Primary content |
| Obsidian on Sky | Light sections |
| Gold on Obsidian | Warnings, highlights |
| Diamond on Obsidian | Accents, headings |

### Restricted Pairings (Large Text Only)

| Combination | Use For |
|-------------|---------|
| White on Stone | Large labels, headings |
| Grass on Sky | Large headings, icons |
| Grass on White | Large headings, icons |

### Never Use

| Combination | Reason |
|-------------|--------|
| Obsidian on Stone | 2.0:1 - fails all AA |
| Stone on Stone | 1:1 - no contrast |
| Grass for body text | 3.4:1 - fails normal AA |
