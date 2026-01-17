// CinePlus - JS (sin frameworks)

function qs(sel, parent=document){ return parent.querySelector(sel); }
function qsa(sel, parent=document){ return [...parent.querySelectorAll(sel)]; }

const CinePlusData = {
  movies: [
    {
      id: 'm1',
      title: 'Aurora: La Última Señal',
      genre: 'Ciencia Ficción',
      duration: '2h 08m',
      rating: 4.7,
      age: '+13',
      price: 18,
      banner: 'assets/img/banner-1.svg',
      poster: 'assets/img/poster-1.svg',
      tagline: 'Cuando el cielo llama... alguien responde.',
      synopsis:
        'Una científica detecta una señal imposible en la ionosfera. Cuando el fenómeno se repite en todo el planeta, un equipo debe elegir entre revelar la verdad o mantener la calma mundial.',
      cast: ['M. Valverde', 'I. Santos', 'R. Nakamura'],
      trailer: 'https://www.youtube.com/embed/ysz5S6PUM-U',
      times: ['14:30', '16:50', '19:10', '21:40'],
    },
    {
      id: 'm2',
      title: 'Lima Nocturna',
      genre: 'Thriller',
      duration: '1h 55m',
      rating: 4.4,
      age: '+16',
      price: 17,
      banner: 'assets/img/banner-2.svg',
      poster: 'assets/img/poster-2.svg',
      tagline: 'En la ciudad, los secretos siempre vuelven.',
      synopsis:
        'Un periodista sigue una pista que conecta robos, poder y una verdad que nadie quiere mirar. Cada calle ilumina una pieza del rompecabezas.',
      cast: ['A. Paredes', 'G. Ríos', 'D. Ramírez'],
      trailer: 'https://www.youtube.com/embed/aqz-KE-bpKQ',
      times: ['13:10', '15:40', '18:00', '20:30'],
    },
    {
      id: 'm3',
      title: 'Risas de Medianoche',
      genre: 'Comedia',
      duration: '1h 42m',
      rating: 4.1,
      age: 'ATP',
      price: 15,
      banner: 'assets/img/banner-3.svg',
      poster: 'assets/img/poster-3.svg',
      tagline: 'Una noche, mil enredos.',
      synopsis:
        'Un grupo de amigos intenta organizar una sorpresa perfecta, pero una cadena de malentendidos convierte la noche en el mejor desastre posible.',
      cast: ['C. Ponce', 'F. Salazar', 'P. Medina'],
      trailer: 'https://www.youtube.com/embed/tgbNymZ7vqY',
      times: ['12:20', '14:10', '17:00', '19:20'],
    },
    {
      id: 'm4',
      title: 'Horizonte Andino',
      genre: 'Aventura',
      duration: '2h 12m',
      rating: 4.6,
      age: '+10',
      price: 18,
      banner: 'assets/img/banner-4.svg',
      poster: 'assets/img/poster-4.svg',
      tagline: 'La ruta cambia a quien la recorre.',
      synopsis:
        'Una expedición en los Andes descubre un antiguo mapa y una decisión: regresar o seguir el camino que nadie se atrevió a terminar.',
      cast: ['L. Quispe', 'S. Torres', 'J. Aguilar'],
      trailer: 'https://www.youtube.com/embed/9No-FiEInLA',
      times: ['11:30', '14:00', '16:30', '19:00'],
    },
  ],
  upcoming: [
    { title: 'Neón: El Estreno', date: '2026-02-02', genre: 'Acción', badge: 'Pronto' },
    { title: 'Corazones en HD', date: '2026-02-10', genre: 'Romance', badge: 'Estreno' },
    { title: 'Planeta 9', date: '2026-03-01', genre: 'Sci-Fi', badge: 'IMAX' },
    { title: 'La Ruta del Café', date: '2026-03-15', genre: 'Drama', badge: 'Festival' },
  ],
};

