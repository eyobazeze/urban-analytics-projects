# Phase 6 — Frontend Fundamentals (From Zero)

Estimated time: 3-4 weeks. This is a bigger phase than the others, so it's split into two parts: **Part A (HTML/CSS/JS)** — edit files directly, open in your browser, instant feedback — and **Part B (React + Tailwind)** — needs Node.js installed first.

Everything here uses your Addis Ababa sub-city data, same as every other phase, so it's not disconnected practice.

---

# Part A — HTML, CSS, JavaScript

## Files provided
- `index.html` — page structure with an Exercise 1.1 gap to fill in
- `style.css` — layout with Exercise 2.1 and 2.2 gaps
- `script.js` — behavior with Exercise 3.1 and 3.2 gaps

**How to work with these:** open `index.html` directly in your browser (double-click it, or right-click → Open With → your browser) after each edit to see the result immediately. This tight feedback loop — edit, save, refresh — is the entire workflow for frontend work.

---

## 1. HTML — structure & semantic tags

HTML describes structure and meaning, not appearance (that's CSS's job). The provided `index.html` already uses `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` — semantic tags that describe *what* each part is, not just a generic `<div>` everywhere.

**Exercise 1.1** (in `index.html`): add a `<section id="data">` with an `<h2>` and a `<table>` containing sub-city data, using proper `<thead>`/`<tbody>`/`<tr>`/`<th>`/`<td>` structure.

<details>
<summary>Solution 1.1</summary>

```html
<section id="data">
    <h2>Sub-City Data</h2>
    <table>
        <thead>
            <tr>
                <th>Sub-City</th>
                <th>Population</th>
                <th>Area (km²)</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Bole</td>
                <td>328,900</td>
                <td>122.8</td>
            </tr>
            <tr>
                <td>Yeka</td>
                <td>401,000</td>
                <td>85.9</td>
            </tr>
            <tr>
                <td>Kirkos</td>
                <td>235,100</td>
                <td>14.6</td>
            </tr>
        </tbody>
    </table>
</section>
```
</details>

---

## 2. CSS — box model, flexbox, grid

Every element is a box: **content → padding → border → margin**, inside to outside. `style.css` already sets `box-sizing: border-box` globally, which makes width calculations sane (padding/border count *inside* your declared width instead of adding to it).

**Flexbox** (already used in the nav bar) handles one-dimensional layout — a single row or column, with easy alignment and spacing (`justify-content`, `gap`).

**Grid** handles two-dimensional layout — rows AND columns together, better for genuine grid arrangements like a set of stat cards.

**Exercise 2.1** (in `style.css`): style your Exercise 1.1 table — full width, colored header, padding, borders, alternating row colors.

<details>
<summary>Solution 2.1</summary>

```css
table {
    width: 100%;
    border-collapse: collapse;
}

th {
    background-color: #0f172a;
    color: white;
    padding: 0.75rem;
    text-align: left;
}

td {
    padding: 0.75rem;
    border-bottom: 1px solid #e2e8f0;
}

tbody tr:nth-child(even) {
    background-color: #f1f5f9;
}
```
</details>

**Exercise 2.2** (add a `<div class="stat-cards">` with 3 `<div class="stat-card">` children to your HTML, then style in CSS):

<details>
<summary>Solution 2.2</summary>

HTML addition:
```html
<div class="stat-cards">
    <div class="stat-card"><strong>10</strong><span>Sub-Cities</span></div>
    <div class="stat-card"><strong>3.5M</strong><span>Population</span></div>
    <div class="stat-card"><strong>60</strong><span>Transit Stops</span></div>
</div>
```

CSS:
```css
.stat-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

.stat-card {
    background-color: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 1.5rem;
    text-align: center;
}

.stat-card strong {
    display: block;
    font-size: 1.5rem;
}
```
</details>

---

## 3. JavaScript — DOM manipulation

The DOM is the browser's live, changeable representation of your page. `document.querySelector()` finds elements; `document.createElement()` + `.appendChild()` builds new ones; changing `.textContent` updates what's visible immediately — no page reload needed.

**Exercise 3.1** (in `script.js`): append a 5th sub-city row to your table using JavaScript, built from the `subcityData` array already in the file (not hand-typed HTML).

<details>
<summary>Solution 3.1</summary>

```javascript
const tbody = document.querySelector("#data table tbody");
const newRow = document.createElement("tr");

const nameCell = document.createElement("td");
nameCell.textContent = "Lideta";
const popCell = document.createElement("td");
popCell.textContent = "210,300";
const areaCell = document.createElement("td");
areaCell.textContent = "9.4";

newRow.appendChild(nameCell);
newRow.appendChild(popCell);
newRow.appendChild(areaCell);
tbody.appendChild(newRow);
```
</details>

**Exercise 3.2**: clear the table body and rebuild ALL rows dynamically by looping over `subcityData` with `.forEach()`.

<details>
<summary>Solution 3.2</summary>

