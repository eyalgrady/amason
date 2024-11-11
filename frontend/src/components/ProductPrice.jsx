import React from "react";
import { Box, Typography } from "@mui/material";

export default function ProductPrice({ product, selectedQuantity }) {
  const calculateTotalPrice = () => {
    const pricePerUnit = product.discount
      ? product.price - (product.price * product.discountPercentage) / 100
      : product.price;
    return pricePerUnit * selectedQuantity;
  };
  return (
    <Box marginY={1}>
      {product.discountPercentage ? (
        // תצוגה עם הנחה
        <Box>
          <Box display={"flex"} gap={1}>
            <Typography
              variant="h5"
              color="red"
              sx={{
                fontSize: "2rem",
                fontWeight: "100",
              }}
            >
              -{product.discountPercentage}%
            </Typography>
            <Box display="flex" alignItems="flex-start" px={1}>
              <Typography
                variant="h5"
                sx={{ fontSize: "2rem", position: "relative" }}
              >
                {Math.floor(
                  product.price -
                    (product.price * product.discountPercentage) / 100
                )}
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "0.8rem",
                    position: "absolute",
                    top: 6,
                    right: -20,
                  }}
                >
                  {`.${
                    (
                      (product.price -
                        (product.price * product.discountPercentage) / 100) %
                      1
                    )
                      .toFixed(2)
                      .split(".")[1]
                  }`}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "0.8rem",
                    position: "absolute",
                    top: 6,
                    left: -10,
                  }}
                >
                  $
                </Typography>
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2" sx={{ textDecoration: "line-through" }}>
            ${product.price}
          </Typography>
        </Box>
      ) : (
        // תצוגה ללא הנחה
        <Box display="flex" alignItems="flex-start" px={1}>
          <Typography
            variant="h5"
            sx={{ fontSize: "2rem", position: "relative" }}
          >
            {Math.floor(calculateTotalPrice())}
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.8rem",
                position: "absolute",
                top: 6,
                right: -20,
              }}
            >
              {`.${(calculateTotalPrice() % 1).toFixed(2).split(".")[1]}`}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.8rem",
                position: "absolute",
                top: 6,
                left: -10,
              }}
            >
              $
            </Typography>
          </Typography>
        </Box>
      )}
    </Box>
  );
}
