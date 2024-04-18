using API.Data;
using API.Extensions;
using API.Middlewares;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
// Hata yakalama middleware'i http request pipeline'ın en üstünde olmalıdır.
app.UseMiddleware<ExceptionMiddleware>();
app.UseHttpsRedirection();

app.UseCors(b => b.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200"));

// Bu iki middlewarein eklenme sırası önemlidir.
app.UseAuthentication(); // Geçerli bir token var mı?
app.UseAuthorization(); // Tokenin içeriği neleri mümkün kılıyor?

app.MapControllers();

// Aşağıdaki değişken sayesinde Program.cs'deki tüm scopelara erişebiliriz.
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    // İlgili servisteki data context'i al.
    var context = services.GetRequiredService<DataContext>();
    // İlgili context'teki değişiklikleri migrate et.
    await context.Database.MigrateAsync();
    await Seed.SeedUsers(context);
}
catch (Exception ex)
{
    var logger = services.GetService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration.");
}

app.Run();
