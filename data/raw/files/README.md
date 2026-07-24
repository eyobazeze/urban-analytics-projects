# 🚌 Transit Access & Underserved Areas — Addis Ababa

**A spatial equity analysis of public transit accessibility in Addis Ababa, Ethiopia**

> *Who has access to public transport — and who is being left behind?*

---

## Overview

This project applies spatial analysis techniques to evaluate public transit accessibility across Addis Ababa. Using OpenStreetMap transit data and population density grids, it identifies neighborhoods that are densely populated yet poorly served by the city's bus and LRT network.

The analysis is motivated by a simple question: as Addis Ababa continues to grow rapidly, are transit investments reaching the people who need them most?

---

## Key Findings

| Metric | Value |
|---|---|
| Transit stops / hubs analyzed | 25 (LRT stations + major bus terminals) |
| Walkability buffer radius | 500m (standard pedestrian shed) |
| City area within transit reach | ~19.3 km² |
| High-density underserved grid cells | 318 |

The analysis reveals that a significant portion of the city's high-density residential areas fall outside the 500m walkability catchment of any major transit stop — highlighting spatial equity gaps in the current network.

---

## Maps

### Static Analysis Map
![Transit Access Map](outputs/transit_access_map.png)

*Left: 500m walkability buffers around transit stops overlaid on population density. Right: Served vs. underserved areas, with high-density underserved zones highlighted in red.*

### Interactive Web Map
Open `outputs/transit_access_interactive.html` in any browser to explore:
- Individual transit stop locations with popup labels
- 500m walkability buffer zones
- High-density underserved areas

---

## Tools & Methods

| Tool | Purpose |
|---|---|
| **GeoPandas** | Spatial data manipulation, buffer analysis, spatial joins |
| **OSMnx** | Fetching transit infrastructure from OpenStreetMap |
| **Folium** | Interactive web map generation |
| **Contextily** | Basemap tiles for static maps |
| **Matplotlib** | Static publication-quality maps |
| **Shapely** | Geometric operations (buffers, unions) |

**Coordinate Reference System:** EPSG:32637 (UTM Zone 37N) for accurate metric measurements in Ethiopia.

---

## Data Sources

| Dataset | Source | Notes |
|---|---|---|
| Transit stops & infrastructure | [OpenStreetMap](https://www.openstreetmap.org/) via OSMnx | Bus stops, LRT stations |
| Population density | [WorldPop](https://www.worldpop.org/geodata/summary?id=6097) | Replace synthetic grid with actual raster |
| Administrative boundaries | [OCHA HDX Ethiopia](https://data.humdata.org/dataset/ethiopia-administrative-boundaries) | City boundary |

> **Note:** The current version uses a synthetic population density grid for demonstration. For production analysis, download the WorldPop Ethiopia 100m resolution raster and replace the grid generation step in `transit_access_analysis.py`.

---

## How to Run

```bash
# 1. Clone the repository
git clone https://github.com/eyobazeze/addis-transit-access.git
cd addis-transit-access

# 2. Install dependencies
pip install geopandas osmnx folium matplotlib contextily shapely pandas numpy

# 3. Run the analysis
python transit_access_analysis.py

# 4. View outputs
open outputs/transit_access_map.png
open outputs/transit_access_interactive.html
```

---

## Project Context

This project is part of a broader portfolio exploring smart city and urban data challenges in Ethiopian cities. It connects directly to ongoing work on transit UX design for Addis Ababa's public transport system.

Related projects:
- [Smart Public Transport App — Figma Case Study](https://medium.com/@eyobazeze)
- [UrbanLession — Urban Analytics with Python](https://github.com/eyobazeze/UrbanLession)

---

## Author

**Eyob Azeze Negussie**
UI/UX Designer | Urban Tech & Smart Cities | Addis Ababa, Ethiopia

[GitHub](https://github.com/eyobazeze) · [Figma](https://figma.com/@eyobazeze) · [X / Twitter](https://x.com/EyobAzeze)
