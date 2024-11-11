import { Link } from "react-router-dom";
import logo from "../images/amasonBusiness_black.png";

import { Box, AppBar, Toolbar, Typography } from "@mui/material";

export default function BusinessAppBar({ steps, currentStepIndex }) {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#001f3c", mb: 5 }}>
      <Toolbar sx={{ justifyContent: "space-between", padding: "0 50px" }}>
        <Box sx={{ height: "25px", width: "auto", ml: 4 }}>
          <Link to="/">
            <img
              src={logo}
              alt="amason-business-logo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </Link>
        </Box>
        <Typography
          variant="body1"
          sx={{ display: "flex", gap: "1rem", mr: 4 }}
        >
          {currentStepIndex + 1} / {steps.length}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
