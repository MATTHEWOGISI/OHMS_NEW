namespace HospitalManagement.API.Models;

public class LabTest
{
    public int Id { get; set; }
    public int PatientId { get; set; }
    public string TestName { get; set; } = string.Empty;
    public string TestType { get; set; } = string.Empty; // Blood, Urine, X-Ray, etc.
    public DateTime TestDate { get; set; } = DateTime.UtcNow;
    public string Status { get; set; } = "Pending"; // Pending, InProgress, Completed
    public string Result { get; set; } = string.Empty;
    public string Notes { get; set; } = string.Empty;
    public decimal Cost { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation properties
    public Patient Patient { get; set; } = null!;
}
