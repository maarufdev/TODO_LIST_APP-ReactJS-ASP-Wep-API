namespace API.Repositories
{
    public interface IUserRepository
    {
        Task<string> GetUserIdByUsername(string username);
    }
}
