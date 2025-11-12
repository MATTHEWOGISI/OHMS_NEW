import axios from 'axios';
import type { Patient, Doctor, Appointment, Medicine, Prescription, LabTest, Invoice, Payment } from '../types';

const API_BASE_URL = 'http://localhost:5220/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Patients API
export const patientsApi = {
  getAll: () => api.get<Patient[]>('/patients'),
  getById: (id: number) => api.get<Patient>(`/patients/${id}`),
  create: (patient: Patient) => api.post<Patient>('/patients', patient),
  update: (id: number, patient: Patient) => api.put(`/patients/${id}`, patient),
  delete: (id: number) => api.delete(`/patients/${id}`),
};

// Doctors API
export const doctorsApi = {
  getAll: () => api.get<Doctor[]>('/doctors'),
  getById: (id: number) => api.get<Doctor>(`/doctors/${id}`),
  create: (doctor: Doctor) => api.post<Doctor>('/doctors', doctor),
  update: (id: number, doctor: Doctor) => api.put(`/doctors/${id}`, doctor),
  delete: (id: number) => api.delete(`/doctors/${id}`),
};

// Appointments API
export const appointmentsApi = {
  getAll: () => api.get<Appointment[]>('/appointments'),
  getById: (id: number) => api.get<Appointment>(`/appointments/${id}`),
  create: (appointment: Appointment) => api.post<Appointment>('/appointments', appointment),
  update: (id: number, appointment: Appointment) => api.put(`/appointments/${id}`, appointment),
  delete: (id: number) => api.delete(`/appointments/${id}`),
};

// Medicines API
export const medicinesApi = {
  getAll: () => api.get<Medicine[]>('/medicines'),
  getById: (id: number) => api.get<Medicine>(`/medicines/${id}`),
  create: (medicine: Medicine) => api.post<Medicine>('/medicines', medicine),
  update: (id: number, medicine: Medicine) => api.put(`/medicines/${id}`, medicine),
  delete: (id: number) => api.delete(`/medicines/${id}`),
};

// Prescriptions API
export const prescriptionsApi = {
  getAll: () => api.get<Prescription[]>('/prescriptions'),
  getById: (id: number) => api.get<Prescription>(`/prescriptions/${id}`),
  create: (prescription: Prescription) => api.post<Prescription>('/prescriptions', prescription),
  update: (id: number, prescription: Prescription) => api.put(`/prescriptions/${id}`, prescription),
  delete: (id: number) => api.delete(`/prescriptions/${id}`),
};

// Lab Tests API
export const labTestsApi = {
  getAll: () => api.get<LabTest[]>('/labtests'),
  getById: (id: number) => api.get<LabTest>(`/labtests/${id}`),
  create: (labTest: LabTest) => api.post<LabTest>('/labtests', labTest),
  update: (id: number, labTest: LabTest) => api.put(`/labtests/${id}`, labTest),
  delete: (id: number) => api.delete(`/labtests/${id}`),
};

// Invoices API
export const invoicesApi = {
  getAll: () => api.get<Invoice[]>('/invoices'),
  getById: (id: number) => api.get<Invoice>(`/invoices/${id}`),
  create: (invoice: Invoice) => api.post<Invoice>('/invoices', invoice),
  update: (id: number, invoice: Invoice) => api.put(`/invoices/${id}`, invoice),
  delete: (id: number) => api.delete(`/invoices/${id}`),
  addPayment: (invoiceId: number, payment: Payment) => 
    api.post<Payment>(`/invoices/${invoiceId}/payments`, payment),
};

export default api;
