import { useEffect, useState, type FormEvent } from 'react';
import {
  ArrowDownRight, ArrowRight, ChevronDown, FlaskConical, Layers3, Menu, X,
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
  { id: '01', name: 'Yeso', role: 'MATRIZ AGLUTINANTE', detail: 'Material mineral adquirido comercialmente. Constituye la matriz aglutinante de la mezcla y proporciona cohesión a sus componentes.', origin: 'Adquisición comercial.', proportion: '3 litros — 46,15 %.', preparation: 'Mezclado con agua durante la elaboración de la mezcla.', image: '/images/material-yeso.jpg', alt: 'Yeso mineral en polvo dispuesto en un recipiente durante la preparación de ECOBLOC.' },
  { id: '02', name: 'Papel reciclado', role: 'FIBRA INCORPORADA', detail: 'Papel usado y recuperado, sometido a un proceso de trituración, remojo y licuado para su incorporación a la mezcla.', origin: 'Papel usado y recuperado.', proportion: '0,5 litros — 7,69 %.', preparation: 'Triturado, remojado y licuado hasta obtener una pulpa.', image: '/images/material-papel-reciclado.jpg', alt: 'Pulpa de papel reciclado preparada en una licuadora para incorporarse a la mezcla.' },
  { id: '03', name: 'EPS / plastoformo', role: 'AGREGADO LIGERO', detail: 'Pequeñas bolitas de poliestireno expandido incorporadas a la mezcla como agregado ligero.', origin: 'Adquisición comercial en formato de pequeñas bolitas.', proportion: '1 litro — 15,38 %.', preparation: 'Incorporación directa de las bolitas de EPS.', image: '/images/material-eps.jpg', alt: 'Pequeñas bolitas blancas de EPS utilizadas como agregado ligero en ECOBLOC.' },
  { id: '04', name: 'Aserrín', role: 'RELLENO ORGÁNICO', detail: 'Residuo de madera recuperado de carpinterías y talleres, seleccionado mediante tamizado para aprovechar sus partículas más finas.', origin: 'Carpinterías y talleres de madera.', proportion: '0,5 litros — 7,69 %.', preparation: 'Tamizado y selección de las partículas más finas.', image: '/images/material-aserrin.jpg', alt: 'Aserrín recuperado y seleccionado, con partículas finas visibles sobre una superficie oscura.' },
];

const steps = [
  {
    number: 1,
    title: 'Recolección y clasificación',
    description: 'Separación de los materiales que se utilizarán en la elaboración del bloque.',
    detailLabel: 'Materiales y herramientas',
    detail: 'Materiales: yeso, papel, madera y bolitas de plastoformo. Herramientas: bandejas, pala de mano y guantes para la mezcla.',
    image: '/images/process-etapa-01.jpg',
    alt: 'Registro fotográfico de la recolección y clasificación de materiales.',
  },
  {
    number: 2,
    title: 'Preparación del papel',
    description: 'Acondicionar el papel reciclado antes de incorporarlo a la mezcla.',
    detailLabel: 'Tiempo y herramientas',
    detail: 'Remojado en agua durante 3 días y posteriormente licuado.',
    image: '/images/process-etapa-02.jpg',
    alt: 'Registro fotográfico de la preparación del papel reciclado.',
  },
  {
    number: 3,
    title: 'Preparación de agregados',
    description: 'Mezclar los agregados antes de incorporarlos a la preparación.',
    detailLabel: 'Tiempo y herramientas',
    detail: 'Mezcla de todos los agregados con la ayuda de guantes y pala de mano.',
    image: '/images/process-etapa-03.jpg',
    alt: 'Registro fotográfico de la preparación de los agregados.',
  },
  {
    number: 4,
    title: 'Dosificación y mezcla',
    description: 'Dosificar los componentes con las proporciones registradas para esta preparación.',
    detailLabel: 'Cantidades y herramientas',
    detail: 'Yeso: 3 litros — 46,15 %; papel reciclado: 0,5 litros — 7,69 %; EPS: 1 litro — 15,38 %; aserrín: 0,5 litros — 7,69 %.',
    image: '/images/process-etapa-04.jpg',
    alt: 'Registro fotográfico de la dosificación y mezcla de los componentes.',
  },
  {
    number: 6,
    title: 'Moldeado y compactación',
    description: 'Colocar la mezcla en el molde y compactarla por capas.',
    detailLabel: 'Molde y método',
    detail: 'Molde de un bloque con tres aberturas circulares. La mezcla se colocó en tres capas y se utilizó una varilla para evitar espacios vacíos.',
    image: '/images/process-etapa-06.jpg',
    alt: 'Registro fotográfico del moldeado y compactación del bloque.',
  },
  {
    number: 7,
    title: 'Secado y desmolde',
    description: 'Dejar secar el bloque antes de retirarlo del molde y continuar el secado.',
    detailLabel: 'Condiciones y duración',
    detail: 'Se dejó secar durante unos 3 días antes del desmolde. Luego se dejó secar una semana más fuera del molde.',
    image: '/images/process-etapa-07.jpg',
    alt: 'Registro fotográfico del bloque durante el secado y desmolde.',
  },
];

