import * as THREE from './three.module.js';
import { OBJLoader } from './OBJLoader.js';
import handVertex from './hand-vertex.js';
import handFragment from './hand-fragment.js';

const base = new URL('./', location.href.endsWith('/') ? location.href : new URL('.', location.href));
const asset = name => new URL(name, base).href;
const mail = (subject, text = 'Enquire by email') => `<a class="folio-link" href="mailto:josephshen0831@gmail.com?subject=${encodeURIComponent(subject)}">${text} <span aria-hidden="true">↗</span></a>`;
const picture = (name, alt, caption, cls = '') => `<figure class="folio-figure ${cls}"><img src="${asset('' + name)}" alt="${alt}" loading="lazy" decoding="async">${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`;
const video = (name, poster, label) => `<figure class="folio-figure"><video controls playsinline preload="none" poster="${asset('' + poster)}" aria-label="${label}"><source src="${asset('' + name)}" type="video/mp4"></video><figcaption>${label}</figcaption></figure>`;

const content = {
  media: `<header class="folio-heading"><p class="folio-eyebrow">Selected performances / 01</p><h2 id="folio-title">Media</h2><p class="folio-lead">Before circuits and controllers,<br>there were six strings.</p></header>
    <section class="media-feature"><div class="performance-title"><span class="folio-eyebrow">01 / Guitar performance</span><h3>Midwest Emo No.3</h3></div>${video('midwest-emo-no-3.mp4', 'midwest-emo-no-3.jpg', 'Midwest Emo No.3 · Joseph Yutong Shen')}<div class="folio-caption"><span>THE FIRST INSTRUMENT</span><p>My relationship with music began with the guitar: learning to listen, shaping a phrase, and finding expression in the smallest movement.</p></div></section>
    <section class="media-feature"><div class="performance-title"><span class="folio-eyebrow">02 / Guitar performance</span><h3>Just the Two of Us</h3></div>${video('just-the-two-of-us.mp4', 'just-the-two-of-us.jpg', 'Just the Two of Us · Joseph Yutong Shen')}</section>
    <div class="media-pair">${picture('guitar-stage.jpg', 'Joseph performing classical guitar under a blue spotlight', 'On stage · Classical guitar')}${picture('guitar-childhood.jpg', 'Joseph as a child holding a classical guitar', 'The first chapter · A life with six strings')}</div>`,
  store: `<header class="folio-heading"><p class="folio-eyebrow">Objects, instruments & sounds / 02</p><h2 id="folio-title">E-Store</h2><p class="folio-lead">Breathe into sound.<br>Find rhythm in a room.</p><p class="folio-note">Independent projects by Joseph Yutong Shen. For availability and purchase enquiries, get in touch.</p></header>
    <nav class="store-index" aria-label="Explore projects"><a href="#breath-studio">01 / Breath Studio</a><a href="#studio-riff">02 / Studio Riff</a></nav>
    <article id="breath-studio" class="store-project"><div class="project-title"><span class="folio-eyebrow">01 / Expressive MIDI system</span><h3>Breath Studio</h3><span class="project-status">Custom prototype</span></div>
    <p class="project-intro">An expressive MIDI control system that turns breath and movement into musical gestures.</p>
    ${video('breath-demo.mp4', 'breath-demo.jpg', 'Breath & movement · A performance study by Joseph Shen')}
    <div class="project-columns"><div><p>Breath Studio combines a custom USB breath controller, a Robin motion controller with an inertial sensor, and a companion macOS application. Together, they allow musicians to shape sound through breathing, tilting, and moving, creating a more physical connection between the performer and digital music software.</p><p>Designed for musicians, producers, live performers, and interactive sound artists, the system makes gestures part of the instrument. Breath can shape the intensity of an effect, while movement controls brightness, spatial position, or modulation.</p>${mail('Breath Studio — availability enquiry', 'Enquire about Breath Studio')}</div>${picture('breath-hardware.jpg', 'USB breath controller in front of a SWAM Soprano Sax instrument interface', 'The breath controller · Virtual-instrument workflow')}</div>
    ${picture('breath-app.jpg', 'Breath Studio macOS companion application with response curve and Robin motion mappings', 'The companion macOS application · Breath response and Robin motion controls', 'app-figure')}
    <div class="project-details">
      <details open><summary>Breath control <span>01</span></summary><div><p>The breath controller translates changes in breath pressure into MIDI Control Change messages. The companion application calibrates the incoming range and maps it to an output range of <strong>0–127</strong>, making the signal usable with assignable parameters in music software.</p><p>The adjustable <strong>Breath effort</strong> curve changes the relationship between breath strength and musical response. A lighter setting makes gentle breaths produce larger parameter changes; a stronger setting requires more pressure to reach the maximum.</p><p>For example, breath can control an effect’s Dry/Wet balance: no breath produces a dry signal, gentle breathing introduces a little processing, and stronger breathing increases the effect. The same approach can shape instrument expression, filter cutoff, or vibrato depth.</p></div></details>
      <details><summary>Motion control <span>02</span></summary><div><p>Robin adds movement as a second source of expression. Its current firmware provides three tilt-related signals and an acceleration signal. These can be assigned independently to different aspects of a sound.</p><p>A performer could use breath to increase distortion while tilting Robin to adjust a filter, or combine breath-controlled expression with movement-controlled vibrato. These are possible mappings, not fixed functions: the receiving software defines each gesture’s musical role.</p></div></details>
      <details><summary>The companion application <span>03</span></summary><div><p>Both controllers come together in an English-language macOS interface with a restrained black-and-white palette and ink-inspired graphics. Live input values, MIDI output values, and a response-curve display make each gesture visible.</p><ul><li>Adjustable breath sensitivity and response curves.</li><li>Input calibration and configurable output limits.</li><li>A single selectable MIDI output channel for breath.</li><li>Configurable CC numbers, rather than a fixed CC11 assignment.</li><li>Input learning to identify the controller’s incoming CC.</li><li>MIDI Learn for assigning controls in a DAW.</li><li>Separate motion mappings for Robin.</li><li>Local preset saving, import, and export.</li></ul></div></details>
      <details><summary>Connection to music software <span>04</span></summary><div><p class="signal-path">Breath or movement → USB MIDI → Breath Studio → DAW or instrument parameter</p><p>Breath Studio exposes processed MIDI ports to music applications. The receiving application determines which parameter each CC controls.</p><p>The established Ableton mapping uses breath output on <strong>channel 1, CC1</strong> to control <strong>Saturator Dry/Wet on the “jh” audio track</strong>. Robin’s outputs remain independently assignable. The system is also intended for expressive virtual-instrument workflows, including MIDI assignment within instruments such as SWAM.</p></div></details>
      <details><summary>Product direction & current status <span>05</span></summary><div><p>Breath Studio’s central idea is to make digital sound control feel embodied and personal. Breathing offers an intuitive way to shape intensity; movement adds another layer of expression.</p><p>The current product is a custom prototype comprising two hardware controllers and a unified application. Hardware input reliability and sustained end-to-end performance still need further validation.</p></div></details>
    </div></article>
    <article id="studio-riff" class="store-project riff-project"><div class="project-title"><span class="folio-eyebrow">02 / Sample-based composition</span><h3>Studio Riff</h3><span class="project-status">Reggae experiment</span></div>
    <div class="riff-layout">${picture('studio.jpg', 'Joseph’s recording studio with instruments, mixing consoles and acoustic treatment', 'The room that became an instrument')}<div><p class="project-intro">A room, reassembled<br>as rhythm.</p><p>This sample-based piece begins inside my own recording studio. Sounds recorded in the room are cut, layered, and reshaped into a reggae-inspired groove. A passage from a Japanese folk song I love threads through the arrangement, bringing a familiar melodic memory into a new rhythmic setting.</p><p>The piece explores how everyday sounds and musical fragments can take on another life when they are sampled, rearranged, and heard together.</p><div class="riff-player"><span class="folio-eyebrow">Listen / Studio Riff</span><audio controls preload="none" src="${asset('studio-riff.mp3')}" aria-label="Listen to Studio Riff"></audio></div>${mail('Studio Riff — enquiry', 'Enquire about the project')}<p class="folio-note">Includes a third-party song excerpt. Sample clearance is required before any commercial release or licensing.</p></div></div>
    ${picture('riff-session.jpg', 'Multitrack arrangement of the sample-based reggae composition', 'Inside the session · Studio recordings, chopped samples and layered rhythm')}</article>`,
  events: `<header class="events-heading"><p class="folio-eyebrow">Experiments in sound / 03</p><h2 id="folio-title" class="sr-only">JosephShen · Events</h2><img class="joseph-wordmark" src="${asset('joseph-wordmark.png')}" alt="JosephShen"></header>
    <div class="event-art">${picture('event-art.png', 'Chinese typographic artwork selected by Joseph Shen', '')}<div class="event-copy"><span class="folio-eyebrow">Next chapter</span><h3>Coming<br><em>soon.</em></h3><p>Breath Studio</p><p class="folio-note">An introduction to breath, movement,<br>and a different way of making sound.</p>${mail('Breath Studio — upcoming introduction', 'Ask about the upcoming introduction')}</div></div>`
};

