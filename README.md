# Hospital Management System (OHMS)

A comprehensive hospital management system built with .NET 8 API backend and React + TypeScript + Material-UI frontend.

## Features

### 🏥 Clinic Management
- **Patients**: Register and manage patient records with personal information
- **Doctors**: Manage doctor profiles with specializations and credentials
- **Appointments**: Schedule and track patient appointments with doctors

### 💊 Pharmacy Management
- **Medicines**: Track medicine inventory with stock levels and expiry dates
- **Prescriptions**: Manage prescriptions with detailed medication information

### 🔬 Laboratory Management
- **Lab Tests**: Order and track laboratory tests
- **Test Results**: Record and manage test results and reports

### 💰 Billing Management
- **Invoices**: Generate and manage patient invoices
- **Payments**: Process and track payments with multiple payment methods

## Technology Stack

### Backend
- .NET 8.0 Web API
- Entity Framework Core with SQLite
- RESTful API architecture
- CORS enabled for frontend integration

### Frontend
- React 18
- TypeScript
- Material-UI (MUI) v6
- React Router for navigation
- Axios for API communication

## Getting Started

### Prerequisites
- .NET 8 SDK or later
- Node.js 18+ and npm
- Git

### Backend Setup

1. Navigate to the backend directory:
```bash
cd HospitalManagement.API
```

2. Restore dependencies:
```bash
dotnet restore
```

3. Run the API:
```bash
dotnet run
```

The API will start on `http://localhost:5220` and `https://localhost:7168`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd hospital-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

### Building for Production

#### Backend
```bash
cd HospitalManagement.API
dotnet publish -c Release
```

#### Frontend
```bash
cd hospital-frontend
npm run build
```

The production build will be created in the `dist` folder.

## Project Structure

```
OHMS_NEW/
├── HospitalManagement.API/        # .NET 8 Backend API
│   ├── Controllers/               # API Controllers
│   ├── Models/                    # Data Models
│   ├── Data/                      # Database Context
│   └── Program.cs                 # Application Entry Point
│
├── hospital-frontend/             # React Frontend
│   ├── src/
│   │   ├── pages/                 # Page Components
│   │   ├── services/              # API Services
│   │   ├── types/                 # TypeScript Types
│   │   └── App.tsx                # Main App Component
│   └── package.json
│
└── README.md
```

## API Endpoints

### Patients
- `GET /api/patients` - Get all patients
- `GET /api/patients/{id}` - Get patient by ID
- `POST /api/patients` - Create new patient
- `PUT /api/patients/{id}` - Update patient
- `DELETE /api/patients/{id}` - Delete patient

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/{id}` - Get doctor by ID
- `POST /api/doctors` - Create new doctor
- `PUT /api/doctors/{id}` - Update doctor
- `DELETE /api/doctors/{id}` - Delete doctor

### Appointments
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/{id}` - Get appointment by ID
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments/{id}` - Update appointment
- `DELETE /api/appointments/{id}` - Delete appointment

### Medicines
- `GET /api/medicines` - Get all medicines
- `GET /api/medicines/{id}` - Get medicine by ID
- `POST /api/medicines` - Create new medicine
- `PUT /api/medicines/{id}` - Update medicine
- `DELETE /api/medicines/{id}` - Delete medicine

### Prescriptions
- `GET /api/prescriptions` - Get all prescriptions
- `GET /api/prescriptions/{id}` - Get prescription by ID
- `POST /api/prescriptions` - Create new prescription
- `PUT /api/prescriptions/{id}` - Update prescription
- `DELETE /api/prescriptions/{id}` - Delete prescription

### Lab Tests
- `GET /api/labtests` - Get all lab tests
- `GET /api/labtests/{id}` - Get lab test by ID
- `POST /api/labtests` - Create new lab test
- `PUT /api/labtests/{id}` - Update lab test
- `DELETE /api/labtests/{id}` - Delete lab test

### Invoices
- `GET /api/invoices` - Get all invoices
- `GET /api/invoices/{id}` - Get invoice by ID
- `POST /api/invoices` - Create new invoice
- `PUT /api/invoices/{id}` - Update invoice
- `DELETE /api/invoices/{id}` - Delete invoice
- `POST /api/invoices/{id}/payments` - Add payment to invoice

## Database

The system uses SQLite for data storage. The database file (`hospital.db`) is automatically created when you first run the API.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the GitHub repository.