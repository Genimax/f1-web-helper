# F1 Web Helper Design Guide for AI Agents

Use this guide before creating or changing UI in this repository. It summarizes the current website style from the live codebase and turns it into implementation rules that are easy for agents to follow.

## Source of Truth

- Global imports: `src/app/globals.scss`
- Design tokens: `src/shared/styles/variables.scss`
- Global theme and reset: `src/shared/styles/globals.scss`
- Shared mixins: `src/shared/styles/mixins.scss`
- Font utility classes: `src/shared/styles/fonts.scss`
- Reusable UI components: `src/shared/ui/*`
- Page shell: `src/app/page.tsx` and `src/app/page.module.scss`
- Main composite widgets: `src/widgets/*`

## Visual Direction

The product is a Formula 1 data dashboard. Keep the interface dark-first, data-dense, and performance-oriented. The style should feel like motorsport timing screens: sharp contrast, compact information, red racing accents, restrained glow effects, and clear responsive layouts.

Do not redesign toward a generic SaaS dashboard or a marketing landing page. New UI should look like it belongs beside the current standings, schedule, countdown, tabs, badges, and modal patterns.

## Styling Stack

- Use SCSS modules for component styles: `ComponentName.module.scss`.
- At the top of SCSS modules, import shared styles:

```scss
@use "../../../shared/styles/variables";
@use "../../../shared/styles/mixins";
```

Adjust the relative path for the file location.

- Use SCSS variables for fixed tokens like spacing, font sizes, radii, shadows, breakpoints, and F1 brand colors.
- Use CSS custom properties for theme-aware colors:
  - `var(--bg-primary)`
  - `var(--bg-secondary)`
  - `var(--bg-tertiary)`
  - `var(--bg-card)`
  - `var(--bg-hover)`
  - `var(--text-primary)`
  - `var(--text-secondary)`
  - `var(--text-muted)`
  - `var(--text-accent)`
  - `var(--border-primary)`
  - `var(--border-secondary)`
  - `var(--border-accent)`
- Do not hard-code dark or light theme surface/text colors when an existing custom property is available.
- Hard-coded brand colors are acceptable only for semantic F1 accents, podium medals, status tags, and special racing effects.

## Color System

Primary brand colors from `variables.scss`:

```scss
$f1-red: #e10600;
$f1-red-dark: #b80500;
$f1-blue: #00d2be;
$f1-orange: #ff8700;
$f1-gold: #ffd700;
```

Default dark theme:

- Page background: `var(--bg-primary)`
- Section background: `var(--bg-secondary)` or `var(--bg-tertiary)`
- Card/module background: `var(--bg-card)`
- Hover background: `var(--bg-hover)`
- Primary text: `var(--text-primary)`
- Secondary text: `var(--text-secondary)`
- Metadata text: `var(--text-muted)`
- Main accent: `var(--text-accent)` or `variables.$f1-red`

Light theme is controlled by `[data-theme="light"]` in `globals.scss`. New UI must work in both themes by using the CSS custom properties above.

## Typography

- Use `variables.$font-family-primary` for UI text. It maps to the local Formula 1 display font with system fallbacks.
- Use `variables.$font-family-mono` only for code-like, time-like, or numeric technical displays when needed.
- Use existing fluid type tokens:
  - `variables.$font-size-xs`
  - `variables.$font-size-sm`
  - `variables.$font-size-base`
  - `variables.$font-size-lg`
  - `variables.$font-size-xl`
  - `variables.$font-size-2xl`
  - `variables.$font-size-3xl`
  - `variables.$font-size-4xl`
  - `variables.$font-size-5xl`
- Prefer semibold or bold for labels, headings, positions, and key stats.
- Use uppercase labels with `letter-spacing: 0.05em` for compact metadata labels, matching current mobile cards and table details.

## Layout

The main page structure is:

```tsx
<div className={styles.page}>
  <Header />
  <ThemeToggle />
  <main className={styles.main}>
    <div className={styles.container}>
      <ChampionshipModule />
    </div>
  </main>
  <Footer />
</div>
```

