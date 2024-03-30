using Microsoft.AspNetCore.Identity;

namespace API.Models
{
    public class ApplicationUser: IdentityUser
    {
        public List<Todo>? Todos { get; set; }
    }
}
