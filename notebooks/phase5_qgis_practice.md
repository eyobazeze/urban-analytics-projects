# Phase 5 — QGIS Practice: Recreating Your GeoPandas Checkpoint Visually

You've already covered symbology, table joins, reprojection, buffers, and spatial queries in an earlier QGIS session. This session goes one level further: recreate the **exact accessibility analysis** from your Phase 4 GeoPandas checkpoint (buffer stops → intersect with sub-city boundaries → compute coverage %), but visually — so you see geometrically what your code was doing silently.

---

## Why this matters

Code hides the geometry from you. QGIS doesn't. When `polygon.intersection(buffer_union)` runs in Python, you get a number back — no picture. When you do the equivalent in QGIS, you *see* the overlap shape. Doing both builds a much sturdier mental model than either alone.

---

## Setup

You'll need:
1. QGIS Desktop (already installed, per your earlier session)
2. Your Addis Ababa sub-city boundary shapefile (from HDX, used in your earlier session)
3. A point layer for transit stops — if you don't have real stop data loaded yet, create a temporary scratch layer with a handful of points scattered across sub-cities (Layer → Create Layer → New Shapefile Layer, geometry type Point, same CRS as your sub-city layer)

---

## Step-by-step

### 1. Confirm your CRS situation
Before anything else, check both layers' CRS (right-click layer → Properties → Information, or just check the CRS badge in the bottom-right status bar when the layer is selected). Your sub-city boundaries are probably `EPSG:4326` originally. **Reproject both layers to `EPSG:32637`** (UTM 37N) first — same reasoning as Phase 4: buffering in degrees is meaningless.

To reproject in QGIS: right-click layer → Export → Save Features As → set CRS to `EPSG:32637` → save as a new layer.

### 2. Buffer the transit stops
- Vector → Geoprocessing Tools → Buffer
- Input layer: your reprojected stops layer
- Distance: `500` meters (confirm the units shown match meters — this only works correctly because you reprojected first)
- Dissolve result: **check this box** — this is QGIS's equivalent of Python's `.union_all()`, merging all individual buffer circles into one combined shape
- Run it — you should see a blob-shaped coverage area appear on the map, made of overlapping circles

### 3. Intersect buffers with sub-city boundaries
- Vector → Geoprocessing Tools → Intersection
- Input layer: your reprojected sub-city boundaries
- Overlay layer: your dissolved buffer layer from Step 2
- Run it — the output shows only the *parts* of each sub-city that fall within 500m of a stop. Visually compare this to the full sub-city boundary — the gap between them is exactly what your Python `coverage_pct` calculation was quantifying as a number.

### 4. Calculate coverage percentage per sub-city
- Open the Attribute Table of your intersection result (right-click layer → Open Attribute Table)
- Open the Field Calculator (the abacus icon in the attribute table toolbar)
- Create a new field, e.g. `covered_area_km2`, expression: `$area / 1000000`
- You'll need the *original* sub-city area too — if it's not already a field, do the same calculation on your original (non-intersected) sub-city layer first, then either:
  - Join the two attribute tables on `sub_city` name (Layer Properties → Joins — same concept as your earlier table-join practice), or
  - Manually compare the two numbers side by side for each sub-city

Compute `coverage_pct = covered_area_km2 / total_area_km2 * 100` — either as another Field Calculator expression after joining, or by hand for a quick check.

### 5. Compare against your Python checkpoint results
Pull up your Phase 4 checkpoint notebook's output. Do the sub-cities rank in roughly the same order (most to least covered)? They won't match exactly unless you used identical coordinates in both, but the **relative ordering** and general shape of the coverage areas should tell the same story. If something's wildly different, that's worth investigating — it usually means a CRS mismatch or forgetting to dissolve the buffers in one of the two approaches.

---

## Optional stretch: style it properly

- Symbolize the intersection layer with a distinct fill (e.g., semi-transparent green) over the base sub-city boundaries, so "covered" vs "uncovered" area is visually obvious at a glance
- Add labels showing each sub-city's coverage percentage directly on the map (Layer Properties → Labels)
- Export as a map image (Project → Import/Export → Export Map to Image) — this is a genuinely useful figure for your portfolio/Medium writeup, since it's more visually compelling than a code output table

---

## Checkpoint

You're done with this session when you can:
1. Explain, out loud or in writing, why the buffer step needed to happen in a projected CRS (not `EPSG:4326`) — same reasoning as your Python work, now anchored to something you watched happen visually
2. Point at the map and correctly identify which sub-city is least covered, matching (roughly) what your Python checkpoint found
3. Export one styled map image you'd be comfortable putting in a portfolio piece

---

## Ongoing QGIS practice (parallel track)

Keep this running alongside whatever phase you do next — 2-3 sessions/week, not a strict blocking phase:

- Finish Hans van der Kwast's QGIS course if you haven't already worked through it end to end
- Spatial Thoughts tutorials for more advanced spatial analysis workflows (network analysis, more complex joins)
- Habit worth building: any time you write a new GeoPandas operation you haven't used before, try to find and run its QGIS equivalent once — this cross-training keeps reinforcing both sides
