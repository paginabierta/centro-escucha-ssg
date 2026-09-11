const RUTAS_SEED = [
  {
    "municipio": "Aratoca",
    "parroquia": "Ntra. Sra. de las Nieves",
    "parroco": "Pbro. Gerardo Calderón Velandia",
    "telefono": "726 6508 / 312 330 3695",
    "hospital": "E.S.E. Hospital Juan Pablo II, Av. El Ramal (726 6514)"
  },
  {
    "municipio": "Barichara",
    "parroquia": "Inmaculada Concepción",
    "parroco": "Pbro. Alirio Ardila Buenahora",
    "telefono": "318 806 9880",
    "hospital": "E.S.E. Hospital San Juan de Dios, Cra 2 #3-90 (726 7400)"
  },
  {
    "municipio": "Cabrera",
    "parroquia": "Inmaculada Concepción",
    "parroco": "Pbro. Fernando León Cáceres",
    "telefono": "321 994 0296",
    "hospital": "E.S.E. C. Salud San Pedro de Cabrera (310 295 1446)"
  },
  {
    "municipio": "Charalá",
    "parroquia": "Ntra. Sra. de Monguí",
    "parroco": "P. Pedro José García Puentes",
    "telefono": "725 8164 / 313 829 2956",
    "hospital": "Pendiente"
  },
  {
    "municipio": "Chima",
    "parroquia": "Inmaculada Concepción",
    "parroco": "Pbro. Helí Burgos Ortega",
    "telefono": "311 722 5868",
    "hospital": "Pendiente"
  },
  {
    "municipio": "Cincelada",
    "parroquia": "Ntra. Sra. de los Dolores",
    "parroco": "P. Albeiro Cordero Figueroa",
    "telefono": "322 749 6684",
    "hospital": "Pendiente"
  },
  {
    "municipio": "Confines",
    "parroquia": "Ntra. Sra. de Chiquinquirá",
    "parroco": "Pbro. José Manuel Pinzón Vega",
    "telefono": "310 316 1651",
    "hospital": "IPS C. Salud San Cayetano de Confines (724 8743)"
  },
  {
    "municipio": "Coromoro",
    "parroquia": "Ntra. Sra. de las Mercedes",
    "parroco": "Pbro. Yeison Saul Barragán",
    "telefono": "312 582 6995",
    "hospital": "IPS C. Salud Municipio Coromoro (724 7491)"
  },
  {
    "municipio": "Contratación",
    "parroquia": "María Auxiliadora",
    "parroco": "Pbro. Cristian Julio Sánchez Moreno, SDB",
    "telefono": "310 226 2769",
    "hospital": "Pendiente"
  },
  {
    "municipio": "Curití",
    "parroquia": "San Joaquín",
    "parroco": "Pbro. Juan Ignacio Macías Plata",
    "telefono": "Pendiente",
    "hospital": "Pendiente"
  },
  {
    "municipio": "El Guacamayo",
    "parroquia": "San Juan Bautista",
    "parroco": "Pbro. Omar Fabián Carreño Díaz",
    "telefono": "Pendiente",
    "hospital": "Pendiente"
  },
  {
    "municipio": "Encino",
    "parroquia": "Inmaculada Concepción",
    "parroco": "Pendiente (no figura en directorio)",
    "telefono": "Pendiente",
    "hospital": "Pendiente"
  },
  {
    "municipio": "El Palmar",
    "parroquia": "Ntra. Sra. de los Dolores",
    "parroco": "Pbro. José Ricardo Ballén Vanegas",
    "telefono": "Pendiente",
    "hospital": "Pendiente"
  },
  {
    "municipio": "El Socorro",
    "parroquia": "Chiquinquirá / Concatedral / Sta. Bárbara / Mª Auxiliadora",
    "parroco": "Chiq.: P. Cristyan Gómez Chacón; Concated.: P. Juan C. Hernández Pinzón (Vic. Gral.); Sta.Bárb.: P. Luis Osney Gómez; Mª Aux.: P. Fredy Aparicio Reyes",
    "telefono": "Pendiente",
    "hospital": "E.S.E. Hospital Regional Manuela Beltrán (727 4000)"
  },
  {
    "municipio": "Galán",
    "parroquia": "San José",
    "parroco": "Pbro. Luis Fernando Alarcón Rodríguez",
    "telefono": "Pendiente",
    "hospital": "Pendiente"
  },
  {
    "municipio": "Gámbita",
    "parroquia": "Santa Bárbara",
    "parroco": "Pbro. Luis Morales Suárez",
    "telefono": "Pendiente",
    "hospital": "Pendiente"
  },
  {
    "municipio": "Guadalupe",
    "parroquia": "Ntra. Sra. de Guadalupe",
    "parroco": "Pbro. Juan Camilo Mejía Carreño",
    "telefono": "Pendiente",
    "hospital": "Pendiente"
  },
  {
    "municipio": "Guane (corr. de Barichara)",
    "parroquia": "San Isidro",
    "parroco": "Pbro. Alcides González Porras",
    "telefono": "Pendiente",
    "hospital": "= Barichara"
  },
  {
    "municipio": "Guapotá",
    "parroquia": "San Cayetano",
    "parroco": "Pbro. Ricardo Vargas Vargas",
    "telefono": "Pendiente",
    "hospital": "Pendiente"
  },
  {
    "municipio": "Hato",
    "parroquia": "Inmaculada Concepción",
    "parroco": "Pbro. José Alexis Carreño Silva",
    "telefono": "Pendiente",
    "hospital": "Pendiente"
  },
  {
    "municipio": "Jordán Sube",
    "parroquia": "San José",
    "parroco": "Pbro. Diego Fernando Benavides Aparicio",
    "telefono": "Pendiente",
    "hospital": "Pendiente"
  },
  {
    "municipio": "La Palma (corr. de Gámbita)",
    "parroquia": "Ntra. Sra. de Fátima",
    "parroco": "Pbro. Pedro Samuel León Amaya",
    "telefono": "Pendiente",
    "hospital": "= Gámbita"
  },
  {
    "municipio": "La Fuente",
    "parroquia": "Sagrado Corazón de Jesús",
    "parroco": "Pbro. Rafael Ricardo Carreño Ballesteros",
    "telefono": "Pendiente",
    "hospital": "Pendiente"
  },
  {
    "municipio": "Mogotes",
    "parroquia": "Santa Bárbara",
    "parroco": "Pbro. Álvaro Romero Rueda",
    "telefono": "Pendiente",
    "hospital": "Pendiente"
  },
  {
    "municipio": "Ocamonte",
    "parroquia": "San Vicente Ferrer",
    "parroco": "Pbro. José Antonio Almeida",
    "telefono": "Pendiente",
    "hospital": "Pendiente"
  },
  {
    "municipio": "Oiba",
    "parroquia": "San Miguel Arcángel",
    "parroco": "Pbro. Luis Alberto Rivera Hernández",
    "telefono": "Pendiente",
    "hospital": "Pendiente"
  },
  {
    "municipio": "Olival (corr. de Suaita)",
    "parroquia": "San Rafael Arcángel",
    "parroco": "Pbro. Wilman Enrique Barragán Flórez",
    "telefono": "Pendiente",
    "hospital": "= Suaita"
  },
  {
    "municipio": "Onzaga",
    "parroquia": "Inmaculada Concepción",
    "parroco": "Pbro. Ciprián Cáceres Velandia",
    "telefono": "Pendiente",
    "hospital": "Pendiente"
  },
  {
    "municipio": "Palmas del Socorro",
    "parroquia": "Inmaculada Concepción",
    "parroco": "Pbro. Luis Alcides Higuera Tamayo",
    "telefono": "Pendiente",
    "hospital": "Pendiente"
  },
  {
    "municipio": "Páramo",
    "parroquia": "Ntra. Sra. del Rosario de Chiquinquirá",
    "parroco": "Pbro. Eduardo Bohórquez Orduz",
    "telefono": "Pendiente",
    "hospital": "E.S.E. Centro de Salud Páramo (725 8920)"
  },
  {
    "municipio": "Pinchote",
    "parroquia": "San Antonio de Padua",
    "parroco": "Pbro. Eliécer Delgado Pico",
    "telefono": "Pendiente",
    "hospital": "Pendiente"
  },
  {
    "municipio": "Pitiguao",
    "parroquia": "Santo Cura de Ars",
    "parroco": "Pbro. Fabián Aníbal López Castillo",
    "telefono": "Pendiente",
    "hospital": "Pendiente"
  },
  {
    "municipio": "Riachuelo (corr. de Charalá)",
    "parroquia": "Ntra. Sra. del Rosario",
    "parroco": "Pbro. Víctor Alfonso Fonseca Hernández",
    "telefono": "Pendiente",
    "hospital": "= Charalá"
  },
  {
    "municipio": "San Gil",
    "parroquia": "10 parroquias (ver nota)",
    "parroco": "Contacto coordinador — Pendiente definir",
    "telefono": "Pendiente",
    "hospital": "E.S.E. Hospital Regional de San Gil (724 9800)"
  },
  {
    "municipio": "San Joaquín",
    "parroquia": "San Joaquín",
    "parroco": "Pendiente (no figura en directorio)",
    "telefono": "Pendiente",
    "hospital": "Pendiente"
  },
  {
    "municipio": "San José de Suaita",
    "parroquia": "San José de Suaita",
    "parroco": "Pbro. Richard Chaparro Afanador",
    "telefono": "Pendiente",
    "hospital": "Pendiente"
  },
  {
    "municipio": "Simacota",
    "parroquia": "Santa Bárbara",
    "parroco": "Pbro. Alfonso Muñoz Muñoz",
    "telefono": "Pendiente",
    "hospital": "Pendiente"
  },
  {
    "municipio": "Suaita",
    "parroquia": "Ntra. Sra. de la Candelaria",
    "parroco": "Pbro. Hernando Pimiento Mantilla",
    "telefono": "Pendiente",
    "hospital": "Pendiente"
  },
  {
    "municipio": "Vado Real (corr. de Suaita)",
    "parroquia": "San Pedro Apóstol",
    "parroco": "(Parroquia propia de Herwin)",
    "telefono": "Pendiente",
    "hospital": "Pendiente (= Suaita)"
  },
  {
    "municipio": "Valle de San José",
    "parroquia": "Ntra. Sra. de la Purificación",
    "parroco": "Pbro. Isaías Silva Cárdenas",
    "telefono": "Pendiente",
    "hospital": "Pendiente"
  },
  {
    "municipio": "Villanueva",
    "parroquia": "San Luis Gonzaga",
    "parroco": "Pbro. Miguel Ángel Jerez Cifuentes",
    "telefono": "Pendiente",
    "hospital": "Pendiente"
  },
  {
    "municipio": "Zapatoca",
    "parroquia": "San Joaquín",
    "parroco": "Pbro. Ángel de Jesús Fonseca Useda",
    "telefono": "Pendiente",
    "hospital": "E.S.E. Hospital Integrado La Merced Zapatoca (625 2255) — Provincia Metropolitana"
  }
];

export default RUTAS_SEED;
