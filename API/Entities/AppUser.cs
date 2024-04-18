using System.ComponentModel.DataAnnotations;
using API.Extensions;

namespace API.Entities;

public class AppUser
{
    public int Id { get; set; }
    public string UserName { get; set; }
    public byte[] PasswordHash {get; set;}
    public byte[] PasswordSalt { get; set; }
    public DateOnly DateOfBirth { get; set; }
    public string KnownAs { get; set; }
    public DateTime Created { get; set; }
    public DateTime LastActive { get; set; }
    public string Gender { get; set; }
    public string Introduction { get; set; }
    public string LookingFor { get; set; }
    public string Interests { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
    public List<Photo> Photos { get; set; } = new();

    // Aşağıdaki method yüzünden map işlemleri sırasında entity'nin tüm özellikleri dto'ya maplenmek zorunda kalıyor bu yüzden methodu entity'den çıkarım auto mapper konfigürasyonunda çağırmalıyız.
    // public int GetAge()
    // {
    //     return DateOfBirth.CalculateAge();
    // }
}
