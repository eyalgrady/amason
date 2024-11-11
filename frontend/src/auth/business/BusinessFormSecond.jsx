import { FormHelperText, Grid, TextField, Typography } from "@mui/material";
import FormWrapper from "../../components/FormWrapper";

export default function SecondStep({ formData, inputChange, fieldErrors }) {
  return (
    <FormWrapper title={"Enter your business details"}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Business Information</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Business name"
            name="businessName"
            value={formData.businessName}
            onChange={inputChange}
            fullWidth
            error={!!fieldErrors.businessName}
            helperText={fieldErrors.businessName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Image URL"
            name="image.url"
            value={formData.image?.url}
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
            value={formData.image?.alt}
            onChange={inputChange}
            fullWidth
            error={!!fieldErrors.alt}
            helperText={fieldErrors.alt}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Business Address</Typography>
          <Typography variant="body2" color="textSecondary">
            Have multiple locations? Use the address shown on official documents
            like tax forms.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Postcode"
            name="address.postcode"
            value={formData.address?.postcode || ""}
            onChange={inputChange}
            fullWidth
            error={!!fieldErrors.postcode}
            helperText={fieldErrors.postcode}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Road and number"
            name="address.street"
            value={formData.address?.street}
            onChange={inputChange}
            fullWidth
            error={!!fieldErrors.street}
            helperText={fieldErrors.street}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="PO box, floor, block (optional)"
            name="address.optionalText"
            value={formData.address?.optionalText}
            onChange={inputChange}
            fullWidth
            error={!!fieldErrors.optionalText}
            helperText={fieldErrors.optionalText}
          />
          <FormHelperText>PO box, floor, block (optional)</FormHelperText>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="City"
            name="address.city"
            value={formData.address?.city}
            onChange={inputChange}
            fullWidth
            error={!!fieldErrors.city}
            helperText={fieldErrors.city}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Country/Region"
            name="address.country"
            value={formData.address?.country}
            onChange={inputChange}
            fullWidth
            error={!!fieldErrors.country}
            helperText={fieldErrors.country}
          />
        </Grid>
      </Grid>
    </FormWrapper>
  );
}
