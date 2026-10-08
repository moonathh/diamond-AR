function go(name) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
  });

  const screen = document.getElementById('screen-' + name);

  if (screen) {
    screen.classList.add('active');
  }

  document.querySelectorAll('.nav-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.s === name);
  });

  if (name !== 'ar') {
    stopAR();
  }

  if (name === 'trivia') {
    renderTrivia(currentTeamId);
  }

    if (name === 'game') {
    renderGame(currentTeamId);
  }
}

/* =========================================================
   CÁMARA AR - MindAR + A-Frame
   ========================================================= */

let arRunning = false;

function setARStatus(msg, isError = false) {
  const el = document.getElementById('ar-status');

  if (!el) return;

  if (!msg) {
    el.classList.add('hidden');
    return;
  }

  el.textContent = msg;
  el.classList.remove('hidden');
  el.classList.toggle('error', !!isError);
}

function getARSystem() {
  const scene = document.querySelector('#ar-scene');

  if (!scene) return null;

  return scene.systems &&
         scene.systems['mindar-image-system'];
}

async function toggleAR() {
  if (arRunning) {
    stopAR();
  } else {
    await startAR();
  }
}

async function startAR() {
  const scene = document.querySelector('#ar-scene');
  const btn = document.getElementById('ar-scan-btn');

  if (!scene) {
    setARStatus('No se encontró la escena AR.', true);
    return;
  }

  setARStatus('Solicitando acceso a la cámara…');

  const doStart = async () => {
    try {
      const system = getARSystem();

      if (!system) {
        throw new Error('Sistema MindAR no disponible');
      }

      await system.start();

      arRunning = true;

      setARStatus(
        'Apunta la cámara al logo para ver el modelo 3D'
      );

      if (btn) {
        btn.textContent = 'DETENER CÁMARA';
      }

    } catch (err) {

      console.error('[MindAR] Error iniciando cámara:', err);

      arRunning = false;

      if (
        err.name === 'NotAllowedError' ||
        err.name === 'PermissionDeniedError'
      ) {

        setARStatus(
          'Permiso de cámara denegado. Habilítalo en la configuración del navegador.',
          true
        );

      } else if (err.name === 'NotFoundError') {

        setARStatus(
          'No se encontró ninguna cámara en este dispositivo.',
          true
        );

      } else {

        setARStatus(
          'No se pudo iniciar el AR: ' + err.message,
          true
        );
      }
    }
  };

  if (scene.hasLoaded) {
    await doStart();
  } else {
    scene.addEventListener(
      'loaded',
      doStart,
      { once: true }
    );
  }
}

function stopAR() {
  const btn = document.getElementById('ar-scan-btn');
  const system = getARSystem();

  if (system && arRunning) {
    try {
      system.stop();
    } catch (err) {
      console.warn(
        '[MindAR] Error deteniendo cámara:',
        err
      );
    }
  }

  arRunning = false;

  hideModel();

  if (btn) {
    btn.textContent = 'ESCANEAR OBJETO';
  }

  setARStatus(
    'Toca "Escanear objeto" para activar la cámara'
  );
}


/* =========================================================
   FILTROS AR
   ========================================================= */

function setARFilter(el, cls) {

  if (!el || !el.parentElement) return;

  el.parentElement
    .querySelectorAll('.filter-chip')
    .forEach(c => {
      c.classList.remove('active');
    });

  el.classList.add('active');

  const canvas = document.querySelector(
    '#ar-scene canvas'
  );

  if (canvas) {
    canvas.style.filter = filterCss(cls);
  }
}

function setVFilter(el, cls) {

  if (!el || !el.parentElement) return;

  el.parentElement
    .querySelectorAll('.filter-chip')
    .forEach(c => {
      c.classList.remove('active');
    });

  el.classList.add('active');

  document
    .querySelectorAll('.vt')
    .forEach(v => {
      v.style.filter = filterCss(cls);
    });
}

