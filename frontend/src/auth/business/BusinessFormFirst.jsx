import { FormHelperText, Grid, TextField } from "@mui/material";
import FormWrapper from "../../components/FormWrapper";

export default function FirstStep({ formData, inputChange, fieldErrors }) {
  return (
    <FormWrapper title={"Let’s create your free Amason Business account"}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Your name"
            name="name"
            value={formData?.name || ""}
            onChange={inputChange}
            fullWidth
            error={!!fieldErrors.name}
            helperText={fieldErrors.name}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Email"
            name="email"
            value={formData?.email || ""}
            onChange={inputChange}
            fullWidth
            error={!!fieldErrors.email}
            helperText={fieldErrors.email}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Mobile phone (optional)"
            name="phone"
            value={formData?.phone || ""}
            onChange={inputChange}
            fullWidth
            error={!!fieldErrors.phone}
            helperText={fieldErrors.phone}
          />
        </Grid>

        {!formData?._id && (
          <Grid item xs={12}>
            <TextField
              label="Password"
              name="password"
              value={formData?.password || ""}
              onChange={inputChange}
              fullWidth
              error={!!fieldErrors.password}
              helperText={fieldErrors.password}
            />
            <FormHelperText>
              Passwords must be at least 6 characters long.
            </FormHelperText>
          </Grid>
        )}

        {formData?._id && (
          <>
            <Grid item xs={12}>
              <TextField
                label="Current password"
                name="oldPassword"
                value={formData?.oldPassword || ""}
                onChange={inputChange}
                fullWidth
                error={!!fieldErrors.oldPassword}
                helperText={fieldErrors.oldPassword}
              />
              <FormHelperText>
                Enter your current password to update.
              </FormHelperText>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="New password"
                name="newPassword"
                value={formData?.newPassword || ""}
                onChange={inputChange}
                fullWidth
                error={!!fieldErrors.newPassword}
                helperText={fieldErrors.newPassword}
              />
              <FormHelperText>
                Password must be at least 6 characters long.
              </FormHelperText>
            </Grid>
          </>
        )}
      </Grid>
    </FormWrapper>
  );
}
