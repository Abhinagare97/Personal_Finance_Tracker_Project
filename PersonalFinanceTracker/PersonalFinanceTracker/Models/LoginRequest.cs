namespace PersonalFinanceTracker.Models
{
    public class LoginRequest
    {
        public string Username { get; set; }
        public string PassCodeHash { get; set; }
    }
}
