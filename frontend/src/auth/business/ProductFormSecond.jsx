import React, { useState } from "react";
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
  Typography,
  InputAdornment,
} from "@mui/material";
import RichTextEditor from "../../components/RichTextEditor";

import FormWrapper from "../../components/FormWrapper";

export default function SecondStep({
  formData,
  inputChange,
  fieldErrors,
  loginError,
  handleUnitChange,
}) {
  const [customColor, setCustomColor] = useState("");

  const basicColors = [
    "White",
    "Black",
    "Brown",
    "Gray",
    "Green",
    "Red",
    "Yellow",
    "Blue",
    "Pink",
    "Purple",
    "Orange",
    "Teal",
    "Cyan",
    "Magenta",
    "Beige",
    "Ivory",
    "Silver",
    "Gold",
    "Bronze",
  ];

  const predefinedSizes = ["S", "M", "L", "XL", "XXL"];

  return (
    <FormWrapper title={"About this item"}>
      <Grid item xs={12}>
        <InputLabel>Content</InputLabel>
        <FormControl fullWidth>
          <RichTextEditor
            value={formData.content || ""}
            onChange={(value) =>
              inputChange({ target: { name: "content", value } })
            }
          />
          {fieldErrors.content && (
            <FormHelperText error>{fieldErrors.content}</FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Additional Information</Typography>
        <Typography variant="body2" color="textSecondary">
          Have multiple locations? Use the address shown on official documents
          like tax forms.
        </Typography>
      </Grid>
      {/* Weight Section */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Width"
            name="width"
            type="number"
            value={formData.width || ""}
            onChange={inputChange}
            error={!!fieldErrors.width}
            helperText={fieldErrors.width}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Height"
            name="height"
            type="number"
            value={formData.height || ""}
            onChange={inputChange}
            error={!!fieldErrors.height}
            helperText={fieldErrors.height}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Depth"
            name="depth"
            type="number"
            value={formData.depth || ""}
            onChange={inputChange}
            error={!!fieldErrors.depth}
            helperText={fieldErrors.depth}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Weight (optional)"
            name="weight"
            type="number"
            value={formData.weight || ""}
            onChange={inputChange}
            error={!!fieldErrors.weight}
            helperText={fieldErrors.weight}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <select
                    value={formData.weightUnit || ""}
                    onChange={handleUnitChange}
                    style={{
                      border: "none",
                      outline: "none",
                      backgroundColor: "transparent",
                      padding: 0,
                      marginLeft: 8,
                      fontSize: "inherit", // כדי להתאים את הגופן
                    }}
                  >
                    <option value="kg">Kg</option>
                    <option value="g">gr</option>
                  </select>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Sizes Section */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Sizes (optional)</InputLabel>
            <Select
              multiple
              name="sizes"
              value={formData.sizes || []}
              onChange={inputChange}
              renderValue={(selected) => selected.join(", ")}
            >
              {predefinedSizes.map((size) => (
                <MenuItem key={size} value={size}>
                  <Checkbox checked={formData.sizes?.indexOf(size) > -1} />
                  <ListItemText primary={size} />
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Select or add a color</FormHelperText>
          </FormControl>
        </Grid>

        {/* Colors Section */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Colors (optional)</InputLabel>
            <Select
              multiple
              name="colors"
              value={formData.colors || []}
              onChange={inputChange}
              renderValue={(selected) => selected.join(", ")}
            >
              {basicColors.map((color) => (
                <MenuItem key={color} value={color}>
                  <Checkbox checked={formData.colors?.indexOf(color) > -1} />
                  <ListItemText primary={color} />
                </MenuItem>
              ))}
              <MenuItem>
                <TextField
                  label="Other (e.g. #RRGGBB or color name)"
                  value={customColor || ""}
                  onChange={(e) => setCustomColor(e.target.value)}
                  error={!!fieldErrors.color}
                  helperText={fieldErrors.color}
                  fullWidth
                />
              </MenuItem>
            </Select>
            <FormHelperText>Select or add a color</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Brand Name (optional)"
            name="brandName"
            value={formData.brandName || ""}
            onChange={inputChange}
            error={!!fieldErrors.brandName}
            helperText={fieldErrors.brandName}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              value={formData.quantity || ""}
              onChange={inputChange}
              error={!!fieldErrors.quantity}
              helperText={fieldErrors.quantity}
            />
            <FormHelperText>
              State your current inventory for this product
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>

      {loginError && <p style={{ color: "red" }}>{loginError}</p>}
    </FormWrapper>
  );
}
