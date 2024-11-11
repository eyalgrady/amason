import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Box, useTheme } from "@mui/material";
import { IMAGES } from "../data/VariablesDefinitions";

export default function Carousel() {
  const [currImage, setCurrImage] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const theme = useTheme();

  const showNextImage = useCallback(() => {
    setCurrImage((currImage) => (currImage + 1) % IMAGES.length);
  }, []);

  const showPrevImage = () => {
    setCurrImage((index) => (index === 0 ? IMAGES.length - 1 : index - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      showNextImage();
    }, 10000);

    return () => clearInterval(interval);
  }, [showNextImage]);

  return (
    <Box
      aria-label="Image Carousel"
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
    >
      <Box
        sx={{
          display: "flex",
          transition: "transform 0.5s ease",
          width: "100%",
          height: "100%", // הוספת height 100% על ה-container הפנימי
        }}
      >
        {IMAGES.map(({ url, alt }) => (
          <Box
            key={url}
            component="img"
            src={url}
            alt={alt}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `translateX(${currImage * -100}%)`,
              transition: "transform 0.5s ease",
            }}
          />
        ))}
      </Box>

      {showButtons && (
        <>
          <Box
            onClick={showPrevImage}
            sx={{
              position: "absolute",
              top: "30%",
              left: 0,
              transform: "translateY(-30%)",
              background: "rgba(0, 0, 0, 0.5)",
              color: theme.palette.common.white,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "2rem",
              height: "8rem",
              cursor: "pointer",
              "&:hover": {
                background: "rgba(0, 0, 0, 0.7)",
              },
            }}
            aria-label="View Previous Image"
          >
            <ChevronLeft />
          </Box>

          <Box
            onClick={showNextImage}
            sx={{
              position: "absolute",
              top: "30%",
              right: 0,
              transform: "translateY(-30%)",
              background: "rgba(0, 0, 0, 0.5)",
              color: theme.palette.common.white,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "2rem",
              height: "8rem",
              cursor: "pointer",
              "&:hover": {
                background: "rgba(0, 0, 0, 0.7)",
              },
            }}
            aria-label="View Next Image"
          >
            <ChevronRight />
          </Box>
        </>
      )}
    </Box>
  );
}
