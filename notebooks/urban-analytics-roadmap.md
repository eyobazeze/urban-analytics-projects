# Urban Analytics Learning Roadmap — Starting from Zero

### For Eyob Azeze | Target pace: 2-3 hrs/day | Goal: Grad school portfolio + Addis Ababa urban systems work

---

## How to use this document

Each phase has: what you'll learn, why it matters for your goal, roughly how long it takes at your pace, and a checkpoint project to prove you've got it. Don't move to the next phase until the checkpoint works without you copy-pasting from a tutorial.

You've already done real work (the transit-access project, QGIS session, VS Code setup). That's not wasted — Phases 4 and 6 below will feel much faster because you'll be reinforcing rather than learning cold. This roadmap exists so the _foundation underneath_ that work is solid, not so you redo it.

---

## Phase 0 — Python Fundamentals (no prior assumptions)

**Estimated time: 2-3 weeks**

The goal here isn't to "know Python" abstractly — it's to be able to read someone else's script (or code I write for you) and understand every line, not just trust that it works.

**Core topics, in order:**

1. Variables, data types (`int`, `float`, `str`, `bool`)
2. Lists, tuples, dictionaries, sets — and when to use which
3. Control flow: `if`/`elif`/`else`, `for` loops, `while` loops
4. Functions: parameters, return values, default arguments
5. String formatting (f-strings especially — you'll use these constantly for file paths and labels)
6. File I/O: reading/writing `.txt` and `.csv` files with plain Python (before Pandas touches them)
7. Error handling: `try`/`except` — matters a lot once you're fetching OSM data that sometimes fails
8. Basic OOP: what a class/object is, enough to _read_ GeoPandas/OSMnx source when something breaks — not to write complex class hierarchies yourself

**Resources:**

- [Python.org's official tutorial](https://docs.python.org/3/tutorial/) — dry but accurate, good as reference
- "Automate the Boring Stuff with Python" (free online) — practical, not academic, good fit for your style

**Checkpoint project:** Write a plain-Python script (no Pandas) that reads a `.csv` of sub-city names and populations, calculates which sub-city has the highest population without using any external library, and writes the result to a new `.txt` file. If you can do this without looking anything up, Phase 0 is done.

---

## Phase 1 — Working Like a Developer

**Estimated time: 3-5 days**

Tools and habits, not language features.

1. Virtual environments — what `conda create -n` actually does under the hood, and why isolating environments matters (you've done this already, but understand _why_)
2. `pip` vs `conda` — when each is appropriate
3. Git basics: `init`, `add`, `commit`, `push`, `.gitignore` — since your projects go to GitHub
4. Reading error tracebacks — this is a skill on its own; most beginners panic at a 20-line error instead of reading the last 2 lines
5. Using VS Code's debugger (breakpoints, step-through) instead of scattering `print()` statements everywhere

**Checkpoint:** Take your Phase 0 checkpoint script, break it on purpose (e.g., typo a variable name), and fix it using only the traceback — no searching, no asking me.

---

## Phase 2 — Data Handling with Pandas (from true basics)

**Estimated time: 2 weeks**

This is where the [notebook I already built you](#) comes in — but now you'll actually understand _why_ each pattern works, not just that it does.

1. `Series` vs `DataFrame` — what they are structurally (this is where most people who "know Pandas" actually have gaps)
2. Reading data: `read_csv`, `read_excel`, handling messy headers/encodings
3. Selection: `.loc`, `.iloc`, boolean masking
4. Aggregation: `.groupby()`, `.agg()`
5. Combining data: `.merge()`, `.concat()`
6. Cleaning: missing data, duplicates, type conversion
7. Basic visualization: `.plot()`, then a bit of Matplotlib directly

**Checkpoint:** Rerun the Addis Ababa Pandas notebook from scratch — but this time, close the solutions and don't open them unless you're stuck for more than 10 minutes on one exercise.

---

## Phase 3 — Working with Real, Messy Data

**Estimated time: 1 week**

The gap between tutorial data and real data (like OSM exports or WorldPop rasters) is bigger than most courses admit.

1. Encoding issues, inconsistent column names, mixed types in one column
2. `apply()` and `lambda` for custom row-wise logic
3. Regular expressions basics (`re` module) — useful for cleaning address/name strings
4. JSON handling — since OSM data and API responses come back as JSON constantly

**Checkpoint:** Take one of the actual raw exports from your `addis-transit-access` project's early stage (before you cleaned it) and re-clean it from scratch, documenting each fix in comments.

---

## Phase 4 — Geospatial Python (builds on what you've already started)

**Estimated time: 3-4 weeks**

You've already run OSMnx, GeoPandas, and Folium in a real project. This phase fills the _conceptual_ gaps underneath that, so you're not just pattern-matching code you've seen before.

1. What a CRS (Coordinate Reference System) actually is, geometrically — not just "EPSG:32637 vs EPSG:4326," but _why_ projected vs. geographic CRS matters for area/distance calculations
2. Geometry types: Point, LineString, Polygon, MultiPolygon — and how Shapely represents them
3. Spatial joins and predicates (`intersects`, `within`, `contains`) — the logic behind "Select by Location" in QGIS
4. Buffers, unions, dissolves — what's actually happening mathematically, not just the function call
5. Raster basics: what a raster is vs. a vector, resolution, how WorldPop-style population rasters are structured
6. OSMnx internals: how it queries the Overpass API, what a network graph actually represents

**Checkpoint:** Rebuild the _core_ accessibility logic of your transit-access project (buffer around stops → intersect with sub-city polygons → compute served population) in a fresh notebook, without referring to your existing repo. Compare results against your original project.

---

## Phase 5 — QGIS Desktop Fundamentals (parallel track)

**Estimated time: ongoing, 2-3 sessions/week alongside other phases**

You've already covered symbology, table joins, reprojection, buffers, and spatial queries. Keep going with:

1. Hans van der Kwast's QGIS course (recommended in your existing roadmap) — finish this properly rather than picking up pieces
2. Spatial Thoughts tutorials for more advanced spatial analysis workflows
3. Practice recreating in QGIS what you build in GeoPandas — this cross-training makes both stronger, since QGIS shows you visually what's happening when GeoPandas code runs silently

---

## Phase 6 — Frontend Fundamentals (from zero)

**Estimated time: 3-4 weeks**

For your portfolio site and any interactive maps/dashboards.

1. HTML structure and semantic tags
2. CSS: box model, flexbox, grid — enough to lay out a page without fighting it
3. JavaScript fundamentals: variables, functions, DOM manipulation, fetch/async basics
4. React: components, props, state, hooks (`useState`, `useEffect`)
5. Tailwind CSS: utility-first styling
6. Connecting frontend to data: rendering a Folium/Leaflet map or a simple chart from your Pandas output inside a React page

**Checkpoint:** Build a single-page site that displays your Addis Ababa sub-city data (from Phase 2) as an interactive table plus a simple bar chart — no tutorial copy-paste, from your own component structure.

---

## Phase 7 — Applied Portfolio Work (where everything converges)

**Ongoing, alongside grad school application timeline**

This is where Phases 0-6 stop being separate skills and become one workflow:

1. Complete the second spatial analysis project (regression/clustering/network analysis) identified as high-impact for your UCL application
2. Integrate real WorldPop Ethiopia raster data into the transit-access project (replacing the synthetic population grid)
3. Build out your portfolio site (Phase 6 output) to host all five Figma case studies plus your GeoPandas projects
4. Tighten SOP faculty alignment references (Prof. Elsa Arcaute, Prof. Adam Dennett, Dr. Huanfa Chen) using data/insights from your own projects as talking points

---

## Suggested weekly rhythm (2-3 hrs/day)

| Day         | Focus                                                    |
| ----------- | -------------------------------------------------------- |
| Mon/Wed/Fri | Current phase's core material (Python/Pandas/Geospatial) |
| Tue/Thu     | QGIS practice (Phase 5, parallel)                        |
| Sat         | Applied project work (Phase 7 tasks)                     |
| Sun         | Rest or light review                                     |

---

## Where you actually are right now

Given what you've already built (transit-access project, QGIS fundamentals session, working VS Code + conda environment), you're realistically somewhere **between Phase 2 and Phase 4** already — this roadmap isn't suggesting you restart from Phase 0 in practice, it's giving you the checkpoints to _verify_ that foundation is solid before you build further on top of it. If Phase 0/1 checkpoints feel trivial, blitz through them in a day or two just to confirm, and spend your real time in Phases 3-4 where the actual gaps usually hide.
