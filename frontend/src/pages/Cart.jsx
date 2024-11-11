import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Button,
  CardActions,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { GeneralContext } from "../data/VariablesDefinitions";
import { Link } from "react-router-dom";

export default function Cart() {
  const [data, setData] = useState([]);
  const { user } = useContext(GeneralContext);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleQuantityChange = (selectedFavorite, value) => {
    const updatedFavourites = data.map((item) =>
      item._id === selectedFavorite._id
        ? { ...item, selectedQuantity: value }
        : item
    );
    setData(updatedFavourites);
    calculateTotalPrice(updatedFavourites);
  };

  const calculateTotalPrice = (favouritesList = data) => {
    const total = favouritesList.reduce(
      (sum, favorite) =>
        sum + favorite.price * (favorite.selectedQuantity || 1),
      0
    );
    setTotalPrice(total);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const localStorageItems = JSON.parse(
        localStorage.getItem("cartItems") || "[]"
      );

      let mergedFavourites = localStorageItems;

      if (user && user._id) {
        try {
          const response = await fetch(`http://localhost:8060/products`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          });
          if (!response.ok) {
            throw new Error("Failed to fetch products");
          }
          const data = await response.json();

          const filteredFavourites = data.filter((favorite) =>
            favorite.carts.includes(user._id)
          );

          // איחוד פריטים לפי `_id` כדי למנוע כפילות
          const uniqueFavourites = [
            ...filteredFavourites,
            ...localStorageItems.filter(
              (localItem) =>
                !filteredFavourites.some(
                  (favItem) => favItem._id === localItem._id
                )
            ),
          ];

          mergedFavourites = uniqueFavourites;
        } catch (err) {
          console.error(err);
        }
      }

      setData(mergedFavourites);
      localStorage.setItem("cartItems", JSON.stringify(mergedFavourites)); // שמירת הנתונים לאחר המיזוג
    };

    fetchProducts();
  }, [user]);

  const remove = async ({ item }) => {
    const updatedCartItems = data.filter(
      (cartItem) => cartItem._id !== item._id
    );

    setData(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

    if (user) {
      try {
        const updatedLikes = item.carts.filter((id) => id !== user._id);

        const res = await fetch(
          `http://localhost:8060/products/${item._id}/cart`,
          {
            credentials: "include",
            method: "PATCH",
            headers: {
              "Content-type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
            body: JSON.stringify({
              carts: updatedLikes,
            }),
          }
        );

        if (!res.ok) {
          console.error("Error toggling like:", await res.text());
        }
      } catch (error) {
        console.error("Error toggling like:", error);
      }
    }
  };

  useEffect(() => {
    calculateTotalPrice();
  });

  return (
    <Box
      p={2}
      sx={{
        width: "100%",
        background:
          "linear-gradient(to top, rgba(227, 230, 230, 0.8), rgba(255, 255, 255, 0))",
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        sx={{ fontSize: "1.8rem", mb: 2 }}
        gutterBottom
      >
        Shopping Basket
      </Typography>

      {!data.length ? (
        <Box
          sx={{
            alignItems: "center",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: 2,
            marginBottom: 2,
            background: "white",
          }}
        >
          <Typography variant="h3" component="h2" sx={{ mb: 2 }}>
            Your Amason Cart is empty
          </Typography>
          <Typography variant="body2">No items in the basket.</Typography>
        </Box>
      ) : (
        <>
          <Box display="flex" gap={2}>
            <Box sx={{ width: "100%" }}>
              {data.map((item, index) => (
                <Grid
                  container
                  gap={2}
                  key={`${item._id}-${index}`} // Adding `index` to ensure uniqueness if duplicates are unavoidable
                  sx={{
                    alignItems: "center",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: 2,
                    marginBottom: 2,
                    background: "white",
                  }}
                >
                  {/* Column for image */}
                  <Grid item xs={2}>
                    <Link to={`/product/${item._id}`}>
                      <CardMedia
                        component="img"
                        height="140"
                        sx={{
                          objectFit: "contain",
                          margin: "0 auto",
                        }}
                        image={item.image?.url || "default_image_url_here"} // בדיקה אם ה-image וה-url קיימים
                        alt={item.title}
                      />
                    </Link>
                  </Grid>

                  {/* Column for product details */}
                  <Grid item xs={7} sx={{ alignSelf: "flex-start" }}>
                    <Link className="link" to={`/product/${item._id}`}>
                      <Typography
                        variant="h6"
                        sx={{ fontSize: "1rem" }} // כחול-ירקרק מותאם אישית
                      >
                        {item.title}
                      </Typography>
                    </Link>
                    <CardActions sx={{ display: "flex", gap: 1 }}>
                      <TextField
                        name="quantity"
                        type="number"
                        inputProps={{
                          min: 1,
                          max: 30,
                          step: 1,
                          style: { height: "100%", padding: "0 10px" },
                        }}
                        onChange={(e) => {
                          const value = Math.max(
                            1,
                            Math.min(30, Number(e.target.value))
                          );
                          handleQuantityChange(item, value);
                        }}
                        value={item.selectedQuantity || 1}
                      />
                      <Typography
                        variant="body1"
                        sx={{ margin: "0 8px", color: "#b0b0b0" }}
                      >
                        |
                      </Typography>
                      <Button onClick={() => remove({ item })}>Delete</Button>
                      <Typography
                        variant="body1"
                        sx={{ margin: "0 8px", color: "#b0b0b0" }}
                      >
                        |
                      </Typography>
                      <Button>Share</Button>
                    </CardActions>
                  </Grid>

                  {/* Column for price */}
                  <Grid
                    item
                    xs={2}
                    textAlign="right"
                    sx={{ alignSelf: "flex-start" }}
                  >
                    <Typography variant="h6">
                      ${item.price * (item.selectedQuantity || 1)}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
              {/* Total Price */}
              <Typography variant="h6" align="right" sx={{ padding: 2 }}>
                Total: ${totalPrice}
              </Typography>
            </Box>

            <Box
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                padding: 2,
                background: "white",
                width: "300px",
                height: "fit-content",
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontSize: "1.2rem", fontWeight: 500 }}
              >
                Subtotal ({data.length} items):
              </Typography>
              <Box
                display="flex"
                alignItems="flex-start"
                justifyContent="space-between"
                px={1}
                my={1}
              >
                <Typography
                  variant="h5"
                  sx={{ fontSize: "2rem", position: "relative" }}
                >
                  {Math.floor(totalPrice)}
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
                      (Math.floor(totalPrice) % 1).toFixed(2).split(".")[1]
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
              <Button
                fullWidth
                component={Link}
                to={user ? "/payment-page" : "/users/sign-in"}
                state={{ data: data }}
                sx={{
                  borderRadius: "10rem",
                  padding: ".3rem 1rem",
                  backgroundColor: "#fdb13e",
                  "&:hover": { backgroundColor: "#ffa41c", cursor: "pointer" },
                  color: "black",
                  fontSize: "0.8rem",
                }}
              >
                Proceed to Checkout
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}
