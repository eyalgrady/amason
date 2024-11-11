import Carousel from "../components/Carousel";
import MainCategories from "../components/MainCategories";
import { Box } from "@mui/material";
import ProductFiltering from "../components/ProductFiltering";
import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../data/VariablesDefinitions";

function Home() {
  const [newReleases, setNewReleases] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [error, setError] = useState(null);
  const { setLoading, products } = useContext(GeneralContext);

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        setLoading(true);
        // newReleasesProducts
        const newReleasesProducts = products.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setNewReleases(newReleasesProducts);

        // topRated
        const productsWithAvgRating = products.map((product) => {
          const totalRatings = product.ratings.reduce(
            (sum, rating) => sum + rating.rating,
            0
          );
          const averageRating = totalRatings / product.ratings.length || 0;
          return { ...product, averageRating };
        });

        // מיון לפי דירוג ממוצע בסדר יורד
        const sortedByRating = productsWithAvgRating.sort(
          (a, b) => b.averageRating - a.averageRating
        );

        setTopRated(sortedByRating);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessData();
  }, [products, setLoading]);

  if (error) return <p>Error: {error}</p>;

  return (
    <Box
      sx={{
        background:
          "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(227, 230, 230, 0.8))",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Carousel />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to top, rgba(227, 230, 230, 0.8), rgba(255, 255, 255, 0))",
            pointerEvents: "none",
          }}
        />
      </Box>

      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          padding: "20px",
          position: "relative",
          top: "-300px", // הזזת הקונטיינר מעלה
          zIndex: 1, // כדי שהקונטיינר יהיה מעל הקרוסלה
        }}
      >
        {products && products.length > 0 && (
          <MainCategories products={products} />
        )}

        <ProductFiltering
          products={newReleases.slice(0, 7)}
          allProducts={newReleases}
          category={"all"}
          subcategory={"New Releases"}
        />
        <ProductFiltering
          products={topRated.slice(0, 7)}
          allProducts={topRated}
          category={"all"}
          subcategory={"Top Rated"}
        />
      </Box>
    </Box>
  );
}

export default Home;
