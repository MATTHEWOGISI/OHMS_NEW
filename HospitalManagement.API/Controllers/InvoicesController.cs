using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HospitalManagement.API.Data;
using HospitalManagement.API.Models;

namespace HospitalManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InvoicesController : ControllerBase
{
    private readonly HospitalContext _context;

    public InvoicesController(HospitalContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoices()
    {
        return await _context.Invoices
            .Include(i => i.Patient)
            .Include(i => i.Items)
            .Include(i => i.Payments)
            .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Invoice>> GetInvoice(int id)
    {
        var invoice = await _context.Invoices
            .Include(i => i.Patient)
            .Include(i => i.Items)
            .Include(i => i.Payments)
            .FirstOrDefaultAsync(i => i.Id == id);

        if (invoice == null)
        {
            return NotFound();
        }

        return invoice;
    }

    [HttpPost]
    public async Task<ActionResult<Invoice>> CreateInvoice(Invoice invoice)
    {
        // Generate invoice number
        var count = await _context.Invoices.CountAsync();
        invoice.InvoiceNumber = $"INV-{DateTime.UtcNow:yyyyMMdd}-{(count + 1):D4}";
        
        // Calculate balance
        invoice.BalanceAmount = invoice.TotalAmount - invoice.PaidAmount;

        _context.Invoices.Add(invoice);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetInvoice), new { id = invoice.Id }, invoice);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateInvoice(int id, Invoice invoice)
    {
        if (id != invoice.Id)
        {
            return BadRequest();
        }

        // Recalculate balance
        invoice.BalanceAmount = invoice.TotalAmount - invoice.PaidAmount;

        _context.Entry(invoice).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!await InvoiceExists(id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteInvoice(int id)
    {
        var invoice = await _context.Invoices.FindAsync(id);
        if (invoice == null)
        {
            return NotFound();
        }

        _context.Invoices.Remove(invoice);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpPost("{id}/payments")]
    public async Task<ActionResult<Payment>> AddPayment(int id, Payment payment)
    {
        var invoice = await _context.Invoices.FindAsync(id);
        if (invoice == null)
        {
            return NotFound();
        }

        payment.InvoiceId = id;
        _context.Payments.Add(payment);
        
        // Update invoice paid amount and balance
        invoice.PaidAmount += payment.Amount;
        invoice.BalanceAmount = invoice.TotalAmount - invoice.PaidAmount;
        
        // Update status
        if (invoice.BalanceAmount <= 0)
        {
            invoice.Status = "Paid";
        }
        else if (invoice.PaidAmount > 0)
        {
            invoice.Status = "PartiallyPaid";
        }

        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetInvoice), new { id = invoice.Id }, payment);
    }

    private async Task<bool> InvoiceExists(int id)
    {
        return await _context.Invoices.AnyAsync(e => e.Id == id);
    }
}
