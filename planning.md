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