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



const TEAM_TRIVIA = {

  dodgers: [
    { pregunta: '¿En qué ciudad jugaban los Dodgers antes de mudarse a Los Ángeles?', opciones: ['Brooklyn', 'Boston', 'Baltimore', 'Newark'], correcta: 0 },
    { pregunta: '¿En qué año se mudaron los Dodgers a Los Ángeles?', opciones: ['1947', '1958', '1965', '1981'], correcta: 1 },
    { pregunta: '¿Cómo se llama el estadio actual de los Dodgers?', opciones: ['Angel Stadium', 'Oracle Park', 'Dodger Stadium', 'Petco Park'], correcta: 2 },
    { pregunta: '¿Qué jugador de los Dodgers rompió la barrera racial del béisbol en 1947?', opciones: ['Jackie Robinson', 'Willie Mays', 'Hank Aaron', 'Roy Campanella'], correcta: 0 },
    { pregunta: '¿Qué número se retiró en todo el béisbol en honor a Jackie Robinson?', opciones: ['24', '42', '7', '99'], correcta: 1 },
    { pregunta: '¿Qué lanzador de los Dodgers lanzó un juego perfecto en 1965?', opciones: ['Don Drysdale', 'Sandy Koufax', 'Clayton Kershaw', 'Fernando Valenzuela'], correcta: 1 },
    { pregunta: '¿En qué año ganaron los Dodgers la Serie Mundial en una temporada acortada por la pandemia?', opciones: ['2018', '2019', '2020', '2022'], correcta: 2 },
    { pregunta: '¿Cuál es el rival histórico de los Dodgers en la misma división?', opciones: ['New York Yankees', 'San Francisco Giants', 'Boston Red Sox', 'Chicago Cubs'], correcta: 1 },
    { pregunta: '¿De qué color principal es el uniforme de los Dodgers?', opciones: ['Rojo', 'Verde', 'Azul', 'Morado'], correcta: 2 },
    { pregunta: '¿En qué división de la MLB juegan los Dodgers?', opciones: ['NL Este', 'NL Central', 'NL Oeste', 'AL Oeste'], correcta: 2 }
  ],

  braves: [
    { pregunta: '¿En qué dos ciudades jugaron los Braves antes de llegar a Atlanta?', opciones: ['Boston y Milwaukee', 'Chicago y Detroit', 'Nueva York y Filadelfia', 'Cincinnati y St. Louis'], correcta: 0 },
    { pregunta: '¿En qué año se mudaron los Braves a Atlanta?', opciones: ['1958', '1966', '1974', '1991'], correcta: 1 },
    { pregunta: '¿Cómo se llama el estadio actual de los Braves?', opciones: ['Truist Park', 'Nationals Park', 'Citi Field', 'Great American Ball Park'], correcta: 0 },
    { pregunta: '¿Qué leyenda de los Braves bateó 755 jonrones en su carrera?', opciones: ['Willie Mays', 'Hank Aaron', 'Chipper Jones', 'Dale Murphy'], correcta: 1 },
    { pregunta: '¿En qué año ganaron los Braves su título de Serie Mundial más reciente?', opciones: ['1995', '2005', '2014', '2021'], correcta: 3 },
    { pregunta: '¿En qué división de la MLB juegan los Braves?', opciones: ['NL Este', 'NL Central', 'NL Oeste', 'AL Este'], correcta: 0 },
    { pregunta: '¿De qué colores es el uniforme principal de los Braves?', opciones: ['Verde y amarillo', 'Rojo y azul marino', 'Negro y naranja', 'Morado y gris'], correcta: 1 },
    { pregunta: '¿Cuál de estos equipos es rival divisional de los Braves?', opciones: ['New York Mets', 'Houston Astros', 'Texas Rangers', 'Seattle Mariners'], correcta: 0 },
    { pregunta: '¿En qué ciudad juegan actualmente los Braves?', opciones: ['Atlanta', 'Miami', 'Charlotte', 'Nashville'], correcta: 0 },
    { pregunta: '¿Cómo se conoce coloquialmente a los Atlanta Braves?', opciones: ['Los Bravos', 'Los Gigantes', 'Los Cardenales', 'Los Piratas'], correcta: 0 }
  ],

  marlins: [
    { pregunta: '¿En qué año se fundaron los Marlins como equipo de expansión?', opciones: ['1989', '1993', '1998', '2001'], correcta: 1 },
    { pregunta: '¿Cómo se llamaba el equipo antes de ser "Miami Marlins"?', opciones: ['South Florida Marlins', 'Florida Marlins', 'Tampa Marlins', 'Everglades Marlins'], correcta: 1 },
    { pregunta: '¿En qué año cambiaron su nombre a "Miami Marlins"?', opciones: ['2008', '2010', '2012', '2015'], correcta: 2 },
    { pregunta: '¿Cuántas Series Mundiales han ganado los Marlins (1997 y 2003)?', opciones: ['0', '1', '2', '3'], correcta: 2 },
    { pregunta: '¿Cómo se llama el estadio actual de los Marlins?', opciones: ['loanDepot Park', 'Tropicana Field', 'Truist Park', 'Globe Life Field'], correcta: 0 },
    { pregunta: '¿Qué elemento curioso tenía el estadio de los Marlins detrás del plato?', opciones: ['Una piscina', 'Un acuario', 'Una cascada', 'Un jardín'], correcta: 1 },
    { pregunta: '¿En qué división de la MLB juegan los Marlins?', opciones: ['NL Este', 'NL Central', 'NL Oeste', 'AL Este'], correcta: 0 },
    { pregunta: '¿Cuál es el nombre de la mascota oficial de los Marlins?', opciones: ['Billy the Marlin', 'Marlin Pete', 'Captain Fin', 'Finny'], correcta: 0 },
    { pregunta: '¿En qué ciudad juegan los Marlins?', opciones: ['Orlando', 'Tampa', 'Miami', 'Jacksonville'], correcta: 2 },
    { pregunta: '¿Qué colores identifican principalmente a los Marlins?', opciones: ['Negro, naranja y azul', 'Rojo y blanco', 'Verde y dorado', 'Morado y plata'], correcta: 0 }
  ],

  mets: [
    { pregunta: '¿En qué año se fundaron los Mets como equipo de expansión?', opciones: ['1958', '1962', '1969', '1973'], correcta: 1 },
    { pregunta: '¿Cómo se llama el estadio actual de los Mets?', opciones: ['Yankee Stadium', 'Citi Field', 'Shea Stadium', 'Fenway Park'], correcta: 1 },
    { pregunta: '¿Cómo se conoció al equipo campeón sorpresa de 1969?', opciones: ['Miracle Mets', 'Amazing Mets', 'Lucky Mets', 'Golden Mets'], correcta: 0 },
    { pregunta: '¿En qué año ganaron los Mets su segundo título de Serie Mundial?', opciones: ['1979', '1986', '1992', '2000'], correcta: 1 },
    { pregunta: '¿Cómo se llama la mascota oficial de los Mets?', opciones: ['Mr. Met', 'Mets Man', 'Shea Bear', 'Metsy'], correcta: 0 },
    { pregunta: '¿Cómo se llamaba el estadio de los Mets antes de Citi Field?', opciones: ['Ebbets Field', 'Polo Grounds', 'Shea Stadium', 'Yankee Stadium'], correcta: 2 },
    { pregunta: '¿En qué división de la MLB juegan los Mets?', opciones: ['NL Este', 'NL Central', 'NL Oeste', 'AL Este'], correcta: 0 },
    { pregunta: '¿Cuál es el rival de ciudad de los Mets?', opciones: ['New York Yankees', 'Boston Red Sox', 'Philadelphia Phillies', 'Baltimore Orioles'], correcta: 0 },
    { pregunta: '¿De qué colores son los uniformes de los Mets?', opciones: ['Azul y naranja', 'Rojo y negro', 'Verde y blanco', 'Morado y gris'], correcta: 0 },
    { pregunta: '¿En qué ciudad juegan los Mets?', opciones: ['Nueva York', 'Boston', 'Filadelfia', 'Baltimore'], correcta: 0 }
  ],

  phillies: [
    { pregunta: '¿En qué año se fundaron los Phillies (uno de los equipos más antiguos de la MLB)?', opciones: ['1869', '1883', '1901', '1912'], correcta: 1 },
    { pregunta: '¿Cómo se llama el estadio actual de los Phillies?', opciones: ['Citizens Bank Park', 'Nationals Park', 'Truist Park', 'Oriole Park'], correcta: 0 },
    { pregunta: '¿Qué número, retirado por los Phillies, usó la leyenda Mike Schmidt?', opciones: ['5', '20', '32', '44'], correcta: 1 },
    { pregunta: '¿En qué año ganaron los Phillies su título de Serie Mundial más reciente?', opciones: ['1980', '1993', '2008', '2013'], correcta: 2 },
    { pregunta: '¿Cómo se llama la peluda y famosa mascota de los Phillies?', opciones: ['Phillie Phanatic', 'Phil the Eagle', 'Benny Bell', 'Freddy Phils'], correcta: 0 },
    { pregunta: '¿De qué colores son los uniformes de los Phillies?', opciones: ['Rojo y azul marino', 'Verde y blanco', 'Negro y dorado', 'Morado y gris'], correcta: 0 },
    { pregunta: '¿En qué división de la MLB juegan los Phillies?', opciones: ['NL Este', 'NL Central', 'NL Oeste', 'AL Este'], correcta: 0 },
    { pregunta: '¿En qué ciudad juegan los Phillies?', opciones: ['Filadelfia', 'Pittsburgh', 'Baltimore', 'Washington'], correcta: 0 },
    { pregunta: '¿Cómo se le llama cariñosamente al equipo?', opciones: ['Phillies', 'Phils', 'Ambas son correctas', 'Ninguna'], correcta: 2 },
    { pregunta: '¿Cuál de estos es un rival divisional histórico de los Phillies?', opciones: ['Atlanta Braves', 'Chicago Cubs', 'San Diego Padres', 'Arizona Diamondbacks'], correcta: 0 }
  ],

  nationals: [
    { pregunta: '¿Con qué nombre y en qué ciudad jugaba este equipo antes de ser los Nationals?', opciones: ['Montreal Expos', 'Quebec Expos', 'Toronto Expos', 'Ottawa Expos'], correcta: 0 },
    { pregunta: '¿En qué año se mudó el equipo a Washington D.C.?', opciones: ['1998', '2005', '2010', '2015'], correcta: 1 },
    { pregunta: '¿Cómo se llama el estadio actual de los Nationals?', opciones: ['Nationals Park', 'Camden Yards', 'Truist Park', 'Citizens Bank Park'], correcta: 0 },
    { pregunta: '¿En qué año ganaron los Nationals su único título de Serie Mundial?', opciones: ['2012', '2016', '2019', '2021'], correcta: 2 },
    { pregunta: '¿Qué joven estrella debutó destacado con los Nationals tras ser el 1er pick del draft 2010?', opciones: ['Bryce Harper', 'Juan Soto', 'Stephen Strasburg', 'Ryan Zimmerman'], correcta: 0 },
    { pregunta: '¿Cómo se llama la divertida competencia de mascotas presidenciales en el estadio de los Nationals?', opciones: ['Racing Presidents', 'President Dash', 'Capitol Race', 'DC Sprint'], correcta: 0 },
    { pregunta: '¿En qué división de la MLB juegan los Nationals?', opciones: ['NL Este', 'NL Central', 'NL Oeste', 'AL Este'], correcta: 0 },
    { pregunta: '¿En qué ciudad juegan los Nationals?', opciones: ['Washington D.C.', 'Baltimore', 'Richmond', 'Annapolis'], correcta: 0 },
    { pregunta: '¿Cómo se abrevia comúnmente el nombre del equipo?', opciones: ['Nats', 'Nashes', 'Natos', 'Washies'], correcta: 0 },
    { pregunta: '¿De qué colores son los uniformes de los Nationals?', opciones: ['Rojo, blanco y azul', 'Verde y negro', 'Morado y dorado', 'Naranja y gris'], correcta: 0 }
  ],

  cubs: [
    { pregunta: '¿Cómo se llama el histórico estadio de los Cubs, uno de los más antiguos de la MLB?', opciones: ['Wrigley Field', 'Comiskey Park', 'Guaranteed Rate Field', 'Miller Park'], correcta: 0 },
    { pregunta: '¿En qué año rompieron los Cubs una sequía de más de 100 años sin título?', opciones: ['2008', '2016', '2019', '2021'], correcta: 1 },
    { pregunta: '¿Qué planta cubre tradicionalmente las paredes del jardín de Wrigley Field?', opciones: ['Hiedra', 'Bugambilia', 'Musgo', 'Enredadera de uva'], correcta: 0 },
    { pregunta: '¿Cómo se llama la mascota oficial de los Cubs?', opciones: ['Clark the Cub', 'Benny the Bear', 'Chicago Bear', 'Cubby'], correcta: 0 },
    { pregunta: '¿Qué leyenda de los Cubs, apodada "Mr. Cub", es famosa por sus jonrones?', opciones: ['Ernie Banks', 'Ryne Sandberg', 'Sammy Sosa', 'Billy Williams'], correcta: 0 },
    { pregunta: '¿En qué división de la MLB juegan los Cubs?', opciones: ['NL Este', 'NL Central', 'NL Oeste', 'AL Central'], correcta: 1 },
    { pregunta: '¿Cuál es el rival de ciudad de los Cubs?', opciones: ['Chicago White Sox', 'Milwaukee Brewers', 'St. Louis Cardinals', 'Detroit Tigers'], correcta: 0 },
    { pregunta: '¿De qué color principal es el uniforme de los Cubs?', opciones: ['Azul', 'Rojo', 'Verde', 'Negro'], correcta: 0 },
    { pregunta: '¿En qué ciudad juegan los Cubs?', opciones: ['Chicago', 'Milwaukee', 'Detroit', 'Cleveland'], correcta: 0 },
    { pregunta: '¿Cómo se le conoce cariñosamente al equipo en inglés?', opciones: ['Cubbies', 'Bearcubs', 'Chicagoans', 'Windies'], correcta: 0 }
  ],

  reds: [
    { pregunta: '¿Por qué son históricamente importantes los Reds en el béisbol profesional?', opciones: ['Fueron el primer equipo profesional (1869)', 'Fueron el primer equipo en tener estadio techado', 'Fueron el primer equipo de expansión', 'Fueron el primer equipo en jugar de noche'], correcta: 0 },
    { pregunta: '¿Cómo se llama el estadio actual de los Reds?', opciones: ['Great American Ball Park', 'Progressive Field', 'Comerica Park', 'Kauffman Stadium'], correcta: 0 },
    { pregunta: '¿Qué leyenda de los Reds tiene más hits en la historia de la MLB?', opciones: ['Pete Rose', 'Johnny Bench', 'Joe Morgan', 'Barry Larkin'], correcta: 0 },
    { pregunta: '¿En qué año ganaron los Reds su título de Serie Mundial más reciente?', opciones: ['1976', '1990', '1995', '2000'], correcta: 1 },
    { pregunta: '¿De qué color principal es el uniforme de los Reds?', opciones: ['Rojo', 'Azul', 'Verde', 'Negro'], correcta: 0 },
    { pregunta: '¿En qué división de la MLB juegan los Reds?', opciones: ['NL Este', 'NL Central', 'NL Oeste', 'AL Central'], correcta: 1 },
    { pregunta: '¿En qué ciudad juegan los Reds?', opciones: ['Cincinnati', 'Cleveland', 'Columbus', 'Louisville'], correcta: 0 },
    { pregunta: '¿Qué tradición de apertura de temporada se asocia históricamente con los Reds?', opciones: ['Suelen abrir la temporada en casa cada año', 'Siempre juegan el primer partido de postemporada', 'Inauguraron el primer Juego de Estrellas', 'Fueron el primer equipo con transmisión de radio'], correcta: 0 },
    { pregunta: '¿Cómo se abrevia o apoda a veces al equipo?', opciones: ['Redlegs', 'Redbirds', 'Redsox', 'Redhawks'], correcta: 0 },
    { pregunta: '¿Cuál es un rival divisional de los Reds?', opciones: ['St. Louis Cardinals', 'New York Mets', 'San Diego Padres', 'Arizona Diamondbacks'], correcta: 0 }
  ],

  brewers: [
    { pregunta: '¿Cómo se llama la mascota de los Brewers que se desliza por un tobogán tras cada jonrón local?', opciones: ['Bernie Brewer', 'Hank the Brewer', 'Barrel Bill', 'Suds the Dog'], correcta: 0 },
    { pregunta: '¿Cómo se llama el estadio actual de los Brewers?', opciones: ['American Family Field', 'Progressive Field', 'Target Field', 'Kauffman Stadium'], correcta: 0 },
    { pregunta: '¿En qué liga jugaban los Brewers antes de pasarse a la Nacional en 1998?', opciones: ['Liga Americana', 'Liga Mexicana', 'Liga Japonesa', 'Nunca cambiaron de liga'], correcta: 0 },
    { pregunta: '¿Qué jardinero/bateador ícono de los Brewers está en el Salón de la Fama?', opciones: ['Robin Yount', 'Paul Molitor (también Brewer)', 'Ambas son correctas', 'Ninguna'], correcta: 2 },
    { pregunta: '¿Cómo se llama la divertida tradición de carreras entre innings de los Brewers?', opciones: ['Sausage Race', 'Bratwurst Dash', 'Beer Run', 'Cheese Chase'], correcta: 0 },
    { pregunta: '¿En qué división de la MLB juegan los Brewers?', opciones: ['NL Este', 'NL Central', 'NL Oeste', 'AL Central'], correcta: 1 },
    { pregunta: '¿De qué colores son los uniformes actuales de los Brewers?', opciones: ['Azul marino y dorado', 'Rojo y blanco', 'Verde y negro', 'Morado y plata'], correcta: 0 },
    { pregunta: '¿En qué ciudad juegan los Brewers?', opciones: ['Milwaukee', 'Madison', 'Green Bay', 'Chicago'], correcta: 0 },
    { pregunta: '¿Los Brewers han ganado alguna vez la Serie Mundial?', opciones: ['Sí, una vez', 'Sí, dos veces', 'No, todavía no', 'Sí, tres veces'], correcta: 2 },
    { pregunta: '¿Cómo se le apoda al equipo?', opciones: ['Crew', 'Suds', 'Barrels', 'Hops'], correcta: 0 }
  ],

  pirates: [
    { pregunta: '¿Cómo se llama el estadio actual de los Pirates, junto al río?', opciones: ['PNC Park', 'Progressive Field', 'Comerica Park', 'Target Field'], correcta: 0 },
    { pregunta: '¿Qué leyenda de los Pirates, pionero latinoamericano del Salón de la Fama, murió en un accidente aéreo?', opciones: ['Roberto Clemente', 'Willie Stargell', 'Barry Bonds', 'Honus Wagner'], correcta: 0 },
    { pregunta: '¿Qué número retiraron los Pirates en honor a Roberto Clemente?', opciones: ['3', '21', '24', '44'], correcta: 1 },
    { pregunta: '¿En qué año ganaron los Pirates su título de Serie Mundial más reciente?', opciones: ['1971', '1979', '1985', '1992'], correcta: 1 },
    { pregunta: '¿De qué colores son los uniformes de los Pirates?', opciones: ['Negro y dorado', 'Rojo y azul', 'Verde y blanco', 'Morado y gris'], correcta: 0 },
    { pregunta: '¿En qué división de la MLB juegan los Pirates?', opciones: ['NL Este', 'NL Central', 'NL Oeste', 'AL Central'], correcta: 1 },
    { pregunta: '¿En qué ciudad juegan los Pirates?', opciones: ['Pittsburgh', 'Philadelphia', 'Cleveland', 'Buffalo'], correcta: 0 },
    { pregunta: '¿Cómo se llama la mascota oficial de los Pirates?', opciones: ['Pirate Parrot', 'Captain Hook', 'Jolly Roger', 'Buc the Parrot'], correcta: 0 },
    { pregunta: '¿Cómo se abrevia o apoda al equipo?', opciones: ['Bucs', 'Pitts', 'Steel', 'Rivers'], correcta: 0 },
    { pregunta: '¿Qué otros equipos profesionales de Pittsburgh comparten los colores negro y dorado?', opciones: ['Steelers (NFL) y Penguins (NHL)', 'Solo los Steelers', 'Ninguno, son únicos', 'Lakers y Kings'], correcta: 0 }
  ],

  cardinals: [
    { pregunta: '¿Cómo se llama el estadio actual de los Cardinals?', opciones: ['Busch Stadium', 'Kauffman Stadium', 'Target Field', 'Comerica Park'], correcta: 0 },
    { pregunta: '¿Qué equipo tiene la segunda mayor cantidad de títulos de Serie Mundial en la historia, solo detrás de los Yankees?', opciones: ['St. Louis Cardinals', 'Boston Red Sox', 'Chicago Cubs', 'San Francisco Giants'], correcta: 0 },
    { pregunta: '¿Qué leyenda de los Cardinals es conocida como "The Man" (Stan the Man)?', opciones: ['Stan Musial', 'Bob Gibson', 'Ozzie Smith', 'Albert Pujols'], correcta: 0 },
    { pregunta: '¿De qué color principal es el uniforme de los Cardinals?', opciones: ['Rojo', 'Azul', 'Verde', 'Negro'], correcta: 0 },
    { pregunta: '¿Qué símbolo aparece tradicionalmente en el uniforme de los Cardinals?', opciones: ['Dos cardenales sobre un bate', 'Un águila', 'Una espada', 'Un trébol'], correcta: 0 },
    { pregunta: '¿En qué división de la MLB juegan los Cardinals?', opciones: ['NL Este', 'NL Central', 'NL Oeste', 'AL Central'], correcta: 1 },
    { pregunta: '¿En qué ciudad juegan los Cardinals?', opciones: ['St. Louis', 'Kansas City', 'Memphis', 'Indianapolis'], correcta: 0 },
    { pregunta: '¿Cómo se le apoda cariñosamente al equipo?', opciones: ['Redbirds', 'Bluebirds', 'Blackbirds', 'Falcons'], correcta: 0 },
    { pregunta: '¿Cuál es un rival divisional histórico de los Cardinals?', opciones: ['Chicago Cubs', 'Atlanta Braves', 'New York Mets', 'Washington Nationals'], correcta: 0 },
    { pregunta: '¿Cómo se llama la mascota oficial de los Cardinals?', opciones: ['Fredbird', 'Cardy', 'Red the Bird', 'Birdie'], correcta: 0 }
  ],

  dbacks: [
    { pregunta: '¿En qué año se fundaron los Diamondbacks como equipo de expansión?', opciones: ['1993', '1995', '1998', '2001'], correcta: 2 },
    { pregunta: '¿En qué año ganaron los Diamondbacks su único título de Serie Mundial, en solo su cuarta temporada?', opciones: ['1999', '2001', '2004', '2007'], correcta: 1 },
    { pregunta: '¿Cómo se llama el estadio actual de los Diamondbacks?', opciones: ['Chase Field', 'Petco Park', 'Coors Field', 'Dodger Stadium'], correcta: 0 },
    { pregunta: '¿Qué característica peculiar tiene el estadio de los Diamondbacks?', opciones: ['Tiene techo retráctil y una alberca', 'Está completamente al aire libre', 'Tiene un lago detrás del jardín', 'No tiene asientos en el jardín'], correcta: 0 },
    { pregunta: '¿Qué dupla de lanzadores lideró el título de 2001 de los Diamondbacks?', opciones: ['Randy Johnson y Curt Schilling', 'Greg Maddux y Tom Glavine', 'Pedro Martínez y Roger Clemens', 'Nolan Ryan y Don Sutton'], correcta: 0 },
    { pregunta: '¿Qué animal representa el nombre de los Diamondbacks?', opciones: ['Serpiente de cascabel', 'Águila', 'Halcón', 'Coyote'], correcta: 0 },
    { pregunta: '¿En qué división de la MLB juegan los Diamondbacks?', opciones: ['NL Este', 'NL Central', 'NL Oeste', 'AL Oeste'], correcta: 2 },
    { pregunta: '¿De qué colores son los uniformes de los Diamondbacks?', opciones: ['Rojo ladrillo y negro', 'Azul y blanco', 'Verde y dorado', 'Morado y plata'], correcta: 0 },
    { pregunta: '¿En qué ciudad juegan los Diamondbacks?', opciones: ['Phoenix', 'Tucson', 'Las Vegas', 'Albuquerque'], correcta: 0 },
    { pregunta: '¿Cómo se abrevia comúnmente el nombre del equipo?', opciones: ['D-backs', 'Dbax', 'Snakes', 'Rattlers'], correcta: 0 }
  ],

  rockies: [
    { pregunta: '¿En qué año se fundaron los Rockies como equipo de expansión?', opciones: ['1989', '1993', '1998', '2002'], correcta: 1 },
    { pregunta: '¿Cómo se llama el estadio actual de los Rockies?', opciones: ['Coors Field', 'Chase Field', 'Petco Park', 'Oracle Park'], correcta: 0 },
    { pregunta: '¿Por qué se dice que la altitud de Denver afecta el juego en el estadio de los Rockies?', opciones: ['La pelota vuela más lejos por la altura', 'Hay menos luz solar', 'El campo es más pequeño', 'El aire es más húmedo'], correcta: 0 },
    { pregunta: '¿Qué marca especial hay en las gradas del estadio para señalar la altitud de una milla?', opciones: ['Una fila de asientos púrpura', 'Una línea dorada', 'Una estrella roja', 'Un círculo verde'], correcta: 0 },
    { pregunta: '¿De qué color principal es el uniforme de los Rockies?', opciones: ['Púrpura', 'Rojo', 'Naranja', 'Azul marino'], correcta: 0 },
    { pregunta: '¿En qué división de la MLB juegan los Rockies?', opciones: ['NL Este', 'NL Central', 'NL Oeste', 'AL Oeste'], correcta: 2 },
    { pregunta: '¿En qué ciudad juegan los Rockies?', opciones: ['Denver', 'Boulder', 'Colorado Springs', 'Aspen'], correcta: 0 },
    { pregunta: '¿Los Rockies han ganado alguna vez la Serie Mundial?', opciones: ['Sí, en 2007', 'No, todavía no', 'Sí, en 1995', 'Sí, dos veces'], correcta: 1 },
    { pregunta: '¿Cómo se llama la mascota oficial de los Rockies, un dinosaurio morado?', opciones: ['Dinger', 'Rocky', 'Purple Rex', 'Stomper'], correcta: 0 },
    { pregunta: '¿Qué apodo reciben a veces los Rockies por su estadio de gran altitud?', opciones: ['El equipo de "la milla de altura"', 'El equipo del desierto', 'El equipo de la costa', 'El equipo de las praderas'], correcta: 0 }
  ],

  padres: [
    { pregunta: '¿En qué año se fundaron los Padres como equipo de expansión?', opciones: ['1965', '1969', '1974', '1981'], correcta: 1 },
    { pregunta: '¿Cómo se llama el estadio actual de los Padres?', opciones: ['Petco Park', 'Chase Field', 'Oracle Park', 'Dodger Stadium'], correcta: 0 },
    { pregunta: '¿Qué leyenda de los Padres, apodado "Mr. Padre", es famoso por su gran promedio de bateo?', opciones: ['Tony Gwynn', 'Dave Winfield', 'Trevor Hoffman', 'Nate Colbert'], correcta: 0 },
    { pregunta: '¿De qué color tradicional es conocido el uniforme histórico de los Padres?', opciones: ['Marrón (brown)', 'Rojo', 'Verde', 'Negro'], correcta: 0 },
    { pregunta: '¿Los Padres han llegado a la Serie Mundial alguna vez?', opciones: ['Sí, dos veces (1984 y 1998), sin ganar', 'Sí, y la ganaron en 1998', 'No, nunca han llegado', 'Sí, tres veces'], correcta: 0 },
    { pregunta: '¿En qué división de la MLB juegan los Padres?', opciones: ['NL Este', 'NL Central', 'NL Oeste', 'AL Oeste'], correcta: 2 },
    { pregunta: '¿En qué ciudad juegan los Padres?', opciones: ['San Diego', 'Los Angeles', 'Sacramento', 'San José'], correcta: 0 },
    { pregunta: '¿Cómo se llama la mascota oficial de los Padres, un fraile sonriente?', opciones: ['The Swinging Friar', 'Padre Pete', 'Friar Fred', 'Brother Ball'], correcta: 0 },
    { pregunta: '¿De dónde viene el nombre "Padres" para este equipo?', opciones: ['De los frailes misioneros que fundaron San Diego', 'De un apodo de la prensa local', 'De una votación de los fans', 'De un patrocinador'], correcta: 0 },
    { pregunta: '¿Cuál es un rival divisional cercano de los Padres?', opciones: ['Los Angeles Dodgers', 'San Francisco Giants', 'Ambas son correctas', 'Ninguna'], correcta: 2 }
  ],

  giants: [
    { pregunta: '¿En qué ciudad jugaban los Giants antes de mudarse a San Francisco?', opciones: ['Nueva York', 'Boston', 'Filadelfia', 'Baltimore'], correcta: 0 },
    { pregunta: '¿En qué año se mudaron los Giants a San Francisco?', opciones: ['1958', '1966', '1972', '1985'], correcta: 0 },
    { pregunta: '¿Cómo se llama el estadio actual de los Giants, junto a la bahía?', opciones: ['Oracle Park', 'Chase Field', 'Petco Park', 'Angel Stadium'], correcta: 0 },
    { pregunta: '¿Qué jugador de los Giants posee el récord de más jonrones en una sola temporada?', opciones: ['Barry Bonds', 'Willie Mays', 'Willie McCovey', 'Buster Posey'], correcta: 0 },
    { pregunta: '¿Cuántos títulos de Serie Mundial ganaron los Giants entre 2010 y 2014?', opciones: ['1', '2', '3', '4'], correcta: 2 },
    { pregunta: '¿De qué colores son los uniformes de los Giants?', opciones: ['Naranja y negro', 'Azul y blanco', 'Rojo y dorado', 'Verde y gris'], correcta: 0 },
    { pregunta: '¿Cuál es el rival histórico de los Giants en la misma división?', opciones: ['Los Angeles Dodgers', 'San Diego Padres', 'Arizona Diamondbacks', 'Colorado Rockies'], correcta: 0 },
    { pregunta: '¿En qué división de la MLB juegan los Giants?', opciones: ['NL Este', 'NL Central', 'NL Oeste', 'AL Oeste'], correcta: 2 },
    { pregunta: '¿Cómo se llama la zona de agua detrás del jardín derecho del estadio de los Giants, famosa por recibir jonrones?', opciones: ['McCovey Cove', 'Splash Bay', 'Bay Harbor', 'Giants Cove'], correcta: 0 },
    { pregunta: '¿En qué ciudad juegan actualmente los Giants?', opciones: ['San Francisco', 'San José', 'Oakland', 'Sacramento'], correcta: 0 }
  ]

};




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

        trivia: TEAM_TRIVIA[t.id] || [],
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