function filterCss(cls) {

  switch (cls) {

    case 'f-blur':
      return 'blur(2px)';

    case 'f-pixel':
      return 'contrast(1.4) saturate(1.3)';

    case 'f-thermal':
      return 'hue-rotate(160deg) saturate(3) brightness(1.1)';

    case 'f-pastel':
      return 'saturate(0.6) brightness(1.2)';

    default:
      return 'none';
  }
}


/* =========================================================
   VISOR 3D
   Three.js independiente sobre la cámara
   ========================================================= */

let modelViewer = null;
let modelAnimationPaused = false;

function initModelViewer() {

  // Si ya está creado, reutilizarlo
  if (modelViewer) {
    return modelViewer;
  }

  const canvas = document.getElementById(
    'ar-model-canvas'
  );

  if (!canvas) {
    console.error(
      '[Visor3D] No se encontró #ar-model-canvas'
    );

    return null;
  }

  if (typeof THREE === 'undefined') {
    console.error(
      '[Visor3D] Three.js no está disponible'
    );

    return null;
  }

  if (typeof THREE.GLTFLoader === 'undefined') {
    console.error(
      '[Visor3D] GLTFLoader no está disponible'
    );

    return null;
  }

  if (typeof THREE.DRACOLoader === 'undefined') {
    console.error(
      '[Visor3D] DRACOLoader no está disponible. ' +
      'Agrega DRACOLoader.js al HTML.'
    );

    return null;
  }


  /* -------------------------------------------------------
     RENDERER
     ------------------------------------------------------- */

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
  });

  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio || 1, 2)
  );

  renderer.setClearColor(0x000000, 0);


  /* -------------------------------------------------------
     ESCENA
     ------------------------------------------------------- */

  const scene = new THREE.Scene();


  /* -------------------------------------------------------
     CÁMARA 3D
     ------------------------------------------------------- */

  const camera = new THREE.PerspectiveCamera(
    45,
    1,
    0.1,
    100
  );

  camera.position.set(0, 0, 3);

  camera.lookAt(0, 0, 0);


  /* -------------------------------------------------------
     ILUMINACIÓN
     ------------------------------------------------------- */

  const ambientLight =
    new THREE.AmbientLight(
      0xffffff,
      1.5
    );

  scene.add(ambientLight);


  const directionalLight =
    new THREE.DirectionalLight(
      0xffffff,
      2
    );

  directionalLight.position.set(
    2,
    3,
    4
  );

  scene.add(directionalLight);


  /* -------------------------------------------------------
     MODELO
     ------------------------------------------------------- */

  let modelRoot = null;
  let currentModelPath = null;


  /* -------------------------------------------------------
     REDIMENSIONAR
     ------------------------------------------------------- */

  function resize() {

    const parent = canvas.parentElement;

    if (!parent) return;

    const width = parent.clientWidth;
    const height = parent.clientHeight;

    if (width <= 0 || height <= 0) {
      return;
    }

    renderer.setSize(
      width,
      height,
      false
    );

    camera.aspect =
      width / height;

    camera.updateProjectionMatrix();

    console.log(
      '[Visor3D] resize:',
      width,
      'x',
      height
    );
  }


  window.addEventListener(
    'resize',
    resize
  );


  /* -------------------------------------------------------
     LOADER GLTF
     ------------------------------------------------------- */

  const loader =
    new THREE.GLTFLoader();


  /* -------------------------------------------------------
     DECODIFICADOR DRACO
     ------------------------------------------------------- */

  const dracoLoader =
    new THREE.DRACOLoader();

  dracoLoader.setDecoderPath(
    'https://www.gstatic.com/draco/versioned/decoders/1.5.7/'
  );

  loader.setDRACOLoader(
    dracoLoader
  );


  /* -------------------------------------------------------
     CARGAR .GLB (reutilizable por equipo)
     ------------------------------------------------------- */

  function loadModel(path) {

    if (!path) {
      path = 'assets/pelota.glb';
    }

    // Si ya es el modelo cargado, no hacer nada
    if (path === currentModelPath && modelRoot) {
      return;
    }

    console.log(
      '[Visor3D] Cargando ' + path + '...'
    );

    loader.load(

      path,

      (gltf) => {

        if (modelRoot) {
          scene.remove(modelRoot);
        }

        modelRoot = gltf.scene;
        currentModelPath = path;

        console.log(
          '[Visor3D] modelo .glb cargado correctamente:',
          path
        );

        modelRoot.traverse(
          (object) => {

            if (object.isMesh) {

              object.visible = true;

              object.frustumCulled = false;

            }
          }
        );

        const box =
          new THREE.Box3().setFromObject(
            modelRoot
          );

        const size =
          new THREE.Vector3();

        box.getSize(size);

        const center =
          new THREE.Vector3();

        box.getCenter(center);

        console.log(
          '[Visor3D] tamaño original:',
          size
        );

        const maxDim = Math.max(
          size.x,
          size.y,
          size.z
        ) || 1;

        const targetSize = 1.5;

        const scale =
          targetSize / maxDim;

        modelRoot.position.sub(center);

        modelRoot.scale.setScalar(
          scale
        );

        modelRoot.position.x = 0;
        modelRoot.position.y = -0.38;
        modelRoot.position.z = 0;

        modelRoot.rotation.y = -Math.PI / 2;

        scene.add(modelRoot);

        console.log(
          '[Visor3D] modelo listo y centrado'
        );

        resize();

      },

      undefined,

      (error) => {

        console.error(
          '[Visor3D] Error cargando modelo .glb:',
          path,
          error
        );

      }
    );
  }

  // Carga el modelo por defecto al iniciar (antes de detectar un equipo)
  loadModel('assets/pelota.glb');


  /* -------------------------------------------------------
     ANIMACIÓN
     ------------------------------------------------------- */

  function animate() {

    requestAnimationFrame(
      animate
    );

    if (modelRoot && !modelAnimationPaused) {
      modelRoot.rotation.y += 0.01;
    }

    renderer.render(
      scene,
      camera
    );
  }


  animate();


  /* -------------------------------------------------------
     CREAR VIEWER
     ------------------------------------------------------- */

  modelViewer = {
    canvas: canvas,
    resize: resize,
    loadModel: loadModel
  };


  resize();


  return modelViewer;
}


