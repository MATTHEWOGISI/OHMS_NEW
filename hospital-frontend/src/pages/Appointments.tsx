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
import { appointmentsApi, patientsApi, doctorsApi } from '../services/api';
import type { Appointment, Patient, Doctor } from '../types';

const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [open, setOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [formData, setFormData] = useState<Appointment>({
    patientId: 0,
    doctorId: 0,
    appointmentDate: '',
    status: 'Scheduled',
    reason: '',
    notes: '',
  });

  useEffect(() => {
    fetchAppointments();
    fetchPatients();
    fetchDoctors();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await appointmentsApi.getAll();
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
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

  const fetchDoctors = async () => {
    try {
      const response = await doctorsApi.getAll();
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleOpen = (appointment?: Appointment) => {
    if (appointment) {
      setEditingAppointment(appointment);
      setFormData(appointment);
    } else {
      setEditingAppointment(null);
      setFormData({
        patientId: 0,
        doctorId: 0,
        appointmentDate: '',
        status: 'Scheduled',
        reason: '',
        notes: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingAppointment(null);
  };

  const handleSubmit = async () => {
    try {
      if (editingAppointment) {
        await appointmentsApi.update(editingAppointment.id!, formData);
      } else {
        await appointmentsApi.create(formData);
      }
      fetchAppointments();
      handleClose();
    } catch (error) {
      console.error('Error saving appointment:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await appointmentsApi.delete(id);
        fetchAppointments();
      } catch (error) {
        console.error('Error deleting appointment:', error);
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Appointments</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>
          Add Appointment
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Patient</TableCell>
              <TableCell>Doctor</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.id}</TableCell>
                <TableCell>
                  {appointment.patient && `${appointment.patient.firstName} ${appointment.patient.lastName}`}
                </TableCell>
                <TableCell>
                  {appointment.doctor && `${appointment.doctor.firstName} ${appointment.doctor.lastName}`}
                </TableCell>
                <TableCell>{new Date(appointment.appointmentDate).toLocaleString()}</TableCell>
                <TableCell>{appointment.status}</TableCell>
                <TableCell>{appointment.reason}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(appointment)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(appointment.id!)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editingAppointment ? 'Edit Appointment' : 'Add Appointment'}</DialogTitle>
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
          <FormControl fullWidth margin="normal">
            <InputLabel>Doctor</InputLabel>
            <Select
              value={formData.doctorId}
              onChange={(e) => setFormData({ ...formData, doctorId: Number(e.target.value) })}
            >
              {doctors.map((doctor) => (
                <MenuItem key={doctor.id} value={doctor.id}>
                  {`${doctor.firstName} ${doctor.lastName}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Appointment Date"
            type="datetime-local"
            value={formData.appointmentDate.slice(0, 16)}
            onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <MenuItem value="Scheduled">Scheduled</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Reason"
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            margin="normal"
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingAppointment ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Appointments;
