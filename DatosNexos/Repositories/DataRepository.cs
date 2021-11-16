using DatosNexos.Interfaces;
using System.Threading.Tasks;

namespace DatosNexos.Repositories
{
    public class DataRepository<T> : IDataRepository<T> where T : class
    {
        private readonly ApiNexosLibrosContext _context;

        public DataRepository(ApiNexosLibrosContext context)
        {
            _context = context;
        }

        public void Add(T entity)
        {
            _context.Set<T>().Add(entity);
        }

        public void Update(T entity)
        {
            _context.Update(entity);
            
        }

        public void Delete(T entity)
        {
            _context.Set<T>().Remove(entity);
        }

        public async Task<T> SaveAsync(T entity)
        {
            await _context.SaveChangesAsync();
            return entity;
        }
    }
}