async function initialize() {
  const gate = document.querySelector('.earth-gate');
  if (!gate || document.querySelector('.folio-nav')) return;
  document.body.classList.add('portfolio-edition');
  document.title = 'Joseph Shen — Music, Technology & Experiments';
  document.getElementById('folio-boot')?.remove();
  const enter = gate.querySelector('.gate-enter');
  gate.querySelector('.gate-copy').replaceChildren(enter);
  enter.textContent = 'ENTER';
  const loader = document.createElement('span');
  loader.className = 'folio-entry-line';
  loader.setAttribute('aria-hidden', 'true');
  gate.prepend(loader);

  const oldHand = document.querySelector('.creator-hand');
  const about = document.querySelector('.creator-panel');
  const aboutIntro = document.createElement('div');
  aboutIntro.className = 'about-biography';
  aboutIntro.innerHTML = `<p class="folio-eyebrow">About / Joseph Yutong Shen</p><p>I’m a high-school senior exploring the space where music and technology meet. This website brings together work I have made during my high-school years: performances, compositions, sampled sounds, and experiments with expressive musical interfaces.</p><p>I began with the guitar, drawn to the way a small change in touch could transform a phrase. Over time, that curiosity grew beyond the strings. I started asking how breathing, movement, code, and electronics might become part of the same musical conversation.</p><p>Today, I’m interested in building instruments and experiences that make digital music feel physical, personal, and open to discovery.</p>`;
  about.querySelector('.creator-pullquote').after(aboutIntro);
  about.querySelector('.creator-kicker').textContent = 'About';
  about.querySelector('.creator-portrait-note').textContent = 'Student · Musician · Creative technologist';

  const nav = document.createElement('nav');
  nav.className = 'folio-nav';
  nav.setAttribute('aria-label', 'Portfolio navigation');
  const keys = ['store', 'media', 'events', 'about'];
  nav.innerHTML = keys.map((key, i) => `<button class="folio-hand folio-hand-${key}" data-panel="${key}" aria-label="Open ${key === 'store' ? 'E-Store' : key}" aria-expanded="false"><span class="hand-fallback" aria-hidden="true">☞</span><span class="hand-label">${['E-STORE', 'MEDIA', 'EVENTS', 'ABOUT'][i]}</span></button>`).join('');
  document.body.append(nav);
  const handCanvas = document.createElement('div');
  handCanvas.className = 'folio-hands-render';
  handCanvas.setAttribute('aria-hidden', 'true');
  document.body.append(handCanvas);

  const panel = document.createElement('section');
  panel.className = 'folio-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'true');
  panel.setAttribute('aria-labelledby', 'folio-title');
  panel.hidden = true;
  panel.innerHTML = `<button class="folio-close" aria-label="Return to Earth">CLOSE <span aria-hidden="true">×</span></button><div class="folio-panel-body"></div><footer class="folio-footer"><span>Joseph Yutong Shen</span><a href="mailto:josephshen0831@gmail.com">josephshen0831@gmail.com ↗</a><button class="folio-back">Back to Earth ↑</button></footer>`;
  document.body.append(panel);
  const brand = document.createElement('div');
  brand.className = 'folio-signature';
  brand.innerHTML = '<span>JOSEPH SHEN</span><span>Music · Technology · Experiments</span>';
  document.body.append(brand);
  const surfaceBloom = document.createElement('div');
  surfaceBloom.className = 'earth-surface-bloom';
  surfaceBloom.setAttribute('aria-hidden','true');
  document.body.append(surfaceBloom);
  let bloomAnimation;
  window.addEventListener('earth-surface-click', event => {
    if (!document.body.classList.contains('folio-entered') || !panel.hidden || about.classList.contains('is-open')) return;
    surfaceBloom.style.left = `${event.detail.x}px`;
    surfaceBloom.style.top = `${event.detail.y}px`;
    bloomAnimation?.cancel();
    bloomAnimation = surfaceBloom.animate([
      {opacity:0,transform:'translate(-50%,-50%) scale(.35)'},
      {opacity:.65,transform:'translate(-50%,-50%) scale(.8)',offset:.16},
      {opacity:0,transform:'translate(-50%,-50%) scale(1.55)'}
    ],{duration:1250,easing:'cubic-bezier(.15,.65,.3,1)',fill:'forwards'});
  });

  let returnFocus = enter;
  const close = () => {
    panel.querySelectorAll('video,audio').forEach(media => media.pause());
    panel.hidden = true;
    document.body.classList.remove('folio-panel-open');
    nav.querySelectorAll('button').forEach(button => button.setAttribute('aria-expanded', 'false'));
    document.querySelector('main').inert = false;
    returnFocus?.focus();
  };
  nav.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
    returnFocus = button;
    document.querySelectorAll('main video').forEach(media => media.pause());
    if (button.dataset.panel === 'about') { oldHand.click(); return; }
    panel.querySelector('.folio-panel-body').innerHTML = content[button.dataset.panel];
    panel.dataset.section = button.dataset.panel;
    panel.hidden = false;
    panel.scrollTop = 0;
    document.body.classList.add('folio-panel-open');
    document.querySelector('main').inert = true;
    button.setAttribute('aria-expanded', 'true');
    panel.querySelector('.folio-close').focus();
  }));
  panel.querySelector('.folio-close').addEventListener('click', close);
  panel.querySelector('.folio-back').addEventListener('click', close);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !panel.hidden) close();
    const active = !panel.hidden ? panel : about.classList.contains('is-open') ? about : null;
    if (event.key !== 'Tab' || !active) return;
    const items = [...active.querySelectorAll('button, a[href], audio[controls], video[controls], summary, [tabindex="0"]')].filter(el => el.getClientRects().length);
    const first = items[0], last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) { last.focus(); event.preventDefault(); }
    if (!event.shiftKey && document.activeElement === last) { first.focus(); event.preventDefault(); }
  });
  panel.addEventListener('play', event => {
    document.querySelectorAll('.folio-panel audio,.folio-panel video').forEach(media => { if (media !== event.target) media.pause(); });
  }, true);
  panel.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    event.preventDefault();
    panel.querySelector(link.getAttribute('href'))?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',block:'start'});
  });
  about.querySelector('.creator-close').addEventListener('click', () => nav.querySelector('[data-panel="about"]').focus());
  new MutationObserver(() => {
    const isAboutOpen = document.body.classList.contains('creator-info-open');
    document.querySelector('main').inert = isAboutOpen || !panel.hidden;
    window.dispatchEvent(new CustomEvent('portfolio-audio', {detail:isAboutOpen || !panel.hidden}));
  }).observe(document.body, {attributes:true,attributeFilter:['class']});
  enter.addEventListener('click', () => {
    document.body.classList.add('folio-entered');
    nav.querySelector('[data-panel="about"]').focus({preventScroll:true});
  }, {once:true});

  try { await renderHands(handCanvas, nav); }
  catch (error) { console.warn('Hand renderer unavailable; navigation remains accessible.', error); }
}

