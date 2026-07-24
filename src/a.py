import geopandas as gpd
import rasterio
from rasterio.mask import mask

subcities = gpd.read_file("data/raw/aa_worda_boundary/aa_worda_boundary.shp")

dissolved_boundary = subcities.dissolve().geometry.iloc[0]

with rasterio.open("data/raw/eth_population_2026.tif") as src:
    clipped_data, clipped_transform = mask(src, [dissolved_boundary], crop=True)
    clipped_meta = src.meta.copy()

clipped_meta.update({
    "height": clipped_data.shape[1],
    "width": clipped_data.shape[2],
    "transform": clipped_transform
})

with rasterio.open("data/processed/addis_population_clipped.tif", "w", **clipped_meta) as dst:
    dst.write(clipped_data)

print("Clipped raster saved.")

from rasterstats import zonal_stats

stats = zonal_stats(
    subcities,
    "data/processed/addis_population_clipped.tif",
    stats=["sum", "mean", "count"]
)

subcities["real_population"] = [s["sum"] for s in stats]

print(subcities[["Sub_City", "real_population"]])

print(subcities["real_population"].sum())


subcity_totals_geo = subcities.dissolve(by="Sub_City", aggfunc={"real_population": "sum"}).reset_index()

print(subcity_totals_geo[["Sub_City", "real_population"]])
print(type(subcity_totals_geo))  # should say GeoDataFrame, confirming geometry survived

subcity_totals_geo.to_file("data/processed/subcities_with_real_population.geojson", driver="GeoJSON")
print("Saved.")