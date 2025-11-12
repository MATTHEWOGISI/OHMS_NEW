namespace HospitalManagement.API.Models;

public class Prescription
{
    public int Id { get; set; }
    public int PatientId { get; set; }
    public int DoctorId { get; set; }
    public DateTime PrescriptionDate { get; set; } = DateTime.UtcNow;
    public string Diagnosis { get; set; } = string.Empty;
    public string Status { get; set; } = "Active"; // Active, Dispensed, Cancelled
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation properties
    public Patient Patient { get; set; } = null!;
    public Doctor Doctor { get; set; } = null!;
    public ICollection<PrescriptionItem> Items { get; set; } = new List<PrescriptionItem>();
}

public class PrescriptionItem
{
    public int Id { get; set; }
    public int PrescriptionId { get; set; }
    public int MedicineId { get; set; }
    public int Quantity { get; set; }
    public string Dosage { get; set; } = string.Empty;
    public string Instructions { get; set; } = string.Empty;
    
    // Navigation properties
    public Prescription Prescription { get; set; } = null!;
    public Medicine Medicine { get; set; } = null!;
}
