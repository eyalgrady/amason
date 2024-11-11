import {
  Grid,
  TextField,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  FormHelperText,
  Checkbox,
  ListItemText,
} from "@mui/material";

import FormWrapper from "../../components/FormWrapper";
import { useEffect, useState } from "react";
import { mainCategories } from "../../data/categoriesData";

export default function FirstStep({
  formData,
  inputChange,
  fieldErrors,
  setFormData,
}) {
  const [categories, setCategories] = useState({});
  const [subcategories, setSubcategories] = useState([]);

  const predefinedTags = [
    "New",
    "Sale",
    "Limited time deal",
    "Limited Edition",
    "Best Seller",
  ];

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setFormData((prev) => ({
      ...prev,
      category: selectedCategory,
      subcategory: "",
    }));

    if (categories[selectedCategory]) {
      setSubcategories(categories[selectedCategory]);
    } else {
      setSubcategories([]);
    }
  };

  const handleTagChange = (event) => {
    const {
      target: { value },
    } = event;
    setFormData((prev) => ({
      ...prev,
      tags: typeof value === "string" ? value.split(",") : value,
    }));
  };

  useEffect(() => {
    // Define main categories and their subcategories
    const categories = mainCategories;
    setCategories(categories);
  }, []);

  return (
    <FormWrapper title={"Let's add a new product"}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Title"
            name="title"
            value={formData?.title || ""}
            onChange={inputChange}
            fullWidth
            error={!!fieldErrors.title}
            helperText={fieldErrors.title}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              label="Promotion Message (optional)"
              name="promotionMessageText"
              value={formData?.promotionMessageText || ""}
              onChange={inputChange}
              fullWidth
              error={!!fieldErrors.promotionMessageText}
              helperText={fieldErrors.promotionMessageText}
            />
            <FormHelperText>
              Write a short marketing phrase that makes your product shine
              (optional)
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Tags (optional)</InputLabel>
            <Select
              name="tags"
              multiple
              value={formData?.tags || []}
              onChange={handleTagChange}
              renderValue={(selected) => selected.join(", ")}
            >
              {predefinedTags.map((tag) => (
                <MenuItem key={tag} value={tag}>
                  <Checkbox checked={formData?.tags.indexOf(tag) > -1} />
                  <ListItemText primary={tag} />
                </MenuItem>
              ))}
            </Select>

            {fieldErrors.tags && (
              <FormHelperText error>{fieldErrors.tags}</FormHelperText>
            )}
            <FormHelperText>Optional designs Tags (optional)</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Image URL"
            name="image.url"
            value={formData?.image.url || ""}
            onChange={inputChange}
            fullWidth
            error={!!fieldErrors.url}
            helperText={fieldErrors.url}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Image alt"
            name="image.alt"
            value={formData?.image.alt || ""}
            onChange={inputChange}
            fullWidth
            error={!!fieldErrors.alt}
            helperText={fieldErrors.alt}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              label="Price"
              name="price"
              value={formData?.price || ""}
              onChange={inputChange}
              fullWidth
              type="number"
              error={!!fieldErrors.price}
              helperText={fieldErrors.price}
            />
            <FormHelperText>Product Price</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              label="Discount (optional)"
              name="discountPercentage"
              type="number"
              value={formData?.discountPercentage || ""}
              onChange={inputChange}
              fullWidth
              error={!!fieldErrors.discountPercentage}
              helperText={fieldErrors.discountPercentage}
            />
            <FormHelperText>
              Write the percentage number (optional)
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={formData?.category || ""}
              onChange={handleCategoryChange}
              error={!!fieldErrors.category}
            >
              <MenuItem value="">
                <em>Select a category</em>
              </MenuItem>
              {Object.keys(categories).map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Select a category</FormHelperText>
            <FormHelperText error>{fieldErrors.category}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Subcategory</InputLabel>
            <Select
              name="subcategory"
              value={formData?.subcategory || ""}
              onChange={inputChange}
              disabled={!formData?.category}
              error={!!fieldErrors.subcategory}
            >
              <MenuItem value="">
                <em>Select a subcategory</em>
              </MenuItem>
              {subcategories.map((subcategory) => (
                <MenuItem key={subcategory} value={subcategory}>
                  {subcategory}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Select a subcategory</FormHelperText>
            <FormHelperText error>{fieldErrors.subcategory}</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    </FormWrapper>
  );
}
