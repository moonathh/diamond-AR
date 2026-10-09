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
   PREMIOS DE LA RULETA (probabilidades en %, deben sumar 100)
   ========================================================= */

const PRIZE_TEMPLATE = [
  { id: 'nada',   tipo: 'nada',   etiqueta: 'Nada',         nombre: 'Nada',                                probabilidad: 50, icono: '❌' },
  { id: 'pin',    tipo: 'premio', etiqueta: 'Pin digital',  nombre: 'Pin digital',                         probabilidad: 20, icono: '📍' },
  { id: 'gorra',  tipo: 'premio', etiqueta: 'Gorra',        nombre: 'Gorra oficial',                       probabilidad: 15, icono: '🧢' },
  { id: 'poster', tipo: 'premio', etiqueta: 'Póster',       nombre: 'Póster oficial',                      probabilidad: 10, icono: '🖼️' },
  { id: 'vip',    tipo: 'premio', etiqueta: 'Entradas VIP', nombre: 'Entradas dobles VIP para un partido', probabilidad: 5,  icono: '🎟️' }
];

function buildPrizes(t) {
  return PRIZE_TEMPLATE.map((p) => ({
    id: p.id,
    tipo: p.tipo,
    etiqueta: p.etiqueta,
    icono: p.icono,
    probabilidad: p.probabilidad,
    descripcion: p.tipo === 'nada' ? 'Nada' : (p.nombre + ' de ' + t.corto)
  }));
}

/* =========================================================
   HISTORIA DE LA LIGA NACIONAL (compartida por los 15 equipos)
   ========================================================= */

const LIGA_NACIONAL_HISTORIA = {
  resumen: 'Fundada el 2 de febrero de 1876, la Liga Nacional es la liga de béisbol profesional más antigua que sigue en operación. Junto con la Liga Americana (1901) forma las Grandes Ligas (MLB). Hoy tiene 15 equipos repartidos en tres divisiones: Este, Central y Oeste.',
  hitos: [
    { anio: '1876', texto: 'Se funda la Liga Nacional con ocho clubes, impulsada por William Hulbert. De aquel grupo original siguen vigentes los Cubs y los Braves.' },
    { anio: '1903', texto: 'Se juega la primera Serie Mundial moderna entre el campeón de la Nacional (Pirates) y el de la Americana (Boston), que ganó la serie.' },
    { anio: '1947', texto: 'Jackie Robinson debuta con los Dodgers de Brooklyn y rompe la barrera racial en las Grandes Ligas.' },
    { anio: '1958', texto: 'Dodgers y Giants se mudan de Nueva York a California y llevan la liga a la costa oeste.' },
    { anio: '1962', texto: 'La liga se expande con los Mets y los Colt .45s (después Astros). En 1969 llegan Expos y Padres y nacen las divisiones Este y Oeste.' },
    { anio: '1993', texto: 'Se suman Marlins y Rockies (1993) y Diamondbacks (1998). En 1994 aparece la División Central y en 1998 los Brewers pasan de la Americana a la Nacional.' },
    { anio: '2013', texto: 'Los Astros se van a la Liga Americana y la Nacional queda con los 15 equipos actuales (los Nationals ya habían llegado desde Montreal en 2005).' },
    { anio: '2022', texto: 'La Liga Nacional adopta el bateador designado, igual que la Americana.' },
    { anio: 'Hoy', texto: 'Temporada 2026: los Brewers (103 victorias, récord de su historia) y los Dodgers (campeones de 2024 y 2025) ganaron sus series divisionales y avanzan a la Serie de Campeonato de la Liga Nacional.' }
  ]
};

/* =========================================================
   HISTORIA POR EQUIPO
   La entrada "Hoy" refleja la situación al 9 de octubre de 2026.
   ========================================================= */

