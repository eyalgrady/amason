import { Box, Typography } from "@mui/material";
import { Star } from "@mui/icons-material";
import RatingProg from "../components/RatingProg";
import { useContext } from "react";
import { GeneralContext } from "../data/VariablesDefinitions";

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

// import React, { useContext } from "react";
// import { Box, Typography } from "@mui/material";
// import { Star } from "@mui/icons-material";
// import RatingProg from "../components/RatingProg";
// import { GeneralContext } from "../data/VariablesDefinitions"; // Import the context

// export default function Reviews({ product }) {
//   const { products } = useContext(GeneralContext); // Use context to get the list of products

//   // Find the product by productId
//   const fetchedpProduct = products.find((p) => p._id === product._id);

//   if (!fetchedpProduct) {
//     return <Typography variant="body2">Product not found.</Typography>;
//   }

//   return (
//     <>
//       <Typography variant="h4" my={2} sx={{ fontSize: "1.4rem" }}>
//         Customer reviews
//       </Typography>

//       <Box display="flex" my={2} gap={4}>
//         <RatingProg product={product} />

//         <Box>
//           {fetchedpProduct?.ratings.map((rating) => (
//             <Box key={rating._id} marginY={1}>
//               <Typography variant="body2" style={{ fontWeight: "bold" }}>
//                 {rating.user_name || "Anonymous"}
//               </Typography>

//               {/* תצוגת הכוכבים לפי דירוג */}
//               <Box display="flex" alignItems="center">
//                 <Box display="flex">
//                   {[...Array(5)].map((_, index) => (
//                     <Star
//                       key={index}
//                       sx={{
//                         color: index < rating.rating ? "gold" : "gray",
//                         fontSize: "inherit",
//                       }}
//                     />
//                   ))}
//                 </Box>
//               </Box>

//               <Typography variant="body1" style={{ color: "gray" }}>
//                 {rating.comment}
//               </Typography>
//             </Box>
//           ))}
//         </Box>
//       </Box>
//     </>
//   );
// }
