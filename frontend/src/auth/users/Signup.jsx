import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../../images/amason-white.png";
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
import { GeneralContext } from "../../data/VariablesDefinitions";

export default function Signup() {
  const { id } = useParams();

  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const { setLoading, snackbar } = useContext(GeneralContext);
  const navigate = useNavigate();

  const inputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const save = async (e) => {
    e.preventDefault();

    if (formData._id && !formData.oldPassword) {
      setError("Please enter your current password.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:8060/users${formData._id ? `/${id}` : ""}`,
        {
          method: formData._id ? "PUT" : "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        snackbar(
          id === "sign-up" ? "Sign up successfully" : "Updated successfully",
          "success"
        );
        if (!formData._id) navigate("/users/sign-in");
      } else {
        setError(await res.text());
      }
    } catch (error) {
      console.error("Error during user save:", error);
      setError("An error occurred while saving data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (id === "sign-up") {
        setFormData({
          name: "",
          phone: "",
          email: "",
          password: "",
        });
      } else {
        setLoading(true);
        try {
          const response = await fetch(`http://localhost:8060/users/${id}`, {
            credentials: "include",
          });
          if (!response.ok) throw new Error("Failed to fetch user");

          const data = await response.json();

          const userData = {
            _id: data.user._id,
            name: data.user.name,
            phone: data.user.phone,
            email: data.user.email,
            oldPassword: data.user.oldPassword,
            newPassword: data.user.newPassword,
          };

          setFormData(userData);
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [id, setLoading]);

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
        <Box
          sx={{
            width: "200px",
            height: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 3,
          }}
        >
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
          width: "400px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
          }}
        >
          {!formData._id ? "Create account" : "Update details"}
        </Typography>

        <form onSubmit={save}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Your name"
                name="name"
                value={formData.name || ""}
                onChange={inputChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                value={formData.email || ""}
                onChange={inputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Mobile phone (optional)"
                name="phone"
                value={formData.phone || ""}
                onChange={inputChange}
                fullWidth
              />
            </Grid>
            {!formData._id && (
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  name="password"
                  value={formData.password || ""}
                  onChange={inputChange}
                  fullWidth
                />
                <FormHelperText>
                  Passwords must be at least 6 characters long.
                </FormHelperText>
              </Grid>
            )}
            {formData._id && (
              <>
                <Grid item xs={12}>
                  <TextField
                    label="Current password"
                    name="oldPassword"
                    value={formData.oldPassword || ""}
                    onChange={inputChange}
                    fullWidth
                  />
                  <FormHelperText>
                    Enter your current password to update.
                  </FormHelperText>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="New password"
                    name="newPassword"
                    value={formData.newPassword || ""}
                    onChange={inputChange}
                    fullWidth
                  />
                  <FormHelperText>
                    Password must be at least 6 characters long.
                  </FormHelperText>
                </Grid>
              </>
            )}
          </Grid>

          {error && <Typography color="error">{error}</Typography>}
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
            {!formData._id ? "Signup" : "Update"}
          </Button>

          {!formData._id && (
            <>
              <Typography variant="body2" sx={{ marginTop: 2 }}>
                By creating an account, you agree to Amason's Conditions of Use
                & Sale. Please see our Privacy Notice, our Cookies Notice and
                our Interest-Based Ads Notice.
              </Typography>

              <Divider
                sx={{
                  borderColor: "#ccc",
                  opacity: 0.5,
                  my: 1,
                }}
              />

              <Typography variant="body2">
                Already have an account?{" "}
                <Link className="link" to="/users/sign-in">
                  Sign in
                </Link>
              </Typography>

              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Typography
                  className="title-wrapper"
                  variant="h6"
                  sx={{ mb: 1 }}
                >
                  Set up your own online store?
                </Typography>
                <Link to="/business/form/sign-up">
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: "#adb2bb",
                      color: "#000",
                      borderRadius: 2,
                      padding: "5px 0",
                    }}
                    fullWidth
                  >
                    Create a free business account
                  </Button>
                </Link>
              </Box>
            </>
          )}
        </form>
      </Paper>
      {/* Snackbar for feedback */}
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