/* =========================================================
   MOSTRAR MODELO
   ========================================================= */

function showModel() {

  const viewer =
    initModelViewer();

  const canvas =
    document.getElementById(
      'ar-model-canvas'
    );

  if (!canvas) {
    return;
  }

  canvas.classList.add(
    'visible'
  );

  canvas.style.display = 'block';
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '999';

  if (viewer) {

    requestAnimationFrame(() => {
      viewer.resize();
    });

  }

  console.log(
    '[Visor3D] canvas mostrado'
  );
}


/* =========================================================
   OCULTAR MODELO
   ========================================================= */

function hideModel() {

  const canvas =
    document.getElementById(
      'ar-model-canvas'
    );

  if (!canvas) {
    return;
  }

  canvas.classList.remove(
    'visible'
  );

  canvas.style.display = 'none';

  console.log(
    '[Visor3D] modelo oculto'
  );
}


/* =========================================================
   CONTENIDO DINÁMICO POR EQUIPO
   ========================================================= */

function setCurrentTeam(teamId) {
  currentTeamId = teamId;
  renderTeamContent(teamId);
  updateTicketDisplays();

  // Cambiar el modelo 3D según el equipo detectado
  const team = (teamId && typeof TEAMS_DATA !== 'undefined')
    ? TEAMS_DATA[teamId]
    : null;

  const modelPath = (team && team.modelo) ? team.modelo : 'assets/pelota.glb';
  const viewer = initModelViewer();

  if (viewer && viewer.loadModel) {
    viewer.loadModel(modelPath);
  }
}

function clearCurrentTeam() {
  currentTeamId = null;
  renderTeamContent(null);
  updateTicketDisplays();
}

