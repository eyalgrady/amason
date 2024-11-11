import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { GeneralContext, RoleTypes } from "../data/VariablesDefinitions";
import { mainCategories } from "../data/categoriesData";

export default function MainMenu({ closeMenu, products }) {
  const { user, setUser, setUserRoleType } = useContext(GeneralContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setUserRoleType(RoleTypes.none);
    navigate("/");
  };

  return (
    <Drawer anchor="left" open={true} onClose={closeMenu}>
      <Box style={menuStyles}>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            background: "#232f3e",
            color: "#fff",
            padding: "0.4rem 1rem",
          }}
        >
          <Box>
            {!user ? (
              <div>
                <div style={{ fontSize: "1rem", fontWeight: "bold" }}>
                  <span>Hello, </span>
                  <Link
                    to="/users/sign-in"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    sign in
                  </Link>
                </div>
                <Link to="/users/form/sign-up">
                  <button style={{ cursor: "pointer" }}>Sign up</button>
                </Link>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: "1rem", fontWeight: "bold" }}>
                  <span>Hello, {user?.name} </span>
                </div>

                <button onClick={logout} style={{ cursor: "pointer" }}>
                  Logout
                </button>
              </div>
            )}
          </Box>
          <IconButton onClick={closeMenu} style={{ color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <nav>
          {Object.entries(mainCategories).map(([category, pages]) => (
            <Box key={category} style={{ padding: "0.5rem 1rem" }}>
              <Typography variant="h6" gutterBottom>
                <Link
                  to={`/categories/${encodeURIComponent(category)}`}
                  style={linkStyles}
                >
                  {category}
                </Link>
              </Typography>

              <List>
                {pages.map((page) => (
                  <ListItem
                    key={page}
                    // button
                  >
                    <Link
                      to={`/categories/${encodeURIComponent(
                        category
                      )}/${encodeURIComponent(page)}`}
                      state={{
                        products: products.filter(
                          (product) =>
                            product.category === category &&
                            product.subcategory === page
                        ),
                        title: page,
                      }}
                      style={linkStyles}
                    >
                      <ListItemText primary={page} />
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Box>
          ))}
        </nav>
      </Box>
    </Drawer>
  );
}

const menuStyles = {
  width: "350px",
  backgroundColor: "#fcfcfc",
  height: "100%",
};

const linkStyles = {
  textDecoration: "none",
  color: "#000", // Black text, no underline
};
