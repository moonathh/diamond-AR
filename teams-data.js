/* =========================================================
   DATOS DE EQUIPOS — Liga Nacional MLB
   =========================================================
   Aquí vive TODO el contenido que cambia según el logo
   escaneado. Las pantallas (Historia, Video, Stats, Galería)
   NO tienen texto fijo: lo leen de aquí en tiempo real.

   Para editar el contenido de un equipo: busca su "id" en
   TEAM_LIST y reemplaza los textos placeholder. No necesitas
   tocar nada más abajo (TEAMS_DATA se genera solo).
   ========================================================= */

const TEAM_LIST = [
  { id: 'dodgers',   nombre: 'Los Angeles Dodgers',      corto: 'Dodgers',   colorPrimario: '#005A9C', colorAcento: '#EF3E42', icono: '⚾', modelo: 'assets/pelota.glb' },
  { id: 'braves',    nombre: 'Atlanta Braves',           corto: 'Braves',    colorPrimario: '#CE1141', colorAcento: '#13274F', icono: '⚾' },
  { id: 'marlins',   nombre: 'Miami Marlins',            corto: 'Marlins',   colorPrimario: '#00A3E0', colorAcento: '#EF3340', icono: '⚾' },
  { id: 'mets',      nombre: 'New York Mets',            corto: 'Mets',      colorPrimario: '#002D72', colorAcento: '#FF5910', icono: '⚾' },
  { id: 'phillies',  nombre: 'Philadelphia Phillies',    corto: 'Phillies',  colorPrimario: '#E81828', colorAcento: '#002D72', icono: '⚾' },
  { id: 'nationals', nombre: 'Washington Nationals',     corto: 'Nationals', colorPrimario: '#AB0003', colorAcento: '#14225A', icono: '⚾' },
  { id: 'cubs',      nombre: 'Chicago Cubs',             corto: 'Cubs',      colorPrimario: '#0E3386', colorAcento: '#CC3433', icono: '⚾' },
  { id: 'reds',      nombre: 'Cincinnati Reds',          corto: 'Reds',      colorPrimario: '#C6011F', colorAcento: '#000000', icono: '⚾' },
  { id: 'brewers',   nombre: 'Milwaukee Brewers',        corto: 'Brewers',   colorPrimario: '#12284B', colorAcento: '#FFC52F', icono: '⚾' },
  { id: 'pirates',   nombre: 'Pittsburgh Pirates',       corto: 'Pirates',   colorPrimario: '#FDB827', colorAcento: '#27251F', icono: '⚾' },
  { id: 'cardinals', nombre: 'St. Louis Cardinals',      corto: 'Cardinals', colorPrimario: '#C41E3A', colorAcento: '#0C2340', icono: '⚾' },
  { id: 'dbacks',    nombre: 'Arizona Diamondbacks',     corto: 'D-backs',   colorPrimario: '#A71930', colorAcento: '#000000', icono: '⚾' },
  { id: 'rockies',   nombre: 'Colorado Rockies',         corto: 'Rockies',   colorPrimario: '#333366', colorAcento: '#C4CED4', icono: '⚾' },
  { id: 'padres',    nombre: 'San Diego Padres',         corto: 'Padres',    colorPrimario: '#2F241D', colorAcento: '#FFC425', icono: '⚾' },
  { id: 'giants',    nombre: 'San Francisco Giants',     corto: 'Giants',    colorPrimario: '#FD5A1E', colorAcento: '#27251F', icono: '⚾' }
];

/* =========================================================
   GENERAR TEAMS_DATA A PARTIR DE TEAM_LIST
   ========================================================= */

const TEAMS_DATA = {};

TEAM_LIST.forEach((t) => {
  TEAMS_DATA[t.id] = {
    id: t.id,
    nombre: t.nombre,
    corto: t.corto,
    colorPrimario: t.colorPrimario,
    colorAcento: t.colorAcento,
    icono: t.icono,
    modelo: t.modelo || 'assets/pelota.glb',

    historia: {
      resumen: 'Texto pendiente: resumen corto de la historia de ' + t.corto + '.',
      hitos: [
        { anio: '19XX', texto: 'Hito pendiente de reemplazar con historia real de ' + t.corto + '.' },
        { anio: '20XX', texto: 'Hito pendiente de reemplazar con historia real de ' + t.corto + '.' }
      ]
    },

    videos: [
      { titulo: 'Video pendiente 1 de ' + t.corto, duracion: '0:00' },
      { titulo: 'Video pendiente 2 de ' + t.corto, duracion: '0:00' }
    ],

    stats: [
      { nombre: 'Victorias', valor: '--', pct: 0 },
      { nombre: 'Derrotas', valor: '--', pct: 0 },
      { nombre: 'Posición en la división', valor: '--', pct: 0 }
    ],

    trivia: [],
    premios: []
  };
});

/* =========================================================
   HISTORIA DE LA LIGA NACIONAL (compartida por los 15 equipos)
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