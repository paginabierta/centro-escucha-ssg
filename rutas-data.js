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
    "hospital": "E.S.E. Hospital Luis Carlos Galán Sarmiento (607 725 8164 / 321 207 9761 / 311 471 4399)"
  },
  {
    "municipio": "Chima",
    "parroquia": "Inmaculada Concepción",
    "parroco": "Pbro. Helí Burgos Ortega",
    "telefono": "311 722 5868",
    "hospital": "E.S.E. Hospital San Roque de Chima (607 719 7258 / 317 643 8291)"
  },
  {
    "municipio": "Cincelada",
    "parroquia": "Ntra. Sra. de los Dolores",
    "parroco": "P. Albeiro Cordero Figueroa",
    "telefono": "322 749 6684",
    "hospital": "Centro de Salud Cincelada (IPS Coromoro) (311 513 6728)"
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
    "hospital": "E.S.E. Sanatorio de Contratación (607 717 1100 / 607 717 1200 / 323 484 6546)"
  },
  {
    "municipio": "Curití",
    "parroquia": "San Joaquín",
    "parroco": "Pbro. Juan Ignacio Macías Plata",
    "telefono": "312 433 6976",
    "hospital": "E.S.E. Hospital Integrado San Roque (607 718 7418 / 312 587 4372)"
  },
  {
    "municipio": "El Guacamayo",
    "parroquia": "San Juan Bautista",
    "parroco": "Pbro. Omar Fabián Carreño Díaz",
    "telefono": "312 384 1158",
    "hospital": "E.S.E. Centro de Salud Juan Soleri (313 850 1609 / 312 422 1666)"
  },
  {
    "municipio": "Encino",
    "parroquia": "Inmaculada Concepción",
    "parroco": "Pbro. José Luis Madero",
    "telefono": "314 419 8890",
    "hospital": "E.S.E. Centro de Salud Encino (321 372 2951 / 321 372 5301)"
  },
  {
    "municipio": "El Palmar",
    "parroquia": "Ntra. Sra. de los Dolores",
    "parroco": "Pbro. José Ricardo Ballén Vanegas",
    "telefono": "314 233 8011",
    "hospital": "E.S.E. Centro de Salud Andrés Cala Pimentel (310 265 5083)"
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
    "telefono": "312 382 1195",
    "hospital": "E.S.E. Hospital San Juan de Dios (607 721 9321)"
  },
  {
    "municipio": "Gámbita",
    "parroquia": "Santa Bárbara",
    "parroco": "Pbro. Luis Morales Suárez",
    "telefono": "320 493 0812",
    "hospital": "E.S.E. Centro de Salud Gámbita (607 745 3932)"
  },
  {
    "municipio": "Guadalupe",
    "parroquia": "Ntra. Sra. de Guadalupe",
    "parroco": "Pbro. Juan Camilo Mejía Carreño",
    "telefono": "313 387 5214",
    "hospital": "E.S.E. Hospital Nuestra Señora de Guadalupe (601 718 0024 / 311 529 5447 / 311 442 9801)"
  },
  {
    "municipio": "Guane (corr. de Barichara)",
    "parroquia": "San Isidro",
    "parroco": "Pbro. Alcides González Porras",
    "telefono": "318 806 9880",
    "hospital": "Puesto de Salud Guane (E.S.E. Hosp. San Juan de Dios Barichara) (607 726 7400)"
  },
  {
    "municipio": "Guapotá",
    "parroquia": "San Cayetano",
    "parroco": "Pbro. Ricardo Vargas Vargas",
    "telefono": "314 365 7210",
    "hospital": "E.S.E. Centro de Salud San Cayetano (607 729 6207)"
  },
  {
    "municipio": "Hato",
    "parroquia": "Inmaculada Concepción",
    "parroco": "Pbro. José Alexis Carreño Silva",
    "telefono": "311 812 5092",
    "hospital": "E.S.E. Centro de Salud San Cayetano (Atención coordinada con alcaldía local)"
  },
  {
    "municipio": "Jordán Sube",
    "parroquia": "San José",
    "parroco": "Pbro. Diego Fernando Benavides Aparicio",
    "telefono": "312 330 3695",
    "hospital": "Puesto de Salud Jordán Sube (Red Común / Aratoca) (607 726 6514)"
  },
  {
    "municipio": "La Palma (corr. de Gámbita)",
    "parroquia": "Ntra. Sra. de Fátima",
    "parroco": "Pbro. Pedro Samuel León Amaya",
    "telefono": "320 493 0812",
    "hospital": "Puesto de Salud La Palma (E.S.E. C.S. Gámbita) (607 745 3932)"
  },
  {
    "municipio": "La Fuente",
    "parroquia": "Sagrado Corazón de Jesús",
    "parroco": "Pbro. Rafael Ricardo Carreño Ballesteros",
    "telefono": "312 435 6012",
    "hospital": "Puesto de Salud La Fuente (E.S.E. Hosp. La Merced) (607 625 2255)"
  },
  {
    "municipio": "Mogotes",
    "parroquia": "Santa Bárbara",
    "parroco": "Pbro. Juan de Jesús Estévez V.",
    "telefono": "311 254 9812",
    "hospital": "E.S.E. Hospital San Pedro Claver (316 693 3794)"
  },
  {
    "municipio": "Ocamonte",
    "parroquia": "San Vicente Ferrer",
    "parroco": "Pbro. José Antonio Almeida",
    "telefono": "311 593 9373",
    "hospital": "E.S.E. Centro de Salud Ocamonte (311 475 1663 / 310 860 3635)"
  },
  {
    "municipio": "Oiba",
    "parroquia": "San Miguel Arcángel",
    "parroco": "Pbro. Luis Alberto Rivera Hernández",
    "telefono": "313 488 1118",
    "hospital": "E.S.E. Hospital San Rafael (607 717 3066 / 607 717 3211)"
  },
  {
    "municipio": "Olival (corr. de Suaita)",
    "parroquia": "San Rafael Arcángel",
    "parroco": "Pbro. Wilman Enrique Barragán Flórez",
    "telefono": "304 554 2080",
    "hospital": "Puesto de Salud Olival (E.S.E. Caicedo y Flórez) (312 378 3300 / 321 477 0856)"
  },
  {
    "municipio": "Onzaga",
    "parroquia": "Inmaculada Concepción",
    "parroco": "Pbro. Ciprián Cáceres Velandia",
    "telefono": "320 866 0059",
    "hospital": "E.S.E. Hospital Integrado de Onzaga (320 833 7237 / 310 487 2465)"
  },
  {
    "municipio": "Palmas del Socorro",
    "parroquia": "Inmaculada Concepción",
    "parroco": "Pbro. Luis Alcides Higuera Tamayo",
    "telefono": "316 581 0636",
    "hospital": "Nodo Puesto de Salud Palmas (E.S.E. Manuela Beltrán) (316 379 4444 / 607 727 4000 Ext. 9)"
  },
  {
    "municipio": "Páramo",
    "parroquia": "Ntra. Sra. del Rosario de Chiquinquirá",
    "parroco": "Pbro. Eduardo Bohórquez Orduz",
    "telefono": "320 853 5085",
    "hospital": "E.S.E. Centro de Salud Páramo (725 8920)"
  },
  {
    "municipio": "Pinchote",
    "parroquia": "San Antonio de Padua",
    "parroco": "Pbro. Eliécer Delgado Pico",
    "telefono": "314 435 8002",
    "hospital": "IPS Centro de Salud San Antonio de Padua (313 893 5209 / 607 724 7197)"
  },
  {
    "municipio": "Pitiguao",
    "parroquia": "Santo Cura de Ars",
    "parroco": "Pbro. Fabián Aníbal López Castillo",
    "telefono": "316 693 3794",
    "hospital": "Puesto de Salud Mogotes / San Gil (Red de referencia) (607 724 9800)"
  },
  {
    "municipio": "Riachuelo (corr. de Charalá)",
    "parroquia": "Ntra. Sra. del Rosario",
    "parroco": "Pbro. Víctor Alfonso Fonseca Hernández",
    "telefono": "302 280 4330",
    "hospital": "Puesto de Salud Riachuelo (E.S.E. Hosp. Charalá) (321 207 9761 / 311 471 4399)"
  },
  {
    "municipio": "San Gil",
    "parroquia": "10 parroquias (ver detalle)",
    "parroco": "Contacto coordinador — Pendiente definir",
    "telefono": "Por definir",
    "hospital": "E.S.E. Hospital Regional de San Gil (724 9800)"
  },
  {
    "municipio": "San Joaquín",
    "parroquia": "San Joaquín",
    "parroco": "Pbro. Hugo Fernando Díaz",
    "telefono": "311 284 1059",
    "hospital": "E.S.E. Centro de Salud San Joaquín (607 724 9800)"
  },
  {
    "municipio": "San José de Suaita",
    "parroquia": "San José de Suaita",
    "parroco": "Pbro. Jesús Aurelio Gómez",
    "telefono": "Pendiente",
    "hospital": "Puesto de Salud San José de Suaita (E.S.E. Caicedo y Flórez) (312 378 3300 / 321 477 0856)"
  },
  {
    "municipio": "Simacota",
    "parroquia": "Santa Bárbara",
    "parroco": "Pbro. Alfonso Muñoz Muñoz",
    "telefono": "313 392 8104",
    "hospital": "E.S.E. Hospital Integrado San Roque (312 587 4367 / 350 295 6389)"
  },
  {
    "municipio": "Suaita",
    "parroquia": "Ntra. Sra. de la Candelaria",
    "parroco": "Pbro. Hernando Pimiento Mantilla",
    "telefono": "311 892 4012",
    "hospital": "E.S.E. Hospital Caicedo y Flórez (312 378 3300 / 321 477 0856)"
  },
  {
    "municipio": "Vado Real (corr. de Suaita)",
    "parroquia": "San Pedro Apóstol",
    "parroco": "Pbro. Herwin D. Almeida",
    "telefono": "323 233 0772",
    "hospital": "Puesto de Salud Vado Real (E.S.E. Hosp. Caicedo y Flórez) (312 378 3300 / 321 477 0856)"
  },
  {
    "municipio": "Valle de San José",
    "parroquia": "Ntra. Sra. de la Purificación",
    "parroco": "Pbro. Isaías Silva Cárdenas",
    "telefono": "312 481 0293",
    "hospital": "E.S.E. Centro de Salud Valle de San José (607 724 9800)"
  },
  {
    "municipio": "Villanueva",
    "parroquia": "San Luis Gonzaga",
    "parroco": "Pbro. Miguel Ángel Jerez Cifuentes",
    "telefono": "314 362 9015",
    "hospital": "E.S.E. Centro de Salud Camilo Rueda (316 830 4338 / 320 886 5606)"
  },
  {
    "municipio": "Zapatoca",
    "parroquia": "San Joaquín",
    "parroco": "Pbro. Ángel de Jesús Fonseca Useda",
    "telefono": "(607) 625 2102 / 313 812 4091",
    "hospital": "E.S.E. Hospital Integrado La Merced Zapatoca (625 2255) — Provincia Metropolitana"
  }
];

export default RUTAS_SEED;
