import React, { useEffect, useState } from "react";
import { Star } from "@mui/icons-material";
import { Button, Typography, Box } from "@mui/material";
import RatingProduct from "./RatingProduct";

export default function RatingProg({ product, fetchProduct }) {
  const [ratingData, setRatingData] = useState([]);
  const [totalRatings, setTotalRatings] = useState(0);
  const [showRatingForm, setShowRatingForm] = useState(false);

  const handleRatingForm = () => {
    setShowRatingForm(!showRatingForm);
  };

  useEffect(() => {
    try {
      if (product?.ratings && product.ratings.length > 0) {
        let total = 0;

        const starCount = [1, 2, 3, 4, 5].map((star) => ({
          star,
          count: product.ratings.filter((r) => r.rating === star).length,
        }));

        starCount.forEach((rating) => {
          total += rating.count;
        });

        setTotalRatings(total.toLocaleString());
        setRatingData(starCount);
      }
    } catch (error) {
      console.error("Error fetching rating data:", error);
    }
  }, [product]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "330px",
        p: 2,
        position: "relative",
      }}
    >
      {!showRatingForm ? (
        <>
          {ratingData && ratingData.length > 0 ? (
            ratingData.map((rating) => (
              <Box
                key={rating.star}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography variant="body2" sx={{ mr: 1 }}>
                  {rating.star}
                  <Star sx={{ color: "gold", fontSize: "1rem" }} />
                </Typography>
                <Box
                  sx={{
                    flex: 1,
                    height: "0.5rem",
                    borderRadius: "8px",
                    backgroundColor: "#ddd",
                    mr: 1,
                  }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      width: `${(rating.count / totalRatings) * 100}%`,
                      backgroundColor: "gold",
                      borderRadius: "8px",
                    }}
                  />
                </Box>
                <Typography variant="body2">
                  {rating.count.toLocaleString()}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2">No ratings yet</Typography>
          )}

          <Box my={2}>
            <Typography variant="h6">Review this product </Typography>
            <Typography variant="body2">
              Share your thoughts with other customers
            </Typography>
          </Box>
          <Button fullWidth variant="outlined" onClick={handleRatingForm}>
            {showRatingForm ? "Hide Rating Form" : "Leave a Review"}
          </Button>
        </>
      ) : (
        <RatingProduct
          productId={product._id}
          onClose={handleRatingForm}
          fetchProduct={fetchProduct}
        />
      )}
    </Box>
  );
}
