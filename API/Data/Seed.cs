using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        // Bu method seed verilerini veri tabanına migrate etmek için kullanılır. Bu methodun static olmasının sebebi methodu kullanmak istediğimiz zaman Seed class'ının yeni bir instance'ını oluşturmak istemememizdir.
        public static async Task SeedUsers(DataContext context)
        {
            // Eğer veri tabanında ilgili veri zaten kayıtlı ise işlem yapmadan geri dön.
            if(await context.Users.AnyAsync()) return;

            // Seed verisini ilgili dosyadan okuma işlemi:
            var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");

            var options = new JsonSerializerOptions{PropertyNameCaseInsensitive = true};

            // Text verisini JSON'a çevirme işlemi:
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData, options);

            // Tüm kullanıcılar için şifre oluşturma işlemi:
            foreach(var user in users)
            {
                using var hmac = new HMACSHA512();

                user.UserName = user.UserName.ToLower();

                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd"));

                user.PasswordSalt = hmac.Key;

                // Oluşturulan kullanıcıları tabloya ekle.
                context.Users.Add(user);
            }

            // Değişiklikleri kaydet.
            await context.SaveChangesAsync();
        }        
    }
}