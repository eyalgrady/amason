import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Paper,
  List,
  ListItemText,
  ListItemButton,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const resultsRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const categoriesPages = {
    "Clothing & Fashion": ["Men", "Women", "Kids"],
    "Electronics & Appliances": ["Smartphones", "Computers", "Home Appliances"],
    "Home & Garden": ["Furniture", "Home Accessories", "Gardening"],
    "Beauty & Health": ["Personal Care", "Cosmetics", "Supplements"],
    "Sports & Leisure": [
      "Sportswear",
      "Sports Equipment",
      "Outdoor Activities",
    ],
    "Books & Media": ["Books", "Music", "Movies"],
    "Toys & Games": ["Children's Toys", "Educational Games", "Puzzles"],
    "Jewelry & Watches": ["Jewelry", "Watches", "Accessories"],
    "Food & Beverages": [
      "Food Products",
      "Alcoholic Beverages",
      "Organic Food",
    ],
    "Gifts & Events": ["Gifts", "Holiday Items", "Event Decorations"],
  };

  const fetchData = async (value) => {
    if (!value.trim()) {
      setResults([]);
      setShowResults(false);

      return;
    }
    try {
      const response = await fetch("http://localhost:8060/products", {
        credentials: "include",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const results = data.filter((product) =>
        product.title.toLowerCase().includes(value.toLowerCase())
      );
      setResults(results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setShowResults(true);
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);

    // Check if the value matches any category
    const matchedCategory = Object.keys(categoriesPages).find(
      (category) => category.toLowerCase() === value.toLowerCase()
    );

    if (matchedCategory) {
      navigate(`/categories/${encodeURIComponent(matchedCategory)}`); // Navigate to category page
      setShowResults(false); // סגירת תיבת התוצאות לאחר מעבר לקטגוריה
    }
  };

  useEffect(() => {
    if (resultsRef.current && inputRef.current) {
      resultsRef.current.style.width = `${inputRef.current.offsetWidth}px`; // Match width with input
    }
  }, [input, results]);

  const handleResultClick = (id) => {
    navigate(`/product/${id}`);
    setShowResults(false); // סגירת תיבת התוצאות אחרי לחיצה
  };

  const handleClearInput = () => {
    setInput("");
    setResults([]);
    setShowResults(false);
  };

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Paper
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          borderRadius: 1,
          backgroundColor: "white",
          overflow: "hidden",
        }}
      >
        <TextField
          ref={inputRef}
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search Amason"
          variant="standard"
          InputProps={{
            disableUnderline: true,
            sx: { fontSize: "1.25rem", padding: "0 15px", flexGrow: 1 },
            endAdornment: (
              <InputAdornment position="end">
                {input && (
                  <IconButton onClick={handleClearInput} edge="end">
                    <Close />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
          fullWidth
        />
        <Box sx={{ padding: "10px", backgroundColor: "#febd69" }}>
          <FaSearch style={{ color: "#131921", fontSize: "1.5rem" }} />
        </Box>
      </Paper>
      {showResults && results.length > 0 && (
        <Paper
          ref={resultsRef}
          sx={{
            position: "absolute",
            top: "100%",
            width: "100%",
            backgroundColor: "white",
            maxHeight: "300px",
            overflowY: "auto",
            mt: 0.5,
            zIndex: 1000,
          }}
        >
          <List>
            {results.map((result) => (
              <ListItemButton
                key={result._id}
                onClick={() => handleResultClick(result._id)}
              >
                <ListItemText primary={result.title} />
              </ListItemButton>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default SearchBar;
