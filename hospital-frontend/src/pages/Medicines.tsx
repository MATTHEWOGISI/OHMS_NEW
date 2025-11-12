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
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { medicinesApi } from '../services/api';
import type { Medicine } from '../types';

const Medicines = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [open, setOpen] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);
  const [formData, setFormData] = useState<Medicine>({
    name: '',
    description: '',
    manufacturer: '',
    price: 0,
    stockQuantity: 0,
    unit: '',
    expiryDate: '',
  });

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const response = await medicinesApi.getAll();
      setMedicines(response.data);
    } catch (error) {
      console.error('Error fetching medicines:', error);
    }
  };

  const handleOpen = (medicine?: Medicine) => {
    if (medicine) {
      setEditingMedicine(medicine);
      setFormData(medicine);
    } else {
      setEditingMedicine(null);
      setFormData({
        name: '',
        description: '',
        manufacturer: '',
        price: 0,
        stockQuantity: 0,
        unit: '',
        expiryDate: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingMedicine(null);
  };

  const handleSubmit = async () => {
    try {
      if (editingMedicine) {
        await medicinesApi.update(editingMedicine.id!, formData);
      } else {
        await medicinesApi.create(formData);
      }
      fetchMedicines();
      handleClose();
    } catch (error) {
      console.error('Error saving medicine:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      try {
        await medicinesApi.delete(id);
        fetchMedicines();
      } catch (error) {
        console.error('Error deleting medicine:', error);
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Medicines</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>
          Add Medicine
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Manufacturer</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Expiry Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medicines.map((medicine) => (
              <TableRow key={medicine.id}>
                <TableCell>{medicine.id}</TableCell>
                <TableCell>{medicine.name}</TableCell>
                <TableCell>{medicine.manufacturer}</TableCell>
                <TableCell>${medicine.price.toFixed(2)}</TableCell>
                <TableCell>{medicine.stockQuantity}</TableCell>
                <TableCell>{medicine.unit}</TableCell>
                <TableCell>{new Date(medicine.expiryDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(medicine)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(medicine.id!)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editingMedicine ? 'Edit Medicine' : 'Add Medicine'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            margin="normal"
            multiline
            rows={2}
          />
          <TextField
            fullWidth
            label="Manufacturer"
            value={formData.manufacturer}
            onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Stock Quantity"
            type="number"
            value={formData.stockQuantity}
            onChange={(e) => setFormData({ ...formData, stockQuantity: Number(e.target.value) })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Unit"
            value={formData.unit}
            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Expiry Date"
            type="date"
            value={formData.expiryDate.split('T')[0]}
            onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingMedicine ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Medicines;
