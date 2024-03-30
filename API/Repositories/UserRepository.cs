using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;
        public UserRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<string> GetUserIdByUsername(string username)
        {
            var result = await _context.AppUsers
                            .Where(u => u.UserName == username)
                            .Select(u => u.Id)
                            .FirstOrDefaultAsync();

            return result;
        }
    }
}
