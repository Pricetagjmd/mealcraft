# Voxel Design System - Accessibility Guidelines

## WCAG 2.1 AA Compliance

This document defines the approved color pairings and accessibility requirements for the Voxel Design System.

### Contrast Requirements

| Text Type | Minimum Ratio |
|-----------|---------------|
| Normal text (< 18px) | 4.5:1 |
| Large text (>= 18px or >= 14px bold) | 3.0:1 |
| UI components and graphical objects | 3.0:1 |

---

## Color Palette

| Color | Hex | Purpose |
|-------|-----|---------|
| Obsidian | `#1A1A1A` | Primary dark background, dark text |
| Sky | `#C4E5F2` | Light background |
| Stone | `#7E7E7E` | Secondary/muted surfaces |
| Grass | `#5D8E22` | Success, focus indicators |
| White | `#FFFFFF` | Light text, light backgrounds |
| Diamond | `#4aedd9` | Accent, info |
| Gold | `#fcdb43` | Warning, highlight |
| Cobble | `#535353` | Dark secondary surfaces |
| Water | `#3f76e4` | Info, links |
| Lava | `#cf4913` | Destructive actions |
| Ember | `#ff6b35` | Alerts, emphasis |
| Redstone | `#aa0f01` | Danger, errors |

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
