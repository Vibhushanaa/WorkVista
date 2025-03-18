using System.ComponentModel.DataAnnotations;

namespace Work_Vista_App.Model
{
    public class JobCategories
    {
        [Key]
        public int CategoryId { get; set; }

        [Required, MaxLength(100)]
        public string? CategoryName { get; set; }
    }
}
