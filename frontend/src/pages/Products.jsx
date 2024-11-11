import { Box, Typography, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const location = useLocation();
  const products = location.state?.products || [];
  const title = location.state?.title || "";

  return (
    <Box padding={2}>
      <Typography
        variant="h2"
        component="h1"
        sx={{ fontSize: "1.8rem" }}
        gutterBottom
      >
        {title}
      </Typography>
      <Grid container spacing={2} padding={2}>
        {products.length > 0 ? (
          products.map((product) => (
            <Grid item xs={12} sm={4} md={3} lg={2} key={product._id}>
              <ProductCard product={product} />
            </Grid>
          ))
        ) : (
          <Typography>No products found.</Typography>
        )}
      </Grid>
    </Box>
  );
};

export default Products;
