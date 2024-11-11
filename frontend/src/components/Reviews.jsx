import { Box, Typography } from "@mui/material";
import { Star } from "@mui/icons-material";
import RatingProg from "../components/RatingProg";

export default function Reviews({ product }) {
  return (
    <>
      <Typography variant="h4" my={2} sx={{ fontSize: "1.4rem" }}>
        Customer reviews
      </Typography>

      <Box display="flex" my={2} gap={4}>
        <RatingProg product={product} />

        <Box>
          {product?.ratings.map((rating) => (
            <Box key={rating._id} marginY={1}>
              <Typography variant="body2" style={{ fontWeight: "bold" }}>
                {rating.user_name || "Anonymous"}
              </Typography>

              {/* תצוגת הכוכבים לפי דירוג */}
              <Box display="flex" alignItems="center">
                {/* תצוגת הכוכבים */}
                <Box display="flex">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      sx={{
                        color: index < rating.rating ? "gold" : "gray",
                        fontSize: "inherit",
                      }}
                    />
                  ))}
                </Box>
              </Box>

              <Typography variant="body1" style={{ color: "gray" }}>
                {rating.comment}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}