const prototypes = [
  {
    id: '01',
    iteration: 'LA EXPERIMENTAL',
    status: 'FORMULACIÓN NO VIABLE',
    title: 'Primera mezcla experimental.',
    image: '/images/prototipo-01.jpg',
    alt: 'Fotografía de la primera mezcla experimental.',
    details: [
      { label: 'Objetivo', text: 'Evaluar el comportamiento inicial de la mezcla sin incorporar viruta de madera.' },
      { label: 'Mezcla', text: 'Se mantuvieron las proporciones de referencia de los demás componentes. Se eliminó la viruta de madera y se utilizó 1 litro de agua.' },
      { label: 'Observaciones', text: 'La mezcla presentó una consistencia inadecuada y se identificaron zonas huecas debido a la cantidad insuficiente de agua y a una distribución irregular del material.' },
      { label: 'Resultado', text: 'La formulación no presentó condiciones adecuadas para continuar con las pruebas.' },
    ],
  },
  {
    id: '02',
    iteration: 'PROTOTIPO 02 — AJUSTE DE LA MEZCLA',
    status: 'BUEN COMPORTAMIENTO',
    title: 'Ajuste de la mezcla.',
    image: '/images/prototipo-02.jpg',
    alt: 'Fotografía del bloque elaborado en la segunda prueba de mezcla.',
    details: [
      { label: 'Objetivo', text: 'Evaluar la consistencia y el peso del bloque manteniendo la proporción de yeso y EPS utilizada en esta prueba.' },
      { label: 'Observaciones', text: 'Se obtuvo una buena consistencia y un bloque ligero de aproximadamente 8 kg. Sin embargo, varias bolitas de plastoformo quedaron alrededor del cilindro, por lo que se identificó la necesidad de ajustar su cantidad y distribución.' },
      { label: 'Resultado', text: 'Peso registrado: 8 kg.' },
      { label: 'Conclusión', text: 'La mezcla presentó resultados favorables, aunque se requiere optimizar la incorporación del EPS.' },
    ],
  },
  {
    id: '03',
    iteration: 'ITERACIÓN 03 — INCORPORACIÓN DE VIRUTA DE MADERA',
    status: 'MEZCLA DE MAYOR CONSISTENCIA',
    title: 'Incorporación de viruta de madera.',
    image: '/images/prototipo-03.jpg',
    alt: 'Fotografía de la mezcla con viruta de madera incorporada.',
    details: [
      { label: 'Objetivo', text: 'Evaluar el efecto de incrementar la cantidad de viruta de madera en la mezcla.' },
      { label: 'Modificación', text: 'Se incorporó una jarra adicional de viruta de madera respecto a la formulación anterior.' },
      { label: 'Observaciones', text: 'La mezcla presentó una consistencia muy buena, pero el tiempo de secado fue considerablemente mayor.' },
      { label: 'Resultado', text: 'Peso registrado: 15 kg.' },
      { label: 'Conclusión', text: 'El incremento de viruta permitió obtener una mezcla de buena consistencia, pero produjo un bloque de mayor peso y un proceso de secado más prolongado.' },
    ],
  },
];