const Storage = {
  getTickets(){
    try{ return JSON.parse(localStorage.getItem('cineplus_tickets') || '[]'); }
    catch{ return []; }
  },
  saveTickets(tickets){ localStorage.setItem('cineplus_tickets', JSON.stringify(tickets)); },
  addTicket(ticket){
    const t = Storage.getTickets();
    t.unshift(ticket);
    Storage.saveTickets(t);
  },
  clearTickets(){ localStorage.removeItem('cineplus_tickets'); },
  setSelectedMovieId(id){ localStorage.setItem('cineplus_selected_movie', id); },
  getSelectedMovieId(){ return localStorage.getItem('cineplus_selected_movie'); },
  setBookingState(state){ localStorage.setItem('cineplus_booking', JSON.stringify(state)); },
  getBookingState(){
    try{ return JSON.parse(localStorage.getItem('cineplus_booking') || 'null'); }
    catch{ return null; }
  },
  clearBookingState(){ localStorage.removeItem('cineplus_booking'); }
};

function toast(message, type='info'){
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `<div class="toast__bar"></div><div class="toast__body"><b>${type.toUpperCase()}</b> · ${message}</div>`;
  document.body.appendChild(t);
  setTimeout(()=> t.classList.add('show'), 10);
  setTimeout(()=>{
    t.classList.remove('show');
    setTimeout(()=> t.remove(), 250);
  }, 2600);
}

function getMovieById(id){
  return CinePlusData.movies.find(m => m.id === id) || null;
}

function mountHeader(active){
  const header = qs('#appHeader');
  if(!header) return;

  header.innerHTML = `
    <header class="header">
      <div class="container header__inner">
        <a class="brand" href="${active === 'home' ? 'index.html' : '../index.html'}">
          <span class="brand__logo">🎬</span>
          <span class="brand__name">CinePlus</span>
          <span class="badge">Cartelera</span>
        </a>

        <nav class="nav" id="topNav">
          <a class="nav__link ${active==='home'?'active':''}" href="${active === 'home' ? 'index.html' : '../index.html'}">Inicio</a>
          <a class="nav__link ${active==='cartelera'?'active':''}" href="${active === 'home' ? 'pages/cartelera.html' : 'cartelera.html'}">Cartelera</a>
          <a class="nav__link ${active==='estrenos'?'active':''}" href="${active === 'home' ? 'pages/estrenos.html' : 'estrenos.html'}">Próximos</a>
          <a class="nav__link ${active==='promos'?'active':''}" href="${active === 'home' ? 'pages/promos.html' : 'promos.html'}">Promos</a>
          <a class="nav__link ${active==='tickets'?'active':''}" href="${active === 'home' ? 'pages/tickets.html' : 'tickets.html'}">Tickets</a>
          <a class="nav__link ${active==='faq'?'active':''}" href="${active === 'home' ? 'pages/faq.html' : 'faq.html'}">FAQ</a>
          <a class="nav__link ${active==='contacto'?'active':''}" href="${active === 'home' ? 'pages/contacto.html' : 'contacto.html'}">Contacto</a>
        </nav>

        <button class="hamburger" id="hamburgerBtn" aria-label="menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  `;

  const btn = qs('#hamburgerBtn');
  const nav = qs('#topNav');
  if(btn && nav){
    btn.addEventListener('click', ()=>{
      nav.classList.toggle('open');
      btn.classList.toggle('open');
    });
  }
}

function mountFooter(active){
  const footer = qs('#appFooter');
  if(!footer) return;

  footer.innerHTML = `
    <footer class="footer">
      <div class="container footer__grid">
        <div>
          <div class="footer__brand">🎬 CinePlus</div>
          <div class="footer__text">Cartelera moderna para tu curso (HTML + CSS + JS). Sin backend.</div>
          <div class="footer__mini">Hecho para correr local en VS Code (Live Server recomendado).</div>
        </div>

        <div>
          <div class="footer__title">Navegación</div>
          <a class="footer__link" href="${active === 'home' ? 'index.html' : '../index.html'}">Inicio</a>
          <a class="footer__link" href="${active === 'home' ? 'pages/cartelera.html' : 'cartelera.html'}">Cartelera</a>
          <a class="footer__link" href="${active === 'home' ? 'pages/estrenos.html' : 'estrenos.html'}">Próximos estrenos</a>
          <a class="footer__link" href="${active === 'home' ? 'pages/contacto.html' : 'contacto.html'}">Contacto</a>
        </div>

        <div>
          <div class="footer__title">Horario</div>
          <div class="footer__text">Lun - Dom: 10:00 a 23:00</div>
          <div class="footer__text">Santa Anita, Lima (demo)</div>
          <div class="footer__text">Soporte: soporte@cineplus.pe</div>
        </div>
      </div>
      <div class="container footer__bottom">
        <span>© ${new Date().getFullYear()} CinePlus</span>
        <span class="muted">Proyecto académico</span>
      </div>
    </footer>
  `;
}

