using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PersonalFinanceTracker.Models
{
    public class Income
    {
        [Key]
        public int IncomeId { get; set; } // Primary Key

        [ForeignKey("User")]
        public int UserId { get; set; } // Foreign Key

        [Required]
        [StringLength(100)]
        public string IncomeType { get; set; } // Income Type

        [Required]
        public int Amount { get; set; } // Amount

        public DateTime? Date { get; set; } // Nullable Date field
    }
}
