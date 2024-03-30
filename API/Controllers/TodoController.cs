using API.DTOs.Todos;
using API.Models;
using API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly ITodoRepository _todoRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUserRepository _userRepository;
        public TodoController(ITodoRepository todoRepository, UserManager<ApplicationUser> userManager, IUserRepository userRepository)
        {
            _todoRepository = todoRepository;
            _userManager = userManager;
            _userRepository = userRepository;

        }

        [HttpGet("GetTodos/{username}")]
        public async Task<IActionResult> GetTodos(string username)
        {
            // todo:
            // get loginUser by username

            var userId = await _userRepository.GetUserIdByUsername(username);

            if (string.IsNullOrEmpty(userId)) return BadRequest("User cannot be found by username.");

            var result = await _todoRepository.GetTodosByUserId(userId);

            return Ok(result);
        }

        [HttpGet("GetTodoById/{id}")]
        public async Task<IActionResult> GetTodoById(int id)
        {
            if (id == 0) return BadRequest("Please select todo item to retrieve.");
            var result = await _todoRepository.GetTodoById(id);
            
            if (result != null) return Ok(result);

            return NotFound("Todo item was not found");
            
        }

        [HttpPost("SaveTodo")]
        public async Task<IActionResult> SaveTodo(TodoUpsertDto data)
        {
            if(data != null)
            {
                if (string.IsNullOrEmpty(data.username)) return BadRequest("You're not currently logged in.");

                if (string.IsNullOrEmpty(data.Title)) return BadRequest("Item title is mandatory.");

                var todo = new Todo
                {
                    Id = data.Id,
                    Title = data.Title,
                    Description = data.Description,
                    IsActive = data.IsActive,
                    AppUserId = await _userRepository.GetUserIdByUsername(data.username) ?? null
                };

                var result = await _todoRepository.TodoUpsert(todo);

                if (result > 0) return Ok(todo);

                return BadRequest("Data is invalid.");
            }

            return BadRequest("Data is empty.");
        }

        [HttpPut("RemoveTodoById/{id}")]
        public async Task<IActionResult> RemoveTodoById(int id)
        {
            if(id > 0)
            {
                var result = await _todoRepository.TodoDelete(id);
                
                if(result > 0) return Ok();

                return BadRequest("You are trying to delete an item that don't exist.");
            }

            return BadRequest("Please select todo item to delete.");
        }

    }
}
