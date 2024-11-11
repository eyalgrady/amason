import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { GeneralContext } from "../data/VariablesDefinitions";
import { Link } from "react-router-dom";

export default function ProductActions({ product }) {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  const { user, snackbar } = useContext(GeneralContext);

  useEffect(() => {
    const cartKey = "cartItems";
    let currentCart = JSON.parse(localStorage.getItem(cartKey)) || [];

    // Check if the product is already in the cart
    const existingProduct = currentCart.find(
      (item) => item._id === product._id
    );
    if (existingProduct || product?.carts.includes(user?._id)) {
      setIsInCart(true);
    }
  }, [product.carts, product._id, user?._id]);

  const handleQuantityChange = (value) =>
    setSelectedQuantity(Math.max(1, Math.min(30, value)));

  const calculateTotalPrice = () => {
    const pricePerUnit = product.discountPercentage
      ? product.price - (product.price * product.discountPercentage) / 100
      : product.price;
    return pricePerUnit * selectedQuantity; // מחזיר את המחיר הכולל לפי הכמות הנבחרת
  };

  const handleCartToggle = async () => {
    const cartKey = "cartItems";
    let currentCart = JSON.parse(localStorage.getItem(cartKey)) || [];

    if (user) {
      // User is logged in, update on server
      const updatedCarts = isInCart
        ? product.carts.filter((id) => id !== user._id)
        : [...product.carts, user._id];
      try {
        const res = await fetch(
          `http://localhost:8060/products/${product._id}/cart`,
          {
            credentials: "include",
            method: "PATCH",
            headers: {
              "Content-type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
            body: JSON.stringify({
              carts: updatedCarts,
            }),
          }
        );
        if (res.ok) {
          setIsInCart(!isInCart);
        }
      } catch (error) {
        snackbar("Error toggling like:", error);
      }
    } else {
      // User is not logged in, update in local storage
      const existingProductIndex = currentCart.findIndex(
        (item) => item._id === product._id
      );

      if (existingProductIndex > -1) {
        // If product is in cart, remove it
        currentCart.splice(existingProductIndex, 1);
        setIsInCart(false);
      } else {
        // If product is not in cart, add it
        currentCart.push({
          _id: product._id,
          title: product.title,
          price: calculateTotalPrice(),
          quantity: selectedQuantity,
          image: { url: product.image.url },
        });
        setIsInCart(true);
      }

      localStorage.setItem(cartKey, JSON.stringify(currentCart));
      snackbar(
        isInCart ? "Product removed from basket!" : "Product added to basket!"
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        maxWidth: "300px",
      }}
    >
      <Card
        sx={{
          boxShadow: "none",
          border: "1px solid #ddd",
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Box marginY={2}>
            {product.discountPercentage ? (
              // תצוגה עם הנחה
              <Box>
                <Box display={"flex"} gap={1}>
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
                        {`.${
                          (
                            (product.price -
                              (product.price * product.discountPercentage) /
                                100) %
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

          <Box marginY={2}>
            <Typography
              color={
                product.quantity > 1
                  ? "green"
                  : product.quantity === 1
                  ? "orange"
                  : "red"
              }
              fontWeight="bold"
            >
              {product.quantity > 1
                ? "In stock"
                : product.quantity === 1
                ? "Only 1 left in stock"
                : "Not in stock"}
            </Typography>
          </Box>

          <TextField
            name="quantity"
            type="number"
            inputProps={{
              min: 1,
              max: 30,
              style: { height: "100%", padding: "0 10px" },
            }}
            onChange={(e) => handleQuantityChange(Number(e.target.value))}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Quantity</InputAdornment>
              ),
            }}
            value={selectedQuantity}
            sx={{ mb: 1.5 }}
          />

          <Button
            fullWidth
            disableRipple
            sx={{
              borderRadius: "10rem",
              padding: ".3rem 0",
              backgroundColor: "#f8db57",
              "&:hover": {
                backgroundColor: "#f8d847",
                cursor: "pointer",
              },
              color: "black",
              fontSize: "0.8rem",
              mb: 0.5,
            }}
            onClick={handleCartToggle}
          >
            {isInCart ? "Remove from Basket" : "Add to Basket"}
          </Button>

          <Button
            fullWidth
            component={Link}
            to={user ? "/payment-page" : "/users/sign-in"}
            state={{ product: product }}
            sx={{
              borderRadius: "10rem",
              padding: ".3rem 0",
              backgroundColor: "#fdb13e",
              "&:hover": {
                backgroundColor: "#ffa41c",
                cursor: "pointer",
              },
              color: "black",
              fontSize: "0.8rem",
            }}
          >
            Buy Now
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
