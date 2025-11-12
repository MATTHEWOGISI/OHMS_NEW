using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HospitalManagement.API.Data;
using HospitalManagement.API.Models;

namespace HospitalManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MedicinesController : ControllerBase
{
    private readonly HospitalContext _context;

    public MedicinesController(HospitalContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Medicine>>> GetMedicines()
    {
        return await _context.Medicines.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Medicine>> GetMedicine(int id)
    {
        var medicine = await _context.Medicines.FindAsync(id);

        if (medicine == null)
        {
            return NotFound();
        }

        return medicine;
    }

    [HttpPost]
    public async Task<ActionResult<Medicine>> CreateMedicine(Medicine medicine)
    {
        _context.Medicines.Add(medicine);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetMedicine), new { id = medicine.Id }, medicine);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateMedicine(int id, Medicine medicine)
    {
        if (id != medicine.Id)
        {
            return BadRequest();
        }

        _context.Entry(medicine).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!await MedicineExists(id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMedicine(int id)
    {
        var medicine = await _context.Medicines.FindAsync(id);
        if (medicine == null)
        {
            return NotFound();
        }

        _context.Medicines.Remove(medicine);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private async Task<bool> MedicineExists(int id)
    {
        return await _context.Medicines.AnyAsync(e => e.Id == id);
    }
}
