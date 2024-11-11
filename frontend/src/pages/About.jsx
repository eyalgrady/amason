import { Box, Typography, Paper, Grid, Divider, Button } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StoreIcon from "@mui/icons-material/Store";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <Box sx={{ p: 4, maxWidth: 900, margin: "auto", textAlign: "center" }}>
      <Typography variant="h3" gutterBottom color="primary" fontWeight="bold">
        Welcome to Amason!
      </Typography>
      <Typography
        variant="body1"
        color="textSecondary"
        sx={{ mb: 4, fontSize: "1.2rem" }}
      >
        Your ultimate shopping hub, connecting you to a world of products and
        endless possibilities. Discover, compare, and shop like never before!
      </Typography>

      <Paper
        elevation={4}
        sx={{ p: 4, mt: 3, borderRadius: 3, backgroundColor: "#f5f5f5" }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <StarIcon color="secondary" sx={{ fontSize: 40 }} />
            <Typography variant="h5" color="secondary" fontWeight="bold">
              Amazing Shopping Experience
            </Typography>
            <Divider sx={{ my: 2, width: "80%", margin: "auto" }} />
            <Typography variant="body1">
              Join Amason and enjoy seamless shopping with product comparisons,
              personalized recommendations, and customer reviews.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <StoreIcon color="secondary" sx={{ fontSize: 40 }} />
            <Typography variant="h5" color="secondary" fontWeight="bold">
              Empowering Business Owners
            </Typography>
            <Divider sx={{ my: 2, width: "80%", margin: "auto" }} />
            <Typography variant="body1">
              Set up your own store, showcase products, and gain insights with
              detailed tracking tools for sales and inventory.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <ShoppingCartIcon color="secondary" sx={{ fontSize: 40 }} />
            <Typography variant="h5" color="secondary" fontWeight="bold">
              Easy and Secure Shopping
            </Typography>
            <Divider sx={{ my: 2, width: "60%", margin: "auto" }} />
            <Typography variant="body1">
              With a secure shopping cart and simple checkout process, shop with
              confidence and ease at Amason.
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ mt: 4 }}>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 2, fontSize: "1rem", px: 4 }}
          // sx={{
          //   backgroundColor: "#f7ca00",
          //   borderRadius: 2,
          //   padding: "10px",
          //   color: "#131921",
          //   marginTop: 2,
          // }}
        >
          Start Shopping Now
        </Button>
      </Box>
    </Box>
  );
}
