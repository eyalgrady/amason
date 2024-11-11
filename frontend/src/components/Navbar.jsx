import React, { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../images/amason-black.png";
import SearchBar from "./SearchBar";

import {} from "@mui/material";
import {
  checkPermissions,
  GeneralContext,
  RoleTypes,
} from "../data/VariablesDefinitions";

const pages = [
  { route: "/", title: "Menu", action: "openMenu" },
  { route: "/", title: "All" },
  { route: "/about", title: "About" },
  { route: "/contact", title: "Contact" },
];

export default function Navbar() {
  const { user, setUser, userRoleType, setUserRoleType, toggleMenu } =
    useContext(GeneralContext);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const pagesAuth = [
    {
      route: user ? `/users/form/${user._id}` : "My Panel",
      title: user ? `${user?.name}'s Panel` : "My Panel",
      permissions: [RoleTypes.user],
    },
    {
      route: user ? `/business/${user._id}/Main` : "My Shop",
      title: user ? `${user?.businessName}'s Shop` : "My Shop",
      permissions: [RoleTypes.business],
    },
    {
      route: "/admin",
      title: "Admin Panel",
      permissions: [RoleTypes.admin],
    },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setUserRoleType(RoleTypes.none);
    navigate("/");
  };

  return (
    <AppBar
      sx={{
        backgroundColor: "#131921",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          padding: "10px 20px",
        }}
      >
        {/* Logo Section */}
        <Link to="/" style={{ display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            alt="amason-logo"
            style={{ height: "40px", objectFit: "cover" }}
          />
        </Link>

        {/* SearchBar */}
        <Box sx={{ flexGrow: 1, mx: 2 }}>
          <SearchBar />
        </Box>

        {/* Auth and Cart Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {!token ? (
            <Box>
              <Typography variant="caption" component="div">
                Hello,{" "}
                <Link
                  to="users/sign-in"
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  sign in
                </Link>
              </Typography>
              <Button
                variant="contained"
                size="small"
                component={Link}
                to="users/form/sign-up"
                sx={{
                  backgroundColor: "#9e9e9e",
                  "&:hover": {
                    backgroundColor: "#757575",
                  },
                  color: "white",
                  textTransform: "none", // הטקסט לא יהיה באותיות רישיות
                  py: "0",
                  px: "12px",
                  fontSize: "0.9rem",
                }}
              >
                Sign up
              </Button>
            </Box>
          ) : (
            <Box>
              <Typography variant="caption" component="div">
                Hello, {user?.name}
              </Typography>
              <Button variant="contained" size="small" onClick={logout}>
                Logout
              </Button>
            </Box>
          )}

          {/* Cart Icon */}
          <IconButton component={Link} to="/cart" color="inherit">
            <FaShoppingCart size={24} />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Bottom Navigation Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#232f3e",
          height: "40px",
          padding: "0 20px",
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          {pages.map((p) =>
            p.action === "openMenu" ? (
              <IconButton key={p.title} onClick={toggleMenu} color="inherit">
                <MenuIcon />
              </IconButton>
            ) : (
              <Link
                key={p.route}
                to={p.route}
                style={{
                  textDecoration: "none",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {p.title}
              </Link>
            )
          )}
        </Box>

        {/* Authorized Pages */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {pagesAuth
            .filter(
              (p) =>
                !p.permissions || checkPermissions(p.permissions, userRoleType)
            )
            .map((p) => (
              <Link
                key={p.title}
                to={p.route}
                style={{ textDecoration: "none", color: "#fff" }}
              >
                {p.title}
              </Link>
            ))}
        </Box>
      </Box>
    </AppBar>
  );
}
