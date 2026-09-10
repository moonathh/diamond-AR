function go(name){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('screen-'+name).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active', b.dataset.s===name));
  if(name !== 'ar') stopAR();
}

/* ---- Cámara AR (MindAR + A-Frame) ---- */
let arRunning = false;

function setARStatus(msg, isError){
  const el = document.getElementById('ar-status');
  if(!el) return;
  if(!msg){ el.classList.add('hidden'); return; }
  el.textContent = msg;
  el.classList.remove('hidden');
  el.classList.toggle('error', !!isError);
}

function getARSystem(){
  const scene = document.querySelector('#ar-scene');
  if(!scene) return null;
  return scene.systems && scene.systems['mindar-image-system'];
}

async function toggleAR(){
  if(arRunning){ stopAR(); return; }
  await startAR();
}

async function startAR(){
  const scene = document.querySelector('#ar-scene');
  const btn = document.getElementById('ar-scan-btn');
  if(!scene){
    setARStatus('No se encontró la escena AR.', true);
    return;
  }

  setARStatus('Solicitando acceso a la cámara…');

  const doStart = async () => {
    try{
      const system = getARSystem();
      if(!system) throw new Error('Sistema MindAR no disponible');
      await system.start();
      arRunning = true;
      setARStatus('Apunta la cámara al logo para ver el modelo 3D');
      if(btn) btn.textContent = 'DETENER CÁMARA';
    }catch(err){
      arRunning = false;
      if(err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError'){
        setARStatus('Permiso de cámara denegado. Habilítalo en la configuración del navegador.', true);
      }else if(err.name === 'NotFoundError'){
        setARStatus('No se encontró ninguna cámara en este dispositivo.', true);
      }else{
        setARStatus('No se pudo iniciar el AR: ' + err.message, true);
      }
    }
  };

  if(scene.hasLoaded){
    await doStart();
  }else{
    scene.addEventListener('loaded', doStart, { once: true });
  }
}

function stopAR(){
  const btn = document.getElementById('ar-scan-btn');
  const system = getARSystem();
  if(system && arRunning) system.stop();
  arRunning = false;
  hideModel();
  if(btn) btn.textContent = 'ESCANEAR OBJETO';
  setARStatus('Toca "Escanear objeto" para activar la cámara');
}

function setARFilter(el, cls){
  el.parentElement.querySelectorAll('.filter-chip').forEach(c=>c.classList.remove('active'));
  el.classList.add('active');
  const canvas = document.querySelector('#ar-scene canvas');
  if(canvas) canvas.style.filter = filterCss(cls);
}

function setVFilter(el, cls){
  el.parentElement.querySelectorAll('.filter-chip').forEach(c=>c.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('.vt').forEach(v=>{ v.style.filter = filterCss(cls); });
}
function filterCss(cls){
  switch(cls){
    case 'f-blur': return 'blur(2px)';
    case 'f-pixel': return 'contrast(1.4) saturate(1.3)';
    case 'f-thermal': return 'hue-rotate(160deg) saturate(3) brightness(1.1)';
    case 'f-pastel': return 'saturate(0.6) brightness(1.2)';
    default: return 'none';
  }
}

/* ---- Visor 3D independiente (Three.js puro, superpuesto sobre la cámara) ---- */
let modelViewer = null;

function initModelViewer(){
  if(modelViewer) return modelViewer;
  const canvas = document.getElementById('ar-model-canvas');
  if(!canvas || typeof THREE === 'undefined') return null;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio || 1);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 3);

  scene.add(new THREE.AmbientLight(0xffffff, 1.2));
  const dir = new THREE.DirectionalLight(0xffffff, 1);
  dir.position.set(2, 3, 4);
  scene.add(dir);

  let modelRoot = null;

  function resize(){
    const w = canvas.clientWidth || canvas.parentElement.clientWidth;
    const h = canvas.clientHeight || canvas.parentElement.clientHeight;
    if(w === 0 || h === 0) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();

  const loader = new THREE.GLTFLoader();
  loader.load(
    'assets/pelota.glb',
    (gltf) => {
      modelRoot = gltf.scene;

      const box = new THREE.Box3().setFromObject(modelRoot);
      const size = new THREE.Vector3();
      box.getSize(size);
      const center = new THREE.Vector3();
      box.getCenter(center);
      const maxDim = Math.max(size.x, size.y, size.z) || 1;
      const targetSize = 1.4;
      const s = targetSize / maxDim;

      modelRoot.position.sub(center);
      modelRoot.scale.setScalar(s);

      scene.add(modelRoot);
      console.log('[Visor3D] modelo .glb cargado correctamente');
    },
    undefined,
    (err) => console.error('[Visor3D] error cargando el modelo .glb:', err)
  );

  function animate(){
    requestAnimationFrame(animate);
    if(modelRoot) modelRoot.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();

  modelViewer = { canvas, resize };
  return modelViewer;
}

function showModel(){
  const viewer = initModelViewer();
  const canvas = document.getElementById('ar-model-canvas');
  if(viewer) viewer.resize();
  if(canvas) canvas.classList.add('visible');
}

function hideModel(){
  const canvas = document.getElementById('ar-model-canvas');
  if(canvas) canvas.classList.remove('visible');
}

window.addEventListener('DOMContentLoaded', () => {
  const target = document.querySelector('#ar-target');
  if(target){
    target.addEventListener('targetFound', () => {
      console.log('[MindAR] target encontrado');
      setARStatus('¡Logo detectado!');
      showModel();
    });
    target.addEventListener('targetLost', () => {
      console.log('[MindAR] target perdido');
      setARStatus('Apunta la cámara al logo para ver el modelo 3D');
      hideModel();
    });
  }
});
