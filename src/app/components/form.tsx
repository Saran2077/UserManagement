import React, { useEffect, useState } from "react";

import {
  TextField,
  Button,
  MenuItem,
  Grid,
  DialogActions,
} from "@mui/material";
import {
  User,
  getNameMaxCharacters,
  getNameMinCharacters,
} from "../utils/config";
import statesData from "../data/states.json"; // Assuming you have a JSON file for states
import citiesData from "../data/cities.json"; // Assuming you have a JSON file for cities
import CustomGenderLayout from "./customGenderLayout";

interface UserFormProps {
  user?: User;
  onSubmit: (userData: User) => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSubmit }) => {
  const [formData, setFormData] = useState<User>({
    name: "",
    email: "",
    linkedinUrl: "",
    gender: "",
    address: {
      line1: "",
      line2: "",
      state: "",
      city: "",
      pin: "",
    },
  });
  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleGenderChange = (e: string) => {
    setFormData((prevState) => ({
      ...prevState,
      ["gender"]: e,
    }));
  };

  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData, "formDATAAA");
    onSubmit(formData);
    setFormData(() => ({
      name: "",
      email: "",
      linkedinUrl: "",
      gender: "",
      address: {
        line1: "",
        line2: "",
        state: "",
        city: "",
        pin: "",
      },
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-header">Name</div>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        required
        variant="outlined"
        inputProps={{
          minLength: getNameMinCharacters(),
          maxLength: getNameMaxCharacters(),
        }}
      />
      <div className="form-header">Email</div>
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        required
        variant="outlined"
        type="email"
      />
      <div className="form-header">LinkedIn URL</div>
      <TextField
        label="LinkedIn URL"
        name="linkedinUrl"
        value={formData.linkedinUrl}
        onChange={handleChange}
        fullWidth
        required
        variant="outlined"
      />

      <div className="form-header">Gender</div>
      <CustomGenderLayout
        userData={formData}
        genderChange={(e) => {
          handleGenderChange(e);
        }}
      />
      <div className="form-header">Address</div>
      <TextField
        label="Address Line 1"
        name="line1"
        value={formData.address.line1}
        onChange={handleAddressChange}
        fullWidth
        required
        variant="outlined"
      />
      <div style={{ paddingTop: 16, paddingBottom: 8 }}>
        <TextField
          label="Address Line 2"
          name="line2"
          value={formData.address.line2}
          onChange={handleAddressChange}
          fullWidth
          variant="outlined"
        />
      </div>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className="form-header">State</div>
          <TextField
            select
            label="State"
            name="state"
            value={formData.address.state}
            onChange={handleAddressChange}
            fullWidth
            required
            variant="outlined"
          >
            {statesData.map((state) => (
              <MenuItem key={state.code} value={state.code}>
                {state.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <div className="form-header">City</div>
          <TextField
            select
            label="City"
            name="city"
            value={formData.address.city}
            onChange={handleAddressChange}
            fullWidth
            required
            variant="outlined"
          >
            {citiesData[formData.address.state as keyof typeof citiesData]?.map(
              (city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              )
            )}
          </TextField>
        </Grid>
      </Grid>

      <div className="form-header">Pin Code</div>
      <Grid container spacing={2} style={{ paddingBottom: 60 }}>
        <Grid item xs={6}>
          <TextField
            label="PIN"
            name="pin"
            value={formData.address.pin}
            onChange={handleAddressChange}
            fullWidth
            required
            variant="outlined"
          />
        </Grid>
      </Grid>
      <DialogActions className="form-footer">
        <Button type="submit" variant="contained" color="primary">
          {user ? "Update" : "Submit"}{" "}
        </Button>
      </DialogActions>
    </form>
  );
};

export default UserForm;