function renderTimeline(containerId, hitos) {
  const container = document.getElementById(containerId);

  if (!container) return;

  container.innerHTML = '';

  (hitos || []).forEach((h, i, arr) => {
    const item = document.createElement('div');
    item.className = 't-item';

    const isLast = i === arr.length - 1;

    item.innerHTML =
      '<div class="t-dot-col"><div class="t-dot"></div>' +
      (isLast ? '' : '<div class="t-line"></div>') +
      '</div>' +
      '<div><div class="t-year">' + h.anio + '</div>' +
      '<div class="t-text">' + h.texto + '</div></div>';

    container.appendChild(item);
  });
}

function renderTeamContent(teamId) {

  const team = (teamId && typeof TEAMS_DATA !== 'undefined')
    ? TEAMS_DATA[teamId]
    : null;

  /* ---------- Banner en Home ---------- */

  const banner = document.getElementById('active-team-banner');
  const bannerName = document.getElementById('active-team-name');
  const bannerIcon = document.getElementById('active-team-icon');

  if (banner) {
    banner.style.display = team ? 'flex' : 'none';
  }
  if (team && bannerName) bannerName.textContent = team.nombre;
  if (team && bannerIcon) bannerIcon.textContent = team.icono || '⚾';

  /* ---------- Historia ---------- */

  const histTitle = document.getElementById('history-team-title');

  if (histTitle) {
    histTitle.textContent = team
      ? 'Historia de ' + team.nombre
      : 'Historia del equipo (escanea un logo)';
  }

  renderTimeline(
    'history-team-timeline',
    team ? team.historia.hitos : []
  );

  renderTimeline(
    'history-league-timeline',
    (typeof LIGA_NACIONAL_HISTORIA !== 'undefined')
      ? LIGA_NACIONAL_HISTORIA.hitos
      : []
  );

  /* ---------- Video ---------- */

  const videoList = document.getElementById('video-list');

  if (videoList) {
    videoList.innerHTML = '';

    if (team && team.videos && team.videos.length) {
      team.videos.forEach((v) => {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.innerHTML =
          '<div class="video-thumb vt"><span class="play">▶</span></div>' +
          '<div class="video-meta"><div class="t">' + v.titulo + '</div>' +
          '<div class="d">' + (v.duracion || '') + '</div></div>';
        videoList.appendChild(card);
      });
    } else {
      videoList.innerHTML =
        '<div class="gal-empty">Escanea un logo para ver los videos del equipo.</div>';
    }
  }

  /* ---------- Stats ---------- */

  const statsList = document.getElementById('stats-list');

  if (statsList) {
    statsList.innerHTML = '';

    if (team && team.stats && team.stats.length) {
      const card = document.createElement('div');
      card.className = 'stat-card';

      team.stats.forEach((s) => {
        card.innerHTML +=
          '<div class="stat-row"><div class="stat-name">' + s.nombre +
          '</div><div class="stat-val">' + s.valor + '</div></div>' +
          '<div class="bar-bg"><div class="bar-fill" style="width:' +
          (s.pct || 0) + '%"></div></div>';
      });

      statsList.appendChild(card);
    } else {
      statsList.innerHTML =
        '<div class="gal-empty">Escanea un logo para ver las estadísticas del equipo.</div>';
    }
  }

  /* ---------- Galería ---------- */

  const galLabel = document.getElementById('gallery-team-label');

  if (galLabel) {
    galLabel.textContent = team
      ? 'Galería · ' + team.nombre
      : 'Galería';
  }

  console.log(
    '[Equipos] contenido actualizado para:',
    teamId || '(ninguno)'
  );
}


/* =========================================================
   EVENTOS MINDAR
   ========================================================= */