function initRevealOnScroll(){
  const nodes = qsa('[data-reveal]');
  if(!nodes.length) return;

  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('revealed');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  nodes.forEach(n=> obs.observe(n));
}

function initHomeCarousel(){
  const root = qs('[data-carousel]');
  if(!root) return;

  const slides = qsa('.heroSlide', root);
  const dots = qs('[data-dots]', root);
  const prev = qs('[data-prev]', root);
  const next = qs('[data-next]', root);

  let idx = 0;

  function renderDots(){
    if(!dots) return;
    dots.innerHTML = slides.map((_,i)=>`<button class="dot ${i===idx?'active':''}" aria-label="slide ${i+1}"></button>`).join('');
    qsa('.dot', dots).forEach((b, i)=> b.addEventListener('click', ()=>{ idx=i; show(); }));
  }

  function show(){
    slides.forEach((s,i)=> s.classList.toggle('active', i===idx));
    renderDots();
  }

  function go(n){
    idx = (idx + n + slides.length) % slides.length;
    show();
  }

  prev?.addEventListener('click', ()=> go(-1));
  next?.addEventListener('click', ()=> go(1));

  show();
  setInterval(()=> go(1), 6000);
}

function renderMovieCards(containerSel, options={}){
  const root = qs(containerSel);
  if(!root) return;

  const { limit=null, showActions=true } = options;
  const movies = limit ? CinePlusData.movies.slice(0, limit) : CinePlusData.movies;

  root.innerHTML = movies.map(m=>{
    const stars = '★'.repeat(Math.round(m.rating))
    return `
      <article class="movieCard" data-reveal>
        <div class="movieCard__poster" style="background-image:url('${m.poster}')"></div>
        <div class="movieCard__body">
          <div class="movieCard__top">
            <span class="chip">${m.genre}</span>
            <span class="chip chip--soft">${m.age}</span>
          </div>
          <h3 class="movieCard__title">${m.title}</h3>
          <p class="movieCard__tag">${m.tagline}</p>
          <div class="movieCard__meta">
            <span>⏱ ${m.duration}</span>
            <span>⭐ ${m.rating.toFixed(1)}</span>
            <span>💳 S/ ${m.price}</span>
          </div>
          ${showActions ? `
            <div class="movieCard__actions">
              <a class="btn" href="pages/detalle.html" data-open-detail="${m.id}">Ver detalle</a>
              <a class="btn btn--primary" href="pages/reserva.html" data-book="${m.id}">Reservar</a>
            </div>
          ` : ''}
        </div>
      </article>
    `;
  }).join('');

  qsa('[data-open-detail]', root).forEach(a=>{
    a.addEventListener('click', ()=>{
      Storage.setSelectedMovieId(a.getAttribute('data-open-detail'));
    });
  });
  qsa('[data-book]', root).forEach(a=>{
    a.addEventListener('click', ()=>{
      const id = a.getAttribute('data-book');
      Storage.setSelectedMovieId(id);
      Storage.setBookingState({ movieId: id, time: null, seats: [] });
    });
  });

  initRevealOnScroll();
}

