import * as THREE from 'three';
export function mountOrbit(host: HTMLElement) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x0b0d12, 0);
  renderer.domElement.setAttribute('aria-hidden', 'true');
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, .1, 100);
  camera.position.set(0, 0, 8.3);
  const group = new THREE.Group();
  scene.add(group);
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];
  for (let strand = 0; strand < 11; strand++) {
    const points = Array.from({ length: 180 }, (_, i) => {
      const a = i / 179 * Math.PI * 2;
      const r = 2 + Math.sin(a * 3 + strand * .15) * .13 + strand * .024;
      return new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r * .62, Math.sin(a * 2 + strand * .22) * .42);
    });
    const curve = new THREE.CatmullRomCurve3(points, true);
    const geometry = new THREE.TubeGeometry(curve, 180, strand === 5 ? .018 : .006, 5, true);
    const material = new THREE.ShaderMaterial({ transparent: true, uniforms: { warm: { value: new THREE.Color('#F4A261') }, cool: { value: new THREE.Color('#8B79E6') }, strength: { value: strand === 5 ? 1 : .55 } }, vertexShader: 'varying vec3 vPosition; void main(){vPosition=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}', fragmentShader: 'uniform vec3 warm; uniform vec3 cool; uniform float strength; varying vec3 vPosition; void main(){float mixValue=smoothstep(-1.4,1.8,vPosition.x);vec3 color=mix(cool,warm,mixValue);gl_FragColor=vec4(color,strength);}' });
    geometries.push(geometry); materials.push(material);
    group.add(new THREE.Mesh(geometry, material));
  }
  const grid = new THREE.GridHelper(14, 22, 0x34323b, 0x20232b);
  grid.position.y = -1.8; grid.rotation.x = .2;
  scene.add(grid);
  geometries.push(grid.geometry); materials.push(...(Array.isArray(grid.material) ? grid.material : [grid.material]));
  let frame = 0, visible = true, angle = 0, running = true, last = 0;
  function render(time = 0) {
    const delta = Math.min((time - last) / 1000, .05); last = time;
    const motion = document.documentElement.dataset.motion !== 'off' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (motion) angle += delta * .07;
    group.rotation.set((Number(host.dataset.tilt ?? 35) - 35) / 75, angle, -.35);
    renderer.render(scene, camera);
    if (running && visible && motion && !document.hidden) frame = requestAnimationFrame(render);
    else frame = 0;
  }
  function resume() { if (!frame && running) { last = performance.now(); render(last); } }
  const resize = new ResizeObserver(() => { const { width, height } = host.getBoundingClientRect(); renderer.setSize(width, height); camera.aspect = width / Math.max(height, 1); camera.updateProjectionMatrix(); resume(); });
  resize.observe(host);
  const visibility = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; if (visible) resume(); else { cancelAnimationFrame(frame); frame = 0; } });
  visibility.observe(host);
  const attributes = new MutationObserver(resume); attributes.observe(host, { attributes: true, attributeFilter: ['data-tilt'] });
  document.addEventListener('visibilitychange', resume); window.addEventListener('orbit-motion-change', resume);
  return () => { running = false; cancelAnimationFrame(frame); resize.disconnect(); visibility.disconnect(); attributes.disconnect(); document.removeEventListener('visibilitychange', resume); window.removeEventListener('orbit-motion-change', resume); geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose()); renderer.dispose(); renderer.domElement.remove(); };
}
