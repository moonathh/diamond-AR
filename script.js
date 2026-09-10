function go(name){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('screen-'+name).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active', b.dataset.s===name));
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