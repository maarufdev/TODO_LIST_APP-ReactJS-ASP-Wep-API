using API.Models;

namespace API.DTOs.Todos
{
    public class TodoUpsertDto
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public bool IsDone { get; set; } = false;
        public bool IsActive { get; set; } = true;
        public string? username { get; set; }
    }
}
