function go(name){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('screen-'+name).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active', b.dataset.s===name));
  if(name !== 'ar') stopAR();
}

/* ---- Cámara AR ---- */
let arStream = null;

function setARStatus(msg, isError){
  const el = document.getElementById('ar-status');
  if(!el) return;
  if(!msg){ el.classList.add('hidden'); return; }
  el.textContent = msg;
  el.classList.remove('hidden');
  el.classList.toggle('error', !!isError);
}

async function toggleAR(){
  if(arStream){ stopAR(); return; }
  await startAR();
}

async function startAR(){
  const video = document.getElementById('ar-video');
  const btn = document.getElementById('ar-scan-btn');

  if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
    setARStatus('Tu navegador no soporta acceso a la cámara.', true);
    return;
  }

  setARStatus('Solicitando acceso a la cámara…');

  try{
    arStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: 'environment' } },
      audio: false
    });
    video.srcObject = arStream;
    await video.play();
    setARStatus('');
    if(btn) btn.textContent = 'DETENER CÁMARA';
  }catch(err){
    arStream = null;
    if(err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError'){
      setARStatus('Permiso de cámara denegado. Habilítalo en la configuración del navegador.', true);
    }else if(err.name === 'NotFoundError'){
      setARStatus('No se encontró ninguna cámara en este dispositivo.', true);
    }else{
      setARStatus('No se pudo acceder a la cámara: ' + err.message, true);
    }
  }
}

function stopAR(){
  const video = document.getElementById('ar-video');
  const btn = document.getElementById('ar-scan-btn');
  if(arStream){
    arStream.getTracks().forEach(t => t.stop());
    arStream = null;
  }
  if(video) video.srcObject = null;
  if(btn) btn.textContent = 'ESCANEAR OBJETO';
  setARStatus('Toca "Escanear objeto" para activar la cámara');
}

function setARFilter(el, cls){
  el.parentElement.querySelectorAll('.filter-chip').forEach(c=>c.classList.remove('active'));
  el.classList.add('active');
  const video = document.getElementById('ar-video');
  if(video) video.style.filter = filterCss(cls);
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