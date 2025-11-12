export interface Patient {
  id?: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  email: string;
  address: string;
  createdAt?: string;
}

export interface Doctor {
  id?: number;
  firstName: string;
  lastName: string;
  specialization: string;
  phoneNumber: string;
  email: string;
  licenseNumber: string;
  createdAt?: string;
}

export interface Appointment {
  id?: number;
  patientId: number;
  doctorId: number;
  appointmentDate: string;
  status: string;
  reason: string;
  notes: string;
  createdAt?: string;
  patient?: Patient;
  doctor?: Doctor;
}

export interface Medicine {
  id?: number;
  name: string;
  description: string;
  manufacturer: string;
  price: number;
  stockQuantity: number;
  unit: string;
  expiryDate: string;
  createdAt?: string;
}

export interface Prescription {
  id?: number;
  patientId: number;
  doctorId: number;
  prescriptionDate: string;
  diagnosis: string;
  status: string;
  createdAt?: string;
  patient?: Patient;
  doctor?: Doctor;
  items?: PrescriptionItem[];
}

export interface PrescriptionItem {
  id?: number;
  prescriptionId: number;
  medicineId: number;
  quantity: number;
  dosage: string;
  instructions: string;
  medicine?: Medicine;
}

export interface LabTest {
  id?: number;
  patientId: number;
  testName: string;
  testType: string;
  testDate: string;
  status: string;
  result: string;
  notes: string;
  cost: number;
  createdAt?: string;
  patient?: Patient;
}

export interface Invoice {
  id?: number;
  patientId: number;
  invoiceNumber: string;
  invoiceDate: string;
  totalAmount: number;
  paidAmount: number;
  balanceAmount: number;
  status: string;
  paymentMethod: string;
  createdAt?: string;
  patient?: Patient;
  items?: InvoiceItem[];
  payments?: Payment[];
}

export interface InvoiceItem {
  id?: number;
  invoiceId: number;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Payment {
  id?: number;
  invoiceId: number;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  transactionId: string;
}
