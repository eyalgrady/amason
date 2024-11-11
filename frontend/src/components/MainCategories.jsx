import { Card, CardHeader, CardMedia, Grid } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { categoryImages } from "../data/categoriesData";
import { GeneralContext } from "../data/VariablesDefinitions";

export default function MainCategories({ products }) {
  const [displayedCategories, setDisplayedCategories] = useState([]);
  const { setLoading } = useContext(GeneralContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const categorySet = new Set(
          products.map((product) => product.category)
        );
        const allCategories = [...categorySet];
        // Select 4 random categories to display
        const shuffledCategories = allCategories.sort(
          () => 0.5 - Math.random()
        );
        const selectedCategories = shuffledCategories.slice(0, 4);
        setDisplayedCategories(selectedCategories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [products, setLoading]);

  if (error) return <p>Error: {error}</p>;

  return (
    <Grid
      container
      spacing={2}
      padding={2}
      sx={{
        justifyContent: "center",
      }}
    >
      {displayedCategories.map((category) => (
        <Grid
          item
          xs={12} // 100% width on extra small screens
          sm={6} // 50% width on small screens
          md={4} // 33.3% width on medium screens
          lg={3} // 25% width on large screens
          key={category}
        >
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Link
              className="link"
              to={`/categories/${category}`}
              state={products}
            >
              <CardHeader
                sx={{
                  textAlign: "center",
                  fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" }, // דינמי לפי מסך
                  height: { xs: 60, sm: 80 }, // גובה כותרת דינמי
                }}
                title={category.replace(/([A-Z])/g, " $1").toUpperCase()}
              />

              <CardMedia
                component="img"
                sx={{
                  height: "auto",
                  maxHeight: { xs: 200, sm: 250, md: 300 }, // התאמת הגובה לפי המסך
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                image={categoryImages[category] || "/images/default.jpg"}
                title={category}
                alt={category}
              />
            </Link>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
