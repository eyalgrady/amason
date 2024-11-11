import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import ProductFiltering from "../components/ProductFiltering";

export default function BusinessCategoryPage() {
  const location = useLocation();
  const [newReleasesFiltred, setNewReleasesFiltred] = useState([]);
  const [topRatedFiltred, setTopRatedFiltred] = useState([]);
  const { newReleases = [], topRated = [] } = location.state || {};
  const { category } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      // סינון המוצרים לפי הקטגוריה שמתקבלת בפרמטר
      setNewReleasesFiltred(
        newReleases.filter((product) => product.category === category)
      );
      setTopRatedFiltred(
        topRated.filter((product) => product.category === category)
      );
    };

    fetchProducts();
  }, [newReleases, topRated, category]);
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

      <ProductFiltering
        products={newReleasesFiltred.slice(0, 7)}
        allProducts={newReleasesFiltred}
        // category={user.businessName}
        subcategory={"New Releases"}
      />
      <ProductFiltering
        products={topRatedFiltred.slice(0, 7)}
        allProducts={topRatedFiltred}
        // category={user.businessName}
        subcategory={"Top Rated"}
      />
    </Box>
  );
}
