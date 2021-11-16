using System;
using System.Collections.Generic;
using System.Text;

namespace DatosNexos.DTOs
{
    public class Autor
    {
        public int Id { get; set; }
        public string NombreCompleto { get; set; }
        public string FechaNacimiento { get; set; }
        public string CiudadProcedencia { get; set; }
        public string Correo { get; set; }
        public DateTime CreacionAt { get; set; }
        public DateTime ActualizacionAt { get; set; }
    }
}
