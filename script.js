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
      modelRoot.position.y = -0.35;
      modelRoot.position.z = 0;


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

    if (modelRoot) {

      // Rotar lentamente
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