const TEAM_HISTORY = {

  dodgers: {
    resumen: 'Fundados en 1883 en Brooklyn, se mudaron a Los Ángeles en 1958. Son una de las franquicias con más historia y más títulos de la Liga Nacional.',
    campeonatos: '9 Series Mundiales: 1955, 1959, 1963, 1965, 1981, 1988, 2020, 2024 y 2025',
    hitos: [
      { anio: '1883', texto: 'Nace el club en Brooklyn, Nueva York.' },
      { anio: '1947', texto: 'Jackie Robinson debuta y rompe la barrera racial en las Grandes Ligas.' },
      { anio: '1955', texto: 'Primer título de Serie Mundial, ante los Yankees, todavía como Brooklyn.' },
      { anio: '1958', texto: 'Se mudan a Los Ángeles; en 1962 se inaugura el Dodger Stadium.' },
      { anio: '1981', texto: 'La Fernandomanía: Fernando Valenzuela deslumbra y el equipo gana la Serie Mundial.' },
      { anio: '1988', texto: 'Jonrón de Kirk Gibson en el Juego 1 y título ante Oakland.' },
      { anio: '2020–2025', texto: 'Campeones en 2020, 2024 y 2025. En 2025 vencieron a Toronto en siete juegos y fueron los primeros bicampeones desde los Yankees de 1998-2000.' },
      { anio: 'Hoy', texto: 'En 2026 sumaron 100 victorias y eliminaron a Atlanta (3-1) en la Serie Divisional. Buscan su tercer título seguido.' }
    ]
  },

  braves: {
    resumen: 'Fundados en 1871 en Boston, son una de las franquicias más antiguas del deporte profesional de EE. UU. Pasaron por Milwaukee (1953) antes de llegar a Atlanta (1966).',
    campeonatos: '4 Series Mundiales: 1914 (Boston), 1957 (Milwaukee), 1995 y 2021 (Atlanta)',
    hitos: [
      { anio: '1871', texto: 'Nacen como los Red Stockings de Boston; en 1876 son miembro fundador de la Liga Nacional.' },
      { anio: '1914', texto: 'Los «Miracle Braves» pasan del último lugar a campeones de la Serie Mundial.' },
      { anio: '1957', texto: 'Ya en Milwaukee, ganan la Serie Mundial ante los Yankees.' },
      { anio: '1974', texto: 'Hank Aaron conecta su jonrón 715 en Atlanta y supera el récord de Babe Ruth.' },
      { anio: '1991–2005', texto: 'Dominio total: 14 títulos de división consecutivos (sin contar 1994) y el campeonato de 1995.' },
      { anio: '2021', texto: 'Segundo título en Atlanta, ante los Astros de Houston.' },
      { anio: 'Hoy', texto: 'En 2026, con Walt Weiss en su primer año como manager, ganaron el Este con 94 victorias, pero cayeron ante los Dodgers (1-3) en la Serie Divisional.' }
    ]
  },

  marlins: {
    resumen: 'Nacidos en 1993 como Florida Marlins, son un equipo joven que ya ganó dos Series Mundiales, ambas como comodín.',
    campeonatos: '2 Series Mundiales: 1997 y 2003',
    hitos: [
      { anio: '1993', texto: 'Debutan como equipo de expansión en Florida.' },
      { anio: '1997', texto: 'Primer título en solo su quinta temporada: Edgar Rentería define el Juego 7 en extra innings ante Cleveland.' },
      { anio: '2003', texto: 'Segundo título, ante los Yankees, con el joven Josh Beckett como figura.' },
      { anio: '2012', texto: 'Cambian su nombre a Miami Marlins y estrenan su parque actual, hoy loanDepot park.' },
      { anio: '2020', texto: 'Vuelven a la postemporada por primera vez desde 2003.' },
      { anio: 'Hoy', texto: 'En 2026 terminaron 80-82. Llegaron al Juego de Estrellas en zona de playoffs, pero una racha de 12 derrotas seguidas, la más larga de su historia, los hundió.' }
    ]
  },

  mets: {
    resumen: 'Nacidos en 1962 para devolver la Liga Nacional a Nueva York tras la partida de Dodgers y Giants. Su azul y naranja combinan los colores de ambos equipos.',
    campeonatos: '2 Series Mundiales: 1969 y 1986',
    hitos: [
      { anio: '1962', texto: 'Debutan como equipo de expansión y pierden 120 juegos en su primera temporada.' },
      { anio: '1969', texto: 'Los «Miracle Mets» ganan la Serie Mundial ante Baltimore.' },
      { anio: '1986', texto: 'Segundo título, ante Boston, tras una remontada recordada en el Juego 6.' },
      { anio: '2000–2015', texto: 'Campeones de la Liga Nacional en 2000 (perdieron la Serie del Subway ante los Yankees) y en 2015.' },
      { anio: '2009', texto: 'Se inaugura Citi Field, que reemplaza al Shea Stadium.' },
      { anio: '2024', texto: 'Llegan a la Serie de Campeonato de la Liga Nacional.' },
      { anio: 'Hoy', texto: 'En 2026 terminaron 74-88, últimos del Este por primera vez desde 2003. Carlos Mendoza fue despedido el 26 de junio y Andy Green dirigió el resto del año.' }
    ]
  },

  phillies: {
    resumen: 'Fundados en 1883, son uno de los equipos más antiguos de la Liga Nacional y uno de los más apasionados del béisbol.',
    campeonatos: '2 Series Mundiales: 1980 y 2008',
    hitos: [
      { anio: '1883', texto: 'Nace el club en Filadelfia.' },
      { anio: '1980', texto: 'Primer título de su historia, tras 97 años de espera, con Mike Schmidt como MVP de la Serie.' },
      { anio: '1993', texto: 'Llegan a la Serie Mundial pero pierden ante Toronto.' },
      { anio: '2008', texto: 'Segundo título, ante los Rays de Tampa Bay.' },
      { anio: '2022', texto: 'Vuelven a la Serie Mundial como campeones de la Liga Nacional, pero caen ante Houston.' },
      { anio: 'Hoy', texto: 'En 2026 arrancaron 9-19 y despidieron a Rob Thomson (28 de abril); Don Mattingly asumió como interino. Remontaron hasta 88-74 y clasificaron como tercer comodín, pero Atlanta los eliminó. Filadelfia fue sede del Juego de Estrellas.' }
    ]
  },

  nationals: {
    resumen: 'Nacieron en 1969 como los Expos de Montreal, el primer equipo de Grandes Ligas fuera de EE. UU., y en 2005 se mudaron a Washington D.C.',
    campeonatos: '1 Serie Mundial: 2019',
    hitos: [
      { anio: '1969', texto: 'Los Expos debutan en Montreal, primer equipo de MLB fuera de Estados Unidos.' },
      { anio: '1994', texto: 'Tenían el mejor récord de las Grandes Ligas (74-40) cuando la huelga canceló la temporada.' },
      { anio: '2005', texto: 'Se mudan a Washington y se convierten en los Nationals.' },
      { anio: '2012', texto: 'Primer título de división de la era Nationals, con Bryce Harper y Stephen Strasburg.' },
      { anio: '2019', texto: 'Campeones tras arrancar 19-31: vencen a Houston en siete juegos ganando los cuatro de visita.' },
      { anio: 'Hoy', texto: 'En 2026 terminaron 77-85 en el primer año de una nueva gestión: Paul Toboni al frente de operaciones y Blake Butera, el manager más joven desde 1972.' }
    ]
  },

  cubs: {
    resumen: 'Miembros fundadores de la Liga Nacional (1876), juegan en Wrigley Field, uno de los parques más históricos del béisbol, y son uno de los equipos con más fanáticos del país.',
    campeonatos: '3 Series Mundiales: 1907, 1908 y 2016',
    hitos: [
      { anio: '1876', texto: 'Participan en la fundación de la liga, entonces como Chicago White Stockings.' },
      { anio: '1907–1908', texto: 'Ganan dos Series Mundiales seguidas.' },
      { anio: '1916', texto: 'Se mudan a Wrigley Field, donde siguen jugando hoy.' },
      { anio: '1958', texto: 'Ernie Banks, «Mr. Cub», gana el primero de sus dos MVP consecutivos.' },
      { anio: '2016', texto: 'Rompen una sequía de 108 años sin título, venciendo a Cleveland en un Juego 7 de 10 entradas.' },
      { anio: 'Hoy', texto: 'En 2026, con Craig Counsell de manager, clasificaron por segundo año seguido como comodín, pero los Padres los eliminaron en la Serie de Comodines.' }
    ]
  },

  reds: {
    resumen: 'Herederos de los Red Stockings de 1869, el primer club totalmente profesional del béisbol. Tienen la tradición de abrir la temporada de las Grandes Ligas en casa.',
    campeonatos: '5 Series Mundiales: 1919, 1940, 1975, 1976 y 1990',
    hitos: [
      { anio: '1869', texto: 'Los Red Stockings de Cincinnati se convierten en el primer equipo de béisbol totalmente profesional.' },
      { anio: '1890', texto: 'La franquicia actual se une a la Liga Nacional.' },
      { anio: '1919', texto: 'Ganan la Serie Mundial del escándalo de los «Black Sox», ante Chicago.' },
      { anio: '1975–1976', texto: 'La «Gran Máquina Roja» (Rose, Bench, Morgan, Pérez) gana dos títulos seguidos; en 1976 barre toda la postemporada.' },
      { anio: '1990', texto: 'Barren a los A\u2019s de Oakland y ganan su quinta Serie Mundial.' },
      { anio: 'Hoy', texto: 'En 2026 terminaron 75-87 con Terry Francona como manager. Lo mejor: Elly De La Cruz logró una temporada de 30 jonrones y 30 bases robadas.' }
    ]
  },

  brewers: {
    resumen: 'Nacieron en 1969 como los Seattle Pilots y se mudaron a Milwaukee en 1970. Jugaron en la Liga Americana hasta pasarse a la Nacional en 1998.',
    campeonatos: 'Sin Serie Mundial todavía (perdieron la de 1982 ante St. Louis)',
    hitos: [
      { anio: '1969', texto: 'Debutan en Seattle como los Pilots; al año siguiente se mudan a Milwaukee.' },
      { anio: '1982', texto: 'Los «Harvey\u2019s Wallbangers» ganan el banderín de la Liga Americana y llegan a la Serie Mundial.' },
      { anio: '1998', texto: 'Se pasan a la Liga Nacional.' },
      { anio: '2011', texto: 'Ganan la División Central y llegan a la Serie de Campeonato, con Ryan Braun como MVP.' },
      { anio: '2018', texto: 'Christian Yelich es el MVP y el equipo queda a un juego de la Serie Mundial.' },
      { anio: '2025', texto: 'Logran 97 victorias, entonces récord de la franquicia, y caen ante los Dodgers en la Serie de Campeonato.' },
      { anio: 'Hoy', texto: 'En 2026 ganaron 103 juegos, su primera temporada de 100 victorias, y vencieron a San Diego (3-1) en la Serie Divisional. Dirige Pat Murphy.' }
    ]
  },

  pirates: {
    resumen: 'Uno de los equipos históricos de la liga (se unió en 1887). Juega en el PNC Park, junto al río Allegheny, y viste de negro y dorado.',
    campeonatos: '5 Series Mundiales: 1909, 1925, 1960, 1971 y 1979',
    hitos: [
      { anio: '1903', texto: 'Juegan la primera Serie Mundial moderna y la pierden ante Boston.' },
      { anio: '1909', texto: 'Primer título, con la estrella Honus Wagner y el estreno del Forbes Field.' },
      { anio: '1960', texto: 'Bill Mazeroski conecta el jonrón que define el Juego 7 ante los Yankees.' },
      { anio: '1971–1972', texto: 'Roberto Clemente es el MVP de la Serie Mundial de 1971 y llega a 3,000 hits en 1972; muere ese año en un accidente aéreo cuando llevaba ayuda humanitaria.' },
      { anio: '1979', texto: 'Con el lema «We Are Family», remontan a Baltimore (de 1-3 a 4-3) y ganan la Serie Mundial.' },
      { anio: '2024–2025', texto: 'Paul Skenes gana Novato del Año (2024) y el Cy Young unánime de la Liga Nacional (2025).' },
      { anio: 'Hoy', texto: 'En 2026 terminaron 82-80, su primera temporada ganadora desde 2018, con el debut del prospecto Konnor Griffin. Dirige Don Kelly.' }
    ]
  },

  cardinals: {
    resumen: 'Fundados en 1882 como Brown Stockings y en la Liga Nacional desde 1892, son el equipo de la Nacional con más Series Mundiales y el segundo de todas las Grandes Ligas, solo detrás de los Yankees.',
    campeonatos: '11 Series Mundiales: 1926, 1931, 1934, 1942, 1944, 1946, 1964, 1967, 1982, 2006 y 2011',
    hitos: [
      { anio: '1882', texto: 'Nacen como los Brown Stockings; en 1892 pasan a la Liga Nacional.' },
      { anio: '1926', texto: 'Primera Serie Mundial, ganada a los Yankees en siete juegos.' },
      { anio: '1934', texto: 'La «Gashouse Gang» de Dizzy Dean gana la Serie Mundial.' },
      { anio: '1941–1963', texto: 'Stan Musial, «The Man», juega toda su carrera con el equipo y suma más de 3,600 hits.' },
      { anio: '1968', texto: 'Bob Gibson termina con efectividad de 1.12, una de las mejores temporadas de un lanzador.' },
      { anio: '2011', texto: 'Remontada épica y título ante Texas, con el famoso Juego 6.' },
      { anio: '2022', texto: 'Albert Pujols llega a 700 jonrones y Yadier Molina se retira.' },
      { anio: 'Hoy', texto: 'En 2026 terminaron 77-85, cuarta temporada seguida sin postemporada, con Chaim Bloom al frente de operaciones. Jordan Walker ganó el Home Run Derby.' }
    ]
  },

  dbacks: {
    resumen: 'Equipo de expansión nacido en 1998 en Phoenix. Ganaron la Serie Mundial en solo su cuarta temporada, la franquicia de expansión más rápida en lograrlo.',
    campeonatos: '1 Serie Mundial: 2001',
    hitos: [
      { anio: '1998', texto: 'Debutan en Phoenix como equipo de expansión.' },
      { anio: '2001', texto: 'Campeones ante los Yankees: Luis González define el Juego 7 y Randy Johnson y Curt Schilling son los MVP de la Serie.' },
      { anio: '2023', texto: 'Llegan a la Serie Mundial como comodín, pero caen ante Texas.' },
      { anio: 'Hoy', texto: 'En 2026, con Torey Lovullo en su décimo año, terminaron 86-76 y quedaron fuera de playoffs el último día de la temporada, por detrás de Filadelfia en la carrera por el tercer comodín.' }
    ]
  },

  rockies: {
    resumen: 'Equipo de expansión de 1993. Juegan en Coors Field, en Denver, a más de 1,600 metros de altitud, donde la pelota vuela más lejos.',
    campeonatos: 'Sin Serie Mundial (campeones de la Liga Nacional en 2007; perdieron ante Boston)',
    hitos: [
      { anio: '1993', texto: 'Debutan como equipo de expansión.' },
      { anio: '1995', texto: 'Llegan a su primera postemporada en solo su tercera temporada, y se inaugura Coors Field.' },
      { anio: '2007', texto: '«Rocktober»: ganan 21 de 22 juegos y llegan a su primera Serie Mundial.' },
      { anio: '2024', texto: 'Todd Helton, ícono del equipo, entra al Salón de la Fama.' },
      { anio: '2025', texto: 'Viven la peor temporada de su historia: 43 victorias y 119 derrotas.' },
      { anio: 'Hoy', texto: 'En 2026 mejoraron a 58-104, pero sumaron su cuarta temporada seguida con 100 derrotas. Dirige Warren Schaeffer.' }
    ]
  },

  padres: {
    resumen: 'Equipo de expansión de 1969 en San Diego. Su nombre rinde homenaje a los frailes misioneros españoles que fundaron la ciudad. Nunca han ganado la Serie Mundial, pero la han disputado dos veces.',
    campeonatos: 'Sin Serie Mundial (campeones de la Liga Nacional en 1984 y 1998)',
    hitos: [
      { anio: '1969', texto: 'Debutan como equipo de expansión.' },
      { anio: '1984', texto: 'Primer banderín: remontan un 0-2 ante los Cubs en la Serie de Campeonato y llegan a la Serie Mundial.' },
      { anio: '1982–2001', texto: 'Tony Gwynn, «Mr. Padre», gana 8 títulos de bateo y suma 3,141 hits jugando solo con San Diego.' },
      { anio: '1998', texto: 'Segundo banderín, con Trevor Hoffman como cerrador; pierden la Serie Mundial ante los Yankees.' },
      { anio: '2004', texto: 'Se inaugura Petco Park.' },
      { anio: '2022', texto: 'Eliminan a los Dodgers en la Serie Divisional y llegan a la Serie de Campeonato.' },
      { anio: 'Hoy', texto: 'En 2026 remontaron desde 50-53 en julio hasta 91 victorias, vencieron a los Cubs en la Serie de Comodines y cayeron ante Milwaukee (1-3) en la Serie Divisional. Dirige Craig Stammen.' }
    ]
  },

  giants: {
    resumen: 'Fundados en 1883 como los Gothams de Nueva York, se mudaron a San Francisco en 1958 y hoy juegan junto a la bahía, en Oracle Park.',
    campeonatos: '8 Series Mundiales: 1905, 1921, 1922, 1933, 1954 (Nueva York); 2010, 2012 y 2014 (San Francisco)',
    hitos: [
      { anio: '1883', texto: 'Nacen en Nueva York como los Gothams, antes de llamarse Giants.' },
      { anio: '1951', texto: 'El jonrón de Bobby Thomson ante los Dodgers, llamado «el tiro que se escuchó en todo el mundo», define el banderín.' },
      { anio: '1954', texto: 'Ganan la Serie Mundial con Willie Mays y su famosa atrapada en el Juego 1.' },
      { anio: '1958', texto: 'Se mudan a San Francisco.' },
      { anio: '2001', texto: 'Barry Bonds conecta 73 jonrones, el récord de una temporada.' },
      { anio: '2010–2014', texto: 'Tres títulos en cinco años (2010, 2012 y 2014), con Buster Posey y Madison Bumgarner.' },
      { anio: '2021', texto: 'Récord de franquicia con 107 victorias, ganando la división por delante de los Dodgers.' },
      { anio: 'Hoy', texto: 'En 2026 terminaron 65-97, quinta temporada seguida sin playoffs. Es el primer año de Tony Vitello, que llegó directo del beisbol universitario, como manager.' }
    ]
  }

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

    historia: TEAM_HISTORY[t.id],

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
        premios: buildPrizes(t)
  };
});



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