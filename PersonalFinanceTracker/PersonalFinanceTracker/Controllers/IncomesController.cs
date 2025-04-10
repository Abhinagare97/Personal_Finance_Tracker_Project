﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PersonalFinanceTracker.Models;

namespace PersonalFinanceTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IncomesController : ControllerBase
    {
        private readonly EFCoreDbContext _context;

        public IncomesController(EFCoreDbContext context)
        {
            _context = context;
        }

        // GET: api/Incomes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Income>>> GetIncome()
        {
            return await _context.Income.ToListAsync();
        }

        // GET: api/Incomes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Income>> GetIncome(int id)
        {
            var income = await _context.Income.FindAsync(id);

            if (income == null)
            {
                return NotFound();
            }

            return income;
        }


        // GET: api/Expenses/user/{userId}
        [HttpGet("userincome/{userId}")]
        public async Task<ActionResult<IEnumerable<Income>>> GetExpensesByUser(int userId)
        {
            var userIncome = await _context.Income
                .Where(e => e.UserId == userId)
                .ToListAsync();

            if (userIncome == null || userIncome.Count == 0)
            {
                return NotFound(new { message = "No Income found for this user." });
            }

            return Ok(userIncome);
        }

        // PUT: api/Incomes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutIncome(int id, Income income)
        {
            if (id != income.IncomeId)
            {
                return BadRequest();
            }

            _context.Entry(income).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IncomeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Incomes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Income>> PostIncome(Income income)
        {
            _context.Income.Add(income);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetIncome", new { id = income.IncomeId }, income);
        }

        // DELETE: api/Incomes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIncome(int id)
        {
            var income = await _context.Income.FindAsync(id);
            if (income == null)
            {
                return NotFound();
            }

            _context.Income.Remove(income);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool IncomeExists(int id)
        {
            return _context.Income.Any(e => e.IncomeId == id);
        }
    }
}