window.addEventListener(
  'DOMContentLoaded',
  () => {

    const targets =
      document.querySelectorAll('[id^="ar-target-"]');

    if (!targets.length) {

      console.error(
        '[MindAR] No se encontraron entidades ar-target-N'
      );

      return;
    }

    targets.forEach((target) => {

      const idx = parseInt(
        target.id.replace('ar-target-', ''),
        10
      );

      target.addEventListener(
        'targetFound',
        () => {

          const teamId =
            (typeof TEAM_BY_TARGET_INDEX !== 'undefined')
              ? TEAM_BY_TARGET_INDEX[idx]
              : null;

          const team =
            teamId && typeof TEAMS_DATA !== 'undefined'
              ? TEAMS_DATA[teamId]
              : null;

          console.log(
            '[MindAR] target encontrado, índice:', idx,
            '-> equipo:', teamId
          );

          setARStatus(
            team ? ('¡' + team.nombre + ' detectado!') : '¡Logo detectado!'
          );

          showModel();

          if (teamId) {
            setCurrentTeam(teamId);
          }
        }
      );

      target.addEventListener(
        'targetLost',
        () => {

          console.log(
            '[MindAR] target perdido, índice:', idx
          );

          setARStatus(
            'Apunta la cámara al logo para ver el modelo 3D'
          );

          hideModel();

          clearCurrentTeam();
        }
      );

    });

    // Estado inicial de las pantallas (sin equipo detectado todavía)
    renderTeamContent(null);
  }
);

/* =========================================================
   PAUSAR / REANUDAR ANIMACIÓN DEL MODELO
   ========================================================= */

function toggleModelAnimation(btnEl) {

  modelAnimationPaused = !modelAnimationPaused;

  if (btnEl) {
    btnEl.textContent = modelAnimationPaused
      ? '▶️ Reanudar'
      : '⏸️ Pausar';
  }

  console.log(
    '[Visor3D] animación',
    modelAnimationPaused ? 'pausada' : 'reanudada'
  );
}


/* =========================================================
   CONFETI SOBRE EL RECUADRO DEL MODELO
   ========================================================= */

function burstConfetti() {

  const canvas = document.getElementById('ar-confetti-canvas');
  const container = document.getElementById('ar-viewfinder');

  if (!canvas || !container) return;

  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;

  const ctx = canvas.getContext('2d');

  const colors = ['#C8352E', '#F2C94C', '#FFFFFF', '#6FCF97', '#4FC3F7'];

  const particles = Array.from({ length: 70 }, () => ({
    x: canvas.width / 2,
    y: canvas.height / 2,
    vx: (Math.random() - 0.5) * 9,
    vy: (Math.random() - 1.4) * 9,
    size: Math.random() * 5 + 3,
    color: colors[Math.floor(Math.random() * colors.length)],
    rot: Math.random() * 360,
    vrot: (Math.random() - 0.5) * 12
  }));

  let frame = 0;

  function tick() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {

      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.28;
      p.rot += p.vrot;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });

    frame++;

    if (frame < 75) {
      requestAnimationFrame(tick);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  tick();
}


/* =========================================================
   TICKETS POR EQUIPO (persistentes con localStorage)
   ========================================================= */

const TICKETS_STORAGE_KEY = 'diamondAR_tickets';