```javascript
const tbody = document.querySelector("#data table tbody");
tbody.innerHTML = ""; // clear existing rows

subcityData.forEach((subcity) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${subcity.name}</td><td>${subcity.population.toLocaleString()}</td><td>${subcity.area}</td>`;
    tbody.appendChild(row);
});
```

This pattern — loop over data, generate DOM elements — is exactly what React automates for you. Understanding it manually first is why React's version won't feel like magic when you get there.
</details>

## 4. `fetch`/`async` — conceptual

`script.js` includes a working (simulated) example of the `async`/`await` pattern you'll use for any real network request — including client-side calls to APIs. No exercise here; just read through `fetchExampleData()` in the file and make sure the flow makes sense: `fetch()` starts a request, `await` pauses *this function* (not the whole page) until it resolves, `try`/`catch` handles failures the same way Python's `try`/`except` does.

---

# Part B — React + Tailwind

## Setup — install Node.js first

1. Download the LTS version from https://nodejs.org
2. Run the installer (defaults are fine on Windows)
3. Verify in a new terminal: `node --version` and `npm --version` should both print version numbers

## Scaffold a new project

```bash
npm create vite@latest my-subcity-app -- --template react
cd my-subcity-app
npm install
npm install -D tailwindcss @tailwindcss/vite
```

**Tailwind v4 setup** (current version — simpler than older tutorials you might find online, which show a `tailwind.config.js` + PostCSS setup. That's the old v3 way):

In `vite.config.js`, add the Tailwind plugin:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

Replace the entire contents of `src/index.css` with just:
```css
@import "tailwindcss";
```

Run it:
```bash
npm run dev
```
Open the local URL it prints (usually `http://localhost:5173`).

---

## 5. React concepts

- **Component** — a JavaScript function that returns HTML-like syntax (JSX). `function SubCityTable() { return <table>...</table> }`
- **Props** — how a parent component passes data INTO a child component. `<SubCityTable data={subcityData} />` — inside `SubCityTable`, you receive `data` as a parameter.
- **State** (`useState`) — data a component "remembers" between renders. When state changes, React automatically re-renders anything depending on it — you never manually touch the DOM like in Part A.
- **Hooks** — functions starting with `use` (like `useState`, `useEffect`) that let function components tap into React features.

## 6. Tailwind CSS

Utility-first styling — instead of writing custom CSS classes, you compose small pre-built classes directly in your markup: `className="p-3 bg-slate-800 text-white"` means padding, background color, text color, all without leaving the JSX. It feels unusual at first coming from separate CSS files, but it's extremely fast once it clicks — no more switching between HTML and CSS files to check what a class does.

---

## Checkpoint — Phase 6

Build a single React component that:
1. Displays your Addis Ababa sub-city data as a table (from Part A's data, or expand it)
2. Displays a simple bar chart showing population per sub-city — no charting library required, plain styled `<div>`s sized by percentage work fine
3. Uses `useState` so that clicking a table row highlights the corresponding bar
4. Is styled entirely with Tailwind utility classes

This is the exact checkpoint from your roadmap ("interactive table + bar chart, own component structure, no tutorial copy-paste") — build it yourself before checking the reference.

<details>
<summary>Reference solution (App.jsx)</summary>

```jsx
import { useState } from "react";

const subcityData = [
  { name: "Bole", population: 328900, area: 122.8 },
  { name: "Yeka", population: 401000, area: 85.9 },
  { name: "Kirkos", population: 235100, area: 14.6 },
  { name: "Lideta", population: 210300, area: 9.4 },
  { name: "Addis Ketema", population: 345600, area: 11.4 },
];

function SubCityTable({ data, onRowClick }) {
  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-slate-800 text-white">
          <th className="p-3">Sub-City</th>
          <th className="p-3">Population</th>
          <th className="p-3">Area (km²)</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr
            key={row.name}
            onClick={() => onRowClick(row.name)}
            className="border-b border-slate-200 hover:bg-slate-100 cursor-pointer"
          >
            <td className="p-3">{row.name}</td>
            <td className="p-3">{row.population.toLocaleString()}</td>
            <td className="p-3">{row.area}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function PopulationBars({ data, highlighted }) {
  const maxPop = Math.max(...data.map((d) => d.population));

  return (
    <div className="space-y-2">
      {data.map((row) => (
        <div key={row.name} className="flex items-center gap-3">
          <span className="w-32 text-sm">{row.name}</span>
          <div className="flex-1 bg-slate-100 rounded h-6 overflow-hidden">
            <div
              className={`h-full rounded transition-all ${
                highlighted === row.name ? "bg-emerald-500" : "bg-slate-400"
              }`}
              style={{ width: `${(row.population / maxPop) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="max-w-3xl mx-auto p-8 font-sans">
      <h1 className="text-2xl font-bold mb-1">Addis Ababa Sub-City Explorer</h1>
      <p className="text-slate-500 mb-6">Click a row to highlight it in the chart below.</p>

      <SubCityTable data={subcityData} onRowClick={setSelected} />

      <h2 className="text-lg font-semibold mt-8 mb-3">Population by Sub-City</h2>
      <PopulationBars data={subcityData} highlighted={selected} />

      {selected && (
        <p className="mt-4 text-sm text-emerald-700">
          Selected: <strong>{selected}</strong>
        </p>
      )}
    </div>
  );
}
```

I actually scaffolded and built this exact component to confirm it compiles cleanly with the setup commands above — so if `npm run build` fails for you, the issue is almost certainly a setup step, not this code.
</details>

---

## Next steps

With Phase 6 done, **Phase 7 — Applied Portfolio Work** is where everything converges: swapping real WorldPop data into your transit-access project, and eventually hosting your Figma case studies plus your GeoPandas work on a real site built with these exact React + Tailwind skills.
