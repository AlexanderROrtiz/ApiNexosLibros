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
    public class RegistroController : ControllerBase
    {
        private readonly ApiNexosLibrosContext _context;
        private readonly IDataRepository<Registro> _repo;

        public RegistroController(ApiNexosLibrosContext context, IDataRepository<Registro> repo)
        {
            _context = context;
            _repo = repo;
        }
        // GET: api/Registro
        [HttpGet("Index")]
        public IEnumerable<Registro> Index()
        {
            return _context.Registro.OrderByDescending(p => p.Id);
        }

        // GET: api/Registro
        [HttpGet("FindById/{id}")]
        public async Task<IActionResult> FindById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var registro = await _context.Registro.FindAsync(id);

            if (registro == null)
            {
                return NotFound();
            }

            return Ok(registro);
        }
        // POST: api/PostRegistro
        [HttpPost("Create")]
        public async Task<Registro> Create(Registro registro)
        {
            try
            {
                registro.CreacionAt = DateTime.UtcNow;
                _context.Registro.Add(registro);
                await _context.SaveChangesAsync();
                return registro;
            }
            catch (Exception)
            {

                throw;
            }
        }
        // PUT: api/Registro
        [HttpPut("Edit/{id}")]
        public async Task<IActionResult> Edit([FromRoute] int id, [FromBody] Registro registro)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != registro.Id)
            {
                return BadRequest();
            }

            _context.Entry(registro).State = EntityState.Modified;

            try
            {
                registro.ActualizacionAt = DateTime.UtcNow;
                _repo.Update(registro);
                var save = await _repo.SaveAsync(registro);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RegistroExistente(id))
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
        // DELETE: api/Registro
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var registro = await _context.Registro.FindAsync(id);
            if (registro == null)
            {
                return NotFound();
            }

            _repo.Delete(registro);
            var save = await _repo.SaveAsync(registro);

            return Ok(registro);
        }

        private bool RegistroExistente(int id)
        {
            return _context.Registro.Any(e => e.Id == id);
        }
    }
}
