import React from "react";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const footerLinks = {
  "Get to Know Us": {
    pages: [
      { label: "About Us", path: "/about" },
      { label: "Contact Us", path: "/contact" },
      { label: "Privacy Policy", path: "/privacy-policy" },
      { label: "Terms of Use", path: "/terms-of-use" },
      { label: "Cookie Policy", path: "/cookie-policy" },
    ],
  },
  "Let Us Help You": {
    pages: [
      { label: "Sign in", path: "/users/sign-in" },
      { label: "Create a new account", path: "/users/form/sign-up" },
      {
        label: "Create a free business account",
        path: "/business/form/sign-up",
      },
      { label: "FAQ", path: "/faq" },
      { label: "Terms & Conditions", path: "/terms-conditions" },
    ],
  },
  "Customer Service": {
    pages: [
      { label: "Customer Service", path: "/customer-service" },
      { label: "Returns & Exchange", path: "/returns" },
      { label: "Shipping & Delivery", path: "/shipping" },
      { label: "Return Policy", path: "/return-policy" },
    ],
  },

  "Main categories": {
    pages: [
      {
        label: "Clothing & Fashion",
        path: `/categories/${encodeURIComponent("Clothing & Fashion")}`,
      },
      {
        label: "Electronics & Appliances",
        path: `/categories/${encodeURIComponent("Electronics & Appliances")}`,
      },
      {
        label: "Home & Garden",
        path: `/categories/${encodeURIComponent("Home & Garden")}`,
      },
      {
        label: "Beauty & Health",
        path: `/categories/${encodeURIComponent("Beauty & Health")}`,
      },
      {
        label: "Sports & Leisure",
        path: `/categories/${encodeURIComponent("Sports & Leisure")}`,
      },
      {
        label: "Books & Media",
        path: `/categories/${encodeURIComponent("Books & Media")}`,
      },
      {
        label: "Toys & Games",
        path: `/categories/${encodeURIComponent("Toys & Games")}`,
      },
      {
        label: "Jewelry & Watches",
        path: `/categories/${encodeURIComponent("Jewelry & Watches")}`,
      },
      {
        label: "Food & Beverages",
        path: `/categories/${encodeURIComponent("Food & Beverages")}`,
      },
      {
        label: "Gifts & Events",
        path: `/categories/${encodeURIComponent("Gifts & Events")}`,
      },
    ],
  },
};

export default function Footer() {
  return (
    <Box
      component="footer"
      style={{
        position: "relative",
        width: "100%",
        fontSize: "14px",
      }}
    >
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "100px",
          padding: ".4rem",
          backgroundColor: "#232f3e",
        }}
      >
        {Object.entries(footerLinks).map(([category, { pages }]) => (
          <Box key={category} style={{ color: "#fff", padding: "0.5rem 1rem" }}>
            <Typography
              variant="h6"
              sx={{ color: "#fff", marginBottom: "0.5rem" }}
            >
              {category}
            </Typography>

            <List dense sx={{ padding: 0 }}>
              {pages.map(({ label, path }) => (
                <ListItem key={label} sx={{ padding: ".8px 0" }}>
                  <Link
                    to={path}
                    style={{ textDecoration: "none", color: "#ccc" }}
                  >
                    <ListItemText primary={label} />
                  </Link>
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          backgroundColor: "#131a22",
          padding: "20px",
          textAlign: "center",
          color: "#fff",
        }}
      >
        &copy; 2024 Amason Website by Eyal Grady. All rights reserved.
      </Box>
    </Box>
  );
}
