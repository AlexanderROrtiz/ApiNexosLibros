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
    public class AutorController : ControllerBase
    {
        private readonly ApiNexosLibrosContext _context;
        private readonly IDataRepository<Autor> _repo;

        public AutorController(ApiNexosLibrosContext context, IDataRepository<Autor> repo)
        {
            _context = context;
            _repo = repo;
        }
        // GET: api/Autor
        [HttpGet("Index")]
        public IEnumerable<Autor> Index()
        {
            return _context.Autor.OrderByDescending(p => p.Id);
        }

        // GET: api/Autor
        [HttpGet("FindById/{id}")]
        public async Task<IActionResult> FindById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var autor = await _context.Autor.FindAsync(id);

            if (autor == null)
            {
                return NotFound();
            }

            return Ok(autor);
        }

        // POST: api/PostAutor
        [HttpPost("Create")]
        public async Task<Autor> Create(Autor autor)
        {
            try
            {
                autor.CreacionAt = DateTime.UtcNow;
                _context.Autor.Add(autor);
                await _context.SaveChangesAsync();
                return autor;
            }
            catch (Exception)
            {

                throw;
            }
        }

        // PUT: api/Autor
        [HttpPut("Edit/{id}")]
        public async Task<IActionResult> Edit([FromRoute] int id, [FromBody] Autor autor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != autor.Id)
            {
                return BadRequest();
            }

            _context.Entry(autor).State = EntityState.Modified;

            try
            {
                autor.ActualizacionAt = DateTime.UtcNow;
                _repo.Update(autor);
                var save = await _repo.SaveAsync(autor);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AutorExists(id))
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
        // DELETE: api/Autor
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var autor = await _context.Autor.FindAsync(id);
                if (autor == null)
                {
                    return NotFound();
                }

                _repo.Delete(autor);
                var save = await _repo.SaveAsync(autor);

                return Ok(autor);
            }
            catch (Exception ex)
            {
                return new JsonResult(new { message = ex.Message });
            }
        }
        private bool AutorExists(int id)
        {
            return _context.Autor.Any(e => e.Id == id);
        }
    }
}
