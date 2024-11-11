import React, { useContext, useEffect, useState } from "react";
import { TextField, Button, Box, Typography, IconButton } from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";
import { GeneralContext } from "../data/VariablesDefinitions";

const RatingProduct = ({ productId, fetchProduct, onClose }) => {
  const [userRating, setUserRating] = useState(1);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hasRated, setHasRated] = useState(false); // חדש: האם המשתמש דירג את המוצר כבר
  const { user, products, setProducts, setLoading, snackbar } =
    useContext(GeneralContext);

  // חיפוש אם למשתמש כבר יש דירוג למוצר
  useEffect(() => {
    const product = products.find((product) => product._id === productId);
    if (product) {
      const userRating = product.ratings.find(
        (rating) => rating.userId === user._id
      );
      if (userRating) {
        setHasRated(true);
        setUserRating(userRating.rating);
        setComment(userRating.comment || ""); // אם יש תגובה, נמלא אותה
      }
    }
  }, [products, productId, user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const response = await fetch(
      `http://localhost:8060/products/${productId}/rate`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          rating: userRating,
          comment: comment,
        }),
      }
    );

    if (response.ok) {
      setProducts((prevProducts) => {
        const updatedProduct = prevProducts.find(
          (product) => product._id === productId
        );
        if (updatedProduct) {
          // יצירת אובייקט דירוג חדש או עדכון דירוג קיים
          const newRating = {
            userId: user._id,
            user_name: user.name,
            rating: userRating,
            comment: comment,
          };

          // אם המשתמש דירג בעבר, אנחנו מעדכנים את הדירוג הקיים, אם לא – מוסיפים דירוג חדש
          const existingRatingIndex = updatedProduct.ratings.findIndex(
            (rating) => rating.userId === user._id
          );

          if (existingRatingIndex > -1) {
            updatedProduct.ratings[existingRatingIndex] = newRating;
          } else {
            updatedProduct.ratings.push(newRating);
          }

          // חישוב ממוצע הדירוגים החדש
          const totalRatings = updatedProduct.ratings.reduce(
            (sum, rating) => sum + rating.rating,
            0
          );
          updatedProduct.averageRating =
            totalRatings / updatedProduct.ratings.length;

          // עדכון המוצר במערך
          return prevProducts.map((product) =>
            product._id === productId ? updatedProduct : product
          );
        }
        return prevProducts; // אם לא מצאנו את המוצר, מחזירים את המערך כמו שהוא
      });
      await fetchProduct(); // פונקציה שתמשוך את המוצר מחדש משרת
      snackbar(
        hasRated
          ? "Rating updated successfully!"
          : "Rating submitted successfully!"
      );
      setLoading(false);
      onClose();
    } else {
      snackbar(await response.text());
      setLoading(false);
    }
  };

  const handleStarClick = (rating) => {
    setUserRating(rating);
  };

  const handleStarHover = (rating) => {
    setHoverRating(rating);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        {hasRated ? "Update Your Rating" : "Add Your Rating"}
      </Typography>

      {hasRated && (
        <Typography variant="body2" color="textSecondary" gutterBottom>
          You have already rated this product. You can update your rating below.
        </Typography>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
        }}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <IconButton
            key={star}
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => handleStarHover(star)}
            onMouseLeave={handleStarLeave}
            sx={{
              color: star <= (hoverRating || userRating) ? "gold" : "gray",
            }}
          >
            {star <= (hoverRating || userRating) ? (
              <Star fontSize="large" />
            ) : (
              <StarBorder fontSize="large" />
            )}
          </IconButton>
        ))}
      </Box>

      <TextField
        label="Comment"
        multiline
        rows={3}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        fullWidth
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit Rating
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onClose}
          fullWidth
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default RatingProduct;
