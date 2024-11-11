import { useContext, useEffect, useState } from "react";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { GeneralContext } from "../../data/VariablesDefinitions";
import BusinessDashboard from "../../components/BusinessDashboard";
import DataTable from "../admin/DataTable";
import { Link } from "react-router-dom";

export default function BusinessMain() {
  const [products, setProducts] = useState({});
  const [activePage, setActivePage] = useState("dashboard");
  const { user, setLoading } = useContext(GeneralContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handlePageChange = (page) => {
    setActivePage(page);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:8060/products/my-products",
          {
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setProducts(data.products || []);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        alert(`Error fetching data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setLoading]);

  return (
    <Box display="flex" alignItems="flex-start" p={2}>
      {activePage === "dashboard" && (
        <BusinessDashboard data={products} totalProducts={products.length} />
      )}

      {activePage === "products" && (
        <DataTable data={products} pageType="products" />
      )}

      <Box
        sx={{
          width: isMenuOpen ? "200px" : "50px",
          bgcolor: "background.paper",
          boxShadow: isMenuOpen ? 3 : 0,
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          transition: "width 0.3s ease",
        }}
      >
        {/* כפתור פתיחה/סגירה */}
        <IconButton onClick={() => setIsMenuOpen(!isMenuOpen)} sx={{ m: 1 }}>
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>

        {isMenuOpen && (
          <List sx={{ width: "100%", textAlign: "right" }}>
            <Box>
              <ListItem
                button={String(true)}
                onClick={() => handlePageChange("dashboard")}
                sx={{
                  "&:hover": { bgcolor: "primary.light", color: "white" },
                  justifyContent: "flex-end",
                  cursor: "pointer",
                }}
              >
                <ListItemText
                  primary={"Dashboard"}
                  sx={{
                    textAlign: "right",
                    paddingRight: 2,
                    fontWeight: activePage === "Dashboard" ? "bold" : "normal",
                  }}
                />
              </ListItem>
              <Divider />
            </Box>
            <Box>
              <ListItem
                button={String(true)}
                onClick={() => handlePageChange("products")}
                sx={{
                  "&:hover": { bgcolor: "primary.light", color: "white" },
                  justifyContent: "flex-end",
                  cursor: "pointer",
                }}
              >
                <ListItemText
                  primary={"products"}
                  sx={{
                    textAlign: "right",
                    paddingRight: 2,
                    fontWeight: activePage === "products" ? "bold" : "normal",
                  }}
                />
              </ListItem>
              <Divider />
            </Box>
            <Box>
              <ListItem
                button={String(true)}
                component={Link}
                className="link"
                to={`/products/form/add`}
                sx={{
                  "&:hover": { bgcolor: "primary.light", color: "white" },
                  justifyContent: "flex-end",
                  cursor: "pointer",
                }}
              >
                <ListItemText
                  primary={"New Product"}
                  sx={{
                    textAlign: "right",
                    paddingRight: 2,
                    fontWeight:
                      activePage === "New Product" ? "bold" : "normal",
                  }}
                />
              </ListItem>
              <Divider />
            </Box>
            <Box>
              <ListItem
                button={String(true)}
                component={Link}
                className="link"
                to={`/business/form/${user._id}`}
                sx={{
                  "&:hover": { bgcolor: "primary.light", color: "white" },
                  justifyContent: "flex-end",
                  cursor: "pointer",
                }}
              >
                <ListItemText
                  primary={"Settings"}
                  sx={{
                    textAlign: "right",
                    paddingRight: 2,
                    fontWeight: activePage === "Settings" ? "bold" : "normal",
                  }}
                />
              </ListItem>
              <Divider />
            </Box>
          </List>
        )}
      </Box>
    </Box>
  );
}