function initCarteleraFilters(){
  const grid = qs('#moviesGrid');
  if(!grid) return;

  const input = qs('#searchInput');
  const chips = qsa('[data-genre-chip]');

  let genre = 'Todos';

  function apply(){
    const term = (input?.value || '').trim().toLowerCase();
    const filtered = CinePlusData.movies.filter(m=>{
      const okGenre = genre === 'Todos' ? true : m.genre === genre;
      const okTerm = m.title.toLowerCase().includes(term);
      return okGenre && okTerm;
    });

    grid.innerHTML = filtered.map(m=>`
      <article class="movieRow" data-reveal>
        <div class="movieRow__poster" style="background-image:url('${m.poster}')"></div>
        <div class="movieRow__body">
          <div class="movieRow__head">
            <h3>${m.title}</h3>
            <div class="movieRow__mini">
              <span class="chip">${m.genre}</span>
              <span class="chip chip--soft">${m.age}</span>
            </div>
          </div>
          <p class="movieRow__syn">${m.synopsis}</p>
          <div class="movieRow__meta">
            <span>⏱ ${m.duration}</span>
            <span>⭐ ${m.rating.toFixed(1)}</span>
            <span>💳 S/ ${m.price}</span>
          </div>
          <div class="movieRow__actions">
            <a class="btn" href="detalle.html" data-open-detail="${m.id}">Detalle</a>
            <a class="btn btn--primary" href="reserva.html" data-book="${m.id}">Reservar</a>
          </div>
        </div>
      </article>
    `).join('');

    qsa('[data-open-detail]', grid).forEach(a=> a.addEventListener('click', ()=> Storage.setSelectedMovieId(a.getAttribute('data-open-detail'))));
    qsa('[data-book]', grid).forEach(a=> a.addEventListener('click', ()=>{
      const id = a.getAttribute('data-book');
      Storage.setSelectedMovieId(id);
      Storage.setBookingState({ movieId: id, time: null, seats: [] });
    }));

    initRevealOnScroll();
  }

  chips.forEach(c=>{
    c.addEventListener('click', ()=>{
      chips.forEach(x=> x.classList.remove('active'));
      c.classList.add('active');
      genre = c.getAttribute('data-genre-chip');
      apply();
    });
  });
  input?.addEventListener('input', apply);

  apply();
}

function initDetalle(){
  const box = qs('#detalleBox');
  if(!box) return;

  const id = Storage.getSelectedMovieId() || 'm1';
  const movie = getMovieById(id) || CinePlusData.movies[0];

  box.innerHTML = `
    <div class="detailHero" data-reveal>
      <div class="detailHero__poster" style="background-image:url('${movie.poster}')"></div>
      <div class="detailHero__body">
        <div class="detailHero__chips">
          <span class="chip">${movie.genre}</span>
          <span class="chip chip--soft">${movie.age}</span>
          <span class="chip chip--soft">⏱ ${movie.duration}</span>
          <span class="chip chip--soft">⭐ ${movie.rating.toFixed(1)}</span>
        </div>
        <h1 class="h1">${movie.title}</h1>
        <p class="lead">${movie.tagline}</p>
        <p class="muted">${movie.synopsis}</p>
        <div class="row gap">
          <a class="btn btn--primary" href="reserva.html" id="goBook">Reservar ahora</a>
          <a class="btn" href="cartelera.html">Volver a cartelera</a>
        </div>
      </div>
    </div>

    <div class="grid2">
      <section class="card" data-reveal>
        <div class="card__head">
          <h2>Horarios</h2>
          <span class="pill">S/ ${movie.price}</span>
        </div>
        <div class="times">
          ${movie.times.map(t=>`<button class="timeBtn" data-time="${t}">${t}</button>`).join('')}
        </div>
        <div class="hint">Tip: elige un horario y presiona “Reservar ahora”.</div>
      </section>

      <section class="card" data-reveal>
        <div class="card__head"><h2>Tráiler</h2></div>
        <div class="video">
          <iframe src="${movie.trailer}" title="trailer" frameborder="0" allowfullscreen></iframe>
        </div>
        <div class="hint">Reparto: ${movie.cast.join(' · ')}</div>
      </section>
    </div>
  `;

  qs('#goBook')?.addEventListener('click', ()=>{
    Storage.setSelectedMovieId(movie.id);
    const state = Storage.getBookingState() || { movieId: movie.id, time: null, seats: [] };
    Storage.setBookingState({ ...state, movieId: movie.id });
  });

  qsa('.timeBtn', box).forEach(b=>{
    b.addEventListener('click', ()=>{
      qsa('.timeBtn', box).forEach(x=> x.classList.remove('active'));
      b.classList.add('active');
      const state = Storage.getBookingState() || { movieId: movie.id, time: null, seats: [] };
      Storage.setBookingState({ ...state, movieId: movie.id, time: b.getAttribute('data-time') });
      toast('Horario seleccionado: '+b.getAttribute('data-time'),'ok');
    });
  });

  initRevealOnScroll();
}

