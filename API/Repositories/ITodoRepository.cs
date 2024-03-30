using API.Models;

namespace API.Repositories
{
    public interface ITodoRepository
    {
        Task<IEnumerable<Todo>> GetTodosByUserId(string userId);
        Task<Todo> GetTodoById(int id);
        Task<int> TodoUpsert(Todo todo);
        Task<int> TodoDelete(int id);
    }
}