async function renderHands(host, nav) {
  const renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
  renderer.setClearColor(0x000000, 0);
  host.append(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, innerWidth / innerHeight, .1, 1000);
  camera.position.z = 100;
  const loader = new THREE.TextureLoader();
  const [object, matcap, normal] = await Promise.all([
    new OBJLoader().loadAsync(asset('hand.obj')),
    loader.loadAsync(asset('matcap.jpg')),
    loader.loadAsync(asset('normal.png')),
  ]);
  let geometry;
  object.traverse(child => { if (!geometry && child.isMesh) geometry = child.geometry; });
  geometry = geometry.clone();
  geometry.computeBoundingBox();
  const size = geometry.boundingBox.getSize(new THREE.Vector3());
  const normalization = 12 / Math.max(size.x, size.y, size.z);
  geometry.center();
  geometry.scale(normalization, normalization, normalization);
  const audioData = new Uint8Array(64 * 4).fill(100);
  const audioTexture = new THREE.DataTexture(audioData, 64, 1, THREE.RGBAFormat);
  audioTexture.needsUpdate = true;
  const blueData = new Uint8Array(256 * 4);
  for (let index=0;index<256;index++) {
    const shimmer=.5+.5*Math.sin(index/255*Math.PI*2);
    blueData.set([65+shimmer*70,125+shimmer*65,210+shimmer*40,255],index*4);
  }
  const bluePalette = new THREE.DataTexture(blueData,256,1,THREE.RGBAFormat);
  bluePalette.needsUpdate=true;
  const time = {value:0};
  const hands = [...nav.querySelectorAll('button')].map((button, index) => {
    const material = new THREE.ShaderMaterial({vertexShader:handVertex,fragmentShader:handFragment,side:THREE.DoubleSide, uniforms:{
      dT:{value:.016}, time, lightPos:{value:new THREE.Vector3(0,0,80)},
      t_matcap:{value:matcap}, t_normal:{value:normal}, t_audio:{value:audioTexture}, t_colormap:{value:bluePalette},
      _NoiseSize:{value:.05}, _NoiseSpeed:{value:.3}, _NoiseOffset:{value:1.4}, _HueStart:{value:.12}, _HueSize:{value:.03},
      _NormalDepth:{value:.1}, _FFTStart:{value:.1}, _FFTSize:{value:1.1}, _Saturation:{value:1}, _Lightness:{value:3}, _DiscardAmount:{value:1}
    }});
    material.extensions.derivatives = true;
    const mesh = new THREE.Mesh(geometry, material);
    const angle = index * Math.PI / 2 + .12 * Math.PI * 2;
    mesh.quaternion.setFromEuler(new THREE.Euler(0,0,angle));
    mesh.quaternion.multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI/2,0,0)));
    scene.add(mesh);
    for (const type of ['pointerenter','focus']) button.addEventListener(type, () => { material.uniforms._HueSize.value=.05;material.uniforms._Lightness.value=4; });
    for (const type of ['pointerleave','blur']) button.addEventListener(type, () => { material.uniforms._HueSize.value=.03;material.uniforms._Lightness.value=3; });
    return {mesh, button, index};
  });
  host.classList.add('is-ready');
  document.body.classList.add('hands-ready');
  const resize = () => { renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix(); };
  resize(); addEventListener('resize', resize);
  const clock = new THREE.Clock();
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  function frame() {
    requestAnimationFrame(frame);
    if (document.hidden || document.body.classList.contains('folio-panel-open') || document.body.classList.contains('creator-info-open')) return;
    time.value = reduced.matches ? 0 : clock.getElapsedTime();
    const visible = document.body.classList.contains('folio-entered');
    const height = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov/2)) * 100;
    const width = height * camera.aspect;
    hands.forEach(({mesh,button,index}) => {
      const box=button.getBoundingClientRect();
      const x=((box.left+box.width/2)/innerWidth-.5)*width;
      const y=(.5-(box.top+box.height*.38)/innerHeight)*height;
      mesh.position.x += ((visible ? x : 0)-mesh.position.x)*.075;
      mesh.position.y += ((visible ? y : 0)-mesh.position.y)*.075;
      mesh.position.z = Math.sin(time.value*.45+index)*1.5;
      const scale=Math.min(box.width/innerWidth*width/12,box.height/innerHeight*height/12)*.94;
      mesh.scale.setScalar(scale);
    });
    renderer.render(scene,camera);
  }
  frame();
}

if (document.querySelector('.earth-gate')) initialize();
else {
  const observer = new MutationObserver(() => {
    if (document.querySelector('.earth-gate')) { observer.disconnect(); initialize(); }
  });
  observer.observe(document.body,{childList:true});
}
