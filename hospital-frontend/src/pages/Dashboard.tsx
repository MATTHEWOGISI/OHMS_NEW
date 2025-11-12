import { Box, Paper, Typography, Card, CardContent } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicationIcon from '@mui/icons-material/Medication';
import ScienceIcon from '@mui/icons-material/Science';
import ReceiptIcon from '@mui/icons-material/Receipt';

const Dashboard = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Hospital Management Dashboard
      </Typography>
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mt: 2 }}>
        <Card sx={{ bgcolor: '#1976d2', color: 'white', flex: '1 1 200px', minWidth: 200 }}>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="h6">Clinic</Typography>
                <Typography variant="h4">Manage</Typography>
              </Box>
              <LocalHospitalIcon sx={{ fontSize: 60, opacity: 0.7 }} />
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ bgcolor: '#388e3c', color: 'white', flex: '1 1 200px', minWidth: 200 }}>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="h6">Pharmacy</Typography>
                <Typography variant="h4">Manage</Typography>
              </Box>
              <MedicationIcon sx={{ fontSize: 60, opacity: 0.7 }} />
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ bgcolor: '#f57c00', color: 'white', flex: '1 1 200px', minWidth: 200 }}>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="h6">Laboratory</Typography>
                <Typography variant="h4">Manage</Typography>
              </Box>
              <ScienceIcon sx={{ fontSize: 60, opacity: 0.7 }} />
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ bgcolor: '#d32f2f', color: 'white', flex: '1 1 200px', minWidth: 200 }}>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="h6">Billing</Typography>
                <Typography variant="h4">Manage</Typography>
              </Box>
              <ReceiptIcon sx={{ fontSize: 60, opacity: 0.7 }} />
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Welcome to Hospital Management System
        </Typography>
        <Typography variant="body1" color="text.secondary">
          This comprehensive system helps manage all aspects of hospital operations including:
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • <strong>Clinic:</strong> Manage patients, doctors, and appointments
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • <strong>Pharmacy:</strong> Track medicines, prescriptions, and inventory
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • <strong>Laboratory:</strong> Manage lab tests and results
          </Typography>
          <Typography variant="body2">
            • <strong>Billing:</strong> Handle invoices and payments
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Dashboard;
