USE [LibrosNexos]
GO
/****** Object:  Table [dbo].[Autor]    Script Date: 16/11/2021 0:55:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Autor](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[NombreCompleto] [nvarchar](max) NULL,
	[FechaNacimiento] [nvarchar](max) NULL,
	[CiudadProcedencia] [nvarchar](200) NULL,
	[Correo] [nvarchar](100) NULL,
	[CreacionAt] [datetime2](7) NULL,
	[ActualizacionAt] [datetime2](7) NULL,
 CONSTRAINT [PK_Autor] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Libro]    Script Date: 16/11/2021 0:55:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Libro](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Titulo] [nvarchar](max) NULL,
	[Anio] [nvarchar](200) NULL,
	[Genero] [nvarchar](max) NULL,
	[RegistroId] [int] NOT NULL,
	[AutorId] [int] NOT NULL,
	[NumeroPaginas] [int] NULL,
	[CreacionAt] [datetime2](7) NULL,
	[ActualizacionAt] [datetime2](7) NULL,
 CONSTRAINT [PK_Libros] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Registro]    Script Date: 16/11/2021 0:55:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Registro](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](max) NULL,
	[Direccion] [nvarchar](max) NULL,
	[Telefono] [nvarchar](max) NULL,
	[Correo] [nvarchar](max) NULL,
	[librosMaximosRegistrados] [int] NOT NULL,
	[CreacionAt] [datetime2](7) NOT NULL,
	[ActualizacionAt] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Registro] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
