using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    // Table attribute'u ilgili class'ın veri tabanında tablosu oluşturulurken tablonun adını özelleştirmemizi sağlar.
    [Table("Photos")]
    public class Photo
    {
        public int Id { get; set; }
        public int AppUserId { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public string PublicId { get; set; }
        public virtual AppUser AppUser{ get; set; }
    }
}