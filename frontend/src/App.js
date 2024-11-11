import React, { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Router from "./Router";
import { jwtDecode } from "jwt-decode";
import Loader from "./components/Loader.jsx";
import { Box } from "@mui/material";
import Snackbar from "./components/Snackbar.jsx";
import MainMenu from "./components/MainMenu.jsx";
import { matchPath, useLocation } from "react-router-dom";
import { GeneralContext, RoleTypes } from "./data/VariablesDefinitions.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [userRoleType, setUserRoleType] = useState(RoleTypes.none);
  const [loading, setLoading] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");
  const [isScreenShifted, setIsScreenShifted] = useState(false);
  const location = useLocation();
  const hideNavbarRoutes = [
    "/users/form/sign-up",
    "/users/sign-in",
    "/business/form/sign-up",
    "/payment-page",
  ];

  const isNavbarHidden = hideNavbarRoutes.includes(location.pathname);

  const isProductPage = matchPath(
    "/business/:businessId/product/:productId",
    location.pathname
  );
  const snackbar = (text) => {
    setSnackbarText(text);
    setTimeout(() => setSnackbarText(""), 3 * 1000);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwtDecode(token);

      const now = new Date();
      const exp = new Date(user.exp * 1000);

      if (exp > now) {
        if (user.isAdmin === true) {
          setUserRoleType(RoleTypes.admin);
        } else if (user.isBusiness === true) {
          setUserRoleType(RoleTypes.business);
        } else {
          setUserRoleType(RoleTypes.user);
        }
        setUser(user);
      } else {
        setUser();
        localStorage.removeItem("token");
        setUserRoleType(RoleTypes.none);
      }
    } else {
      setUser();
    }
  }, []);

  const toggleMenu = () => {
    setIsScreenShifted((prev) => !prev);
  };
  const closeMenu = () => {
    setIsScreenShifted(false);
  };
  const [appBarHeight, setAppBarHeight] = useState(0);

  useEffect(() => {
    const appBar = document.querySelector(".MuiAppBar-root");
    if (appBar) {
      setAppBarHeight(appBar.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8060/products`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const fetchedProducts = await response.json();
        setProducts(fetchedProducts);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [setLoading]);

  if (error) return <p>Error: {error}</p>;
  return (
    <GeneralContext.Provider
      value={{
        user,
        userRoleType,
        isScreenShifted,
        products,
        setProducts,
        setLoading,
        snackbar,
        setUser,
        setUserRoleType,
        toggleMenu,
      }}
    >
      <Box
        className={isScreenShifted ? "shifted-content" : ""}
        sx={{
          transition: "transform 0.3s ease", // מעבר חלק
          position: "relative",
          minHeight: "100vh",
        }}
      >
        {!isNavbarHidden && !isProductPage && <Navbar />}

        <Box
          sx={{
            paddingTop:
              isNavbarHidden || isProductPage ? 0 : `${appBarHeight}px`,

            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Router />
          </Box>
          <Footer />
        </Box>
      </Box>
      {loading && <Loader />}
      {snackbarText && <Snackbar text={snackbarText} />}
      {isScreenShifted && (
        <MainMenu products={products} closeMenu={closeMenu} />
      )}
    </GeneralContext.Provider>
  );
}

export default App;
