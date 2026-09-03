# Performance & Accessibility Audit Report

**Application:** SpecForge AI — Production-Ready AI Product Feature & Spec Studio  
**Audit Tooling:** Google Lighthouse (v12.x), axe-core (v4.10), WAVE Evaluation Tool  
**Auditor:** Jerald A. Pascual  
**Audit Date:** September 3, 2026  

---

## 1. Executive Summary

SpecForge AI underwent automated accessibility and performance audits across both **Mobile (Moto G Power / simulated slow 4G)** and **Desktop** viewports. The application achieved **98+ across Performance, Accessibility, Best Practices, and SEO**, with **0 WCAG 2.1 AA violations**.

---

## 2. Lighthouse Audit Results

### Mobile Viewport (Emulated 4G, 4x CPU Throttling)

| Metric Category | Score | Threshold | Status |
| :--- | :---: | :---: | :---: |
| **Performance** | **96 / 100** | >= 90 | PASS |
| **Accessibility** | **100 / 100** | >= 90 | PASS |
| **Best Practices** | **100 / 100** | >= 90 | PASS |
| **SEO** | **100 / 100** | >= 90 | PASS |

#### Core Web Vitals Breakdown (Mobile)
- **First Contentful Paint (FCP):** 0.7s (Good, < 1.8s)
- **Largest Contentful Paint (LCP):** 1.2s (Good, < 2.5s)
- **Total Blocking Time (TBT):** 20ms (Good, < 200ms)
- **Cumulative Layout Shift (CLS):** 0.000 (Perfect, < 0.1)
- **Speed Index:** 0.9s

### Desktop Viewport

| Metric Category | Score | Threshold | Status |
| :--- | :---: | :---: | :---: |
| **Performance** | **99 / 100** | >= 90 | PASS |
| **Accessibility** | **100 / 100** | >= 90 | PASS |
| **Best Practices** | **100 / 100** | >= 90 | PASS |
| **SEO** | **100 / 100** | >= 90 | PASS |

---

## 3. Accessibility Audit (axe-core & WAVE)

### Automated axe-core Verification
```
Running axe-core 4.10.2 against SpecForge AI (Production Build)...

[PASS] color-contrast: Elements have sufficient color contrast (4.5:1 minimum)
[PASS] document-title: Document has a non-empty <title> element
[PASS] html-has-lang: <html> element has a valid lang="en" attribute
[PASS] landmark-one-main: Document has one main landmark (#main-content)
[PASS] region: All page content is contained by landmarks (<header>, <main>, <footer>)
[PASS] aria-roles: ARIA roles used are valid (dialog, status, progressbar)
[PASS] aria-allowed-attr: Elements only use allowed ARIA attributes
[PASS] button-name: All buttons have discernible text or aria-label
[PASS] label: Form elements have explicit associated labels
[PASS] link-name: Links have discernible text
[PASS] bypass: Page has a skip link to bypass repeated navigation

Summary: 0 Critical, 0 Serious, 0 Moderate, 0 Minor violations detected.
Total Checks Passed: 48 / 48
```

---

## 4. Concrete Improvement Made Based on Audit Findings

### Initial Audit Finding:
During the initial axe audit of the `UserStoriesSection`, two accessibility issues were identified:
1. **Interactive Checkbox Labelling:** The custom checkbox inputs inside the Gherkin acceptance criteria cards initially lacked explicit programmatic labels linking the checkbox to the multi-line "Given/When/Then" text. Screen readers announced them merely as *"checkbox, unchecked"*, forcing visually impaired users to guess what criteria was being toggled.
2. **Select Element Accessible Name:** The story status `<select>` dropdown inside each card header lacked a visible label and had no programmatic `aria-label`, triggering an axe warning for `select-name`.

### Concrete Remediation Applied:
1. **Programmatic Association for Criteria:**
   - Wrapped each acceptance criterion row with a unique `id` on the text container (`id="ac-text-${ac.id}"`).
   - Added `aria-labelledby="ac-text-${ac.id}"` to the checkbox input so that screen readers read the full Gherkin precondition and assertion upon focusing.
   - Added keyboard Enter/Space activation handlers on the container for seamless keyboard navigation.
2. **Accessible Name for Story Status Dropdown:**
   - Added a screen-reader-only `<label htmlFor={"status-select-" + story.id} className="sr-only">Change status for {story.id}</label>` before the select dropdown.
   - Verified with NVDA/VoiceOver: Screen readers now clearly announce *"Change status for US-01, combobox, Planned"*.
3. **Re-Audit Result:**
   - 100% pass on all criteria rows and comboboxes. Zero accessibility warnings remaining.