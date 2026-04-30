# Astro View Transitions — Event Patterns

## Events cheat sheet

| Event | When it fires | DOM state |
|---|---|---|
| `astro:before-swap` | Just before old DOM is replaced | Old DOM still present |
| `astro:after-swap` | Immediately after DOM is replaced | New DOM present, scripts not yet re-run |
| `astro:page-load` | After new page scripts have executed | New DOM fully ready |

---

## When to use which

### `astro:page-load`
Use when your code only needs the DOM to be ready and has no side effects from running multiple times. Good default for most things.

```js
document.addEventListener('astro:page-load', () => {
  // init lozad, tooltips, simple event bindings, etc.
});
```

**Gotcha:** This also runs inline script tags again, so if your script mutates or reorders the DOM (e.g. for responsive layouts), it may conflict with the already-rendered HTML coming in from the swap — causing double execution or layout flicker.

---

### `astro:after-swap`
Use when your code restructures the DOM (reordering elements, classes on `<html>`, theme restoration) and needs to run *before* scripts fire, or when `page-load` causes double-execution issues.

```js
document.addEventListener('astro:after-swap', () => {
  // reorder nav items for mobile, restore dark mode class, etc.
});
```

**Real example from this project:** The Navigation script reorders HTML elements depending on screen resolution. Using `page-load` re-ran the reorder on an already-reordered DOM. Switching to `after-swap` fixed it because it runs once on the fresh, unmodified incoming DOM.

---

### Run once on first load, then on every swap

```js
function init() { /* ... */ }

init(); // first load (no event yet)
document.addEventListener('astro:after-swap', init); // every navigation
```

Use this when a library or listener should only be registered once globally (e.g. scroll listeners, IntersectionObserver instances you manage yourself).

---

## Decision guide

```
Does your code restructure/reorder the DOM?
  └─ Yes → astro:after-swap

Does your code need to run after new page scripts execute?
  └─ Yes → astro:page-load

Does running the code twice on the same DOM cause bugs?
  └─ Yes → astro:after-swap

Otherwise → astro:page-load (simpler, works for most cases)
```

---

## Guard against multiple initializations — when yes, when no

### No guard needed
The events themselves (`page-load`, `after-swap`) fire **once per navigation**, so your handler only runs once per swap. No guard needed for:

- Re-initializing things scoped to the page DOM (lozad, tooltips, form bindings)
- Setting classes or attributes on incoming elements
- Anything that runs on a fresh set of DOM nodes each time

### Guard IS needed — persistent elements
`document`, `window`, and `<body>` **survive navigation**. If you attach a listener to them inside a `page-load`/`after-swap` handler, each navigation stacks another copy of that listener.

```js
// BAD — after 3 navigations, handler fires 3 times per click
document.addEventListener('astro:page-load', () => {
  document.addEventListener('click', handler); // accumulates!
});
```

**Fix 1 — remove before re-adding:**
```js
document.addEventListener('astro:page-load', () => {
  document.removeEventListener('click', handler);
  document.addEventListener('click', handler);
});
```

**Fix 2 (preferred) — register persistent listeners once, outside the event:**
```js
// Top-level: runs once, survives navigation
document.addEventListener('click', handler);

// Inside the event: only page-specific re-init
document.addEventListener('astro:page-load', () => {
  initLozad();
});
```

### Quick rule
> If the target element is **replaced on every swap** → no guard needed.  
> If the target element **persists across navigations** (`document`, `window`, `<body>`) → guard or move the listener outside the event.




Observers and timers (IntersectionObserver, MutationObserver, setInterval) hold references that outlive the DOM — always disconnect them on astro:before-swap. Event listeners on replaced elements clean themselves up automatically.

---

## Custom elements for repeated components

### When to use a custom element
Use a custom element when the behavior belongs to **one component instance** and that component may appear multiple times on the page.

Good fit:

- A video component with its own lazy loading, play state, and mute button
- A reusable accordion, slider, or gallery
- Anything that needs setup and cleanup per instance

Not a good fit:

- Site-wide navigation behavior
- Global theme handling
- One-off page scripts that are not tied to a reusable DOM instance

### Why this works well with Astro view transitions
The browser automatically calls a custom element's lifecycle methods whenever the element is added to or removed from the DOM.

- `connectedCallback()` runs when the new page's element is inserted
- `disconnectedCallback()` runs when the old page's element is removed

That means you usually do **not** need `astro:page-load` or `astro:after-swap` inside the component at all.

```js
class SanityVideoElement extends HTMLElement {
  connectedCallback() {
    // setup for this instance only
  }

  disconnectedCallback() {
    // cleanup for this instance only
  }
}

if (!customElements.get('sanity-video')) {
  customElements.define('sanity-video', SanityVideoElement);
}
```

### What `customElements` is
`customElements` is **not Astro**. It is the browser's built-in `CustomElementRegistry` API.

- `customElements.define('sanity-video', ClassName)` registers a custom HTML tag
- `customElements.get('sanity-video')` checks whether it has already been registered

The guard matters because calling `define()` twice for the same name throws an error.

### Lesson from this project
`SanityVideo` worked better as a custom element because each video instance needed its own:

- IntersectionObserver
- source loading
- autoplay attempt
- mute button listener
- cleanup

That logic was instance-scoped, not page-scoped.

---

## Truly global scripts with Astro view transitions

### What counts as truly global
A script is truly global when it manages behavior that belongs to the persistent app shell or to persistent browser objects, not to one swappable page fragment.

Typical examples:

- Navigation behavior in a shared layout
- Theme or `<html>` class restoration
- Global keyboard shortcuts
- Scroll listeners on `window`
- Document-level click delegation

### Correct pattern
Split the script into two kinds of work:

1. **Global listeners / long-lived state**: register once at top level
2. **DOM-dependent re-init**: run once now, then again after each swap

```js
let resizeController = null;

function setupLayout() {
  if (resizeController) resizeController.abort();
  resizeController = new AbortController();

  applyLayout();
  window.addEventListener('resize', applyLayout, {
    signal: resizeController.signal,
  });
}

setupLayout();
document.addEventListener('astro:after-swap', setupLayout);
```

### When to use `after-swap` for a global script
Use `astro:after-swap` when the script needs to touch the incoming DOM **before** later scripts or visual flashes make the page look wrong.

Best for:

- Reordering navigation markup
- Restoring classes on `<html>` or `<body>`
- Applying structural DOM changes immediately after swap

### When to use `page-load` for a global script
Use `astro:page-load` when the script depends on the new page being fully initialized first.

Best for:

- Re-initializing plugins that expect the final DOM
- Measuring layout after scripts have run
- Simple page-level enhancements with no DOM restructuring

### Navigation example from this project
Your navigation script is a good example of a correct truly global script:

- It lives in a shared layout component
- It runs immediately on first load
- It re-runs on `astro:after-swap`
- It tears down the previous `resize` listener before re-attaching
- It updates DOM structure early enough to avoid mobile/desktop layout flash

That is why `after-swap` was the right event there, while `page-load` was the wrong one.

### Global script checklist

- Put the script in a shared layout or other persistent shell component
- Register persistent listeners only once, or tear them down before re-adding
- Re-run only the DOM-dependent parts after navigation
- Use `astro:after-swap` for structural DOM fixes
- Use `astro:page-load` for post-init enhancements
- Clean up observers, timers, and long-lived listeners when they would otherwise stack