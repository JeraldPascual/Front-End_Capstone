# NOTES.md — Scratch ARIA Components vs. shadcn/ui + Radix

**Author:** Jerald A. Pascual  
**Assignment:** FlyRank Foundations — Build Three Accessible Components from Scratch  
**Date:** September 3, 2026  

---

## Summary

After building three interactive components from scratch (Modal Dialog, Tabs, Disclosure) following the W3C ARIA Authoring Practices Guide, I installed shadcn/ui (which wraps Radix UI primitives) and read through the generated source code. Below are the concrete gaps between my scratch implementations and what shadcn/Radix handles automatically.

---

## Gap 1: Portal Mounting & Stacking Context Isolation

**What shadcn/Radix does:** The `<DialogPortal>` component renders the modal overlay and content into a new React portal appended to `document.body`, completely outside the parent component's DOM tree.

**What my scratch version misses:** My `ScratchModal` renders inline within whatever parent component mounts it. This means:
- If a parent element has `overflow: hidden`, `transform`, or `filter` CSS, the modal can be clipped, repositioned, or visually broken.
- The stacking context (`z-index`) is relative to the parent, not the document root, making it fragile in deeply nested component trees.
- In a real application with multiple layered modals or tooltips, stacking order conflicts are likely without portal isolation.

**Radix source reference:** `@radix-ui/react-dialog` uses `@radix-ui/react-portal`, which calls `ReactDOM.createPortal(children, document.body)` and ensures the modal sits at the top of the DOM tree regardless of where it is declared in JSX.

---

## Gap 2: Inert Background Tree (`aria-hidden` on Siblings)

**What shadcn/Radix does:** When a Radix dialog opens, it sets `aria-hidden="true"` on all sibling DOM branches outside the dialog portal. This means screen readers cannot navigate to *any* content behind the modal — not just elements that would receive focus via Tab.

**What my scratch version misses:** My implementation only traps keyboard focus (intercepting `Tab` and `Shift+Tab`). However:
- A screen reader user using virtual cursor (e.g., NVDA's arrow keys or VoiceOver's rotor) can still "escape" the modal and read background content, because the background DOM nodes remain visible to the accessibility tree.
- Radix uses the `aria-hidden` package to walk the DOM tree and mark every sibling of the portal container as `aria-hidden="true"`, then restores them on close. My version does not do this.
- Additionally, Radix applies `pointer-events: none` on the document body to prevent mouse interaction with the background, while my version only prevents click-through via the backdrop overlay.

---

## Gap 3: Scroll Lock with Scrollbar Width Compensation

**What shadcn/Radix does:** When the dialog opens, Radix locks body scroll by setting `overflow: hidden` on `document.body`, but *also* calculates the scrollbar width (`window.innerWidth - document.documentElement.clientWidth`) and applies a compensating `padding-right` on the body. This prevents the page layout from "jumping" when the scrollbar disappears.

**What my scratch version misses:** My modal sets `document.body.style.overflow = 'hidden'` to prevent background scrolling, but does not compensate for the scrollbar width. On desktop browsers with visible scrollbars (Windows Chrome/Firefox with classic scrollbars), opening the modal causes a visible horizontal layout shift as the 15-17px scrollbar vanishes and content reflows to fill the space. This is a subtle but real UX degradation that Radix handles automatically.

---

## Gap 4: Automatic ID Generation & Wiring

**What shadcn/Radix does:** Radix Tabs and Dialog use `React.useId()` (or an internal ID utility) to automatically generate unique, matching ID pairs for `aria-controls` / `aria-labelledby` / `aria-describedby` relationships. The developer never writes an `id` prop.

**What my scratch version misses:** My `ScratchTabs` and `ScratchModal` require manual `id` strings (e.g., `scratch-tab-${tab.id}`, `scratch-tabpanel-${tab.id}`). This is error-prone:
- A typo in the `id` silently breaks the ARIA relationship with no runtime error.
- Reusing the same component twice on a page without unique IDs causes duplicate `id` attributes, which is invalid HTML and breaks assistive technology.
- Radix's approach is zero-configuration and collision-free.

---

## Gap 5: RTL and Vertical Orientation Support (Tabs)

**What shadcn/Radix does:** Radix Tabs supports `dir="rtl"` and `orientation="vertical"`. In RTL mode, `ArrowLeft` moves forward and `ArrowRight` moves backward. In vertical orientation, `ArrowUp` and `ArrowDown` replace the horizontal arrow keys.

**What my scratch version misses:** My `ScratchTabs` hardcodes `ArrowRight` as "next" and `ArrowLeft` as "previous" with `aria-orientation="horizontal"`. It does not:
- Detect or respect the document's text direction (`dir` attribute).
- Support a `vertical` orientation mode where `ArrowUp`/`ArrowDown` would be the correct navigation keys.
- This means my component would be broken for RTL languages (Arabic, Hebrew) and for vertically-stacked tab layouts.

---

## Additional Observations

### Animation & Exit Transitions
Radix Dialog uses `data-[state=open]` and `data-[state=closed]` data attributes that enable CSS-based enter/exit animations. My scratch modal either exists in the DOM or doesn't (`if (!isOpen) return null`), making exit transitions impossible without additional state management (e.g., an `isClosing` intermediate state with `animationend` listeners).

### Composable Compound Component API
shadcn/Radix exposes composable sub-components (`Dialog.Trigger`, `Dialog.Content`, `Dialog.Title`, etc.) that can be composed in any order with `asChild` prop merging. My scratch components are monolithic — the trigger button must be managed externally, and the internal structure is not configurable.

### TypeScript: Zero `any` Types
Both my scratch components and the shadcn wrappers use fully typed props with no `any` escapes. The key difference is that Radix provides deeply generic ref-forwarding types (`React.ComponentPropsWithoutRef<typeof Primitive>`) that allow consumers to pass any valid HTML attribute, while my components accept a narrower custom props interface.

---

## Conclusion

The two most significant gaps are **portal mounting** (Gap 1) and **inert background trees** (Gap 2). These are not cosmetic — they represent real accessibility failures where my scratch modal allows screen reader users to navigate behind the dialog, violating the W3C APG requirement that a modal dialog must be the *only* content available to the user while open. shadcn/Radix solves both correctly by default.
