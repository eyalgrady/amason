import React, { useState, useEffect } from "react";
import { Close, Star } from "@mui/icons-material";
import { Typography, Box, IconButton } from "@mui/material";
import RatingProg from "./RatingProg";

const RatingDisplay = ({ product, fetchProduct }) => {
  const [isRatingProgVisible, setIsRatingProgVisible] = useState(false);
  const [ratingAvg, setRatingAvg] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);

  useEffect(() => {
    try {
      if (product.ratings && product.ratings.length > 0) {
        let total = 0;
        let ratingBasedOnStar = 0;

        const starCount = [1, 2, 3, 4, 5].map((star) => ({
          star,
          count: product.ratings.filter((r) => r.rating === star).length,
        }));

        starCount.forEach((rating) => {
          total += rating.count;
          ratingBasedOnStar += rating.count * rating.star;
        });

        setTotalRatings(total.toLocaleString());
        setRatingAvg((ratingBasedOnStar / total).toFixed(1));
      }
    } catch (error) {
      console.error("Error fetching rating data:", error);
    }
  }, [product]);

  const showRatingProg = () => {
    setIsRatingProgVisible(!isRatingProgVisible);
  };

  return (
    <Box position="relative">
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        onClick={showRatingProg}
        sx={{
          cursor: "pointer",
          py: 1,
          flexWrap: "wrap",
        }}
      >
        <Typography variant="body2">{ratingAvg}</Typography>

        <Box display="flex" alignItems="center">
          {/* תצוגת כוכבים */}
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              sx={{
                color: index < Math.round(ratingAvg) ? "gold" : "gray",
              }}
            />
          ))}
        </Box>

        <Typography variant="body2">{totalRatings} ratings</Typography>
      </Box>
      {isRatingProgVisible && (
        <Box
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            backgroundColor: "white",
            border: "1px solid #ddd",
            borderRadius: "8px",
            zIndex: 10,
            paddingTop: "40px",
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: "2px",
              right: "2px",
            }}
            onClick={() => setIsRatingProgVisible(false)}
          >
            <Close />
          </IconButton>
          <RatingProg product={product} fetchProduct={fetchProduct} />
        </Box>
      )}
    </Box>
  );
};

export default RatingDisplay;
