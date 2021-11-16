using DatosNexos.DTOs;
using Microsoft.EntityFrameworkCore;

namespace DatosNexos
{
    public class ApiNexosLibrosContext : DbContext
    {
        public ApiNexosLibrosContext(DbContextOptions<ApiNexosLibrosContext> options)
        : base(options)
        {

        }

        public DbSet<Registro> Registro { get; set; }
        public DbSet<Autor> Autor { get; set; }
        public DbSet<Libro> Libro { get; set; }
    }
}