const verificationTests = [
  {
    number: '01',
    title: 'Compresión',
    method: 'Ensayo de carga progresiva mediante prensa de compresión.',
    status: 'DATO REPORTADO · PENDIENTE DE VALIDACIÓN',
    details: [
      { label: 'Resultado', value: 'Pendiente de ensayo.' },
      { label: 'Evidencia', value: 'Carga máxima soportada y resistencia en MPa.' },
      { label: 'Dato consignado', value: '12 kg/cm²; requiere validar las condiciones del ensayo.' },
    ],
  },
  {
    number: '02',
    title: 'Peso y densidad',
    method: 'Registro de masa y cálculo de densidad a partir del volumen exterior del bloque.',
    status: 'DENSIDAD APARENTE CALCULADA',
    details: [
      { label: 'Dimensiones', value: '40 × 30 × 20 cm.' },
      { label: 'Volumen exterior', value: '0,024 m³ (24 litros).' },
      { label: 'Prototipo 02', value: '8 kg · 333,33 kg/m³.' },
      { label: 'Prototipo 03', value: '15 kg · 625 kg/m³.' },
    ],
  },
  {
    number: '03',
    title: 'Absorción de agua',
    method: 'Comparación de masa seca y masa después de una inmersión controlada.',
    status: 'DATO REPORTADO · PENDIENTE DE VALIDACIÓN',
    details: [
      { label: 'Resultado', value: 'Pendiente de ensayo.' },
      { label: 'Evidencia', value: 'Porcentaje de absorción de agua.' },
      { label: 'Dato consignado', value: '15 %; falta documentar el ensayo.' },
    ],
  },
  {
    number: '04',
    title: 'Aislamiento térmico',
    method: 'Comparación de temperaturas entre las caras del bloque bajo condiciones controladas.',
    status: 'DATO REPORTADO · SIN MEDICIÓN EXPERIMENTAL',
    details: [
      { label: 'Resultado', value: 'Sin mediciones experimentales.' },
      { label: 'Observación', value: 'La incorporación de EPS presenta potencial para contribuir al aislamiento térmico.' },
      { label: 'Dato consignado', value: '0,08 W/mK; valor aún no medido experimentalmente.' },
    ],
  },
  {
    number: '05',
    title: 'Reacción al fuego',
    method: 'No se proporcionó un método ni resultados de ensayo para esta propiedad.',
    status: 'SIN DATOS DEL PROYECTO',
    details: [
      { label: 'Registro', value: 'Resultado no informado.' },
    ],
  },
  {
    number: '06',
    title: 'Aislamiento acústico',
    method: 'Medición de transmisión sonora a través del bloque.',
    status: 'DATO REPORTADO · SIN MEDICIÓN EXPERIMENTAL',
    details: [
      { label: 'Resultado', value: 'Sin mediciones experimentales.' },
      { label: 'Dato consignado', value: '40 dB; valor aún no medido experimentalmente.' },
    ],
  },
];

const comparisonRows = [
  {
    criterion: 'Densidad aparente',
    ecobloc: 'Prototipo 02: 333,33 kg/m³; prototipo 03: 625 kg/m³.',
    reference: 'AAC Ytong 4/600: 600 kg/m³ de densidad seca.',
  },
  {
    criterion: 'Masa para 24 litros',
    ecobloc: 'Prototipo 02: 8 kg; prototipo 03: 15 kg.',
    reference: '14,4 kg estimados a igual volumen, a partir de 600 kg/m³.',
  },
  {
    criterion: 'Compresión',
    ecobloc: '12 kg/cm² consignados (≈1,18 MPa si se interpreta como kgf/cm²); validación pendiente.',
    reference: '4,0 MPa de resistencia media a compresión según ficha.',
  },
  {
    criterion: 'Conductividad térmica',
    ecobloc: '0,08 W/mK consignados; sin medición experimental.',
    reference: '0,19 W/mK según ficha técnica.',
  },
];

