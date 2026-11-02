import { useEffect, useState, type FormEvent } from 'react';
import {
  ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Beaker,
  ChevronDown, ClipboardList, FlaskConical, Layers3,
  Leaf, Menu, Recycle, ShieldAlert, X,
} from 'lucide-react';

const navItems = [
  ['Materiales', '#materiales'], ['Proceso', '#proceso'], ['Ensayos', '#ensayos'],
  ['Impacto', '#impacto'], ['Equipo', '#equipo'],
];

const rotatingTaglines = [
  'Exploración material',
  'Residuos como insumo',
  'Desempeño por comprobar',
];

const materials = [
  { id: '01', name: 'Yeso', role: 'Matriz aglutinante', detail: 'Componente mineral que da forma a la mezcla.', origin: 'Origen por documentar', symbol: 'Y' },
  { id: '02', name: 'Papel reciclado', role: 'Fibra incorporada', detail: 'Papel recuperado; su preparación se registra en el proceso.', origin: 'Fuente de recolección por documentar', symbol: 'P' },
  { id: '03', name: 'EPS / plastoformo', role: 'Inclusión liviana', detail: 'Bolitas de poliestireno expandido incorporadas como agregado.', origin: 'Fuente de obtención por documentar', symbol: 'E' },
  { id: '04', name: 'Aserrín', role: 'Relleno orgánico', detail: 'Residuo de madera cuya especie y granulometría deben registrarse.', origin: 'Fuente de recolección por documentar', symbol: 'A' },
];

const steps = [
  ['Recolección y clasificación', 'Separar los componentes y registrar su procedencia, estado y preparación. Evitar contaminantes no identificados.', 'Materiales y herramientas: por registrar'],
  ['Preparación del papel', 'Remojar y triturar el papel hasta obtener pulpa. Documentar el método para que pueda repetirse.', 'Tiempo y herramientas: por registrar'],
  ['Preparación de agregados', 'Acondicionar el aserrín y las bolitas de EPS; anotar tamaño y condición de cada material.', 'Tiempo y herramientas: por registrar'],
  ['Dosificación y mezcla', 'Medir cada componente según la receta real. Incorporar agua y yeso de forma controlada.', 'Cantidades y herramientas: por registrar'],
  ['Moldeado y compactación', 'Llenar el molde y aplicar el método de compactación utilizado, sin asumir densidad uniforme.', 'Molde y método: por registrar'],
  ['Fraguado y desmolde', 'Registrar condiciones y momento de desmolde observados en cada prototipo.', 'Duración: por documentar'],
  ['Secado y curado', 'Dejar el prototipo en condiciones registradas. No considerar listo para uso sin evaluación.', 'Condiciones y duración: por documentar'],
];