function initReserva(){
  const root = qs('#reservaApp');
  if(!root) return;

  const state = Storage.getBookingState() || { movieId: Storage.getSelectedMovieId() || 'm1', time: null, seats: [] };
  const movie = getMovieById(state.movieId) || CinePlusData.movies[0];

  const seatRows = 6;
  const seatCols = 10;
  const blocked = new Set(['A1','A2','B5','C7','D4','F10']);

  function seatLabel(r,c){
    const rowChar = String.fromCharCode(65 + r);
    return rowChar + (c+1);
  }

  function render(){
    root.innerHTML = `
      <div class="grid2">
        <section class="card" data-reveal>
          <div class="card__head"><h2>Reserva</h2><span class="pill">Paso 1/2</span></div>
          <div class="resMovie">
            <div class="resMovie__poster" style="background-image:url('${movie.poster}')"></div>
            <div>
              <h3 style="margin:0">${movie.title}</h3>
              <div class="muted">${movie.genre} · ${movie.duration} · ⭐ ${movie.rating.toFixed(1)}</div>
              <div class="muted">Precio: <b>S/ ${movie.price}</b></div>
            </div>
          </div>

          <div class="field">
            <label>Horario</label>
            <select id="timeSelect">
              <option value="">Selecciona un horario</option>
              ${movie.times.map(t=>`<option value="${t}" ${state.time===t?'selected':''}>${t}</option>`).join('')}
            </select>
          </div>

          <div class="screen">Pantalla</div>
          <div class="seats" id="seatGrid"></div>

          <div class="legend">
            <span class="lg"><span class="sq"></span> Libre</span>
            <span class="lg"><span class="sq sel"></span> Seleccionado</span>
            <span class="lg"><span class="sq blk"></span> Ocupado</span>
          </div>
        </section>

        <section class="card" data-reveal>
          <div class="card__head"><h2>Resumen</h2><span class="pill">Paso 2/2</span></div>
          <div class="summary">
            <div class="sumRow"><span>Película</span><b>${movie.title}</b></div>
            <div class="sumRow"><span>Horario</span><b id="sumTime">${state.time || '-'}</b></div>
            <div class="sumRow"><span>Asientos</span><b id="sumSeats">${state.seats.length?state.seats.join(', '):'-'}</b></div>
            <div class="sumRow"><span>Cantidad</span><b id="sumQty">${state.seats.length}</b></div>
            <div class="sumRow total"><span>Total</span><b id="sumTotal">S/ ${(state.seats.length*movie.price).toFixed(2)}</b></div>

            <button class="btn btn--primary btn--block" id="btnPay">Confirmar y guardar ticket</button>
            <a class="btn btn--block" href="tickets.html">Ver mis tickets</a>

            <div class="hint">El ticket se guarda en tu navegador (localStorage).</div>
          </div>
        </section>
      </div>
    `;

    const grid = qs('#seatGrid');
    for(let r=0;r<seatRows;r++){
      for(let c=0;c<seatCols;c++){
        const label = seatLabel(r,c);
        const seat = document.createElement('button');
        seat.className = 'seat';
        seat.textContent = label;

        const isBlocked = blocked.has(label);
        const isSelected = state.seats.includes(label);

        if(isBlocked){ seat.classList.add('blocked'); seat.disabled = true; }
        if(isSelected){ seat.classList.add('selected'); }

        seat.addEventListener('click', ()=>{
          const exists = state.seats.includes(label);
          if(exists){
            state.seats = state.seats.filter(x=>x!==label);
          }else{
            state.seats.push(label);
          }
          Storage.setBookingState(state);
          render();
        });

        grid.appendChild(seat);
      }
    }

    const timeSel = qs('#timeSelect');
    timeSel?.addEventListener('change', ()=>{
      state.time = timeSel.value || null;
      Storage.setBookingState(state);
      render();
    });

    qs('#btnPay')?.addEventListener('click', ()=>{
      if(!state.time){
        toast('Selecciona un horario antes de confirmar','warn');
        return;
      }
      if(!state.seats.length){
        toast('Selecciona al menos 1 asiento','warn');
        return;
      }

      const ticket = {
        id: 'T' + Math.random().toString(16).slice(2,10).toUpperCase(),
        date: new Date().toISOString(),
        movieId: movie.id,
        movieTitle: movie.title,
        time: state.time,
        seats: [...state.seats],
        unitPrice: movie.price,
        total: state.seats.length * movie.price,
      };
      Storage.addTicket(ticket);
      Storage.clearBookingState();
      toast('Ticket guardado ✅','ok');
      setTimeout(()=> location.href = 'tickets.html', 600);
    });

    initRevealOnScroll();
  }

  render();
}

