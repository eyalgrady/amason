import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Link as MuiLink,
  CardMedia,
} from "@mui/material";

import { Link } from "react-router-dom";
import { styled } from "@mui/system";

const HoverTypography = styled(Typography)({
  transition: "color 0.3s ease",
  "&:hover": {
    color: "#ff9900",
  },
});

const limitText = (text, maxWords) => {
  const words = text.split(" ");
  return words.length > maxWords
    ? words.slice(0, maxWords).join(" ") + "..."
    : text;
};

export default function FilteredPanel({ data, category, title }) {
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
          {title}
        </Typography>
        <MuiLink
          component={Link}
          to={`/categories/${encodeURIComponent(category)}/${encodeURIComponent(
            title
          )}`}
          state={{ products: data, title: title }}
          underline="hover"
          color="primary"
        >
          <Typography variant="body2">See more...</Typography>
        </MuiLink>
      </Box>
      <Grid container display="flex" spacing={2} padding={2}>
        {data && data.length > 0 ? (
          data?.slice(0, 7).map((product) => (
            <Grid item xs={12} sm={6} md={3} lg={1.7} key={product._id}>
              <Card
                sx={{
                  display: "flex",
                  flex: "1 1 ",
                  flexDirection: "column",
                  maxWidth: "250px",
                  height: "100%",
                  overflow: "hidden",
                  backgroundColor: "#f5f5f5",
                  position: "relative",
                }}
              >
                <CardMedia
                  component="img"
                  alt={product.image.alt}
                  image={product.image.url}
                  title={product.title}
                  sx={{
                    height: 200,
                    width: "auto",
                    objectFit: "cover",
                    margin: "0 auto",
                  }}
                />
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    flexGrow: 1,
                    padding: "16px",
                  }}
                >
                  <Box sx={{ flexGrow: 1 }}>
                    <MuiLink
                      component={Link}
                      to={`/product/${product._id}`}
                      underline="none"
                      color="text.primary"
                      sx={{ fontWeight: 500 }}
                    >
                      <HoverTypography
                        variant="body2"
                        sx={{ color: "#4BA3C3" }}
                      >
                        {limitText(product.title, 10)}
                      </HoverTypography>
                    </MuiLink>
                    <Typography
                      variant="body2"
                      color="white"
                      backgroundColor="#cc0d39"
                      mt={1}
                      p={0.5}
                      borderRadius={1}
                      display="inline-block"
                    >
                      {title === "Low Stock Products" ? (
                        <>Quantity: {product.quantity}</>
                      ) : title === "Top Selling Products" ? (
                        <>Sales: {product.salesCount}</>
                      ) : title === "Popular Products" ? (
                        <>Rating: {product.averageRating}</>
                      ) : (
                        <>Details unavailable</>
                      )}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No products found.</Typography>
        )}
      </Grid>
    </Box>
  );
}
