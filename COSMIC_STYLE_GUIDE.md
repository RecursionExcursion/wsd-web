# 🌌 Cosmic Style Guide - Quick Script

Welcome to the cosmic design system for Quick Script! This guide provides everything you need to create beautiful, space-inspired user interfaces.

## 🎨 Color Palette

### Primary Colors
- **Cosmic Black** `#0D0D0F` - Deep space background
- **Nebula Purple** `#5A2A82` - Hero sections, highlights
- **Starlight Yellow** `#F4C542` - Calls to action, buttons, hover states
- **Aurora Pink** `#D154A0` - Secondary highlights, subtle borders
- **Milky White** `#F5F1E6` - Text and neutral balance

### Secondary Colors
- **Deep Purple** `#2C1A40` - Footer background
- **Muted Lavender** `#B3A9C9` - Subtext, labels

## 🔗 Link Variants

### Variant 1: Minimal Cosmic Link
- **Default**: Aurora Pink `#D154A0`
- **Hover**: Starlight Yellow underline
- **Active**: Bold + White text

```tsx
<CosmicLink href="/features" variant="cosmic">
  Features
</CosmicLink>
```

### Variant 2: Glow Effect
- **Default**: White `#F5F1E6`
- **Hover**: Purple glow (text-shadow with `#5A2A82`)
- **Active**: Starlight Yellow text

```tsx
<CosmicLink href="/docs" variant="glow">
  Documentation
</CosmicLink>
```

### Variant 3: Button-Like Link
- **Default**: Rounded pill with Purple bg `#5A2A82`, White text
- **Hover**: Yellow bg `#F4C542`, Black text
- **Active**: Black bg `#0D0D0F`, Yellow text

```tsx
<CosmicLink href="/get-started" variant="button">
  Get Started
</CosmicLink>
```

## 🔘 Button Variants

### Variant 1: Primary (Call to Action)
- **Default**: Yellow `#F4C542` background, Black text
- **Hover**: Brighter Yellow, White text
- **Active**: Darker Yellow border glow

```tsx
<Button variant="primary" size="md">
  Get Started
</Button>
```

### Variant 2: Secondary (Outlined)
- **Default**: Transparent bg, Purple border `#5A2A82`, White text
- **Hover**: Purple bg, White text
- **Active**: Pink bg `#D154A0`, Black text

```tsx
<Button variant="secondary" size="md">
  Learn More
</Button>
```

### Variant 3: Ghost (Minimal)
- **Default**: White text, no bg, subtle underline
- **Hover**: Pink text glow `#D154A0`
- **Active**: Yellow `#F4C542` text

```tsx
<Button variant="ghost" size="md">
  Cancel
</Button>
```

## 🏷 Header Design

- **Background**: Cosmic Black `#0D0D0F` with subtle gradient fade to Purple `#5A2A82`
- **Logo/Title**: Starlight Yellow
- **Nav Links**: Variant 1 (Minimal Cosmic Link)
- **CTA Button**: Variant 1 Primary Button

```tsx
<Header />
```

## 🦶 Footer Design

- **Background**: Deep Purple `#2C1A40`
- **Text**: Muted Lavender `#B3A9C9`
- **Links**: Variant 2 (Glow Effect)
- **Icons**: Yellow on hover

```tsx
<Footer />
```

## 🎯 Usage Examples

### Basic Page Structure
```tsx
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function MyPage() {
  return (
    <div className="min-h-screen bg-cosmic-black text-milky-white">
      <Header />
      
      <main className="flex-1 py-16">
        {/* Your content here */}
      </main>
      
      <Footer />
    </div>
  );
}
```

### Component Styling
```tsx
// Use cosmic color classes
<div className="bg-nebula-purple text-milky-white p-6 rounded-lg">
  <h2 className="text-starlight-yellow text-2xl font-bold mb-4">
    Section Title
  </h2>
  <p className="text-muted-lavender">
    Section description with muted text.
  </p>
</div>

// Use cosmic utility classes
<button className="btn-primary">Primary Action</button>
<button className="btn-secondary">Secondary Action</button>
<button className="btn-ghost">Ghost Action</button>
```

## 🚀 Getting Started

1. **Install Dependencies**: The style guide is already integrated into the project
2. **Import Components**: Use the pre-built components from `src/components/`
3. **Apply Classes**: Use the cosmic utility classes in your JSX
4. **Customize**: Extend the system by adding new variants or modifying existing ones

## 📱 Responsive Design

All components are built with responsive design in mind:
- Mobile-first approach
- Flexible layouts using CSS Grid and Flexbox
- Consistent spacing scales
- Touch-friendly interactive elements

## ♿ Accessibility

- High contrast color combinations
- Focus indicators for keyboard navigation
- Semantic HTML structure
- ARIA labels where appropriate
- Screen reader friendly

## 🎨 Customization

### Adding New Colors
```css
/* In src/styles/globals.css */
@theme {
  --color-new-cosmic: #your-hex-code;
}

/* In tailwind.config.ts */
colors: {
  cosmic: {
    new: "var(--color-new-cosmic)",
  },
}
```

### Creating New Variants
```tsx
// Extend existing components
<Button 
  variant="custom" 
  className="bg-cosmic-new text-milky-white"
>
  Custom Button
</Button>
```

## 🔍 Demo Page

Visit `/demo` to see all components in action with live examples and interactive states.

## 📚 Component Library

### Base Components
- `Button` - All button variants with size options
- `CosmicLink` - All link variants with external link support
- `Input` - Form inputs with cosmic styling
- `Card` - Content containers with cosmic themes

### Layout Components
- `Header` - Cosmic header with navigation
- `Footer` - Cosmic footer with links and social icons
- `MainLayout` - Main content layout wrapper

### Utility Classes
- Color utilities: `text-cosmic-black`, `bg-nebula-purple`, etc.
- Button utilities: `btn-primary`, `btn-secondary`, `btn-ghost`
- Link utilities: `link-cosmic`, `link-glow`, `link-button`

## 🌟 Best Practices

1. **Consistency**: Always use the predefined color palette
2. **Hierarchy**: Use Starlight Yellow for primary actions, Aurora Pink for secondary
3. **Contrast**: Ensure text is readable on all backgrounds
4. **Spacing**: Use consistent spacing scales (4, 8, 16, 24, 32, 48, 64)
5. **Transitions**: All interactive elements should have smooth transitions

## 🎭 Theming

The cosmic theme can be extended with:
- Dark/Light mode variations
- Seasonal color schemes
- Brand-specific adaptations
- Accessibility-focused modifications

---

*Built with cosmic energy and stellar design principles* ✨🚀
