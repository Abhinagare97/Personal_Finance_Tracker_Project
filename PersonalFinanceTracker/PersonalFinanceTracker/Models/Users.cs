using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PersonalFinanceTracker.Models
{
    public class Users
    {
        [Key]
        public int UserId { get; set; }

        public string UserFirstName { get; set; }

        public string UserLastName { get; set; }

        public string UserName { get; set; }

        [Required]
        public string PassCodeHash { get; set; } // Store hashed password

        [Required, EmailAddress, MaxLength(255)]
        public string Email { get; set; }

        [Required, MaxLength(15)]
        public string MobileNo { get; set; }

      
    }

  

}
