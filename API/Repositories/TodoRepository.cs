using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace API.Repositories
{
    public class TodoRepository : ITodoRepository
    {
        private readonly AppDbContext _context;
        public TodoRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Todo> GetTodoById(int id)
        {
            return await _context.Todos?.FirstOrDefaultAsync(t => t.Id == id! && t.IsActive! && t.IsActive);
        }

        public async Task<IEnumerable<Todo>> GetTodosByUserId(string userId)
        {
            return await _context.Todos.Where(t => t.AppUserId == userId && t.IsActive).ToListAsync();
        }

        public async Task<int> TodoDelete(int id)
        {
            var toBeDeletedTodo = await _context.Todos
                                        .AsNoTracking()
                                        .FirstOrDefaultAsync(t => t.Id == id);

            if (toBeDeletedTodo != null)
            {
                toBeDeletedTodo.IsActive = false;

                _context.Todos.Update(toBeDeletedTodo);
                return await _context.SaveChangesAsync();
            }

            return 0;
        }

        public async Task<int> TodoUpsert(Todo todo)
        {
            if(todo.Id == 0)
            {
                todo.IsActive = true;
                todo.CreatedOn = DateTime.UtcNow;
                
                await _context.Todos.AddAsync(todo);
                
                return await _context.SaveChangesAsync();
            }
            else if(todo.Id > 0)
            {
                var tobeUpdated = await _context.Todos.FirstOrDefaultAsync(x => x.Id == todo.Id);
                if (tobeUpdated != null)
                {
                    tobeUpdated.Title = todo.Title;
                    tobeUpdated.Description = todo.Description;
                    tobeUpdated.IsDone = todo.IsDone;
                    tobeUpdated.IsActive = todo.IsActive;
                    tobeUpdated.AppUserId = todo.AppUserId;
                    tobeUpdated.UpdatedOn = DateTime.UtcNow;

                    _context.Todos.Update(tobeUpdated);

                    return await _context.SaveChangesAsync();
                }

                return 0;
               
            }

            return 0;
        }
    }
}