Use the same layout concepts for new page-level areas:

- Page: `min-height: 100vh`, flex column, `background: var(--bg-primary)`.
- Main content: generous vertical padding, currently `variables.$spacing-12 0`.
- Container: `max-width: variables.$breakpoint-xl`, centered, horizontal padding `variables.$spacing-4`, increasing to `variables.$spacing-6` on desktop.
- Modules: large bordered surfaces with `var(--bg-card)`, `var(--border-primary)`, `variables.$radius-2xl`, and `variables.$shadow-2xl`.

## Responsive Rules

Use mixins from `mixins.scss`:

```scss
@include mixins.mobile { ... }  // max-width: 639px
@include mixins.tablet { ... }  // 769px through 1023px
@include mixins.desktop { ... } // min-width: 1024px
```

Current responsive behavior:

- Desktop and tablet data views use tables or grid rows.
- Mobile data views become stacked cards.
- Mobile cards use clear label/value rows, compact spacing, and strong hierarchy.
- Header content stacks vertically on mobile.
- Tabs wrap on mobile.

For new data-heavy features, build both desktop and mobile presentation paths if the table would become cramped.

## Components and Patterns

### Buttons

Use `src/shared/ui/Button/Button.tsx` when possible.

Variants:

- `primary`: red gradient, white text, red glow, slight upward hover movement.
- `secondary`: theme-aware card surface, border, subtle hover.
- `ghost`: transparent, muted text, hover surface.

Sizes:

- `small`
- `medium`
- `large`

If a custom button is necessary, match `Button.module.scss`: inline-flex center alignment, `variables.$radius-lg`, `variables.$font-weight-medium`, and `variables.$transition-fast`.

### Tabs

Use the pattern in `ChampionshipModule.module.scss`:

- Tab group: `display: flex`, small gap, `var(--bg-primary)` background, `variables.$radius-xl`, border.
- Tab: compact padded button, muted by default.
- Active tab: red gradient, white text, red glow, slight upward transform.
- Tabs should wrap on mobile.

### Tables

Use `src/shared/ui/Table/Table.tsx` for generic data tables.

Current table behavior:

- Container: `var(--bg-secondary)`, `variables.$radius-xl`, border, hidden overflow.
- Header: CSS grid, `var(--bg-tertiary)`, bottom border.
- Row: CSS grid, `var(--bg-card)`, bottom border.
- Row hover: `var(--bg-hover)` and slight horizontal movement.
- Top three rows get gold/silver/bronze treatment with left border, gradient overlay, and glow on hover.
- Clickable rows use `role="button"` and keyboard handling.

When adding a new table:

- Define explicit column widths.
- Keep numeric stats aligned and readable.
- Provide mobile card fallback for small screens.
- Use `data-label` for mobile table-cell labels if reusing the shared table.

### Mobile Cards

Use `src/shared/ui/MobileCard/MobileCard.tsx` for small-screen records.

Pattern:

- `var(--bg-card)` background.
- `var(--border-primary)` border.
- `variables.$radius-lg`.
- `variables.$spacing-4` padding.
- Hover: `var(--bg-hover)`, slight upward movement, medium shadow.
- Label/value rows with uppercase muted labels.
- Important stat values use `var(--text-primary)` or `var(--text-accent)`.

### Badges

Use `src/shared/ui/Badge/Badge.tsx` for standings positions and rank indicators.

Variants in styles:

- `default`: neutral background and muted text.
- `top`: gold gradient.
- `accent`: red gradient.
- `gold`, `silver`, `bronze`: podium-specific gradient, glow, border, and shimmer.

Use podium treatment only for competitive rankings, not normal labels.

### Modals

Use `src/shared/ui/Modal/Modal.tsx`.

Pattern:

- Fixed dark translucent backdrop with blur.
- Card surface on top with `var(--bg-card)`, border, `variables.$radius-xl`, `variables.$shadow-2xl`.
- Scale transition on open.
- Header with title and close button.
- Close button should use theme-aware hover and visible focus outline.

