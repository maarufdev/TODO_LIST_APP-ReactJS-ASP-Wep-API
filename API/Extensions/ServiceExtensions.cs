using API.Data;
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

namespace API.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureIdentity(this IServiceCollection services)
        {
            services
                .AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<AppDbContext>()
                .AddDefaultTokenProviders();
        }

        public static void ConfigureJwt(this IServiceCollection services, IConfiguration config)
        {
            services
                .AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = "JwtBearer";
                    options.DefaultChallengeScheme = "JwtBearer";
                })
               .AddJwtBearer("JwtBearer", jwtBearerOptions =>
               {
                   var jwtKey = config["Jwt:Key"];
                   var issues = config["Jwt:issuer"];

                   jwtBearerOptions.TokenValidationParameters = new TokenValidationParameters
                   {
                       SaveSigninToken = true,
                       ValidateIssuerSigningKey = true,
                       IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey!)),
                       ValidateIssuer = true,
                       ValidateAudience = false,
                       ValidateLifetime = true,
                       ValidIssuer = issues
                   };
               });
        }

        public static void ConfigureSwaggerDocs(this IServiceCollection services)
        {
            services
                .AddSwaggerGen(c =>
                {
                    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                        {
                            Description = @"JWT Authorization header using the Bearer scheme. 
                              Enter 'Bearer' [space] and then your token in the text input below.
                              Example: 'Bearer 12345abcdef'",
                            Name = "Authorization",
                            In = ParameterLocation.Header,
                            Type = SecuritySchemeType.ApiKey,
                            Scheme = "Bearer"
                        });

                    c.AddSecurityRequirement(new OpenApiSecurityRequirement() {
                        {
                            new OpenApiSecurityScheme
                            {
                                Reference = new OpenApiReference {
                                    Type = ReferenceType.SecurityScheme,
                                    Id = "Bearer"
                                },
                                Scheme = "0auth2",
                                Name = "Bearer",
                                In = ParameterLocation.Header
                            },
                            new List<string>()
                        }
                });
            });
        }
        
        public static void ConfigureCors(this IServiceCollection services)
        {
            services.AddCors(o =>
            {
                o.AddPolicy("AllowAll", builderPolicy =>
                    builderPolicy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            });
        }
    }
}
