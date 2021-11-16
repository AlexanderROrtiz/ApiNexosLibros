using DatosNexos;
using DatosNexos.DTOs;
using DatosNexos.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ApiNexosLibros.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LibrosController : ControllerBase
    {
            private readonly ApiNexosLibrosContext _context;
            private readonly IDataRepository<Libro> _repo;

        public LibrosController(ApiNexosLibrosContext context, IDataRepository<Libro> repo)
         {
             _context = context;
             _repo = repo;
        }
        [HttpGet("Index")]
        public IEnumerable<Libro> Index()
        {
            return _context.Libro.Include(b => b.Autor).Include(b => b.Registro).OrderByDescending(p => p.Id);
        }

        [HttpPost("Create")]
        public async Task<Libro> Create(Libro libro)
        {
            if (librosMaximosRegistrados(libro.RegistroId))
            {
                throw new Exception("No es posible registrar el libro, se alcanzó el máximo permitido.");
            }

            try
            {
                libro.CreacionAt = DateTime.UtcNow;
                _repo.Add(libro);
                var save = await _repo.SaveAsync(libro);
                return libro;
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpGet("FindById/{id}")]
        public async Task<Libro> FindById(int id)
        {
            try
            {
                var libro = await _context.Libro.FindAsync(id);

                if (libro == null)
                {
                    return null;
                }

                return libro;
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpPut("Edit/{id}")]
        public async Task<IActionResult> Edit([FromRoute] int id, [FromBody] Libro libro)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != libro.Id)
            {
                return BadRequest();
            }

            _context.Entry(libro).State = EntityState.Modified;

            try
            {
                libro.ActualizacionAt = DateTime.UtcNow;
                _repo.Update(libro);
                var save = await _repo.SaveAsync(libro);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LibroExistente(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var libro = await _context.Libro.FindAsync(id);
                if (libro == null)
                {
                    return NotFound();
                }

                _repo.Delete(libro);
                var save = await _repo.SaveAsync(libro);

                return Ok(libro);
            }
            catch (Exception ex)
            {
                return new JsonResult(new { message = ex.Message });
            }
        }
        private bool LibroExistente(int id)
        {
            return _context.Libro.Any(e => e.Id == id);
        }

        private bool librosMaximosRegistrados(int registroId)
        {
            var libroMax = _context.Registro.Where(e => e.Id == registroId).First().librosMaximosRegistrados;
            if (libroMax.Equals("-1"))
            {
                return false;
            }
            else
            {
                if (libroMax.Equals(_context.Libro.Count(e => e.RegistroId == registroId)))
                {
                    return true;
                }
                return false; 
            }
        }
    }
}
