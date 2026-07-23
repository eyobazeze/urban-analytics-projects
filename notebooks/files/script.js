// ============================================
// SECTION 3: JavaScript Fundamentals
// ============================================
// Variables: use `const` by default (value won't be reassigned),
// `let` when it will be, and avoid `var` (older, quirkier scoping rules).

const subcityData = [
    { name: "Bole", population: 328900, area: 122.8 },
    { name: "Yeka", population: 401000, area: 85.9 },
    { name: "Kirkos", population: 235100, area: 14.6 },
    { name: "Lideta", population: 210300, area: 9.4 },
];

// A function — same concept as Python, different syntax
function calculateDensity(population, area) {
    return (population / area).toFixed(1);
}

console.log("Bole density:", calculateDensity(328900, 122.8));

// ============================================
// EXERCISE 3.1 — DOM manipulation
// ============================================
// The DOM (Document Object Model) is JavaScript's live representation
// of the HTML page — you can select elements and change them, and the
// browser updates the visible page immediately.
//
// Task: select the <section id="data"> element you built in HTML
// Exercise 1.1, and use JavaScript to APPEND a new row to your table
// for a 5th sub-city, built entirely from `subcityData` above (don't
// hand-type it in HTML — generate it with JS).
//
// Useful methods: document.querySelector(), document.createElement(),
// element.appendChild(), element.textContent

// Your Exercise 3.1 code here


// ============================================
// EXERCISE 3.2 — Loop through data, build content dynamically
// ============================================
// Task: instead of relying on the HTML table you hand-wrote, clear out
// the table body entirely and rebuild ALL rows dynamically by looping
// over `subcityData` with forEach(). This is the pattern React
// automates for you later — understanding it manually first makes
// React's version click faster.

// Your Exercise 3.2 code here


// ============================================
// SECTION 4 (conceptual) — fetch/async basics
// ============================================
// You don't have a live API to call right now, but here's the pattern
// you'll use constantly once you do (e.g. fetching OSM data client-side,
// or your own backend). `async`/`await` lets asynchronous code (things
// that take time, like network requests) read top-to-bottom instead of
// nesting callbacks.

async function fetchExampleData() {
    try {
        // In a real scenario this would be a real URL:
        // const response = await fetch("https://api.example.com/subcities");
        // const data = await response.json();

        // Simulated version so this runs without a real network call:
        const data = await new Promise((resolve) => {
            setTimeout(() => resolve(subcityData), 500);
        });

        console.log("Fetched data:", data);
        return data;
    } catch (error) {
        console.error("Fetch failed:", error);
    }
}

fetchExampleData();
