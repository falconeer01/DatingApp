using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            // Auto mapper sayesinde bir entity'den oluşturulan dto'yu eşleştiriyoruz.
            CreateMap<AppUser, MemberDto>()
                // MemberDto içindeki PhotoUrl propuna ulaşmak istediğimiz için dest(destination) dest.PhotoUrl olur.
                .ForMember(dest => dest.PhotoUrl,
                            // opt kısmında şartlar ve seçenekler belirlenir. Bir yerden map işlemi yapılacağı için MapFrom methodu kullanılır.
                            opt => opt.MapFrom(
                                // map işleminin kaynağı src kısmında belirtilir. Burada IsMain propu true olan ilk veya default Photo entity'sinin Url propundaki değeri alınmıştır.
                                src => src.Photos.FirstOrDefault(p => p.IsMain).Url
                            ))
                .ForMember(dest => dest.Age,
                            opt => opt.MapFrom(
                                src => src.DateOfBirth.CalculateAge()
                            )
                );
            CreateMap<Photo, PhotoDto>();
        }
    }
}