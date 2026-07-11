# Warm Hearth Component Library

Parallel component set for the DCC makeover. The existing `components/` files (`button.html`, `card.html`, `input.html`) are the older blue-theme system and remain untouched — they will be retired in the DCC makeover sprint.

## What's here

- `SHOWCASE.html` — one-page demo of every Warm Hearth component in context. Open in a browser to see live patterns and copy-paste markup.

The canonical, fully-browsable demo with theme swap and typography samples lives at `../../styleguide/index.html`.

## Load order (required for any consuming page)

```html
<link rel="stylesheet" href="../../css/tokens.css">
<!-- optional: <link rel="stylesheet" href="../../css/tokens-dark.css"> -->
<link rel="stylesheet" href="../../css/fonts.css">
<link rel="stylesheet" href="../../css/components.css">
```

## Adding a new component

1. Add styles to `css/components.css` under the appropriate category.
2. Add a live example to `SHOWCASE.html` and to `styleguide/index.html`.
3. Run the accessibility checklist (see `styleguide/MAINTENANCE.md`).
4. Commit with message `feat(components): <name> — <one-line intent>`.
