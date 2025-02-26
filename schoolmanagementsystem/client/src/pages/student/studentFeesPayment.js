import React, { useState } from "react";
import { TextField, Button, MenuItem, Container, Typography, Paper, Box } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";

const FeePayment = () => {

      const { currentUser, response, error } = useSelector((state) => state.user);
    
      console.log(currentUser);
      

  const [student, setStudent] = useState({
    name: "",
    email: "",
    amount: "",
    paymentMethod: "",
   
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(student);
    student.name=currentUser.name
    student.email=currentUser.email
    
    try {

     const {data}= await axios.post("http://localhost:5000/fees/submit-fee", student);
     console.log(data);
  
       alert("Payment details submitted successfully!");
    } catch (error) {
      console.error(error);
      alert("Error submitting payment details.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 5 }}>
        <Typography variant="h5" gutterBottom>Student Fee Payment</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="Student Name" value={currentUser.name} name="name"   required  />
          <TextField label="Email" name="email" value={currentUser.email}   type="email" required  />
          <TextField label="Amount Paid" name="amount" type="number" required onChange={handleChange} />
          <TextField
            select
            label="Payment Method"
            name="paymentMethod"
            required
            onChange={handleChange}
          >
            <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
            <MenuItem value="UPI">UPI</MenuItem>
            <MenuItem value="Cash">Cash</MenuItem>
          </TextField>
          {/* <TextField label="Transaction ID (if online)" name="transactionId" onChange={handleChange} /> */}
          <Button variant="contained" color="primary" type="submit">Submit Payment</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default FeePayment;
