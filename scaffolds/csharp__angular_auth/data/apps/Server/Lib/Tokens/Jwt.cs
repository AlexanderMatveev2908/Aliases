using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Server.ModelsNS.UserNS;
using Microsoft.IdentityModel.Tokens;
using Server.LibNS.EnvNS;

namespace Server.LibNS.TokensNS;

public static class JwtLib
{
    public static string Create(User user)
    {
        string secret = EnvVarsLib.Get("JWT_SECRET");

        SymmetricSecurityKey key = new(
             Encoding.UTF8.GetBytes(secret)
         );

        SigningCredentials creds = new(
                 key,
                 SecurityAlgorithms.HmacSha256
             );

        Claim[] claims =
            [
                new Claim("id", user.Id.ToString()),
            new Claim("email", user.Email)
            ];


        // ! to set higher in prod 
        JwtSecurityToken token = new(
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(10),
            signingCredentials: creds
        );


        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}