import { useContext, useEffect, useState } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { GeneralContext } from "../../data/VariablesDefinitions";
import FilteredPanel from "../../components/FilteredPanel";

export default function Dashboard() {
  const [data, setData] = useState({});
  const { setLoading } = useContext(GeneralContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8060/admin/dashboard", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setData(data);
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
    <Box flex={1} p={2}>
      {data && (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6">Users</Typography>
              <Typography variant="h4">{data.totalUsers}</Typography>
              <Typography
                variant="h6"
                sx={{ fontSize: "1rem", fontWeight: "bold" }}
              >
                New Users Today: {data.newUsersToday}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6">Businesses</Typography>
              <Typography variant="h4">{data.totalBusinesses}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6">Products</Typography>
              <Typography variant="h4">{data.totalProducts}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
              <FilteredPanel
                data={data.lowStockProducts}
                category={"admin"}
                title={"Low Stock Products"}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
              <FilteredPanel
                data={data.popularProducts}
                category={"admin"}
                title={"Top Selling Products"}
              />
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