function initEstrenos(){
  const box = qs('#estrenosList');
  if(!box) return;

  box.innerHTML = CinePlusData.upcoming.map(u=>`
    <div class="upc" data-reveal>
      <div class="upc__left">
        <div class="upc__title">${u.title}</div>
        <div class="muted">${u.genre} · Estrena: <b>${u.date}</b></div>
      </div>
      <div class="pill">${u.badge}</div>
    </div>
  `).join('');

  initRevealOnScroll();
}

function initTickets(){
  const list = qs('#ticketsList');
  if(!list) return;

  const tickets = Storage.getTickets();
  if(!tickets.length){
    list.innerHTML = `<div class="empty" data-reveal>
      <h3>No tienes tickets aún</h3>
      <p class="muted">Haz una reserva desde cartelera y se guardará aquí.</p>
      <a class="btn btn--primary" href="cartelera.html">Ir a cartelera</a>
    </div>`;
    initRevealOnScroll();
    return;
  }

  list.innerHTML = tickets.map(t=>{
    const d = new Date(t.date);
    return `
      <div class="ticket" data-reveal>
        <div class="ticket__top">
          <div>
            <div class="ticket__id">${t.id}</div>
            <div class="ticket__title">${t.movieTitle}</div>
            <div class="muted">${d.toLocaleString()} · ${t.time}</div>
          </div>
          <div class="ticket__total">S/ ${t.total.toFixed(2)}</div>
        </div>
        <div class="ticket__meta">
          <span><b>Asientos:</b> ${t.seats.join(', ')}</span>
          <span><b>Unitario:</b> S/ ${t.unitPrice}</span>
        </div>
      </div>
    `;
  }).join('');

  qs('#btnClearTickets')?.addEventListener('click', ()=>{
    Storage.clearTickets();
    toast('Historial limpiado','ok');
    setTimeout(()=> location.reload(), 350);
  });

  initRevealOnScroll();
}

function initContacto(){
  const form = qs('#contactForm');
  if(!form) return;

  form.addEventListener('submit', (e)=>{
    e.preventDefault();

    const name = qs('#cName')?.value.trim();
    const email = qs('#cEmail')?.value.trim();
    const msg = qs('#cMsg')?.value.trim();

    if(!name || name.length < 3){ toast('Tu nombre debe tener al menos 3 letras','warn'); return; }
    if(!email || !email.includes('@')){ toast('Ingresa un correo válido','warn'); return; }
    if(!msg || msg.length < 10){ toast('Escribe un mensaje más largo','warn'); return; }

    form.reset();
    toast('Mensaje enviado ✅ (demo)','ok');
  });
}

function initAuth(){
  const form = qs('#loginForm');
  if(!form) return;

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    toast('Login demo: sin backend 🙂','info');
  });
}

// Bootstrap por página
window.addEventListener('DOMContentLoaded', ()=>{
  const page = document.body.getAttribute('data-page') || 'home';
  mountHeader(page);
  mountFooter(page);

  // pages
  initHomeCarousel();
  initCarteleraFilters();
  initDetalle();
  initReserva();
  initEstrenos();
  initTickets();
  initContacto();
  initAuth();

  // home cards
  if(page === 'home'){
    renderMovieCards('#homeFeatured', { limit: 4, showActions: true });
  }

  initRevealOnScroll();
});

window.CineUI = {
  toast(msg) {
    console.log("CineUI:", msg);
  }
};

document.addEventListener("DOMContentLoaded", () => {
 // CineUI.initBase({ basePath: "" });
 
 //CineUI.initHome();
});