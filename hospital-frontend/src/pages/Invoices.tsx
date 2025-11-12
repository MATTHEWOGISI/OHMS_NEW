import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Payment as PaymentIcon } from '@mui/icons-material';
import { invoicesApi, patientsApi } from '../services/api';
import type { Invoice, Patient, Payment } from '../types';

const Invoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [open, setOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [formData, setFormData] = useState<Invoice>({
    patientId: 0,
    invoiceNumber: '',
    invoiceDate: '',
    totalAmount: 0,
    paidAmount: 0,
    balanceAmount: 0,
    status: 'Pending',
    paymentMethod: '',
  });
  const [paymentData, setPaymentData] = useState<Payment>({
    invoiceId: 0,
    amount: 0,
    paymentDate: '',
    paymentMethod: '',
    transactionId: '',
  });

  useEffect(() => {
    fetchInvoices();
    fetchPatients();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await invoicesApi.getAll();
      setInvoices(response.data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await patientsApi.getAll();
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleOpen = (invoice?: Invoice) => {
    if (invoice) {
      setEditingInvoice(invoice);
      setFormData(invoice);
    } else {
      setEditingInvoice(null);
      setFormData({
        patientId: 0,
        invoiceNumber: '',
        invoiceDate: new Date().toISOString().split('T')[0],
        totalAmount: 0,
        paidAmount: 0,
        balanceAmount: 0,
        status: 'Pending',
        paymentMethod: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingInvoice(null);
  };

  const handlePaymentOpen = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setPaymentData({
      invoiceId: invoice.id!,
      amount: invoice.balanceAmount,
      paymentDate: new Date().toISOString().split('T')[0],
      paymentMethod: '',
      transactionId: '',
    });
    setPaymentOpen(true);
  };

  const handlePaymentClose = () => {
    setPaymentOpen(false);
    setSelectedInvoice(null);
  };

  const handleSubmit = async () => {
    try {
      if (editingInvoice) {
        await invoicesApi.update(editingInvoice.id!, formData);
      } else {
        await invoicesApi.create(formData);
      }
      fetchInvoices();
      handleClose();
    } catch (error) {
      console.error('Error saving invoice:', error);
    }
  };

  const handlePaymentSubmit = async () => {
    try {
      if (selectedInvoice) {
        await invoicesApi.addPayment(selectedInvoice.id!, paymentData);
        fetchInvoices();
        handlePaymentClose();
      }
    } catch (error) {
      console.error('Error adding payment:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      try {
        await invoicesApi.delete(id);
        fetchInvoices();
      } catch (error) {
        console.error('Error deleting invoice:', error);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'PartiallyPaid':
        return 'info';
      case 'Cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Invoices</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>
          Add Invoice
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Invoice #</TableCell>
              <TableCell>Patient</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.invoiceNumber}</TableCell>
                <TableCell>
                  {invoice.patient && `${invoice.patient.firstName} ${invoice.patient.lastName}`}
                </TableCell>
                <TableCell>{new Date(invoice.invoiceDate).toLocaleDateString()}</TableCell>
                <TableCell>${invoice.totalAmount.toFixed(2)}</TableCell>
                <TableCell>${invoice.paidAmount.toFixed(2)}</TableCell>
                <TableCell>${invoice.balanceAmount.toFixed(2)}</TableCell>
                <TableCell>
                  <Chip label={invoice.status} color={getStatusColor(invoice.status)} size="small" />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handlePaymentOpen(invoice)} color="success" disabled={invoice.balanceAmount <= 0}>
                    <PaymentIcon />
                  </IconButton>
                  <IconButton onClick={() => handleOpen(invoice)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(invoice.id!)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editingInvoice ? 'Edit Invoice' : 'Add Invoice'}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Patient</InputLabel>
            <Select
              value={formData.patientId}
              onChange={(e) => setFormData({ ...formData, patientId: Number(e.target.value) })}
            >
              {patients.map((patient) => (
                <MenuItem key={patient.id} value={patient.id}>
                  {`${patient.firstName} ${patient.lastName}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Invoice Date"
            type="date"
            value={formData.invoiceDate.split('T')[0]}
            onChange={(e) => setFormData({ ...formData, invoiceDate: e.target.value })}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Total Amount"
            type="number"
            value={formData.totalAmount}
            onChange={(e) => setFormData({ ...formData, totalAmount: Number(e.target.value) })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Paid Amount"
            type="number"
            value={formData.paidAmount}
            onChange={(e) => setFormData({ ...formData, paidAmount: Number(e.target.value) })}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Paid">Paid</MenuItem>
              <MenuItem value="PartiallyPaid">Partially Paid</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Payment Method"
            value={formData.paymentMethod}
            onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingInvoice ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={paymentOpen} onClose={handlePaymentClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add Payment</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Balance Amount: ${selectedInvoice?.balanceAmount.toFixed(2)}
          </Typography>
          <TextField
            fullWidth
            label="Payment Amount"
            type="number"
            value={paymentData.amount}
            onChange={(e) => setPaymentData({ ...paymentData, amount: Number(e.target.value) })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Payment Date"
            type="date"
            value={paymentData.paymentDate.split('T')[0]}
            onChange={(e) => setPaymentData({ ...paymentData, paymentDate: e.target.value })}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Payment Method"
            value={paymentData.paymentMethod}
            onChange={(e) => setPaymentData({ ...paymentData, paymentMethod: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Transaction ID"
            value={paymentData.transactionId}
            onChange={(e) => setPaymentData({ ...paymentData, transactionId: e.target.value })}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePaymentClose}>Cancel</Button>
          <Button onClick={handlePaymentSubmit} variant="contained">
            Add Payment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Invoices;
