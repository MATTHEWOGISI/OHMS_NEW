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
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { labTestsApi, patientsApi } from '../services/api';
import type { LabTest, Patient } from '../types';

const LabTests = () => {
  const [labTests, setLabTests] = useState<LabTest[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [open, setOpen] = useState(false);
  const [editingLabTest, setEditingLabTest] = useState<LabTest | null>(null);
  const [formData, setFormData] = useState<LabTest>({
    patientId: 0,
    testName: '',
    testType: '',
    testDate: '',
    status: 'Pending',
    result: '',
    notes: '',
    cost: 0,
  });

  useEffect(() => {
    fetchLabTests();
    fetchPatients();
  }, []);

  const fetchLabTests = async () => {
    try {
      const response = await labTestsApi.getAll();
      setLabTests(response.data);
    } catch (error) {
      console.error('Error fetching lab tests:', error);
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

  const handleOpen = (labTest?: LabTest) => {
    if (labTest) {
      setEditingLabTest(labTest);
      setFormData(labTest);
    } else {
      setEditingLabTest(null);
      setFormData({
        patientId: 0,
        testName: '',
        testType: '',
        testDate: '',
        status: 'Pending',
        result: '',
        notes: '',
        cost: 0,
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingLabTest(null);
  };

  const handleSubmit = async () => {
    try {
      if (editingLabTest) {
        await labTestsApi.update(editingLabTest.id!, formData);
      } else {
        await labTestsApi.create(formData);
      }
      fetchLabTests();
      handleClose();
    } catch (error) {
      console.error('Error saving lab test:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this lab test?')) {
      try {
        await labTestsApi.delete(id);
        fetchLabTests();
      } catch (error) {
        console.error('Error deleting lab test:', error);
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Laboratory Tests</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>
          Add Lab Test
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Patient</TableCell>
              <TableCell>Test Name</TableCell>
              <TableCell>Test Type</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {labTests.map((labTest) => (
              <TableRow key={labTest.id}>
                <TableCell>{labTest.id}</TableCell>
                <TableCell>
                  {labTest.patient && `${labTest.patient.firstName} ${labTest.patient.lastName}`}
                </TableCell>
                <TableCell>{labTest.testName}</TableCell>
                <TableCell>{labTest.testType}</TableCell>
                <TableCell>{new Date(labTest.testDate).toLocaleDateString()}</TableCell>
                <TableCell>{labTest.status}</TableCell>
                <TableCell>${labTest.cost.toFixed(2)}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(labTest)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(labTest.id!)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editingLabTest ? 'Edit Lab Test' : 'Add Lab Test'}</DialogTitle>
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
            label="Test Name"
            value={formData.testName}
            onChange={(e) => setFormData({ ...formData, testName: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Test Type"
            value={formData.testType}
            onChange={(e) => setFormData({ ...formData, testType: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Test Date"
            type="date"
            value={formData.testDate.split('T')[0]}
            onChange={(e) => setFormData({ ...formData, testDate: e.target.value })}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="InProgress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Result"
            value={formData.result}
            onChange={(e) => setFormData({ ...formData, result: e.target.value })}
            margin="normal"
            multiline
            rows={2}
          />
          <TextField
            fullWidth
            label="Notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            margin="normal"
            multiline
            rows={2}
          />
          <TextField
            fullWidth
            label="Cost"
            type="number"
            value={formData.cost}
            onChange={(e) => setFormData({ ...formData, cost: Number(e.target.value) })}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingLabTest ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LabTests;
