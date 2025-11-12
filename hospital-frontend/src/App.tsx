import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  LocalHospital as ClinicIcon,
  Medication as PharmacyIcon,
  Science as LabIcon,
  Receipt as BillingIcon,
  People as PeopleIcon,
  PersonAdd as DoctorIcon,
  Event as AppointmentIcon,
} from '@mui/icons-material';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Doctors from './pages/Doctors';
import Appointments from './pages/Appointments';
import Medicines from './pages/Medicines';
import LabTests from './pages/LabTests';
import Invoices from './pages/Invoices';

const drawerWidth = 240;

function AppContent() {
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Patients', icon: <PeopleIcon />, path: '/patients' },
    { text: 'Doctors', icon: <DoctorIcon />, path: '/doctors' },
    { text: 'Appointments', icon: <AppointmentIcon />, path: '/appointments' },
    { text: 'Medicines', icon: <PharmacyIcon />, path: '/medicines' },
    { text: 'Lab Tests', icon: <LabIcon />, path: '/labtests' },
    { text: 'Invoices', icon: <BillingIcon />, path: '/invoices' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <ClinicIcon sx={{ mr: 2 }} />
          <Typography variant="h6" noWrap component="div">
            Hospital Management System
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  selected={location.pathname === item.path}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/medicines" element={<Medicines />} />
          <Route path="/labtests" element={<LabTests />} />
          <Route path="/invoices" element={<Invoices />} />
        </Routes>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