function loadTicketsFromStorage() {
  try {
    const raw = localStorage.getItem(TICKETS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.warn('[Tickets] No se pudo leer localStorage:', err);
    return {};
  }
}

function saveTicketsToStorage(ticketsByTeam) {
  try {
    localStorage.setItem(
      TICKETS_STORAGE_KEY,
      JSON.stringify(ticketsByTeam)
    );
  } catch (err) {
    console.warn('[Tickets] No se pudo guardar en localStorage:', err);
  }
}

// Objeto en memoria: { teamId: cantidadDeTickets }
let ticketsByTeam = loadTicketsFromStorage();

function getTicketsFor(teamId) {
  if (!teamId) return 0;
  return ticketsByTeam[teamId] || 0;
}

function addTicketFor(teamId) {
  if (!teamId) return;

  ticketsByTeam[teamId] = getTicketsFor(teamId) + 1;
  saveTicketsToStorage(ticketsByTeam);
  updateTicketDisplays();
}

function spendTicketFor(teamId) {
  if (!teamId || getTicketsFor(teamId) <= 0) return false;

  ticketsByTeam[teamId] = getTicketsFor(teamId) - 1;
  saveTicketsToStorage(ticketsByTeam);
  updateTicketDisplays();
  return true;
}

// Muestra el conteo de tickets DEL EQUIPO ACTUALMENTE ESCANEADO
function updateTicketDisplays() {
  const trivia = document.getElementById('trivia-ticket-count');
  const game = document.getElementById('game-ticket-count');
  const count = getTicketsFor(currentTeamId);

  if (trivia) trivia.textContent = count;
  if (game) game.textContent = count;
}

// Mezcla un array sin modificar el original (Fisher-Yates)
function shuffleArray(arr) {
  const copy = arr.slice();

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

// Toma N preguntas al azar del banco del equipo y también
// mezcla las opciones de cada una (reubicando la correcta).
function pickRandomTrivia(teamId, count) {
  const team = (teamId && typeof TEAMS_DATA !== 'undefined')
    ? TEAMS_DATA[teamId]
    : null;

  if (!team || !team.trivia || !team.trivia.length) {
    return [];
  }

  const elegidas = shuffleArray(team.trivia).slice(0, count);

  return elegidas.map((q) => {
    const opcionesConIndice = q.opciones.map((texto, i) => ({
      texto: texto,
      esCorrecta: i === q.correcta
    }));

    const mezcladas = shuffleArray(opcionesConIndice);

    return {
      pregunta: q.pregunta,
      opciones: mezcladas
    };
  });
}

function renderTrivia(teamId) {
  const container = document.getElementById('trivia-questions');

  if (!container) return;

  container.innerHTML = '';

  if (!teamId) {
    container.innerHTML =
      '<div class="gal-empty">Escanea un logo para jugar la trivia de ese equipo.</div>';
    return;
  }

  const preguntas = pickRandomTrivia(teamId, 5);

  if (!preguntas.length) {
    container.innerHTML =
      '<div class="gal-empty">Este equipo todavía no tiene preguntas cargadas.</div>';
    return;
  }

  preguntas.forEach((q, qIndex) => {

    const card = document.createElement('div');
    card.className = 'trivia-card';

    card.innerHTML =
      '<div class="trivia-q-num">Pregunta ' + (qIndex + 1) + '</div>' +
      '<div class="trivia-q-text">' + q.pregunta + '</div>' +
      '<div class="trivia-options"></div>';

    const optionsWrap = card.querySelector('.trivia-options');

    q.opciones.forEach((op) => {

      const optEl = document.createElement('div');
      optEl.className = 'trivia-option';
      optEl.textContent = op.texto;

      optEl.addEventListener('click', () => {

        if (card.dataset.answered === 'true') {
          return;
        }

        card.dataset.answered = 'true';

        optionsWrap.querySelectorAll('.trivia-option').forEach((el, i) => {
          if (q.opciones[i].esCorrecta) {
            el.classList.add('correct');
          }
        });

        if (op.esCorrecta) {
          optEl.classList.add('correct');
          addTicketFor(teamId);
        } else {
          optEl.classList.add('incorrect');
        }
      });

      optionsWrap.appendChild(optEl);
    });

    container.appendChild(card);
  });
}

/* =========================================================
   RULETA DE PREMIOS POR EQUIPO
   ========================================================= */

const PRIZES_STORAGE_KEY = 'diamondAR_prizes';

function loadPrizesFromStorage() {
  try {
    const raw = localStorage.getItem(PRIZES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.warn('[Premios] No se pudo leer localStorage:', err);
    return {};
  }
}

function savePrizesToStorage(obj) {
  try {
    localStorage.setItem(PRIZES_STORAGE_KEY, JSON.stringify(obj));
  } catch (err) {
    console.warn('[Premios] No se pudo guardar en localStorage:', err);
  }
}

let wonPrizesByTeam = loadPrizesFromStorage();
let wheelRotation = 0;
let wheelSpinning = false;

// Devuelve el ÍNDICE del premio elegido, respetando las probabilidades
function pickWeightedPrize(premios) {
  const total = premios.reduce((sum, p) => sum + p.probabilidad, 0);
  let r = Math.random() * total;

  for (let i = 0; i < premios.length; i++) {
    r -= premios[i].probabilidad;
    if (r < 0) return i;
  }

  return premios.length - 1;
}

// Texto oscuro sobre colores claros, blanco sobre colores oscuros
function textColorFor(hex) {
  const h = (hex || '#000000').replace('#', '');
  const r = parseInt(h.substr(0, 2), 16);
  const g = parseInt(h.substr(2, 2), 16);
  const b = parseInt(h.substr(4, 2), 16);
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

  return luminance > 150 ? '#0A1B33' : '#FFFFFF';
}

function setGameMessage(text, type) {
  const el = document.getElementById('game-result');

  if (!el) return;

  el.textContent = text || '';
  el.className = 'game-result' + (type ? ' ' + type : '');
}

function setSpinButtonState(disabled) {
  const btn = document.getElementById('spin-btn');

  if (btn) btn.disabled = !!disabled;
}

function renderWheel(teamId) {
  const wheel = document.getElementById('prize-wheel');

  if (!wheel) return;

  // Reiniciar posición sin animación
  wheel.style.transition = 'none';
  wheel.style.transform = 'rotate(0deg)';
  wheelRotation = 0;
  wheel.innerHTML = '';

  const team = (teamId && typeof TEAMS_DATA !== 'undefined')
    ? TEAMS_DATA[teamId]
    : null;

  if (!team || !team.premios || !team.premios.length) {
    wheel.style.background = '#1B3A66';
    return;
  }

  const n = team.premios.length;
  const seg = 360 / n;

  // Colores del equipo, alternando. Si n es impar, el último
  // segmento va en azul marino para no repetir color con el primero.
  const colors = team.premios.map((p, i) => {
    if (i === n - 1 && n % 2 === 1) return '#1B3A66';
    return i % 2 === 0 ? team.colorPrimario : team.colorAcento;
  });

  const stops = colors.map((c, i) =>
    c + ' ' + (i * seg) + 'deg ' + ((i + 1) * seg) + 'deg'
  );

  wheel.style.background = 'conic-gradient(' + stops.join(', ') + ')';

  team.premios.forEach((p, i) => {
    const angle = i * seg + seg / 2;

    const label = document.createElement('div');
    label.className = 'wheel-label';
    label.style.transform = 'rotate(' + angle + 'deg)';
    label.innerHTML =
      '<span style="color:' + textColorFor(colors[i]) + '">' +
      '<b class="wl-ic">' + p.icono + '</b>' + p.etiqueta +
      '</span>';

    wheel.appendChild(label);
  });
}

function renderWonPrizes(teamId) {
  const list = document.getElementById('won-prizes-list');
  const title = document.getElementById('won-prizes-title');

  if (!list) return;

  list.innerHTML = '';

  const team = (teamId && typeof TEAMS_DATA !== 'undefined')
    ? TEAMS_DATA[teamId]
    : null;

  if (title) {
    title.textContent = team ? 'Mis premios · ' + team.corto : 'Mis premios';
  }

  if (!team) {
    list.innerHTML =
      '<div class="gal-empty">Escanea un logo para ver tus premios de ese equipo.</div>';
    return;
  }

  const won = wonPrizesByTeam[teamId] || [];

  if (!won.length) {
    list.innerHTML =
      '<div class="gal-empty">Aún no has ganado premios con este equipo.</div>';
    return;
  }

  // Agrupar por tipo de premio: "Gorra oficial de X  ×2"
  const grouped = {};

  won.forEach((w) => {
    if (!grouped[w.id]) {
      grouped[w.id] = { icono: w.icono, descripcion: w.descripcion, count: 0 };
    }
    grouped[w.id].count += 1;
  });

  Object.keys(grouped).forEach((id) => {
    const g = grouped[id];
    const item = document.createElement('div');

    item.className = 'prize-item';
    item.innerHTML =
      '<span class="prize-ic">' + g.icono + '</span>' +
      '<div class="prize-name">' + g.descripcion + '</div>' +
      '<span class="prize-count">×' + g.count + '</span>';

    list.appendChild(item);
  });
}

function renderGame(teamId) {
  // Si la ruleta está girando, no tocarla
  if (wheelSpinning) return;

  const team = (teamId && typeof TEAMS_DATA !== 'undefined')
    ? TEAMS_DATA[teamId]
    : null;

  const title = document.getElementById('game-wheel-title');
  const odds = document.getElementById('game-odds');

  if (title) {
    title.textContent = team ? 'Ruleta de ' + team.nombre : 'Ruleta de premios';
  }

  renderWheel(teamId);
  renderWonPrizes(teamId);

  if (odds) {
    odds.textContent = team
      ? 'Probabilidades: ' + team.premios.map((p) => p.etiqueta + ' ' + p.probabilidad + '%').join(' · ')
      : '';
  }

  setGameMessage(
    team ? '' : 'Escanea un logo para jugar la ruleta de ese equipo.',
    ''
  );

  setSpinButtonState(!team);
}

function spinWheel() {

  if (wheelSpinning) return;

  const teamId = currentTeamId;

  const team = (teamId && typeof TEAMS_DATA !== 'undefined')
    ? TEAMS_DATA[teamId]
    : null;

  if (!team || !team.premios || !team.premios.length) {
    setGameMessage('Escanea un logo para jugar la ruleta de ese equipo.', '');
    return;
  }

  if (getTicketsFor(teamId) <= 0) {
    setGameMessage(
      'No tienes tickets de ' + team.corto + '. ¡Gana más en la Trivia!',
      ''
    );
    return;
  }

  // Cobrar el ticket ANTES de girar
  if (!spendTicketFor(teamId)) return;

  wheelSpinning = true;
  setSpinButtonState(true);
  setGameMessage('Girando…', '');

  // 1) Elegir el premio según las probabilidades
  const idx = pickWeightedPrize(team.premios);

  // 2) Calcular a dónde debe girar la ruleta para caer en ese segmento
  //    (el puntero está arriba; el segmento i ocupa [i*seg, (i+1)*seg])
  const n = team.premios.length;
  const seg = 360 / n;
  const center = idx * seg + seg / 2;
  const jitter = (Math.random() - 0.5) * (seg - 16);   // no caer justo en la orilla
  const base = Math.ceil(wheelRotation / 360) * 360;

  wheelRotation = base + 360 * 5 + (360 - center) + jitter;

  const wheel = document.getElementById('prize-wheel');

  if (wheel) {
    wheel.style.transition = 'transform 4s cubic-bezier(0.12, 0.67, 0.14, 1)';
    wheel.style.transform = 'rotate(' + wheelRotation + 'deg)';
  }

  // 3) Al terminar la animación, mostrar el resultado
  setTimeout(() => {

    const premio = team.premios[idx];

    wheelSpinning = false;

    if (premio.tipo === 'nada') {
      setGameMessage('😅 Esta vez no hubo suerte. ¡Sigue intentando!', 'lose');
    } else {
      if (!wonPrizesByTeam[teamId]) wonPrizesByTeam[teamId] = [];

      wonPrizesByTeam[teamId].push({
        id: premio.id,
        icono: premio.icono,
        descripcion: premio.descripcion,
        fecha: new Date().toISOString()
      });

      savePrizesToStorage(wonPrizesByTeam);

      setGameMessage('🎉 ¡Ganaste: ' + premio.descripcion + '!', 'win');
    }

    renderWonPrizes(teamId);
    setSpinButtonState(false);

  }, 4200);
}

// Inicializar los contadores de tickets visibles en pantalla
updateTicketDisplays();