const faqs = [
  ['¿Es resistente al agua?', 'El proyecto consigna un 15 % de absorción, pero el ensayo y sus condiciones aún deben documentarse. Este dato no permite afirmar que el bloque sea resistente al agua.'],
  ['¿Soporta carga?', 'Se consigna un valor de compresión de 12 kg/cm², pendiente de validación con un ensayo documentado. No basta para recomendar el bloque como elemento portante.'],
  ['¿Cómo se comporta frente al fuego?', 'No se proporcionaron resultados de reacción al fuego. Como la mezcla incluye EPS, no se debe afirmar que el bloque sea resistente al fuego sin un ensayo específico.'],
  ['¿Cuánto cuesta fabricarlo?', 'El costo por unidad no se ha calculado. Harían falta precios locales, cantidades por bloque, mano de obra y registro de pérdidas.'],
  ['¿Se puede replicar en casa?', 'La página describe pruebas experimentales, incluido el remojo del papel durante tres días y el secado. Las proporciones y prestaciones no están validadas como una receta de construcción.'],
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
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
        <div className="section-kicker">Punto de partida</div>
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
          <div className="section-kicker">Materia prima</div>
          <div className="section-heading-row">
            <h2 className="section-title">Cuatro componentes.<br /><span className="muted-title">mejor resultado en práctica.</span></h2>
            <p className="section-aside">Las proporciones corresponden a las cantidades volumétricas medidas durante la preparación experimental, utilizando una jarra de 1 litro como unidad de referencia. No representan porcentajes en masa.</p>
          </div>
          <div className="material-grid">
            {materials.map((item) => <article className="material-card" key={item.id} data-testid={`card-material-${item.id}`}>
              <div className="material-illustration"><img src={item.image} alt={item.alt} loading="lazy" /></div>
              <div className="material-info">
                <div className="material-top"><span className="mono">{item.id} / COMPONENTE</span><span className="material-dot" /></div>
                <h3>{item.name}</h3>
                <span className="role-tag">{item.role}</span>
                <p>{item.detail}</p>
                <div className="material-data"><span>ORIGEN</span><strong>{item.origin}</strong></div>
                <div className="material-data"><span>PROPORCIÓN</span><strong>{item.proportion}</strong></div>
                <div className="material-data"><span>PREPARACIÓN</span><strong>{item.preparation}</strong></div>
              </div>
            </article>)}
          </div>
          <div className="composition-panel">
            <div className="composition-copy"><span className="eyebrow">Composición de la mezcla</span><h3>Dosificación volumétrica<br />de la preparación.</h3><p>Los valores registrados suman 76,91 %. El volumen restante no está especificado.</p></div>
            <div className="composition-graphic" aria-label="Dosificación volumétrica registrada para los cuatro componentes">
              <div className="composition-legend">{materials.map((m) => <div className="composition-entry" key={m.id}><span>{m.name}</span><strong>{m.proportion}</strong></div>)}</div>
            </div>
            <span className="mono composition-stamp">VOLUMEN<br />NO MASA</span>
          </div>
        </div>
      </section>

      <section id="proceso" className="section-wrap process-section section-pad">
        <div className="section-kicker">Método</div>
        <div className="section-heading-row">
          <h2 className="section-title">Del residuo<br />al prototipo.</h2>
          <p className="section-aside">Registro fotográfico de la selección de materiales, preparación de la mezcla, moldeo y secado del prototipo.</p>
        </div>
        <div className="process-layout">
          <div className="timeline">
            {steps.map((step) => <article className="process-step" key={step.number} data-testid={`step-process-${step.number}`}>
              <div className="step-top">
                <div className="step-marker mono">{String(step.number).padStart(2, '0')}</div>
                <div className="eyebrow">ETAPA {String(step.number).padStart(2, '0')}</div>
              </div>
              <img className="step-image" src={step.image} alt={step.alt} loading="lazy" />
              <div className="step-content">
                <h3>{step.title}</h3><p>{step.description}</p>
                <div className="step-tools"><strong>{step.detailLabel}</strong>{step.detail}</div>
              </div>
            </article>)}
          </div>
        </div>
      </section>

      <section id="prototipos" className="prototypes-section section-pad">
        <div className="section-wrap">
          <div className="section-kicker">Iteraciones</div>
          <div className="section-heading-row">
            <h2 className="section-title">Prototipos y<br />aprendizajes.</h2>
            <p className="section-aside">Registro de las formulaciones probadas, sus observaciones y los ajustes realizados entre iteraciones.</p>
          </div>
          <div className="prototype-track">
            {prototypes.map((prototype) => <article className="prototype-card" key={prototype.id} data-testid={`card-prototype-${prototype.id}`}>
              <img className="prototype-image" src={prototype.image} alt={prototype.alt} loading="lazy" />
              <div className="prototype-meta"><span className="mono">{prototype.iteration}</span><span className="prototype-flag">{prototype.status}</span></div>
              <h3>{prototype.title}</h3>
              <div className="prototype-details">
                {prototype.details.map((detail) => <div className="prototype-detail" key={detail.label}>
                  <h4>{detail.label}</h4><p>{detail.text}</p>
                </div>)}
              </div>
            </article>)}
          </div>
        </div>
      </section>

      <section id="ensayos" className="section-wrap tests-section section-pad">
        <div className="section-kicker">Verificación</div>
        <div className="tests-header"><div><h2 className="section-title">Según nuestra<br />investigación.</h2></div><div className="evidence-badge"><FlaskConical size={20} /><span className="mono">ESTADO DE LOS DATOS</span><strong>PARCIALES</strong></div></div>
        <div className="test-status">
          <div className="test-status-top"><span className="status-outline"><span /> DATOS REPORTADOS Y ENSAYOS PENDIENTES</span><span className="mono">VALORES DEL PROYECTO / VALIDACIÓN SEGÚN MÉTODO</span></div>
          <div className="test-table">
            {verificationTests.map((test) => <article className="test-row" key={test.number} data-testid={`row-test-${test.number}`}>
              <div className="test-row-head"><span className="test-number mono">{test.number}</span><h3>{test.title}</h3><span className="test-status-chip">{test.status}</span></div>
              <p className="test-method"><strong>Método:</strong> {test.method}</p>
              <dl className="test-data-list">{test.details.map((detail) => <div key={detail.label}><dt>{detail.label}</dt><dd>{detail.value}</dd></div>)}</dl>
            </article>)}
          </div>
        </div>
      </section>

      <section id="comparativa" className="comparison-section section-pad">
        <div className="section-wrap">
          <div className="section-kicker">Referencia</div>
          <div className="comparison-head"><h2 className="section-title">Comparar también<br />es investigar.</h2><div className="compare-controls" role="group" aria-label="Formato de comparación">
            <button type="button" className={compareMode === 'tabla' ? 'selected' : ''} onClick={() => setCompareMode('tabla')} aria-pressed={compareMode === 'tabla'} data-testid="button-compare-table">Tabla</button>
            <button type="button" className={compareMode === 'resumen' ? 'selected' : ''} onClick={() => setCompareMode('resumen')} aria-pressed={compareMode === 'resumen'} data-testid="button-compare-summary">Resumen</button>
          </div></div>
          {compareMode === 'tabla' ? <div className="comparison-table" data-testid="comparison-table">
            <div className="compare-row compare-labels"><span>CRITERIO</span><span>ECOBLOC / PROTOTIPOS</span><span>BLOQUE AAC YTONG 4/600</span></div>
            {comparisonRows.map((row, index) => <div className="compare-row" key={row.criterion} data-testid={`row-comparison-${index + 1}`}><strong>{row.criterion}</strong><span><b className="compare-cell-label">ECOBLOC / PROTOTIPOS</b>{row.ecobloc}</span><span><b className="compare-cell-label">BLOQUE AAC YTONG 4/600</b>{row.reference}</span></div>)}
          </div> : <div className="compare-summary" data-testid="comparison-summary"><div><span className="eyebrow">ECOBLOC / PROTOTIPO 03</span><p>625 kg/m³ y 15 kg para 24 litros: densidad 4,2 % mayor que la referencia AAC.</p></div><ArrowRight size={22} /><div><span className="eyebrow">YTONG AAC 4/600</span><p>600 kg/m³ de densidad seca y 14,4 kg estimados para el mismo volumen de 24 litros.</p></div></div>}
          <p className="comparison-source">Referencia: <a href="https://www.aeratedconcrete.co.nz/documents/AAC-Block-Lintel-Specifications.pdf" target="_blank" rel="noreferrer">ficha técnica Ytong AAC 4/600 de Aerated Concrete Ltd</a>, que indica bloque exterior de 400 × 240 × 200 mm, densidad seca de 600 kg/m³, resistencia media de 4,0 MPa y conductividad térmica de 0,19 W/mK. Los 14,4 kg son una estimación a igual volumen (24 litros), calculada con la densidad seca de la ficha.</p>
        </div>
      </section>

      <section id="impacto" className="impact-section section-pad">
        <div className="section-wrap impact-layout">
          <div className="impact-copy">
            <div className="section-kicker">Circularidad</div>
            <h2 className="section-title">Aprovechamiento<br />de materiales.</h2>
            <p className="impact-intro">Indicadores volumétricos preliminares de la mezcla experimental, calculados a partir de las cantidades registradas.</p>
            <div className="impact-indicators">
              <article className="impact-indicator">
                <strong>15,38 %</strong>
                <h3>RESIDUOS RECUPERADOS INCORPORADOS</h3>
                <p>Porcentaje volumétrico de residuos recuperados incorporados a la mezcla: papel reciclado y aserrín procedente de carpinterías.</p>
                <dl>
                  <div><dt>Papel reciclado</dt><dd>0,5 L</dd></div>
                  <div><dt>Aserrín recuperado</dt><dd>0,5 L</dd></div>
                  <div><dt>Total de residuos recuperados</dt><dd>1 L</dd></div>
                  <div><dt>Volumen total de mezcla</dt><dd>6,5 L</dd></div>
                </dl>
                <small>El EPS no se incluye en este indicador porque fue adquirido comercialmente.</small>
              </article>
              <article className="impact-indicator">
                <strong>7,69 %</strong>
                <h3>PAPEL RECICLADO REUTILIZADO</h3>
                <p>Proporción volumétrica de papel recuperado incorporado a la mezcla experimental, utilizando 0,5 litros por cada 6,5 litros de mezcla total.</p>
                <div className="paper-preparation"><span className="eyebrow">PREPARACIÓN</span><ol><li>Triturado</li><li>Remojado</li><li>Licuado para obtener pulpa</li></ol></div>
                <p className="paper-note">El aprovechamiento del papel recuperado permite reincorporar fibras recicladas en la elaboración de un nuevo material constructivo.</p>
              </article>
            </div>
            <section className="impact-balance" aria-labelledby="impact-balance-title">
              <h3 id="impact-balance-title">BALANCE AMBIENTAL PRELIMINAR</h3>
              <dl className="impact-balance-list">
                <div><dt>Residuos recuperados / mezcla total</dt><dd>15,38 %</dd></div>
                <div><dt>Residuos recuperados / componentes sólidos</dt><dd>20 %</dd></div>
                <div><dt>Papel reutilizado / mezcla total</dt><dd>7,69 %</dd></div>
                <div><dt>Agua utilizada</dt><dd>1,5 L</dd></div>
                <div><dt>Yeso comercial</dt><dd>3 L</dd></div>
                <div><dt>EPS comercial</dt><dd>1 L</dd></div>
              </dl>
            </section>
          </div>
          <figure className="impact-photo">
            <img src="/images/sugarcrete-reference.jpg" alt="Bloques de material constructivo experimental elaborados con fibras y residuos vegetales." loading="lazy" />
            <figcaption>El proyecto explora el aprovechamiento de residuos de papel y madera mediante su incorporación en un material constructivo experimental. Esta propuesta busca promover la valorización de materiales recuperables y explorar alternativas de reutilización dentro del sector de la construcción.</figcaption>
          </figure>
        </div>
      </section>

      <section id="equipo" className="section-wrap team-section section-pad">
        <div className="section-kicker">Autoría</div>
        <div className="team-layout"><div><h2 className="section-title">Un proyecto<br />en construcción.</h2><p>Integrantes del grupo responsable de esta investigación.</p></div>
          <div className="team-members"><span className="mono">INTEGRANTES DEL GRUPO</span><ul>
            <li>CORRALES SEJAS KELLY KENDDY</li>
            <li>LOPEZ FLORES ALISSON</li>
            <li>PUMA MIRANDA FERNANDO</li>
            <li>VALLEJOS NINA YESIBEL</li>
          </ul></div>
        </div>
      </section>

      <section id="preguntas" className="faq-section section-pad">
        <div className="section-wrap faq-layout">
          <div><div className="section-kicker">Preguntas abiertas</div><h2 className="section-title">Lo que sabemos.<br />Y lo que no.</h2><p>Respuestas directas, sin atribuir propiedades que todavía no se han comprobado.</p></div>
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
          <div className="contact-copy"><div className="section-kicker">Conversación</div><h2>¿Quieres probar<br />o colaborar con<br />este material?</h2><p>La investigación mejora con preguntas, referencias y acompañamiento técnico.</p><div className="contact-register"><span className="mono">CORREO /</span><span>Por configurar</span><span className="mono">RESPUESTA /</span><span>Sin plazo publicado</span></div></div>
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
        <div className="section-wrap footer-bottom"><span className="mono">© {year} ECOBLOC / BLOQUE ECOLÓGICO</span><span className="mono">INSTITUCIÓN / POR CONFIRMAR</span><a href="#inicio" className="mono" data-testid="link-back-top">VOLVER ARRIBA ↑</a></div>
      </footer>
    </main>
  );
}

export default App;