## Motion

Use motion sparingly to reinforce state and hierarchy:

- Standard transitions: `variables.$transition-fast` or `variables.$transition-normal`.
- Hover translations are small: `translateY(-1px)`, `translateY(-2px)`, or `translateX(4px)`.
- Red glow is reserved for primary actions, active tabs, key racing accents, and top-level brand emphasis.
- Avoid heavy animation in dense data regions.
- Existing global styles apply transitions to background, color, and border changes.

## Accessibility

- Preserve semantic buttons for interactive controls.
- Clickable table rows must be keyboard-accessible with `Enter` and `Space`.
- Use `:focus-visible` or component focus styles with `var(--text-accent)`.
- Do not rely on color alone for critical status; pair color with text labels.
- Maintain contrast in both dark and light themes by using theme variables.
- Avoid hiding labels on mobile data cards; compact labels are part of the current pattern.

## File and Architecture Rules

The project follows a Feature-Sliced Design style:

- `src/app`: Next.js App Router shell and API routes.
- `src/widgets`: composite page sections.
- `src/features`: feature-specific UI and behavior.
- `src/entities`: domain model types and mock data.
- `src/shared/ui`: reusable UI primitives.
- `src/shared/styles`: global design tokens and mixins.
- `src/shared/lib`: utilities, store, hooks, and F1 helpers.

When adding UI:

- Reusable primitive: place in `src/shared/ui`.
- Specific feature display: place in `src/features/<feature>/ui`.
- Page-level composition: place in `src/widgets`.
- Keep styles next to the component as `ComponentName.module.scss`.
- Prefer existing shared UI before creating new components.

## Agent Implementation Checklist

Before editing UI:

1. Read `src/shared/styles/variables.scss`, `globals.scss`, and the closest existing component style file.
2. Reuse existing components from `src/shared/ui` where possible.
3. Use CSS custom properties for theme-aware colors.
4. Use SCSS spacing, radius, font, shadow, and transition tokens.
5. Match existing module/card/table/mobile-card patterns.
6. Add a mobile layout path for dense data.
7. Check light and dark theme implications.
8. Keep motion subtle and purposeful.
9. Avoid introducing a new design language without updating this guide.

## Example SCSS Skeleton

```scss
@use "../../../shared/styles/variables";
@use "../../../shared/styles/mixins";

.section {
    background: var(--bg-card);
    border: 1px solid var(--border-primary);
    border-radius: variables.$radius-2xl;
    box-shadow: variables.$shadow-2xl;
    overflow: hidden;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: variables.$spacing-4;
    padding: variables.$spacing-6;
    background: linear-gradient(
        135deg,
        var(--bg-secondary) 0%,
        var(--bg-tertiary) 100%
    );
    border-bottom: 1px solid var(--border-primary);
}

.title {
    margin: 0;
    color: var(--text-primary);
    font-size: variables.$font-size-2xl;
    font-weight: variables.$font-weight-bold;
}

.meta {
    color: var(--text-muted);
    font-size: variables.$font-size-sm;
    font-weight: variables.$font-weight-medium;
}

.content {
    padding: variables.$spacing-6;
}

@include mixins.mobile {
    .header {
        flex-direction: column;
        align-items: stretch;
        padding: variables.$spacing-4;
    }

    .content {
        padding: variables.$spacing-4;
    }
}
```

## Avoid

- Do not use Tailwind classes; this project uses SCSS modules.
- Do not create global styles for one-off component concerns.
- Do not hard-code theme surface or text colors when custom properties exist.
- Do not make large rounded marketing cards unrelated to the dashboard.
- Do not add broad new color palettes; extend from F1 red, blue, orange, gold, and theme neutrals.
- Do not remove mobile card behavior for data-heavy views.
- Do not use podium gold/silver/bronze styling for non-ranking content.
- Do not add excessive glow, blur, or animation to dense tables.
