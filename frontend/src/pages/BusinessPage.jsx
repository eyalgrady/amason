import {
  AppBar,
  Box,
  Card,
  CardMedia,
  Toolbar,
  Link as MuiLink,
  Button,
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductFiltering from "../components/ProductFiltering";
import { GeneralContext } from "../data/VariablesDefinitions";

const BusinessPage = () => {
  const { businessId } = useParams();
  const [business, setBusiness] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(GeneralContext);

  const navigate = useNavigate();

  // שליפת נתוני העסק
  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8060/users/${businessId}`
        );
        const businessData = await response.json();
        setBusiness(businessData); // עדכון נתוני העסק
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessData();
  }, [businessId]);

  // שליפת המוצרים של העסק
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:8060/products/business/${businessId}`
        ); // Endpoint נפרד למוצרים
        const productsData = await response.json();
        setProducts(productsData); // עדכון המוצרים
      } catch (err) {
        setError(err.message);
      }
    };

    if (businessId) {
      fetchProducts();
    }
  }, [businessId]);

  // סינון עשרת המוצרים החדשים ביותר לפי createdAt
  const newReleases = products
    ? products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  // סינון עשרת המוצרים הכי מדורגים
  const productsWithAvgRating = products
    ? products.map((product) => {
        const totalRatings = product.ratings.reduce(
          (sum, rating) => sum + rating.rating,
          0
        );
        const averageRating = totalRatings / product.ratings.length || 0;
        return { ...product, averageRating };
      })
    : [];

  // מיון המוצרים לפי דירוג ממוצע
  const topRated = productsWithAvgRating.sort(
    (a, b) => b.averageRating - a.averageRating
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!business) return <div>No business found</div>;

  return (
    <Box>
      <Card>
        <CardMedia
          component="img"
          image={
            business.user.image
              ? business.user.image.url
              : "path/to/default/image.jpg"
          } // תמונת ברירת מחדל
          alt="businessImg-logo"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </Card>

      <AppBar position="static" sx={{ backgroundColor: "#232f3e" }}>
        <Toolbar sx={{ justifyContent: "space-between", padding: "0 50px" }}>
          <Box display="flex" gap={2}>
            {business.user.categories.map((category) => (
              <MuiLink
                key={category}
                component={Link}
                to={`/business/${businessId}/category/${category}`}
                state={{ newReleases, topRated }} // העברת ה-state בצורה ברורה
                underline="none"
                color="white"
                sx={{ fontWeight: "bold", fontSize: "1rem" }}
              >
                {category}
              </MuiLink>
            ))}
          </Box>

          {user?._id === business.user._id && (
            <>
              <Box sx={{ flexGrow: 1 }} />

              <Button
                sx={{
                  backgroundColor: "orange",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "darkorange",
                  },
                  fontWeight: "bold",
                }}
                onClick={() => navigate(`/products/form/add`)}
              >
                ADD NEW
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Box mb={2}>
        <ProductFiltering
          products={newReleases.slice(0, 7)}
          allProducts={newReleases}
          category={business.user.businessName}
          subcategory={"New Releases"}
        />
        <ProductFiltering
          products={topRated.slice(0, 7)}
          allProducts={topRated}
          category={business.user.businessName}
          subcategory={"Top Rated"}
        />
      </Box>
    </Box>
  );
};

export default BusinessPage;
