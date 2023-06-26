import { InputLabel } from "@mui/material";
import React from "react";

const SendTokensForm = () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
    });

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      // Do something with the form data
      console.log(formData);
    };
    
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <TextField
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <TextField
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default SendTokensForm;
