import { Box, Grid, Typography, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function ProductFiltering({
  products,
  allProducts,
  category,
  subcategory,
}) {
  return (
    <Box style={{ backgroundColor: "white", padding: "20px 0" }}>
      <Box
        padding={2}
        sx={{
          display: "flex",
          alignItems: "flex-end",
          gap: "1rem",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{ fontSize: { xs: "1.25rem", sm: "1.6rem" }, fontWeight: "bold" }}
        >
          {subcategory}
        </Typography>
        <MuiLink
          component={Link}
          to={`/categories/${encodeURIComponent(category)}/${encodeURIComponent(
            subcategory
          )}`}
          state={{ products: allProducts, title: subcategory }}
          underline="hover"
          color="primary"
        >
          <Typography variant="body2">See more...</Typography>
        </MuiLink>
      </Box>

      <Grid container display="flex" spacing={2} padding={2}>
        {products && products.length > 0 ? (
          products.map((product) => (
            <Grid item xs={12} sm={6} md={3} lg={1.7} key={product._id}>
              <ProductCard key={product._id} product={product} />
            </Grid>
          ))
        ) : (
          <Typography>No products found.</Typography>
        )}
      </Grid>
    </Box>
  );
}
