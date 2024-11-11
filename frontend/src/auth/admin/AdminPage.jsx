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
import Dashboard from "./Dashboard";
import DataTable from "./DataTable";
import { GeneralContext } from "../../data/VariablesDefinitions";

export default function AdminPage() {
  const [customers, setCustomers] = useState({});
  const [business, setBusiness] = useState({});
  const [products, setProducts] = useState({});
  const [activePage, setActivePage] = useState("dashboard");
  const { setLoading } = useContext(GeneralContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handlePageChange = (page) => {
    setActivePage(page);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8060/admin/dashboard", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();

          const customers = data.users.filter(
            (user) => user.isBusiness === false
          );

          setCustomers(customers);

          const business = data.users.filter(
            (user) => user.isBusiness === true
          );

          setBusiness(business);

          const products = data.products;
          setProducts(products);
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
    <Box
      display="flex"
      alignItems="flex-start"
      p={2}
      sx={{ position: "relative" }}
    >
      {activePage === "dashboard" && <Dashboard />}
      {activePage === "users" && (
        <DataTable data={customers} pageType="users" />
      )}
      {activePage === "business" && (
        <DataTable data={business} pageType="business" />
      )}
      {activePage === "products" && (
        <DataTable data={products} pageType="products" />
      )}

      {/* תפריט צד ימין */}
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

        {/* פריטי תפריט */}
        {isMenuOpen && (
          <List sx={{ width: "100%", textAlign: "right" }}>
            {["Dashboard", "Users", "Business", "Products"].map(
              (text, index) => (
                <Box key={text}>
                  <ListItem
                    button={String(true)}
                    onClick={() => handlePageChange(text.toLowerCase())}
                    sx={{
                      "&:hover": { bgcolor: "primary.light", color: "white" },
                      justifyContent: "flex-end",
                      cursor: "pointer",
                    }}
                  >
                    <ListItemText
                      primary={text}
                      sx={{
                        textAlign: "right",
                        paddingRight: 2,
                        fontWeight:
                          activePage === text.toLowerCase() ? "bold" : "normal",
                      }}
                    />
                  </ListItem>
                  {index < 3 && <Divider />}
                </Box>
              )
            )}
          </List>
        )}
      </Box>
    </Box>
  );
}
