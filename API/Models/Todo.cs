namespace API.Models
{
    public class Todo
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public bool IsDone { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
        public bool IsActive { get; set; }
        public string? AppUserId { get; set; }
        public ApplicationUser? AppUser { get; set; }
    }
}
