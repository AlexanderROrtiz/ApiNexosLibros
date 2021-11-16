using System;
using System.Collections.Generic;
using System.Text;

namespace DatosNexos.DTOs
{
    public class Libro
    {
		public int Id { get; set; }
		public string Anio { get; set; }
		public string Titulo { get; set; }
		public string Genero { get; set; }
		public int NumeroPaginas { get; set; }
		public int RegistroId { get; set; }
		public Registro Registro { get; set; }
		public int AutorId { get; set; }
		public Autor Autor { get; set; }
		public DateTime CreacionAt { get; set; }
		public DateTime ActualizacionAt { get; set; }
	}
}
