using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PersonalFinanceTracker.Models
{
    public class Expenses
    {
        [Key]
        public int ExpenseId { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        public string Category { get; set; }

        public DateTime ExpenseDate { get; set; } = DateTime.UtcNow;

        public decimal ExpenseAmount { get; set; }

        public bool? IsApproved { get; set; } = false;
        
        public string? ExpenseDescription { get; set; }

        public string? ManagerComments { get; set; }
    }
}
