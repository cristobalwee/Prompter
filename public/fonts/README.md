# Custom Fonts

This directory contains custom font files for the Prompter project.

## Adding Custom Fonts

1. Place your font files in this directory
2. Update the font declarations in `app/globals.css`
3. Update the font family in `tailwind.config.ts` if needed

## Supported Formats

- `.woff2` (recommended - best compression)
- `.woff` (good fallback)
- `.ttf` (if needed)

## Usage

### In CSS
```css
.your-class {
  font-family: 'YourCustomFont', sans-serif;
}
```

### In Tailwind
```jsx
<div className="font-custom">Your text here</div>
```

### In React components
```jsx
<div style={{ fontFamily: 'YourCustomFont, sans-serif' }}>
  Your text here
</div>
```

## Font File Naming Convention

Use descriptive names like:
- `your-font-regular.woff2`
- `your-font-bold.woff2`
- `your-font-italic.woff2`
- `your-font-light.woff2`

## Performance Tips

- Use `font-display: swap` for better loading performance
- Provide multiple font weights and styles as needed
- Consider using variable fonts for better performance 