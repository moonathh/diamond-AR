/* =========================================================
   DATOS DE EQUIPOS — Liga Nacional MLB
   =========================================================
   Aquí vive TODO el contenido que cambia según el logo
   escaneado. Las pantallas (Historia, Video, Stats, Galería)
   NO tienen texto fijo: lo leen de aquí en tiempo real.

   Para agregar un equipo nuevo:
   1. Copia el bloque "dodgers" completo.
   2. Cambia la llave ('dodgers' -> 'giants', etc.) y los datos.
   3. Agrega su id en TEAM_BY_TARGET_INDEX en el índice que le
      corresponda dentro de tu nuevo targets.mind.
   ========================================================= */

const TEAMS_DATA = {

  dodgers: {
    id: 'dodgers',
    nombre: 'Los Angeles Dodgers',
    corto: 'Dodgers',
    colorPrimario: '#005A9C',
    colorAcento: '#EF3E42',
    icono: '⚾',

    historia: {
      resumen: 'Texto pendiente: resumen corto de la historia del equipo (2-3 líneas).',
      hitos: [
        { anio: '1883', texto: 'Hito pendiente de reemplazar con historia real del equipo.' },
        { anio: '1958', texto: 'Hito pendiente de reemplazar con historia real del equipo.' },
        { anio: '2020', texto: 'Hito pendiente de reemplazar con historia real del equipo.' }
      ]
    },

    videos: [
      { titulo: 'Video pendiente 1', duracion: '0:00' },
      { titulo: 'Video pendiente 2', duracion: '0:00' },
      { titulo: 'Video pendiente 3', duracion: '0:00' }
    ],

    // Se conectará a la API de MLB en el siguiente paso del roadmap
    stats: [
      { nombre: 'Victorias', valor: '--', pct: 0 },
      { nombre: 'Derrotas', valor: '--', pct: 0 },
      { nombre: 'Posición en la división', valor: '--', pct: 0 }
    ],

    // Se llenará con las 15 preguntas en el siguiente paso
    trivia: [],

    // Se llenará con la lista de premios en el siguiente paso
    premios: []
  }

  // 👉 Aquí van los otros 14 equipos de la Liga Nacional,
  //    siguiendo exactamente la misma estructura de "dodgers".

};

/* =========================================================
   HISTORIA DE LA LIGA NACIONAL
   =========================================================
   Esta es compartida por los 15 equipos (no se repite por
   equipo), tal como la pediste: "historia del equipo
   e historia de la liga".
   ========================================================= */

const LIGA_NACIONAL_HISTORIA = {
  resumen: 'Texto pendiente: resumen corto de la historia de la Liga Nacional.',
  hitos: [
    { anio: '1876', texto: 'Fundación de la Liga Nacional (texto pendiente de completar).' },
    { anio: '1900s', texto: 'Hito pendiente de reemplazar con historia real de la liga.' }
  ]
};

/* =========================================================
   MAPEO targetIndex -> equipo
   =========================================================
   El índice debe coincidir EXACTAMENTE con el orden en que
   compilaste las imágenes/objetos dentro de targets.mind.
   Por ahora solo existe 1 target compilado (índice 0), por
   eso solo hay una línea activa.
   ========================================================= */

const TEAM_BY_TARGET_INDEX = [
  'dodgers',     // targetIndex 0
  'braves',      // targetIndex 1
  'marlins',     // targetIndex 2
  'mets',        // targetIndex 3
  'phillies',    // targetIndex 4
  'nationals',   // targetIndex 5
  'cubs',        // targetIndex 6
  'reds',        // targetIndex 7
  'brewers',     // targetIndex 8
  'pirates',     // targetIndex 9
  'cardinals',   // targetIndex 10
  'dbacks',      // targetIndex 11
  'rockies',     // targetIndex 12
  'padres',      // targetIndex 13
  'giants'       // targetIndex 14
];

/* Equipo actualmente detectado por la cámara (null = ninguno) */
let currentTeamId = null;