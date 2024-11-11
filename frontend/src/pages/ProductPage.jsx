import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RatingDisplay from "../components/RatingDisplay";
import { Box, Card, CardMedia, Divider, Typography } from "@mui/material";
import ProductPrice from "../components/ProductPrice";
import ProductActions from "../components/ProductActions";
import Reviews from "../components/Reviews";
import { tagColors } from "../data/data";

export default function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const productData = await fetch(
          `http://localhost:8060/products/${productId}`
        );
        if (!productData.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await productData.json();
        setProduct(data);
      } catch (error) {
        alert(`Error fetching product: ${error.message}`);
      }
    };

    fetchCard();
  }, [productId]);

  const renderTags = (tags, keyPrefix = "tag") => (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, my: 0.8 }}>
      {tags.map((tag, index) => (
        <Box
          key={`${keyPrefix}-${index}`}
          sx={{
            display: "inline-block",
            px: 1.5,
            py: 0.5,
            borderRadius: "5px",
            backgroundColor: tagColors[tag] || "gray",
            color: "white",
            fontWeight: "bold",
          }}
        >
          {tag}
        </Box>
      ))}
    </Box>
  );

  const renderFeature = (label, value) =>
    value && (
      <Typography variant="body1" key={label}>
        <strong>{label}:</strong> {value}
      </Typography>
    );

  return (
    <Box p={2}>
      {product && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {/* החלק של התמונה */}
          <Card
            sx={{
              display: "flex",
              justifyContent: "center",
              maxWidth: "350px",
              m: 2,
              boxShadow: "none",
            }}
          >
            <CardMedia
              component="img"
              image={product.image.url}
              alt={product.image.alt}
              sx={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                maxHeight: "300px",
              }}
            />
          </Card>

          {/* החלק של המידע על המוצר */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              m: 2,
              flex: "1",
            }}
          >
            <Typography variant="h4" sx={{ fontSize: "1.5rem" }}>
              {product.title}
            </Typography>
            <Link to={`/business/${product.user_id}`} className="link">
              <Typography
                variant="subtitle1"
                style={{ color: "#40b3ff", fontWeight: 500 }}
              >
                Visit {product.businessName}
              </Typography>
            </Link>

            <RatingDisplay product={product} />

            <Divider
              sx={{
                borderColor: "#ccc",
                opacity: 0.5,
                my: 1,
              }}
            />

            {product.promotionMessageText && (
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", color: "blue" }}
              >
                {product.promotionMessageText}
              </Typography>
            )}

            {product.tags && renderTags(product.tags, "tag")}

            <ProductPrice product={product} selectedQuantity={1} />
            {product.price > 50 && (
              <Typography
                variant="body1"
                color="green"
                fontWeight="bold"
                mt={1}
              >
                Free Delivery
              </Typography>
            )}

            {["Brand", "width", "height", "depth"].map((key) =>
              renderFeature(key, product[key.toLowerCase()])
            )}

            {product.sizes && renderTags(product.sizes, "size")}
            {product.colors && renderTags(product.colors, "color")}

            <Divider
              sx={{
                borderColor: "#ccc",
                opacity: 0.5,
                my: 1,
              }}
            />

            <Typography
              variant="h6"
              sx={{ fontSize: "1rem", fontWeight: "bold" }}
            >
              About this item
            </Typography>
            <Typography
              variant="body2"
              dangerouslySetInnerHTML={{ __html: product.content }}
            />
          </Box>

          {/* החלק של הפעולות (הוספה לעגלה, קניה וכו') */}
          <ProductActions product={product} />
        </Box>
      )}

      <Divider
        sx={{
          borderColor: "#ccc",
          opacity: 0.5,
          my: 1,
        }}
      />

      <Reviews product={product} />
    </Box>
  );
}
