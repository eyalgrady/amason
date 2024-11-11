import { Box, CardMedia, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { mainCategories, subcatImages } from "../data/categoriesData";
import ProductFiltering from "../components/ProductFiltering";
import { GeneralContext } from "../data/VariablesDefinitions";

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const { setLoading } = useContext(GeneralContext);
  const [error, setError] = useState(null);
  const { category } = useParams();
  const subcategories = mainCategories[decodeURIComponent(category)] || [];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:8060/products?category=${encodeURIComponent(
            category
          )}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const fetchedProducts = await response.json();
        setProducts(fetchedProducts);

        // מיון המוצרים לפי createdAt בסדר יורד (מהחדש לישן)
        const newReleasesProducts = fetchedProducts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setNewReleases(newReleasesProducts);

        // סינון עשרת המוצרים האחרונים לפי topRated
        const productsWithAvgRating = fetchedProducts.map((product) => {
          const totalRatings = product.ratings.reduce(
            (sum, rating) => sum + rating.rating,
            0
          );
          const averageRating = totalRatings / product.ratings.length || 0;
          return { ...product, averageRating };
        });

        const sortedByRating = productsWithAvgRating.sort(
          (a, b) => b.averageRating - a.averageRating
        );

        setTopRated(sortedByRating);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [setLoading, category]);

  if (error) return <p>Error: {error}</p>;

  return (
    <Box padding={2}>
      <Typography
        variant="h2"
        component="h1"
        sx={{ fontSize: "1.8rem" }}
        gutterBottom
      >
        {category.replace(/([A-Z])/g, " $1").toUpperCase()}
      </Typography>

      <Box style={{ backgroundColor: "white", padding: "20px" }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{ fontSize: "1.6rem", fontWeight: "bold", mb: 4 }}
          gutterBottom
        >
          Featured categories
        </Typography>

        <Box display="flex" flexWrap="wrap" gap={2} width="100%">
          {subcategories.map((subcat) => (
            <Box key={subcat} sx={{ textAlign: "center" }}>
              <Link
                to={`/categories/${encodeURIComponent(
                  category
                )}/${encodeURIComponent(subcat)}`}
                className="link"
                style={{ display: "block" }}
                state={{
                  products: products.filter(
                    (product) =>
                      product.category === category &&
                      product.subcategory === subcat
                  ),
                  title: subcat,
                }}
              >
                {subcategories.length > 0 && (
                  <CardMedia
                    component="img"
                    alt={subcat}
                    height="200"
                    image={subcatImages[subcat] || "/images/default.jpg"}
                    title={subcat}
                    sx={{
                      width: "180px",
                      height: "180px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      margin: "0 auto",
                    }}
                  />
                )}
              </Link>

              <Link
                to={`/categories/${encodeURIComponent(
                  category
                )}/${encodeURIComponent(subcat)}`}
                className="link"
                state={{
                  products: products.filter(
                    (product) =>
                      product.category === category &&
                      product.subcategory === subcat
                  ),
                  title: subcat,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ fontSize: "1.2rem", fontWeight: "bold", mt: 3 }}
                  gutterBottom
                >
                  {subcat.replace(/([A-Z])/g, " $1").toUpperCase()}
                </Typography>
              </Link>
            </Box>
          ))}
        </Box>
      </Box>
      <ProductFiltering
        products={newReleases.slice(0, 7)}
        allProducts={topRated}
        category={"New Releases"}
        subcategory={"New Releases"}
      />
      <ProductFiltering
        products={topRated.slice(0, 7)}
        allProducts={topRated}
        category={"Top Rated"}
        subcategory={"Top Rated"}
      />
    </Box>
  );
};

export default CategoryPage;
