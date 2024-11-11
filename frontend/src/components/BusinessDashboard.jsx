import { Box, Grid, Paper, Typography } from "@mui/material";
import FilteredPanel from "./FilteredPanel";

export default function BusinessDashboard({ data }) {
  const topProduct = Array.isArray(data)
    ? data.reduce(
        (max, product) => (product.salesCount > max.salesCount ? product : max),
        data[0]
      )
    : null;

  const leastSoldProduct = Array.isArray(data)
    ? data.reduce(
        (min, product) => (product.salesCount < min.salesCount ? product : min),
        data[0]
      )
    : null;

  return (
    <Box flex={1} p={2}>
      {Array.isArray(data) && (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6">Total Products</Typography>
              <Typography variant="h4">{data.length}</Typography>
            </Paper>
          </Grid>

          {/* מוצר הכי נמכר */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6">Top Product</Typography>
              {topProduct ? (
                <Box component="span">
                  <strong>{topProduct.title}</strong> - Sales:{" "}
                  {topProduct.salesCount}
                </Box>
              ) : (
                <Typography>No top product available</Typography>
              )}
            </Paper>
          </Grid>

          {/* מוצר הכי פחות נמכר */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6">Least Sold Product</Typography>
              {leastSoldProduct ? (
                <Box component="span">
                  <strong>{leastSoldProduct.title}</strong> - Sales:{" "}
                  {leastSoldProduct.salesCount}
                </Box>
              ) : (
                <Typography>No least sold product available</Typography>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
              <FilteredPanel
                data={data.filter((product) => product.quantity < 10)}
                category={"admin"}
                title={"Low Stock Products"}
              />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
              <FilteredPanel
                data={data.sort((a, b) => b.salesCount - a.salesCount)}
                category={"admin"}
                title={"Top Selling Products"}
              />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
              <FilteredPanel
                data={data
                  .filter((product) =>
                    product.ratings.reduce(
                      (sum, rating) => sum + rating.rating,
                      0
                    )
                  )
                  .sort((a, b) => b.averageRating - a.averageRating)}
                category={"admin"}
                title={"Popular Products"}
              />
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
