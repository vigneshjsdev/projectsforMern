import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Button, TextField, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { useSelector } from "react-redux";

const GetAllPaymentDetails = () => {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMethod, setFilterMethod] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    axios.get("http://localhost:5000/fees/payments")
      .then(response => setPayments(response.data))
      .catch(error => console.error("Error fetching payment data:", error));
  }, [currentUser.email]);

  const downloadSpecificPDF = (payment) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Payment Details", 20, 20);
    const paymentDetails = [
      { label: "Name:", value: payment.name },
      { label: "Email:", value: payment.email },
      { label: "Amount:", value: `₹${payment.amount}` },
      { label: "Payment Method:", value: payment.paymentMethod },
      { label: "Transaction ID:", value: payment.transactionId },
      { label: "Date:", value: new Date(payment.date).toLocaleDateString() }
    ];
    doc.setFontSize(14);
    let y = 40;
    paymentDetails.forEach((detail) => {
      doc.text(`${detail.label} ${detail.value}`, 20, y);
      y += 10;
    });
    doc.save(`payment_details_${payment.transactionId}.pdf`);
  };

  const filteredPayments = payments.filter(payment => 
    payment.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    payment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(payment => 
    filterMethod ? payment.paymentMethod === filterMethod : true
  );

  return (
    <Box sx={{ padding: 3, margin: 3, backgroundColor: "#f5f5f5", borderRadius: 3, boxShadow: 3 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: "bold", color: "#1976d2" }}>
        Payment Details
      </Typography>
      
      <Box sx={{ display: "flex", gap: 2, marginBottom: 2, justifyContent: "space-between" }}>
        <TextField 
          label="Search" 
          variant="outlined" 
          fullWidth 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Method</InputLabel>
          <Select
            value={filterMethod}
            onChange={(e) => setFilterMethod(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Credit Card">Credit Card</MenuItem>
            <MenuItem value="Debit Card">Debit Card</MenuItem>
            <MenuItem value="UPI">UPI</MenuItem>
            <MenuItem value="Net Banking">Net Banking</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Amount</TableCell>
              <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Payment Method</TableCell>
              <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Transaction ID</TableCell>
              <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Date</TableCell>
              <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPayments.map((payment) => (
              <TableRow key={payment.transactionId} sx={{ "&:nth-of-type(even)": { backgroundColor: "#e3f2fd" } }}>
                <TableCell>{payment.name}</TableCell>
                <TableCell>{payment.email}</TableCell>
                <TableCell>{payment.amount}</TableCell>
                <TableCell>{payment.paymentMethod}</TableCell>
                <TableCell>{payment.transactionId}</TableCell>
                <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={() => downloadSpecificPDF(payment)}>
                    Download PDF
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default GetAllPaymentDetails;