const faqs = [
  ['¿Es resistente al agua?', 'No se ha documentado un ensayo de absorción o exposición al agua. No debe asumirse que sea resistente al agua.'],
  ['¿Soporta carga?', 'No hay datos de compresión ni certificación estructural. No usar como elemento portante ni para aplicaciones que impliquen cargas.'],
  ['¿Es inflamable?', 'No se han realizado ensayos de reacción al fuego. El EPS requiere especial cautela; no se puede afirmar que el material sea seguro frente al fuego.'],
  ['¿Cuánto cuesta fabricarlo?', 'El costo por unidad no está calculado. Se necesita registrar cantidades reales, precios locales y desperdicio del proceso.'],
  ['¿Se puede replicar en casa?', 'El proceso está descrito como una guía de investigación, pero faltan cantidades y condiciones validadas. Usa protección adecuada y no destines prototipos a una obra.'],
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [compareMode, setCompareMode] = useState<'tabla' | 'resumen'>('tabla');
  const [contactState, setContactState] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [typedTagline, setTypedTagline] = useState(rotatingTaglines[0]);
  const year = new Date().getFullYear();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let phraseIndex = 0;
    let characterIndex = rotatingTaglines[0].length;
    let deleting = true;
    let timeout = 0;

    const tick = () => {
      const phrase = rotatingTaglines[phraseIndex];
      if (deleting) {
        characterIndex = Math.max(0, characterIndex - 1);
        setTypedTagline(phrase.slice(0, characterIndex));
        if (characterIndex === 0) {
          phraseIndex = (phraseIndex + 1) % rotatingTaglines.length;
          deleting = false;
          timeout = window.setTimeout(tick, 240);
        } else {
          timeout = window.setTimeout(tick, 35);
        }
      } else {
        const nextPhrase = rotatingTaglines[phraseIndex];
        characterIndex = Math.min(nextPhrase.length, characterIndex + 1);
        setTypedTagline(nextPhrase.slice(0, characterIndex));
        if (characterIndex === nextPhrase.length) {
          deleting = true;
          timeout = window.setTimeout(tick, 1500);
        } else {
          timeout = window.setTimeout(tick, 70);
        }
      }
    };

    timeout = window.setTimeout(tick, 1600);
    return () => window.clearTimeout(timeout);
  }, []);

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const errors: Record<string, string> = {};
    const name = String(values.get('nombre') || '').trim();
    const email = String(values.get('email') || '').trim();
    const interest = String(values.get('interes') || '');
    const message = String(values.get('mensaje') || '').trim();
    if (name.length < 2) errors.nombre = 'Escribe tu nombre (mínimo 2 caracteres).';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Introduce un correo válido.';
    if (!interest) errors.interes = 'Selecciona un tipo de interés.';
    if (message.length < 10) errors.mensaje = 'El mensaje debe tener al menos 10 caracteres.';
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setContactState('Tus datos son válidos, pero este sitio aún no tiene un destino de envío configurado. No se ha enviado ni almacenado el mensaje.');
    } else setContactState('');
  }

  return (
    <main>
      <header className="site-header">
        <div className="section-wrap nav-shell">
          <a href="#inicio" className="brand" aria-label="ECOBLOC, inicio" data-testid="link-home">
            <span className="brand-mark"><Layers3 size={19} strokeWidth={1.7} /></span>
            <span>ECOBLOC<span className="brand-dot">.</span><small>PROYECTO EXPERIMENTAL</small></span>
          </a>
          <nav className="desktop-nav" aria-label="Navegación principal">
            {navItems.map(([label, href]) => <a className="nav-link" href={href} key={href} data-testid={`link-nav-${label.toLowerCase()}`}>{label}</a>)}
          </nav>
          <a href="#contacto" className="nav-contact" data-testid="link-contact-nav">Contactar <ArrowUpRight size={14} /></a>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} data-testid="button-mobile-menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          {menuOpen && <nav className="mobile-menu" aria-label="Navegación móvil">
            {navItems.map(([label, href]) => <a href={href} key={href} onClick={() => setMenuOpen(false)} data-testid={`link-mobile-${label.toLowerCase()}`}>{label}<ArrowUpRight size={14} /></a>)}
            <a href="#contacto" onClick={() => setMenuOpen(false)} data-testid="link-mobile-contact">Contacto<ArrowUpRight size={14} /></a>
          </nav>}
        </div>
      </header>

      <section id="inicio" className="hero grid-paper">
        <div className="section-wrap hero-layout">
          <div className="hero-copy">
            <div className="eyebrow hero-label"><span className="live-dot" /> Investigación material / ficha 01</div>
            <h1 data-testid="text-hero-title">ECO<span>BLOC</span></h1>
            <div className="hero-subtitle"><span aria-hidden="true">{typedTagline}<i className="typing-caret" /></span><span className="sr-only">Investigación de un bloque experimental con materiales recuperados y desempeño por comprobar.</span></div>
            <p className="hero-line">Construyendo con<br /><em>lo que otros desechan.</em></p>
            <p className="hero-intro">Una investigación estudiantil sobre una mezcla de yeso, papel reciclado, EPS y aserrín. Documentamos lo que sabemos, y señalamos lo que aún falta medir.</p>
            <div className="hero-actions">
              <a className="btn-primary" href="#proceso" data-testid="button-view-process">Explorar el proceso <ArrowDownRight size={17} /></a>
              <a href="#ensayos" className="text-link" data-testid="link-results">Estado de los ensayos <ArrowRight size={15} /></a>
            </div>
            <p className="hero-product-type">Bloque ecológico</p>
          </div>
          <div className="hero-visual">
            <img src="/images/ecobloc-hero.jpg" alt="Bloque ecológico ECOBLOC recién elaborado, con cavidades y superficie de mezcla visible" />
          </div>
          <div className="hero-bottom">
            <article className="hero-indicator" data-testid="indicator-peso-inicial">
              <span className="eyebrow">PESO INICIAL</span>
              <span className="indicator-subtitle">Recién colocado</span>
              <img src="/images/ecobloc-peso-inicial.jpg" alt="Muestras cilíndricas de mezcla recién colocadas para registrar su peso inicial" loading="lazy" />
              <strong>18–20 kg</strong>
              <p>Peso registrado inmediatamente después de elaborar y colocar la mezcla en el molde.</p>
            </article>
            <article className="hero-indicator" data-testid="indicator-proceso-secado">
              <span className="eyebrow">PROCESO DE SECADO</span>
              <span className="indicator-subtitle">Después de una semana</span>
              <img src="/images/ecobloc-secado.jpg" alt="Muestras cilíndricas de ECOBLOC tras una semana de secado" loading="lazy" />
              <strong>10–12 kg</strong>
              <p>Peso registrado después de siete días de reposo.</p>
            </article>
            <article className="hero-indicator" data-testid="indicator-resultado-final">
              <span className="eyebrow">RESULTADO FINAL</span>
              <span className="indicator-subtitle">Bloque estabilizado</span>
              <img src="/images/ecobloc-final.jpg" alt="Bloques ECOBLOC estabilizados al finalizar el proceso de secado" loading="lazy" />
              <strong>8 kg</strong>
              <p>Peso final registrado después del proceso de secado y estabilización.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="motivacion" className="section-wrap motivation section-pad">
        <div className="section-kicker">00 / Punto de partida</div>
        <div className="motivation-grid">
          <h2 className="section-title motivation-title">Revalorización de residuos para una construcción más sostenible.</h2>
          <div className="motivation-text">
            <p>La industria de la construcción demanda materiales convencionales cuya producción implica consumo de recursos naturales y energía. Paralelamente, residuos como el papel, los restos de madera y el poliestireno expandido (plastoformo) representan una oportunidad para desarrollar alternativas constructivas con criterios de aprovechamiento y economía circular.</p>
            <p>Este proyecto propone investigar la incorporación de yeso, viruta de madera, papel reciclado y plastoformo en la elaboración de bloques ecológicos, buscando aprovechar materiales recuperables y explorar nuevas posibilidades de aplicación en la construcción.</p>
            <div className="objective-note"><strong>Objetivo: transformar materiales de desecho en un recurso constructivo, evaluando su comportamiento físico, mecánico y ambiental.</strong></div>
          </div>
        </div>
      </section>

      <section id="materiales" className="materials-section section-pad">
        <div className="section-wrap">
          <div className="section-kicker">01 / Materia prima</div>
          <div className="section-heading-row">
            <h2 className="section-title">Cuatro componentes.<br /><span className="muted-title">Una mezcla por definir.</span></h2>
            <p className="section-aside">Las funciones son hipótesis de formulación, no resultados medidos. Las proporciones y fuentes se completan con la bitácora real.</p>
          </div>
          <div className="material-grid">
            {materials.map((item) => <article className="material-card" key={item.id} data-testid={`card-material-${item.id}`}>
              <div className={`material-illustration material-${item.id}`}><span>{item.symbol}</span><i /><b /></div>
              <div className="material-info">
                <div className="material-top"><span className="mono">{item.id} / COMPONENTE</span><span className="material-dot" /></div>
                <h3>{item.name}</h3>
                <span className="role-tag">{item.role}</span>
                <p>{item.detail}</p>
                <div className="material-data"><span>ORIGEN</span><strong>{item.origin}</strong></div>
                <div className="material-data"><span>PROPORCIÓN</span><strong className="pending-value">Por documentar</strong></div>
              </div>
            </article>)}
          </div>
          <div className="composition-panel">
            <div className="composition-copy"><span className="eyebrow">Composición de la mezcla</span><h3>Sin receta validada,<br />no hay porcentajes que mostrar.</h3><p>Completar con cantidades reales por peso o volumen y especificar la base de cálculo.</p></div>
            <div className="composition-graphic" aria-label="Gráfico no disponible hasta completar las proporciones">
              <div className="composition-ring"><div><strong>—</strong><span>RECETA<br />PENDIENTE</span></div></div>
              <div className="composition-legend">{materials.map((m, i) => <span key={m.id}><i className={`legend-dot legend-${i}`} />{m.name}<b>—</b></span>)}</div>
            </div>
            <span className="mono composition-stamp">DATOS INSUFICIENTES</span>
          </div>
        </div>
      </section>

      <section id="proceso" className="section-wrap process-section section-pad">
        <div className="section-kicker">02 / Método</div>
        <div className="section-heading-row">
          <h2 className="section-title">Del residuo<br />al prototipo.</h2>
          <p className="section-aside">Secuencia de trabajo propuesta para la documentación. Completar tiempos y herramientas con los registros de fabricación.</p>
        </div>
        <div className="process-layout">
          <div className="timeline">
            {steps.map(([title, desc, tools], index) => <article className="process-step" key={title} data-testid={`step-process-${index + 1}`}>
              <div className="step-marker mono">{String(index + 1).padStart(2, '0')}</div>
              <div className="step-content">
                <div className="eyebrow">ETAPA {String(index + 1).padStart(2, '0')}</div>
                <h3>{title}</h3><p>{desc}</p>
                <div className="step-tools mono">{tools}</div>
              </div>
            </article>)}
          </div>
          <p className="timeline-hint mono">RECORRE LAS 7 ETAPAS →</p>
          <aside className="recipe-card">
            <div className="recipe-head"><ClipboardList size={18} /><span className="mono">REGISTRO DE RECETA</span><span className="recipe-status">INCOMPLETO</span></div>
            <h3>Una receta replicable<br />empieza con datos.</h3>
            <p>Los campos técnicos permanecen pendientes hasta ingresar una formulación real del equipo.</p>
            <dl>
              <div><dt>Yeso</dt><dd>—</dd></div><div><dt>Papel / pulpa</dt><dd>—</dd></div>
              <div><dt>EPS</dt><dd>—</dd></div><div><dt>Aserrín</dt><dd>—</dd></div>
              <div><dt>Agua</dt><dd>—</dd></div><div><dt>Relación agua / yeso</dt><dd>—</dd></div>
              <div><dt>Molde / dimensiones</dt><dd>—</dd></div>
            </dl>
            <div className="calculator-box">
              <label htmlFor="block-count" className="eyebrow">CALCULADORA DE LOTE</label>
              <div className="calculator-input"><input id="block-count" type="number" min="1" placeholder="N.º de bloques" disabled aria-describedby="calc-note" data-testid="input-block-count" /><button type="button" disabled title="Disponible cuando se complete la receta" data-testid="button-calculate">Calcular</button></div>
              <p id="calc-note" className="calc-note">No disponible: faltan cantidades base validadas por bloque.</p>
            </div>
            <div className="safety-note"><ShieldAlert size={17} /><p><strong>Seguridad:</strong> evitar inhalar polvo de yeso y aserrín. Usar protección respiratoria y guantes, trabajar con ventilación y seguir las indicaciones de los materiales.</p></div>
            <div className="video-placeholder"><span className="mono">DOCUMENTACIÓN AUDIOVISUAL</span><p>Video del proceso: por incorporar</p></div>
          </aside>
        </div>
      </section>

      <section id="prototipos" className="prototypes-section section-pad">
        <div className="section-wrap">
          <div className="section-kicker">03 / Iteraciones</div>
          <div className="section-heading-row">
            <h2 className="section-title">Prototipos y<br />aprendizajes.</h2>
            <p className="section-aside">Cada iteración necesita receta, registro fotográfico y observaciones comparables. No se atribuyen mejoras sin evidencia.</p>
          </div>
          <div className="prototype-track">
            {['Prototipo 01', 'Prototipo 02', 'Mezcla final'].map((name, i) => <article className="prototype-card" key={name} data-testid={`card-prototype-${i + 1}`}>
              <div className="prototype-image"><span className="mono">IMAGEN / POR INCORPORAR</span><div className="prototype-slab" /></div>
              <div className="prototype-meta"><span className="mono">ITERACIÓN {String(i + 1).padStart(2, '0')}</span><span className="prototype-flag">{i === 2 ? 'PENDIENTE' : 'REGISTRO PENDIENTE'}</span></div>
              <h3>{name}</h3>
              <p>Proporciones, observaciones y cambios: completar con la bitácora del proyecto.</p>
              <div className="prototype-facts"><span>MEZCLA <b>—</b></span><span>RESULTADO <b>Por documentar</b></span></div>
            </article>)}
          </div>
          <p className="prototype-disclaimer mono">“MEZCLA FINAL” ES UN CAMPO EDITABLE; NO INDICA QUE EXISTA UNA FORMULACIÓN VALIDADA.</p>
        </div>
      </section>

      <section id="ensayos" className="section-wrap tests-section section-pad">
        <div className="section-kicker">04 / Verificación</div>
        <div className="tests-header"><div><h2 className="section-title">Lo que falta<br />poner a prueba.</h2><p className="section-aside">No se han documentado ensayos con resultados verificables para esta publicación.</p></div><div className="evidence-badge"><FlaskConical size={20} /><span className="mono">RESULTADOS<br />PUBLICADOS</span><strong>NINGUNO</strong></div></div>
        <div className="test-status">
          <div className="test-status-top"><span className="status-outline"><span /> SIN ENSAYOS DOCUMENTADOS</span><span className="mono">ESTADO DE EVIDENCIA / ACTUALIZAR CON REGISTROS</span></div>
          <div className="test-table">
            {['Compresión', 'Peso y densidad', 'Absorción de agua', 'Aislamiento térmico', 'Reacción al fuego', 'Aislamiento acústico'].map((label, i) => <div className="test-row" key={label} data-testid={`row-test-${i + 1}`}><span className="test-number mono">{String(i + 1).padStart(2, '0')}</span><strong>{label}</strong><span className="test-method">Método y evidencia por documentar</span><span className="test-value mono">—</span><span className="test-status-chip">SIN RESULTADO PUBLICADO</span></div>)}
          </div>
          <div className="no-cert"><ShieldAlert size={19} /><div><strong>Este bloque no cuenta con certificación estructural.</strong><span>No usar como elemento portante. No se han verificado desempeño, seguridad frente al fuego ni resistencia al agua.</span></div></div>
        </div>
        <div className="limitations"><span className="eyebrow">LIMITACIONES + PRÓXIMOS PASOS</span><p>Registrar la receta por lote, definir métodos de ensayo, documentar muestras y condiciones, y contrastar resultados con referencias pertinentes antes de comunicar prestaciones.</p><a href="#contacto" className="text-link">Proponer una colaboración <ArrowRight size={15} /></a></div>
      </section>

      <section id="comparativa" className="comparison-section section-pad">
        <div className="section-wrap">
          <div className="section-kicker">05 / Referencia</div>
          <div className="comparison-head"><h2 className="section-title">Comparar también<br />es investigar.</h2><div className="compare-controls" role="group" aria-label="Formato de comparación">
            <button type="button" className={compareMode === 'tabla' ? 'selected' : ''} onClick={() => setCompareMode('tabla')} aria-pressed={compareMode === 'tabla'} data-testid="button-compare-table">Tabla</button>
            <button type="button" className={compareMode === 'resumen' ? 'selected' : ''} onClick={() => setCompareMode('resumen')} aria-pressed={compareMode === 'resumen'} data-testid="button-compare-summary">Resumen</button>
          </div></div>
          {compareMode === 'tabla' ? <div className="comparison-table" data-testid="comparison-table">
            <div className="compare-row compare-labels"><span>CRITERIO</span><span>ECOBLOC / PROTOTIPO</span><span>REFERENCIA CONVENCIONAL</span></div>
            {['Peso por unidad', 'Costo por unidad', 'Aislamiento', 'Impacto ambiental', 'Resistencia'].map((item, i) => <div className="compare-row" key={item} data-testid={`row-comparison-${i + 1}`}><strong>{item}</strong><span>Por medir / calcular</span><span>Definir producto y fuente</span></div>)}
          </div> : <div className="compare-summary" data-testid="comparison-summary"><div><span className="eyebrow">PROTOTIPO EXPERIMENTAL</span><p>Datos de ECOBLOC por registrar y ensayar.</p></div><ArrowRight size={22} /><div><span className="eyebrow">BLOQUE DE REFERENCIA</span><p>Seleccionar tipo, fabricante y fuente técnica comparable.</p></div></div>}
          <p className="comparison-foot mono">NO ES UNA COMPARACIÓN DE DESEMPEÑO: FALTAN DATOS MEDIDOS Y REFERENCIAS IDENTIFICABLES.</p>
        </div>
      </section>

      <section id="impacto" className="impact-section section-pad">
        <div className="section-wrap impact-layout">
          <div>
            <div className="section-kicker">06 / Circularidad</div>
            <h2 className="section-title">El impacto no se<br />presume. Se mide.</h2>
            <p className="impact-intro">Incorporar residuos en un prototipo no basta para demostrar un beneficio ambiental. Hace falta cuantificar, comparar y explicar el sistema.</p>
            <div className="impact-questions">
              <div><Recycle size={20} /><span>Residuos incorporados por bloque</span><b>Por cuantificar</b></div>
              <div><Layers3 size={20} /><span>Material reutilizado por superficie</span><b>Por cuantificar</b></div>
              <div><Leaf size={20} /><span>Balance ambiental comparativo</span><b>Sin evaluar</b></div>
            </div>
          </div>
          <div className="impact-panel">
            <span className="mono">LO QUE HABRÍA QUE REGISTRAR</span>
            <div className="impact-equation"><span>Entradas</span><i>+</i><span>Proceso</span><i>+</i><span>Fin de vida</span></div>
            <p>Origen y masa de cada componente, energía y agua utilizadas, transporte, pérdidas y escenario de referencia.</p>
            <div className="impact-stamp">EVIDENCIA<br /><strong>PENDIENTE</strong></div>
            <span className="mono impact-bottom">SIN DECLARACIÓN DE IMPACTO VALIDADA</span>
          </div>
        </div>
      </section>

      <section id="aplicaciones" className="section-wrap application-section section-pad">
        <div className="section-kicker">07 / Escenarios de uso</div>
        <div className="section-heading-row"><h2 className="section-title">Pensar usos.<br /><span className="muted-title">Marcar límites.</span></h2><p className="section-aside">Las aplicaciones de esta lista son escenarios para investigar, no recomendaciones de construcción.</p></div>
        <div className="application-grid">
          <div className="application-list">
            {['Muros divisorios', 'Cerramientos no estructurales', 'Paneles aislantes', 'Vivienda de bajo costo', 'Mobiliario'].map((item, i) => <div className="application-item" key={item}><span className="mono">{String(i + 1).padStart(2, '0')}</span><strong>{item}</strong><span>IDEA A EVALUAR</span><ArrowUpRight size={16} /></div>)}
          </div>
          <aside className="use-warning"><ShieldAlert size={22} /><span className="eyebrow">USO RESPONSABLE</span><h3>Prototipo no es permiso de obra.</h3><p>Sin ensayos y revisión profesional, no recomendar como elemento portante, cerramiento expuesto, panel con desempeño térmico/acústico declarado ni componente con requisitos de fuego o humedad.</p><span className="mono">USO CONSTRUCTIVO / NO VALIDADO</span></aside>
        </div>
      </section>

      <section id="galeria" className="gallery-section section-pad">
        <div className="section-wrap">
          <div className="section-kicker">08 / Registro visual</div>
          <div className="gallery-head"><h2 className="section-title">La materia,<br />sin maquillaje.</h2><p>Una imagen de muestra disponible. Las fotografías de proceso y las iteraciones reales se incorporan desde el archivo del proyecto.</p></div>
          <div className="gallery-rail" data-testid="gallery-rail" aria-label="Galería de imágenes">
            <button className="gallery-image-card" type="button" onClick={() => setGalleryOpen(true)} data-testid="button-gallery-specimen">
              <img src="/ecobloc-prototype.jpg" alt="Vista cercana del bloque compuesto experimental ECOBLOC" loading="lazy" />
              <span className="gallery-caption"><span className="mono">01 / MUESTRA</span><span>Prototipo experimental <ArrowUpRight size={15} /></span></span>
            </button>
            {['Preparación de papel', 'Mezcla y moldeado', 'Desmolde y secado'].map((label, i) => <div className="gallery-pending" key={label} data-testid={`gallery-placeholder-${i + 1}`}><div className="pending-frame"><Beaker size={22} /><span className="mono">FOTO POR INCORPORAR</span></div><span className="gallery-caption"><span className="mono">0{String(i + 2)} / PROCESO</span><span>{label}</span></span></div>)}
          </div>
          <div className="gallery-foot"><span className="mono">DESLIZA PARA EXPLORAR</span><div><ArrowLeft size={14} /><ArrowRight size={14} /></div><span>Las imágenes pendientes deben ser fotografías del proyecto.</span></div>
        </div>
      </section>

      <section id="equipo" className="section-wrap team-section section-pad">
        <div className="section-kicker">09 / Autoría</div>
        <div className="team-layout"><div><h2 className="section-title">Un proyecto<br />en construcción.</h2><p>La información del equipo se presenta como campo editorial pendiente. No se publican nombres o afiliaciones sin confirmación.</p></div>
          <div className="team-placeholder"><div className="team-avatar">+</div><div><span className="mono">EQUIPO / AUTORÍA</span><h3>Nombres por incorporar</h3><p>Roles, institución y asesoría: completar con información confirmada.</p></div><ArrowUpRight size={17} /></div>
        </div>
      </section>

      <section id="preguntas" className="faq-section section-pad">
        <div className="section-wrap faq-layout">
          <div><div className="section-kicker">10 / Preguntas abiertas</div><h2 className="section-title">Lo que sabemos.<br />Y lo que no.</h2><p>Respuestas directas, sin atribuir propiedades que todavía no se han comprobado.</p></div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => <article className="faq-item" key={question}>
              <h3><button type="button" aria-expanded={faqOpen === index} aria-controls={`faq-answer-${index}`} onClick={() => setFaqOpen(faqOpen === index ? null : index)} data-testid={`button-faq-${index + 1}`}><span className="mono">{String(index + 1).padStart(2, '0')}</span>{question}<ChevronDown className={faqOpen === index ? 'chevron-open' : ''} size={18} /></button></h3>
              {faqOpen === index && <p id={`faq-answer-${index}`} className="faq-answer" data-testid={`answer-faq-${index + 1}`}>{answer}</p>}
            </article>)}
          </div>
        </div>
      </section>

      <section id="contacto" className="contact-section section-pad">
        <div className="section-wrap contact-layout">
          <div className="contact-copy"><div className="section-kicker">11 / Conversación</div><h2>¿Quieres probar<br />o colaborar con<br />este material?</h2><p>La investigación mejora con preguntas, referencias y acompañamiento técnico.</p><div className="contact-register"><span className="mono">CORREO /</span><span>Por configurar</span><span className="mono">RESPUESTA /</span><span>Sin plazo publicado</span></div></div>
          <form className="contact-form" onSubmit={submitContact} noValidate data-testid="form-contact">
            <div className="form-heading"><span className="mono">FORMULARIO DE INTERÉS</span><span className="form-required">* Campos obligatorios</span></div>
            <div className="form-row">
              <label>Nombre *<input name="nombre" type="text" autoComplete="name" required minLength={2} aria-invalid={!!formErrors.nombre} aria-describedby={formErrors.nombre ? 'error-nombre' : undefined} data-testid="input-contact-name" />{formErrors.nombre && <span className="field-error" id="error-nombre">{formErrors.nombre}</span>}</label>
              <label>Correo electrónico *<input name="email" type="email" autoComplete="email" required aria-invalid={!!formErrors.email} aria-describedby={formErrors.email ? 'error-email' : undefined} data-testid="input-contact-email" />{formErrors.email && <span className="field-error" id="error-email">{formErrors.email}</span>}</label>
            </div>
            <label>Tipo de interés *<select name="interes" required defaultValue="" aria-invalid={!!formErrors.interes} aria-describedby={formErrors.interes ? 'error-interes' : undefined} data-testid="select-contact-interest"><option value="" disabled>Selecciona una opción</option><option>Compra</option><option>Colaboración</option><option>Investigación</option><option>Educación</option><option>Otro</option></select>{formErrors.interes && <span className="field-error" id="error-interes">{formErrors.interes}</span>}</label>
            <label>Mensaje *<textarea name="mensaje" rows={4} required minLength={10} aria-invalid={!!formErrors.mensaje} aria-describedby={formErrors.mensaje ? 'error-mensaje' : undefined} data-testid="textarea-contact-message" />{formErrors.mensaje && <span className="field-error" id="error-mensaje">{formErrors.mensaje}</span>}</label>
            <button type="submit" className="contact-submit" data-testid="button-send-message">Revisar mensaje <ArrowRight size={17} /></button>
            <p className="form-consent">Este formulario no envía ni almacena datos. Falta configurar un destinatario o servicio de contacto.</p>
            {contactState && <div role="status" className="form-feedback" data-testid="status-contact">{contactState}</div>}
          </form>
        </div>
      </section>

      <footer className="site-footer">
        <div className="section-wrap footer-main">
          <a href="#inicio" className="brand footer-brand" data-testid="link-footer-home"><span className="brand-mark"><Layers3 size={19} /></span><span>ECOBLOC<span className="brand-dot">.</span><small>PROYECTO EXPERIMENTAL</small></span></a>
          <p>Un proyecto estudiantil de investigación material.<br />Construcción sostenible: pregunta, no promesa.</p>
          <nav aria-label="Enlaces de pie de página">{[['Materiales','#materiales'],['Proceso','#proceso'],['Ensayos','#ensayos'],['Preguntas','#preguntas']].map(([text, href]) => <a href={href} key={href} data-testid={`link-footer-${text.toLowerCase()}`}>{text}</a>)}</nav>
        </div>
        <div className="section-wrap footer-bottom"><span className="mono">© {year} ECOBLOC / NOMBRE PROVISIONAL</span><span className="mono">INSTITUCIÓN / POR CONFIRMAR</span><a href="#inicio" className="mono" data-testid="link-back-top">VOLVER ARRIBA ↑</a></div>
      </footer>

      {galleryOpen && <div className="overlay" role="dialog" aria-modal="true" aria-label="Vista ampliada del prototipo" onClick={() => setGalleryOpen(false)} onKeyDown={(event) => { if (event.key === 'Escape') setGalleryOpen(false); }} data-testid="lightbox">
        <button className="lightbox-close" type="button" autoFocus onClick={() => setGalleryOpen(false)} aria-label="Cerrar imagen ampliada" data-testid="button-close-lightbox"><X size={22} /></button>
        <figure className="lightbox-figure" onClick={(event) => event.stopPropagation()}><img className="modal-image" src="/ecobloc-prototype.jpg" alt="Prototipo de bloque compuesto con yeso, papel, EPS y aserrín" /><figcaption className="mono">MUESTRA / 00 — PROTOTIPO EXPERIMENTAL. DATOS DE RECETA PENDIENTES.</figcaption></figure>
      </div>}
    </main>
  );
}

export default App;
