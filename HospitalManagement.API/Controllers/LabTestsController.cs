using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HospitalManagement.API.Data;
using HospitalManagement.API.Models;

namespace HospitalManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LabTestsController : ControllerBase
{
    private readonly HospitalContext _context;

    public LabTestsController(HospitalContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<LabTest>>> GetLabTests()
    {
        return await _context.LabTests
            .Include(l => l.Patient)
            .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<LabTest>> GetLabTest(int id)
    {
        var labTest = await _context.LabTests
            .Include(l => l.Patient)
            .FirstOrDefaultAsync(l => l.Id == id);

        if (labTest == null)
        {
            return NotFound();
        }

        return labTest;
    }

    [HttpPost]
    public async Task<ActionResult<LabTest>> CreateLabTest(LabTest labTest)
    {
        _context.LabTests.Add(labTest);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetLabTest), new { id = labTest.Id }, labTest);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateLabTest(int id, LabTest labTest)
    {
        if (id != labTest.Id)
        {
            return BadRequest();
        }

        _context.Entry(labTest).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!await LabTestExists(id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteLabTest(int id)
    {
        var labTest = await _context.LabTests.FindAsync(id);
        if (labTest == null)
        {
            return NotFound();
        }

        _context.LabTests.Remove(labTest);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private async Task<bool> LabTestExists(int id)
    {
        return await _context.LabTests.AnyAsync(e => e.Id == id);
    }
}
