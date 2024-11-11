import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useMultistepForm from "../../hooks/useMultistepForm.jsx";
import { Grid, Button, Box, Typography, Paper } from "@mui/material";
import FirstStep from "./ProductFormFirst.jsx";
import SecondStep from "./ProductFormSecond.jsx";
import {
  FirstStepSchema,
  SecondStepSchema,
} from "../../validation/multiStepFormSchemas.jsx";
import { GeneralContext } from "../../data/VariablesDefinitions.jsx";
import BusinessAppBar from "../../components/BusinessAppBar.jsx";
import { INITIAL_DATA } from "../../data/data.jsx";

export default function ProductForm() {
  const { productId } = useParams();
  const [formData, setFormData] = useState();
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const { user, setProducts, setLoading, snackbar } =
    useContext(GeneralContext);
  const navigate = useNavigate();

  const inputChange = async (e) => {
    const { name, value, type, checked } = e.target;
    let updatedFormData = { ...formData };

    if (name.startsWith("image.")) {
      const imageField = name.split(".")[1];
      updatedFormData.image = { ...formData.image, [imageField]: value };
    } else if (name.startsWith("name.")) {
      const nameField = name.split(".")[1];
      updatedFormData.name = { ...formData.name, [nameField]: value };
    } else if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      updatedFormData.address = { ...formData.address, [addressField]: value };
    } else {
      updatedFormData = {
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      };
    }

    setFormData(updatedFormData);
  };

  const handleUnitChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      ...prev.technicalSpecifications,
      weightUnit: e.target.value,
    }));
  };

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
      setFormData={setFormData}
      fieldErrors={fieldErrors}
      tags={formData?.tags || []} // הוסף כאן ברירת מחדל
    />,
    <SecondStep
      formData={formData}
      inputChange={inputChange}
      fieldErrors={fieldErrors}
      handleUnitChange={handleUnitChange}
    />,
  ]);

  const validateCurrentStep = () => {
    let schema;

    if (isFirstStep) {
      schema = FirstStepSchema;
    } else if (isSecondStep) {
      schema = SecondStepSchema;
    }

    const { error } = schema.validate(formData, { abortEarly: false });
    return error;
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const error = validateCurrentStep();
    if (error) {
      // הצגת שגיאות
      const errors = {};
      error.details.forEach((err) => {
        errors[err.context.key] = err.message;
      });
      setFieldErrors(errors);
      setError(error.message);
      return;
    }

    if (!isLastPage) {
      nextStep();
    } else {
      // שליחה לשרת בשלב האחרון
      submitForm();
    }
  };

  const submitForm = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8060/products` +
          (formData._id ? `/${productId}` : ""),
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
        const newProduct = await res.json(); // קבל את המוצר שנוסף מהשרת
        setProducts((prevProducts) => [newProduct, ...prevProducts]);

        setLoading(false);
        navigate(`/business/${user._id}`);
        // navigate(productId === "add" ? "/" : `/business/${user._id}`);

        snackbar(
          productId === "add" ? "Added successfully" : "Updated successfully",
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
  };

  useEffect(() => {
    if (productId === "add") {
      setFormData(INITIAL_DATA);
    } else {
      setLoading(true);
      fetch(`http://localhost:8060/products/${productId}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          const filteredData = {
            _id: data._id,
            title: data.title,
            promotionMessageText: data.promotionMessageText,
            tags: data.tags,
            image: {
              url: data.image.url,
              alt: data.image.alt,
            },
            price: data.price,
            discountPercentage: data.discountPercentage,
            category: data.category,
            subcategory: data.subcategory,
            content: data.content,
            quantity: data.quantity,
            brandName: data.brandName,
            colors: data.colors,
            sizes: data.sizes,
            weight: data.weight,
            weightUnit: data.weightUnit,
            height: data.height || "",
            width: data.width || "",
            depth: data.depth || "",
          };
          setFormData(filteredData);
        })
        .finally(() => setLoading(false));
    }
  }, [productId, setLoading]);

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

      <Paper
        sx={{
          display: "flex",
          width: "900px",
          borderRadius: "8px",
          maxWidth: "max-content",
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
      </Paper>
    </Box>
  );
}
