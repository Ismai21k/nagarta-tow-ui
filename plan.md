# Implementation Plan - Emergency Button Enhancement

Modify the existing `EmergencyButton` component to include WhatsApp and Hotline buttons.

## 1. Component Modification (`src/components/ui/EmergencyButton.tsx`)
- Import `Phone` and `MessageCircle` icons from `lucide-react`.
- Update the structure to include two additional clickable elements (WhatsApp and Hotline).
- Use absolute positioning and `z-index` to layer these buttons.
- Ensure the original "Emergency Request" functionality remains accessible.
- Styling:
  - Main button: Existing yellow `AlertCircle` button.
  - WhatsApp button: Green theme, phone/chat icon, positioned above or offset.
  - Hotline button: Red or blue theme, phone icon, positioned above or offset.
  - Use `framer-motion` for smooth entrance/hover effects.

## 2. Technical Details
- WhatsApp link: `https://wa.me/1234567890` (placeholder).
- Hotline link: `tel:+1234567890` (placeholder).
- Use Tailwind for positioning: `absolute`, `-top-14`, etc.
- Ensure tooltips or labels are visible on hover.

## 3. Validation
- Verify all buttons are clickable.
- Verify z-index layering doesn't block interactions.
- Ensure responsive behavior (bottom-right placement).
- Run `validate_build`.
