import {
  Box,
  Card,
  CardMedia,
  Typography,
  Link as MuiLink,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import RatingDisplay from "./RatingDisplay";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useContext, useState } from "react";
import { GeneralContext } from "../data/VariablesDefinitions";

const HoverTypography = styled(Typography)({
  transition: "color 0.3s ease",
  "&:hover": {
    color: "#ff9900",
  },
});

const limitText = (text, maxWords) => {
  const words = text.split(" ");
  return words.length > maxWords
    ? words.slice(0, maxWords).join(" ") + "..."
    : text;
};

export default function ProductCard({ product }) {
  const { user, setProducts, setLoading, snackbar } =
    useContext(GeneralContext);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const isOwner = product.user_id === user?._id;

  const calculateTotalPrice = () => {
    const pricePerUnit = product.discount
      ? product.price - (product.price * product.discountPercentage) / 100
      : product.price;
    return pricePerUnit;
  };

  const remove = (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    setLoading(true);

    fetch(`http://localhost:8060/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (res.ok) {
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product._id !== id)
          );

          snackbar("Product deleted successfully");
          setLoading(false);
        } else {
          snackbar("Failed to delete product");
        }
        setLoading(false);
      })
      .then(() => navigate(`/business/${user._id}/Main`));
  };

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        display: "flex",
        // flex: "1 1 calc(25% - 1rem)", // הוודא שהכרטיסים יתפסו 25% מהחלל
        flex: "1 1 ",
        flexDirection: "column",
        maxWidth: "250px",
        height: "100%",
        overflow: "hidden",
        backgroundColor: "#f5f5f5",
        position: "relative",
      }}
    >
      <Link to={`/product/${product._id}`}>
        <Box sx={{ position: "relative", background: "white" }}>
          <CardMedia
            component="img"
            alt={product.image.alt}
            image={product.image.url}
            title={product.title}
            sx={{
              height: 200,
              width: "auto",
              objectFit: "cover", // מבטיח שהתמונה תכסה את המסגרת
              margin: "0 auto", // מרכז את התמונה
            }}
          />

          {/* Show the actions only if the user is the owner and the card is hovered */}
          {isOwner && isHovered && (
            <CardActions
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1,
                position: "absolute",
                bottom: 0,
                right: 0,
                zIndex: 1,
              }}
            >
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation(); // עצירת ההתפשטות
                  navigate(`/products/form/${product._id}`);
                }}
                color="primary"
                aria-label="Edit"
                sx={{
                  backgroundColor: "white",
                  border: "1px solid  #1976d2",
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="primary"
                aria-label="Delete"
                sx={{
                  backgroundColor: "white",
                  border: "1px solid  #1976d2",
                }}
                onClick={() => remove(product._id)}
              >
                <DeleteIcon />
              </IconButton>
            </CardActions>
          )}
        </Box>
      </Link>

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flexGrow: 1,
          padding: "16px",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <MuiLink
            component={Link}
            to={`/product/${product._id}`}
            underline="none"
            color="text.primary"
            sx={{ fontWeight: 500 }}
          >
            <HoverTypography
              variant="body2"
              sx={{ color: "#4BA3C3" }} // כחול-ירקרק מותאם אישית
            >
              {limitText(product.title, 10)}
            </HoverTypography>
          </MuiLink>
          <Box marginY={1}>
            {product.discountPercentage ? (
              // תצוגה עם הנחה
              <Box>
                <Typography
                  variant="body2"
                  color="white"
                  backgroundColor="#cc0d39"
                  p={0.5}
                  borderRadius={1}
                  display="inline-block" // זה החלק המאפשר התאמה לגודל התוכן
                >
                  -{product.discountPercentage}% off
                </Typography>
                <Box display="flex" gap={1}>
                  <Typography
                    variant="body1"
                    sx={{ textDecoration: "line-through" }}
                  >
                    ${Math.floor(calculateTotalPrice())}
                    {`.`}
                    {`${(calculateTotalPrice() % 1).toFixed(2).split(".")[1]}`}
                  </Typography>

                  <Typography variant="body1">
                    $
                    {Math.floor(
                      product.price -
                        (product.price * product.discountPercentage) / 100
                    )}
                    {`.${
                      (
                        (product.price -
                          (product.price * product.discountPercentage) / 100) %
                        1
                      )
                        .toFixed(2)
                        .split(".")[1]
                    }`}
                  </Typography>
                </Box>
              </Box>
            ) : (
              // תצוגה ללא הנחה
              <Box display="flex" flexDirection="row">
                <Typography variant="body1">
                  ${Math.floor(calculateTotalPrice())}
                  {`.`}
                  {`${(calculateTotalPrice() % 1).toFixed(2).split(".")[1]}`}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
        <Box sx={{ marginTop: "auto", justifyContent: "flex-end" }}>
          <RatingDisplay product={product} />
        </Box>
      </CardContent>
    </Card>
  );
}
