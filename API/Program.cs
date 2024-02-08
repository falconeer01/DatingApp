using API.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseHttpsRedirection();

app.UseCors(b => b.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200"));

// Bu iki middlewarein eklenme sırası önemlidir.
app.UseAuthentication(); // Geçerli bir token var mı?
app.UseAuthorization(); // Tokenin içeriği neleri mümkün kılıyor?

app.MapControllers();

app.Run();
