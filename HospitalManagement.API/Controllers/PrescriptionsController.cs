using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HospitalManagement.API.Data;
using HospitalManagement.API.Models;

namespace HospitalManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PrescriptionsController : ControllerBase
{
    private readonly HospitalContext _context;

    public PrescriptionsController(HospitalContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Prescription>>> GetPrescriptions()
    {
        return await _context.Prescriptions
            .Include(p => p.Patient)
            .Include(p => p.Doctor)
            .Include(p => p.Items)
                .ThenInclude(i => i.Medicine)
            .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Prescription>> GetPrescription(int id)
    {
        var prescription = await _context.Prescriptions
            .Include(p => p.Patient)
            .Include(p => p.Doctor)
            .Include(p => p.Items)
                .ThenInclude(i => i.Medicine)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (prescription == null)
        {
            return NotFound();
        }

        return prescription;
    }

    [HttpPost]
    public async Task<ActionResult<Prescription>> CreatePrescription(Prescription prescription)
    {
        _context.Prescriptions.Add(prescription);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetPrescription), new { id = prescription.Id }, prescription);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePrescription(int id, Prescription prescription)
    {
        if (id != prescription.Id)
        {
            return BadRequest();
        }

        _context.Entry(prescription).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!await PrescriptionExists(id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePrescription(int id)
    {
        var prescription = await _context.Prescriptions.FindAsync(id);
        if (prescription == null)
        {
            return NotFound();
        }

        _context.Prescriptions.Remove(prescription);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private async Task<bool> PrescriptionExists(int id)
    {
        return await _context.Prescriptions.AnyAsync(e => e.Id == id);
    }
}
