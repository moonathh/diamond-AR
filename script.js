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
    antialias: true,
    preserveDrawingBuffer: true
  });

  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio || 1, 2)
  );

  // Fondo completamente transparente
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

  // La cámara mira hacia el centro
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
     CARGAR .GLB
     ------------------------------------------------------- */

  console.log(
    '[Visor3D] Cargando assets/pelota.glb...'
  );

  loader.load(

    'assets/pelota.glb',

    /* ------------------------
       ÉXITO
       ------------------------ */

    (gltf) => {

      modelRoot = gltf.scene;

      console.log(
        '[Visor3D] modelo .glb cargado correctamente'
      );

      console.log(
        '[Visor3D] modelo:',
        modelRoot
      );


      /* -----------------------------------
         Activar todos los objetos Mesh
         ----------------------------------- */

      modelRoot.traverse(
        (object) => {

          if (object.isMesh) {

            object.visible = true;

            object.frustumCulled = false;

          }
        }
      );


      /* -----------------------------------
         CALCULAR DIMENSIONES
         ----------------------------------- */

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


      /* -----------------------------------
         CALCULAR ESCALA
         ----------------------------------- */

      const maxDim = Math.max(
        size.x,
        size.y,
        size.z
      ) || 1;

      const targetSize = 1.5;

      const scale =
        targetSize / maxDim;


      /* -----------------------------------
         CENTRAR MODELO
         ----------------------------------- */

      modelRoot.position.sub(center);

      modelRoot.scale.setScalar(
        scale
      );


      /*
       * IMPORTANTE:
       *
       * El modelo queda en:
       *
       * X = 0
       * Y = 0
       * Z = 0
       *
       * Por eso aparece exactamente
       * en el centro del visor.
       */

      modelRoot.position.x = 0;
      modelRoot.position.y = -0.38;
      modelRoot.position.z = 0;

      modelRoot.rotation.y = -Math.PI / 2;


      /* -----------------------------------
         AGREGAR A LA ESCENA
         ----------------------------------- */

      scene.add(modelRoot);


      console.log(
        '[Visor3D] modelo listo y centrado'
      );


      // Recalcular tamaño
      resize();

    },


    /* ------------------------
       PROGRESO
       ------------------------ */

    undefined,


    /* ------------------------
       ERROR
       ------------------------ */

    (error) => {

      console.error(
        '[Visor3D] Error cargando modelo .glb:',
        error
      );

    }
  );


  /* -------------------------------------------------------
     ANIMACIÓN
     ------------------------------------------------------- */

  function animate() {

    requestAnimationFrame(
      animate
    );

    if (modelRoot && !modelAnimationPaused) {

      // Rotar lentamente (solo si no está pausado)
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
    resize: resize
  };


  // Primer resize
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


  /* -----------------------------------
     Mostrar canvas
     ----------------------------------- */

  canvas.classList.add(
    'visible'
  );


  /*
   * Forzar que el canvas quede
   * por encima de la cámara
   */

  canvas.style.display = 'block';
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '999';


  /* -----------------------------------
     Redimensionar después de mostrarlo
     ----------------------------------- */

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
   EVENTOS MINDAR
   ========================================================= */

window.addEventListener(
  'DOMContentLoaded',
  () => {

    const target =
      document.querySelector(
        '#ar-target'
      );

    if (!target) {

      console.error(
        '[MindAR] No se encontró #ar-target'
      );

      return;
    }


    /* -----------------------------------
       LOGO ENCONTRADO
       ----------------------------------- */

    target.addEventListener(
      'targetFound',
      () => {

        console.log(
          '[MindAR] target encontrado'
        );

        setARStatus(
          '¡Logo detectado!'
        );

        showModel();

      }
    );


    /* -----------------------------------
       LOGO PERDIDO
       ----------------------------------- */

    target.addEventListener(
      'targetLost',
      () => {

        console.log(
          '[MindAR] target perdido'
        );

        setARStatus(
          'Apunta la cámara al logo para ver el modelo 3D'
        );

        hideModel();

      }
    );

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
   CAPTURA DE FOTO (cámara + modelo 3D + filtro activo)
   ========================================================= */

function captureAR() {

  if (!arRunning) {
    setARStatus('Activa la cámara antes de capturar.', true);
    return;
  }

  const videoCanvas = document.querySelector('#ar-scene canvas');
  const modelCanvas = document.getElementById('ar-model-canvas');
  const viewfinder = document.getElementById('ar-viewfinder');

  if (!videoCanvas || !viewfinder) {
    setARStatus('No se pudo capturar la imagen.', true);
    return;
  }

  const width = viewfinder.clientWidth;
  const height = viewfinder.clientHeight;

  const out = document.createElement('canvas');
  out.width = width;
  out.height = height;

  const ctx = out.getContext('2d');

  // El filtro activo (CSS) se re-aplica sobre el canvas final
  const activeFilter = videoCanvas.style.filter || 'none';

  try {

    // 1. Fondo: feed de la cámara (dibujado por MindAR/A-Frame)
    ctx.filter = activeFilter;
    ctx.drawImage(videoCanvas, 0, 0, width, height);

    // 2. Encima: el modelo 3D, solo si está visible en este momento
    if (modelCanvas && modelCanvas.classList.contains('visible')) {
      ctx.filter = activeFilter;
      ctx.drawImage(modelCanvas, 0, 0, width, height);
    }

    ctx.filter = 'none';

    const dataUrl = out.toDataURL('image/png');

    saveCapture(dataUrl);
    flashCaptureEffect();

    setARStatus('¡Captura guardada en tu galería!');

  } catch (err) {

    // Esto ocurre típicamente por un canvas "contaminado" (tainted)
    // si el feed de cámara o el modelo cargan recursos sin CORS habilitado.
    console.error('[Captura] Error al generar la imagen:', err);

    setARStatus(
      'No se pudo guardar la captura (error de seguridad del navegador).',
      true
    );
  }
}

function flashCaptureEffect() {

  const vf = document.getElementById('ar-viewfinder');

  if (!vf) return;

  const flash = document.createElement('div');

  flash.style.position = 'absolute';
  flash.style.inset = '0';
  flash.style.background = '#ffffff';
  flash.style.opacity = '0.85';
  flash.style.zIndex = '2000';
  flash.style.pointerEvents = 'none';
  flash.style.transition = 'opacity 0.35s ease';

  vf.appendChild(flash);

  requestAnimationFrame(() => {
    flash.style.opacity = '0';
  });

  setTimeout(() => flash.remove(), 400);
}


/* =========================================================
   GALERÍA (persistida en localStorage)
   ========================================================= */

const GALLERY_KEY = 'diamondar_gallery';

function loadGallery() {

  try {
    return JSON.parse(localStorage.getItem(GALLERY_KEY)) || [];
  } catch (err) {
    console.warn('[Galería] No se pudo leer el almacenamiento:', err);
    return [];
  }
}

function saveCapture(dataUrl) {

  const gallery = loadGallery();

  gallery.unshift({
    img: dataUrl,
    ts: Date.now()
  });

  try {
    localStorage.setItem(GALLERY_KEY, JSON.stringify(gallery));
  } catch (err) {
    // Almacenamiento lleno u otro error: seguimos mostrando la captura
    // en memoria para esta sesión aunque no se persista.
    console.warn('[Galería] No se pudo guardar en localStorage:', err);
  }

  renderGallery();
  updateGalleryCount();
}

function deleteCapture(index) {

  const gallery = loadGallery();

  gallery.splice(index, 1);

  try {
    localStorage.setItem(GALLERY_KEY, JSON.stringify(gallery));
  } catch (err) {
    console.warn('[Galería] No se pudo actualizar el almacenamiento:', err);
  }

  renderGallery();
  updateGalleryCount();
}

function updateGalleryCount() {

  const count = loadGallery().length;

  const sub = document.querySelector('#screen-home .menu-card .sub');

  if (sub) {
    sub.textContent = count + (count === 1 ? ' captura' : ' capturas');
  }
}

function renderGallery() {

  const screen = document.getElementById('screen-gallery');

  if (!screen) return;

  const gallery = loadGallery();

  let grid = screen.querySelector('.gal-grid');
  const empty = screen.querySelector('.gal-empty');

  if (gallery.length === 0) {

    if (grid) grid.remove();
    if (empty) empty.style.display = '';

    return;
  }

  if (empty) empty.style.display = 'none';

  if (!grid) {
    grid = document.createElement('div');
    grid.className = 'gal-grid';
    screen.appendChild(grid);
  }

  grid.innerHTML = '';

  gallery.forEach((item, i) => {

    const cell = document.createElement('div');
    cell.className = 'gal-cell';

    const img = document.createElement('img');
    img.src = item.img;
    img.alt = 'Captura AR';

    const del = document.createElement('button');
    del.className = 'gal-del';
    del.textContent = '✕';
    del.setAttribute('aria-label', 'Eliminar captura');
    del.onclick = (e) => {
      e.stopPropagation();
      deleteCapture(i);
    };

    const dl = document.createElement('a');
    dl.className = 'gal-dl';
    dl.textContent = '⬇︎';
    dl.href = item.img;
    dl.download = 'diamondar-captura-' + item.ts + '.png';
    dl.setAttribute('aria-label', 'Descargar captura');

    cell.appendChild(img);
    cell.appendChild(del);
    cell.appendChild(dl);
    grid.appendChild(cell);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  renderGallery();
  updateGalleryCount();
});