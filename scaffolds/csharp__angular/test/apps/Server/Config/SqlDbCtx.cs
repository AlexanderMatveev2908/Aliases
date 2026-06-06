using InvoicesApp.ModelsNS.UsersNS;
using Microsoft.EntityFrameworkCore;

namespace Server.ConfigNS.SqlNS;

public class SqlDbCtx : DbContext
{
  public SqlDbCtx(DbContextOptions<SqlDbCtx> options) : base(options)
  {
  }

  public DbSet<Users> Users => Set<Users>();

  protected override void OnModelCreating(
    ModelBuilder modelBuilder
)
  {
    modelBuilder.Entity<Users>()
        .HasIndex(u => u.Email)
        .IsUnique();
  }
}