import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../images/amason-white.png";
import {
  Button,
  FormHelperText,
  Grid,
  Box,
  TextField,
  Typography,
  Paper,
  Snackbar,
  Alert,
  Divider,
} from "@mui/material";
import { GeneralContext } from "../data/VariablesDefinitions";
import Joi from "joi";

const paymentSchema = Joi.object({
  address: Joi.object({
    postcode: Joi.number().required(),
    street: Joi.string().min(2).max(256).required(),
    optionalText: Joi.string().min(2).max(256).allow(""),
    city: Joi.string().min(2).max(256).required(),
    country: Joi.string().min(2).max(256).required(),
  }).required(),
  cardNumber: Joi.string().required(),
  expiryDate: Joi.string().required(),
  cvc: Joi.string().required(),
});

export default function PaymentPage() {
  const location = useLocation();
  const data = location.state?.data || [];
  const product = location.state?.product;
  const [formData, setFormData] = useState({
    address: {
      postcode: "",
      street: "",
      optionalText: "",
      city: "",
      country: "",
    },
  });
  const [formPayment, setFormPayment] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState("");
  const { user, setLoading, snackbar } = useContext(GeneralContext);
  const navigate = useNavigate();

  const shipping = product?.price > 50 ? 0 : 15;
  const price = (parseFloat(product?.price) || 0) + shipping;

  const calculateTotalPrice = () => {
    const totalProductPrice = data?.reduce(
      (total, product) => total + (parseFloat(product.price) || 0),
      0
    );
    const shippingCost = totalProductPrice > 50 ? 0 : 15;
    return totalProductPrice + shippingCost;
  };

  const totalPrice = calculateTotalPrice();

  const inputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      setFormData((prevData) => ({
        ...prevData,
        address: { ...prevData.address, [name.split(".")[1]]: value },
      }));
    } else {
      setFormPayment((prevPayment) => ({
        ...prevPayment,
        [name]: value,
      }));
    }
  };

  const save = async (e) => {
    e.preventDefault();

    const combinedData = {
      address: formData.address,
      cardNumber: formPayment.cardNumber,
      expiryDate: formPayment.expiryDate,
      cvc: formPayment.cvc,
    };
    const { error } = paymentSchema.validate(combinedData, {
      abortEarly: false,
    });

    if (error) {
      console.log("Validation errors:", error.details);

      const errors = {};
      error.details.forEach((err) => {
        errors[err.context.key] = err.message;
      });
      setFieldErrors(errors);

      return false;
    }

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:8060/users/${user._id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        snackbar("Your order has been successfully received", "success");
        await updateSales();
      } else {
        setError(await res.text());
        setFieldErrors(await res.text());
      }
    } catch (error) {
      console.error("Error during user save:", error);
      setError("An error occurred while saving data.");
    } finally {
      setLoading(false);
    }
  };

  const updateSales = async () => {
    try {
      if (product) {
        // Update sales for a single product
        const productId = product._id;

        console.log("Product ID for sales update:", productId);

        const res = await fetch(
          `http://localhost:8060/products/${productId}/sales`,
          {
            method: "PATCH",
            headers: {
              "Content-type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        if (!res.ok) {
          setError(await res.text());
          setFieldErrors(await res.text());
        } else {
          const updatedProduct = await res.json();
          console.log("Product updated with sales:", updatedProduct);
        }
      } else if (data.length > 0) {
        // Update sales for all products in cart
        await Promise.all(
          data.map(async (product) => {
            const res = await fetch(
              `http://localhost:8060/products/${product._id}/sales`,
              {
                method: "PATCH",
                headers: {
                  "Content-type": "application/json",
                  Authorization: localStorage.getItem("token"),
                },
              }
            );

            if (!res.ok) {
              setError(await res.text());
              setFieldErrors(await res.text());
            }
          })
        );
      }
    } catch (error) {
      console.error("Error during sales update:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8060/users/${user._id}`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) throw new Error("Failed to fetch user");

        const data = await response.json();

        const userData = {
          _id: data.user._id,
          address: {
            postcode: data.user.address.postcode,
            street: data.user.address.street,
            optionalText: data.user.address.optionalText,
            city: data.user.address.city,
            country: data.user.address.country,
          },
        };

        setFormData(userData);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user._id, setLoading]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white",
        padding: 8,
      }}
    >
      <Link to="/">
        <Box sx={{ width: "200px", mb: 3 }}>
          <img
            src={logo}
            alt="amason-logo"
            style={{ maxWidth: "100%", height: "auto", objectFit: "contain" }}
          />
        </Box>
      </Link>

      <Paper
        elevation={3}
        sx={{
          padding: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Place your order
        </Typography>
        <Divider />

        {product ? (
          <Box>
            <Typography>Items Price: ${product?.price}</Typography>
            <Box display="flex" alignItems="center">
              <Typography>Shipping & Handling:&nbsp;</Typography>
              {shipping === 0 ? (
                <Typography variant="body1" color="green" fontWeight="bold">
                  Free Delivery
                </Typography>
              ) : (
                <Typography variant="body1">{`$${shipping}`}</Typography>
              )}
            </Box>

            <Typography fontWeight="bold">Order Total: ${price}</Typography>
          </Box>
        ) : (
          <Box>
            {data.map((product) => (
              <Box key={product._id} sx={{ mb: 2 }}>
                <Typography>
                  {product.title}: ${product.price}
                </Typography>
              </Box>
            ))}
            <Box display="flex" alignItems="center">
              <Typography>Shipping & Handling:&nbsp;</Typography>
              {totalPrice > 50 ? (
                <Typography variant="body1" color="green" fontWeight="bold">
                  Free Delivery
                </Typography>
              ) : (
                <Typography variant="body1">$15</Typography>
              )}
            </Box>

            <Typography fontWeight="bold">
              Order Total: ${totalPrice}
            </Typography>
          </Box>
        )}

        <form onSubmit={save}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Delivery Address</Typography>
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Postcode"
                name="address.postcode"
                value={formData.address?.postcode || ""}
                onChange={inputChange}
                fullWidth
                error={!!fieldErrors.postcode}
                helperText={fieldErrors.postcode}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Street and Number"
                name="address.street"
                value={formData.address?.street || ""}
                onChange={inputChange}
                fullWidth
                error={!!fieldErrors.street}
                helperText={fieldErrors.street}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Country/Region"
                name="address.country"
                value={formData.address?.country || ""}
                onChange={inputChange}
                fullWidth
                error={!!fieldErrors.country}
                helperText={fieldErrors.country}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="City"
                name="address.city"
                value={formData.address?.city || ""}
                onChange={inputChange}
                fullWidth
                error={!!fieldErrors.city}
                helperText={fieldErrors.city}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Additional Info (Optional)"
                name="address.optionalText"
                placeholder="PO Box, Floor, etc."
                value={formData.address?.optionalText || ""}
                onChange={inputChange}
                fullWidth
                error={!!fieldErrors.optionalText}
                helperText={fieldErrors.optionalText}
              />
              <FormHelperText>PO Box, Floor, Block (optional)</FormHelperText>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">Payment Details</Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Card Number"
                name="cardNumber"
                placeholder="XXXX XXXX XXXX XXXX"
                value={formPayment.cardNumber || ""}
                onChange={inputChange}
                fullWidth
                error={!!fieldErrors.cardNumber}
                helperText={fieldErrors.cardNumber}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Expiry Date"
                name="expiryDate"
                placeholder="MM/YY"
                value={formPayment.expiryDate || ""}
                onChange={inputChange}
                fullWidth
                error={!!fieldErrors.expiryDate}
                helperText={fieldErrors.expiryDate}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="CVC"
                name="cvc"
                placeholder="XXX"
                value={formPayment.cvc || ""}
                onChange={inputChange}
                fullWidth
                error={!!fieldErrors.cvc}
                helperText={fieldErrors.cvc}
              />
            </Grid>

            {error && <Typography color="error">{error}</Typography>}

            <Grid item xs={6}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#f7ca00",
                  borderRadius: 2,
                  padding: "10px",
                  color: "#131921",
                  marginTop: 2,
                }}
                fullWidth
              >
                Place your order
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Button
                type="reset"
                variant="outlined"
                color="secondary"
                onClick={() => {
                  // איפוס הנתונים בטופס
                  setFormData({
                    address: {
                      postcode: "",
                      street: "",
                      optionalText: "",
                      city: "",
                      country: "",
                    },
                  });
                  setFormPayment({
                    cardNumber: "",
                    expiryDate: "",
                    cvc: "",
                  });
                  // חזרה לדף הקודם
                  navigate(-1);
                }}
                sx={{
                  borderRadius: 2,
                  padding: "10px",
                  marginTop: 2,
                }}
                fullWidth
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError("")}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Box>
  );
}
