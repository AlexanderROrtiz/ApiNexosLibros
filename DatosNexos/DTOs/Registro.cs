using System;
using System.Collections.Generic;
using System.Text;

namespace DatosNexos.DTOs
{
    public class Registro
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Direccion { get; set; }
        public string Telefono { get; set; }
        public string Correo { get; set; }
        public int librosMaximosRegistrados { get; set; }
        public DateTime CreacionAt { get; set; }
        public DateTime ActualizacionAt { get; set; }
    }
}
