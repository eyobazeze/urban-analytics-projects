# Phase 7 — Applied Portfolio Work

This is where Phases 0-6 stop being separate skills and become one workflow, aimed directly at your UCL application and the rest of your grad school timeline. No new syntax here — this phase is about applying everything to real deliverables.

There are four concrete workstreams. They don't need to happen in strict order, but there's a sensible sequence given dependencies.

---

## 1. Integrate real WorldPop Ethiopia raster data into `addis-transit-access`

This replaces the synthetic population grid your project currently uses — it's the single highest-value technical upgrade left on that project.

**Steps:**

1. **Get the data.** Go to https://www.worldpop.org, search "Ethiopia," and download the most recent population count raster (usually offered at 100m resolution, GeoTIFF format). You want the "unconstrained" or "constrained" individual-country product — either works for this purpose; constrained tends to be more accurate in urban areas since it uses building footprint data, so prefer that if both are available.

2. **Install raster tools** into your `urban-analytics` environment:
   ```bash
   conda activate urban-analytics
   conda install -c conda-forge rasterio rasterstats
   ```

3. **Clip the raster to Addis Ababa.** WorldPop's national file covers all of Ethiopia — you only need the Addis Ababa extent. Use `rasterio.mask` with your sub-city boundary polygon (dissolved into one shape) to clip it down. This matters for performance — processing the full national raster for every calculation is slow and unnecessary.

4. **Run zonal statistics.** This is the core operation: for each sub-city polygon (or each transit-stop buffer, depending on what you're measuring), sum the raster cell values that fall inside it. `rasterstats.zonal_stats()` does this in one call, and — this is the part from Phase 4 worth remembering — it handles partial-cell weighting at boundary edges automatically, which is exactly the edge-effect problem discussed in that phase's raster section.

5. **Replace your synthetic population numbers** with these real zonal-stats results in your accessibility score calculation, and re-run your existing analysis.

6. **Sanity check the results.** Compare the new real-population-based numbers against your old synthetic ones — do the "most underserved" sub-cities change? If they shift dramatically, dig into why before trusting the new numbers (could be a genuine finding, could be a CRS mismatch between the raster and your vector data — always the first thing to check when raster/vector numbers look wrong).

7. **Update your GitHub repo and Medium writeup** to reflect the real data — this is a meaningful upgrade worth highlighting explicitly in your portfolio ("originally used population estimates; later integrated real WorldPop raster data for greater accuracy" is a good sentence for a case study).

---

## 2. Second spatial analysis project (regression/clustering/network analysis)

This was identified as the highest-impact addition for your UCL application — it demonstrates a different analytical skill set than the accessibility-buffer approach your transit project already shows.

**Pick one of these three directions** (all reasonable, pick based on what data you can realistically get):

- **Clustering** — e.g., k-means or DBSCAN on sub-city socioeconomic indicators (population density, income, transit access score from your first project) to identify natural groupings of similar sub-cities. Good if you want to keep working with data you already have.
- **Regression** — e.g., what predicts transit access score? Build a simple linear regression with population density, income, and distance-from-center as predictors. Good for demonstrating statistical reasoning explicitly, which reviewers like seeing alongside spatial work.
- **Network analysis** — using OSMnx's street network graph (which you've already pulled once), compute actual route-based accessibility (shortest path from each neighborhood to the nearest hospital/school/market) instead of straight-line buffers. This is the most technically impressive of the three, and builds directly on OSMnx skills you already have — but it's also the most involved.

Given your timeline, **network analysis is worth prioritizing if you have the time**, since it's the most differentiated from your first project and aligns well with CASA's methodological focus (network-based accessibility is a recurring theme in urban analytics research).

**Rough steps for the network analysis option:**
1. Pull Addis Ababa's street network with OSMnx (`ox.graph_from_place()`), same as your first project
2. Pull a set of destination points (schools, health facilities — OSM tags like `amenity=hospital`, `amenity=school`, or use a health-facility dataset from HDX if OSM coverage is sparse)
3. For each sub-city centroid (or a grid of points across the city), compute shortest network-distance to the nearest destination using `networkx.shortest_path_length` or OSMnx's routing helpers
4. Map the results — which areas are farthest from essential services by actual travel distance, not straight-line distance
5. Compare against your straight-line-buffer results from Project 1 — the difference between the two is itself an interesting finding worth writing up (straight-line access often overstates real accessibility in areas with poor road connectivity)

---

## 3. Build your portfolio site

Now that Phase 6 gave you real React + Tailwind skills, put them toward hosting everything in one place instead of scattered across Figma/Medium/GitHub links.

**Minimum viable structure:**
- Landing page — short intro, your mission statement (data-driven urban planning for Ethiopian cities), links to all 5 Figma case studies
- A project page for `addis-transit-access` — embed or link to your maps, show the accessibility findings visually (this is where an exported QGIS map image or a Folium map embed pays off)
- A project page for the second spatial analysis project once it's done
- Contact/links section — GitHub, LinkedIn, Medium

**Practical approach:** don't over-engineer this. A well-styled single-page or few-page Vite + React + Tailwind site, deployed for free on Vercel or Netlify, is entirely sufficient — reviewers care about the work shown, not the deployment sophistication.

---

## 4. Tighten SOP faculty alignment

With real projects (not just planned ones) now finished, revisit your SOP draft:

- Reference **Prof. Elsa Arcaute, Prof. Adam Dennett, and Dr. Huanfa Chen** by name, tied to *specific* aspects of your work — e.g., if you did the network-analysis project, that connects naturally to accessibility/network science research at CASA; if clustering, that connects to spatial statistics methodology.
- Use actual findings from your projects as concrete evidence of your approach, not just descriptions of what you built — "I found that X sub-city, despite high population density, had the lowest network-based access to healthcare facilities" is stronger than "I built a transit accessibility tool."
- Keep the mission-driven framing (Ethiopian cities, data-driven planning) as the throughline connecting both projects and your SOP.

---

## Suggested order given your UCL timeline

1. WorldPop integration first (fastest win, directly improves your existing flagship project)
2. Second spatial analysis project (network analysis if time allows)
3. Portfolio site (needs both projects' outputs to be genuinely worth showcasing)
4. Final SOP tightening (needs everything else done first, since it references the finished work)

---

## This is the end of the structured roadmap

Everything from Phase 0 onward was building toward this phase. From here, the work is less about learning new skills and more about executing and documenting — which is exactly the position you want to be in heading into your application cycle. If you want, I can help draft the updated Medium case study once the WorldPop integration or second project is done, or help with the actual SOP language once you've got the real findings in hand.
