import React, { useContext, useState } from "react";
import logo from "../../images/amason-white.png";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  Button,
  Box,
  Grid,
  TextField,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import { GeneralContext, RoleTypes } from "../../data/VariablesDefinitions";

export default function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");
  const { setLoading, setUser, setUserRoleType, snackbar } =
    useContext(GeneralContext);
  const navigate = useNavigate();

  const inputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const login = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:8060/users/login`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setLoading(true);
      const token = await res.text();
      localStorage.setItem("token", token);
      const user = jwtDecode(token);

      if (user) {
        if (user.isAdmin === true) {
          setUserRoleType(RoleTypes.admin);
        } else if (user.isBusiness === true) {
          setUserRoleType(RoleTypes.business);
        } else {
          setUserRoleType(RoleTypes.user);
        }
      }

      setUser(user);
      snackbar("Sign in successfully", "success");
      navigate("/");
    } else {
      setLoginError(await res.text());
    }

    setLoading(false);
  };

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
          Sign in
        </Typography>

        <form onSubmit={login}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={inputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={inputChange}
                fullWidth
              />
            </Grid>
          </Grid>

          {loginError && <Typography color="error">{loginError}</Typography>}

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
            Signin
          </Button>

          <Typography variant="body2" sx={{ marginTop: 2 }}>
            By signing in, you agree to Amason's Conditions of Use & Sale.
            Please see our Privacy Notice, our Cookies Notice and our
            Interest-Based Ads Notice.
          </Typography>

          <Divider
            sx={{
              borderColor: "#ccc",
              opacity: 0.5,
              my: 1,
            }}
          />

          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography className="title-wrapper" variant="h6" sx={{ mb: 1 }}>
              New to Amason?
            </Typography>
            <Link to="/users/form/sign-up">
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#adb2bb",
                  color: "#000",
                  borderRadius: 2,
                  padding: "10px",
                  width: "100%",
                }}
              >
                Create your Amason account
              </Button>
            </Link>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
