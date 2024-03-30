using API.DTOs;

namespace API.Services
{
    public interface IAuthManager
    {
        Task<bool> ValidateUser(LoginDto login);
        Task<string> CreateToken();
    }
}
