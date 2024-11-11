import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Grid,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import useMultistepForm from "../../hooks/useMultistepForm";
import FirstStep from "./BusinessFormFirst";
import SecondStep from "./BusinessFormSecond";
import ThirdStep from "./BusinessFormThird";
import PublicIcon from "@mui/icons-material/Public";
import BuildIcon from "@mui/icons-material/Build";
import SecurityIcon from "@mui/icons-material/Security";
import { GeneralContext } from "../../data/VariablesDefinitions";
import { INITIAL_BUSINESS_DATA } from "../../data/data";
import { schema } from "../../validation/businessFormSchemas";
import BusinessAppBar from "../../components/BusinessAppBar";

export default function BusinessForm() {
  const { businessId } = useParams();
  const [formData, setFormData] = useState(INITIAL_BUSINESS_DATA || {});
  const [isNewUser, setIsNewUser] = useState(true);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const { setLoading, snackbar } = useContext(GeneralContext);
  const navigate = useNavigate();

  const inputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      if (name.startsWith("address.")) {
        return {
          ...prevData,
          address: { ...prevData.address, [name.split(".")[1]]: value },
        };
      } else if (name.startsWith("image.")) {
        return {
          ...prevData,
          image: { ...prevData.image, [name.split(".")[1]]: value },
        };
      } else {
        return { ...prevData, [name]: value };
      }
    });
  }, []);

  const {
    steps,
    currentStepIndex,
    step,
    isFirstStep,
    isSecondStep,
    isLastPage,
    prevStep,
    nextStep,
  } = useMultistepForm([
    <FirstStep
      formData={formData}
      inputChange={inputChange}
      fieldErrors={fieldErrors}
    />,
    <SecondStep
      formData={formData}
      inputChange={inputChange}
      fieldErrors={fieldErrors}
    />,
    <ThirdStep {...formData} inputChange={inputChange} />,
  ]);

  const validateStep = (schema, data) => {
    const { error } = schema.validate(data, {
      context: {
        isNewUser: isNewUser,
        isFirstStep: isFirstStep,
        isSecondStep: isSecondStep,
        businessId: businessId,
      },
      abortEarly: false,
    });
    if (error) {
      console.log("Validation errors:", error.details);

      const errors = {};
      error.details.forEach((err) => {
        errors[err.context.key] = err.message;
      });
      setFieldErrors(errors);

      return false;
    }
    return true;
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!validateStep(schema, formData)) return;

    if (isLastPage) {
      setLoading(true);
      console.log(formData);
      try {
        const res = await fetch(
          `http://localhost:8060/users` +
            (formData._id ? `/${businessId}` : ""),
          {
            method: formData._id ? "PUT" : "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
            body: JSON.stringify(formData),
          }
        );

        if (res.ok) {
          setLoading(false);
          navigate(businessId === "sign-up" ? "/users/sign-in" : -1);
          snackbar(
            businessId === "sign-up"
              ? "Sign up successfully"
              : "Updated successfully",
            "success"
          );
        } else {
          const text = await res.text();
          setError(text);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error:", error);
      }
      setLoading(false);
    } else {
      nextStep(); // מעבר לשלב הבא אם לא מדובר בשלב האחרון
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (businessId === "sign-up") {
        setFormData(INITIAL_BUSINESS_DATA);
      } else {
        setLoading(true);
        try {
          const response = await fetch(
            `http://localhost:8060/users/${businessId}`,
            {
              credentials: "include",
            }
          );
          if (!response.ok) throw new Error("Failed to fetch user");

          const data = await response.json();
          const userData = {
            _id: data.user._id,
            name: data.user.name,
            phone: data.user.phone,
            email: data.user.email,
            businessName: data.user.businessName,
            isBusiness: data.user.isBusiness,
            address: {
              postcode: data.user.address.postcode,
              street: data.user.address.street,
              optionalText: data.user.address.optionalText,
              city: data.user.address.city,
              country: data.user.address.country,
            },
            image: {
              url: data.user.image.url,
              alt: data.user.image.alt,
            },
          };
          setFormData(userData);
          setIsNewUser(false);
        } catch (error) {
          console.error("Error:", error);
          setError("An error occurred while saving data.", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [businessId, setLoading]);

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white",
        zIndex: 100,
      }}
    >
      <BusinessAppBar steps={steps} currentStepIndex={currentStepIndex} />

      {/* Form Container */}
      <Paper
        sx={{
          display: "flex",
          width: "900px",
          borderRadius: "8px",
          marginTop: "80px",
        }}
      >
        <form
          style={{ flex: "1 1 50%", border: "none", padding: "20px" }}
          onSubmit={onSubmit}
        >
          {step}
          {error && <Typography color="error">{error}</Typography>}

          <Grid container spacing={2} style={{ marginTop: "16px" }}>
            {!isFirstStep && (
              <Grid item>
                <Button
                  type="button"
                  variant="contained"
                  sx={{
                    backgroundColor: "#ff9900",
                    borderRadius: 2,
                    padding: "5px 16px",
                    color: "#131921",
                  }}
                  onClick={prevStep}
                >
                  Back
                </Button>
              </Grid>
            )}
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#ff9900",
                  borderRadius: 2,
                  padding: "5px 16px",

                  color: "#131921",
                }}
              >
                {isLastPage ? "Finish" : "Next"}
              </Button>
            </Grid>
          </Grid>
        </form>
        {isFirstStep && (
          <Box
            sx={{
              flex: "1 1 50%",
              backgroundColor: "#001f3c",
              color: "white",
              padding: 3,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              borderRadius: "0 8px 8px 0",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Unlock Your Business's Full Potential with Our Online Store
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}>
              <PublicIcon style={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h6" gutterBottom>
                  Increase Your Exposure and Sales
                </Typography>
                <Typography variant="body2">
                  Reach a broader audience, 24/7. No more geographic limitations
                  — your products can be sold anywhere, anytime.
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}>
              <BuildIcon style={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h6" gutterBottom>
                  Advanced Store Management Tools
                </Typography>
                <Typography variant="body2">
                  Easily manage your inventory, orders, and customer
                  interactions, allowing you to focus on growing your business.
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}>
              <SecurityIcon style={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h6" gutterBottom>
                  Reliable and Scalable Platform
                </Typography>
                <Typography variant="body2">
                  Run your business with confidence on a platform built for
                  growth. We ensure fast performance, secure transactions, and
                  the ability to scale as your business expands.
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Paper>
      {/* Snackbar for feedback */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError("")}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Box>
  );
}
