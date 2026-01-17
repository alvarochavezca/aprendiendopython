/*
  CineLux - Cartelera
  Proyecto demo sin frameworks (solo HTML/CSS/JS).
  - Render de tarjetas desde un dataset
  - Búsqueda, filtros y orden
  - Modal de detalles + selector simple de asientos
  - Tickets guardados en localStorage
*/

'use strict';

// ---------------------------
// Dataset (puedes editarlo)
// ---------------------------
const MOVIES = [
  {
    id: 'neon-drift',
    title: 'Neon Drift',
    genre: 'Acción',
    rating: 4.6,
    mins: 128,
    age: '+14',
    lang: 'Español',
    format: '2D / IMAX',
    director: 'I. Nakamura',
    cast: 'L. Vega, M. Ríos, T. Cho',
    desc: 'Una piloto callejera descubre que la ciudad es un tablero de ajedrez controlado por IA. Para liberar a su hermano, debe ganar la carrera más peligrosa del año.',
    priceFrom: 18,
    poster: 'assets/posters/neon-drift.svg',
    showtimes: [
      { time: '15:10', room: 'A', price: 18 },
      { time: '17:40', room: 'B', price: 22 },
      { time: '20:15', room: 'IMAX', price: 28 },
    ],
    tags: ['Popular', 'IMAX']
  },
  {
    id: 'papel-y-luna',
    title: 'Papel & Luna',
    genre: 'Drama',
    rating: 4.3,
    mins: 114,
    age: '+12',
    lang: 'Español',
    format: '2D',
    director: 'S. Montenegro',
    cast: 'A. Chávez, R. Salas',
    desc: 'Un escritor fantasma recibe cartas de alguien que parece conocer su futuro. Entre la culpa y la esperanza, descubre que la vida también se reescribe.',
    priceFrom: 16,
    poster: 'assets/posters/papel-luna.svg',
    showtimes: [
      { time: '14:20', room: 'C', price: 16 },
      { time: '16:50', room: 'C', price: 16 },
      { time: '19:30', room: 'D', price: 20 },
    ],
    tags: ['Emotiva']
  },
  {
    id: 'bicho-bot',
    title: 'BichoBot: Misión Pizza',
    genre: 'Animación',
    rating: 4.8,
    mins: 98,
    age: 'ATP',
    lang: 'Doblada',
    format: '3D',
    director: 'K. Almeida',
    cast: 'Voces: M. Torres, J. Quispe',
    desc: 'Un robot miniatura y su amiga insecto deben salvar la ciudad… empezando por recuperar una pizza legendaria antes de que se enfríe.',
    priceFrom: 15,
    poster: 'assets/posters/bichobot.svg',
    showtimes: [
      { time: '13:00', room: 'Kids', price: 15 },
      { time: '15:25', room: 'Kids', price: 15 },
      { time: '17:10', room: 'B', price: 18 },
    ],
    tags: ['Familiar', '3D']
  },
  {
    id: 'umbra-7',
    title: 'Umbra-7',
    genre: 'Sci‑Fi',
    rating: 4.4,
    mins: 136,
    age: '+14',
    lang: 'Subtitulada',
    format: '2D / IMAX',
    director: 'E. Novak',
    cast: 'J. Park, N. Silva, H. Kwon',
    desc: 'Una misión de rescate en un satélite abandonado revela un experimento que nunca debió despertar. Cada pasillo es una pregunta sin respuesta.',
    priceFrom: 20,
    poster: 'assets/posters/umbra-7.svg',
    showtimes: [
      { time: '16:10', room: 'A', price: 20 },
      { time: '18:55', room: 'IMAX', price: 28 },
      { time: '21:35', room: 'IMAX', price: 30 },
    ],
    tags: ['IMAX']
  },
  {
    id: 'susurros-del-sotano',
    title: 'Susurros del Sótano',
    genre: 'Terror',
    rating: 4.1,
    mins: 105,
    age: '+16',
    lang: 'Español',
    format: '2D',
    director: 'P. Valdivia',
    cast: 'C. Medina, F. Lazo',
    desc: 'Una casa en el borde de la carretera promete descanso… pero el sótano tiene memoria. Cada susurro te acerca a una verdad que no quieres ver.',
    priceFrom: 17,
    poster: 'assets/posters/susurros.svg',
    showtimes: [
      { time: '18:10', room: 'D', price: 17 },
      { time: '20:05', room: 'D', price: 19 },
      { time: '22:20', room: 'C', price: 19 },
    ],
    tags: ['Noche']
  },
  {
    id: 'cafe-en-paris',
    title: 'Café en París',
    genre: 'Drama',
    rating: 4.0,
    mins: 109,
    age: '+12',
    lang: 'Subtitulada',
    format: '2D',
    director: 'M. Laurent',
    cast: 'É. Moreau, D. García',
    desc: 'Dos desconocidos comparten una mesa y una conversación imposible. Lo que empieza como un malentendido termina en una decisión que cambia todo.',
    priceFrom: 16,
    poster: 'assets/posters/cafe-paris.svg',
    showtimes: [
      { time: '15:40', room: 'B', price: 16 },
      { time: '18:20', room: 'B', price: 18 },
      { time: '20:50', room: 'A', price: 18 },
    ],
    tags: ['Romance']
  },
];

const PREMIERES = [
  { title: 'La Ruta del Cóndor', date: 'Próx. semana', note: 'Aventura • 2D' },
  { title: 'Pixel Noir', date: 'En 2 semanas', note: 'Thriller • 2D' },
  { title: 'Océano de Cristal', date: 'Este mes', note: 'Animación • 3D' },
];

// ---------------------------
// Helpers
// ---------------------------
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

function formatMins(mins){
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}h ${String(m).padStart(2,'0')}m`;
}

function todayLabel(){
  const d = new Date();
  const fmt = new Intl.DateTimeFormat('es-PE', { weekday:'long', day:'2-digit', month:'long' });
  return fmt.format(d);
}

function safeParseJSON(value, fallback){
  try { return JSON.parse(value); } catch { return fallback; }
}

function toast(msg){
  const el = $('#toast');
  const text = $('#toastText');
  text.textContent = msg;
  el.hidden = false;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { el.hidden = true; }, 2200);
}

// ---------------------------
// State
// ---------------------------
const state = {
  genre: 'all',
  q: '',
  sort: 'pop',
  onlyToday: false,
  featuredId: MOVIES[0]?.id,
  modalMovieId: null,
  selectedTime: null, // {time, room, price}
  selectedSeats: new Set(),
};

// simplistic "hoy" rule: showtimes before 19:00 are considered "hoy" when toggled
function isTodayTime(t){
  const [h] = t.split(':').map(Number);
  return h < 19;
}

// Tickets persistence
const STORAGE_KEY = 'cinelux_tickets_v1';
function loadTickets(){
  return safeParseJSON(localStorage.getItem(STORAGE_KEY) || '[]', []);
}
function saveTickets(items){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// Theme persistence
const THEME_KEY = 'cinelux_theme';
function applyTheme(theme){
  if (theme === 'light') document.documentElement.setAttribute('data-theme','light');
  else document.documentElement.removeAttribute('data-theme');
}

// ---------------------------
// Render
// ---------------------------
function movieCard(movie){
  const div = document.createElement('article');
  div.className = 'card';
  div.innerHTML = `
    <div class="poster" style="background-image:url('${movie.poster}')"></div>
    <div class="card__body">
      <div class="card__top">
        <div>
          <h3>${movie.title}</h3>
          <p>${movie.desc}</p>
        </div>
        <div class="rating" title="Rating">
          <span aria-hidden="true">⭐</span>
          <strong>${movie.rating.toFixed(1)}</strong>
        </div>
      </div>

      <div class="badges">
        <span class="badge">${movie.genre}</span>
        <span class="badge">${movie.age}</span>
        <span class="badge">${formatMins(movie.mins)}</span>
      </div>

      <div class="card__bottom">
        <div class="small">
          <span aria-hidden="true">🎟️</span>
          <span>Desde S/ ${movie.priceFrom}</span>
        </div>
        <button class="btn btn--primary" type="button" data-open="${movie.id}">
          Ver
        </button>
      </div>

      <div class="showtimes" aria-label="Horarios">
        ${movie.showtimes.slice(0,3).map(s => `<span class="time" data-open="${movie.id}" data-time="${s.time}">${s.time}</span>`).join('')}
      </div>
    </div>
  `;
  return div;
}

function premiereCard(p){
  const div = document.createElement('div');
  div.className = 'premiere';
  div.innerHTML = `
    <strong>${p.title}</strong>
    <div class="muted">${p.note}</div>
    <div class="muted" style="margin-top: 8px; font-weight: 800;">${p.date}</div>
  `;
  return div;
}

function filteredMovies(){
  const q = state.q.trim().toLowerCase();
  let list = MOVIES.slice();

  if (state.genre !== 'all') list = list.filter(m => m.genre === state.genre);
  if (q) list = list.filter(m => m.title.toLowerCase().includes(q));

  if (state.onlyToday) {
    list = list.filter(m => m.showtimes.some(s => isTodayTime(s.time)));
  }

  switch(state.sort){
    case 'rating': list.sort((a,b) => b.rating - a.rating); break;
    case 'title': list.sort((a,b) => a.title.localeCompare(b.title, 'es')); break;
    case 'time': list.sort((a,b) => a.mins - b.mins); break;
    case 'pop':
    default:
      // pseudo popularidad: rating + tags + price
      list.sort((a,b) => (b.rating + b.tags.length*0.08) - (a.rating + a.tags.length*0.08));
      break;
  }

  return list;
}

function renderGrid(){
  const grid = $('#grid');
  const empty = $('#empty');
  const list = filteredMovies();

  grid.setAttribute('aria-busy','true');
  grid.innerHTML = '';

  if (!list.length) {
    empty.hidden = false;
    grid.setAttribute('aria-busy','false');
    return;
  }

  empty.hidden = true;
  list.forEach(m => grid.appendChild(movieCard(m)));
  grid.setAttribute('aria-busy','false');
}

function renderPremieres(){
  const strip = $('#premieres');
  strip.innerHTML = '';
  PREMIERES.forEach(p => strip.appendChild(premiereCard(p)));
}

function setChipActive(genre){
  $$('.chip').forEach(c => c.classList.toggle('is-active', c.dataset.genre === genre));
}

function setTicketCount(){
  const tickets = loadTickets();
  $('#ticketCount').textContent = String(tickets.length);
}

function renderFeatured(){
  const featured = MOVIES.find(m => m.id === state.featuredId) || MOVIES[0];
  state.featuredId = featured.id;

  $('#featuredTitle').textContent = featured.title;
  $('#featuredDesc').textContent = featured.desc;
  $('#featuredRating').textContent = featured.rating.toFixed(1);

  const times = $('#featuredTimes');
  times.innerHTML = featured.showtimes.map(s => `<span class="time" data-open="${featured.id}" data-time="${s.time}">${s.time}</span>`).join('');

  $('#btnFeatured').onclick = () => openMovieModal(featured.id);
}

// ---------------------------
// Modal + Seats
// ---------------------------
const ROWS = 6;
const COLS = 10;

function seatKey(r,c){ return `${String.fromCharCode(65+r)}${c+1}`; }

function seedOccupied(movieId, time){
  // deterministic-ish occupied seats based on movie + time
  const seed = (movieId + '|' + time).split('').reduce((a,ch)=>a+ch.charCodeAt(0),0);
  const occ = new Set();
  for(let i=0;i<10;i++){
    const r = (seed + i*7) % ROWS;
    const c = (seed + i*11) % COLS;
    occ.add(seatKey(r,c));
  }
  return occ;
}

function renderSeats(movieId, show){
  const seats = $('#seats');
  seats.innerHTML = '';
  const occupied = seedOccupied(movieId, show.time);

  for(let r=0;r<ROWS;r++){
    for(let c=0;c<COLS;c++){
      const key = seatKey(r,c);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'seat';
      btn.textContent = key;

      if (occupied.has(key)) {
        btn.classList.add('is-occupied');
        btn.disabled = true;
      }
      if (state.selectedSeats.has(key)) btn.classList.add('is-selected');

      btn.addEventListener('click', () => {
        if (state.selectedSeats.has(key)) state.selectedSeats.delete(key);
        else state.selectedSeats.add(key);
        renderSeats(movieId, show);
        updateTotal(show.price);
      });

      seats.appendChild(btn);
    }
  }
}

function updateTotal(price){
  const total = state.selectedSeats.size * price;
  $('#totalPrice').textContent = `S/ ${total}`;
}

function openMovieModal(movieId, preferredTime=null){
  const movie = MOVIES.find(m => m.id === movieId);
  if (!movie) return;

  state.modalMovieId = movieId;
  state.selectedTime = null;
  state.selectedSeats.clear();

  $('#modalTitle').textContent = movie.title;
  $('#modalMeta').textContent = `${movie.genre} • ${movie.age} • ${formatMins(movie.mins)}`;
  $('#modalRating').textContent = movie.rating.toFixed(1);
  $('#modalDesc').textContent = movie.desc;
  $('#modalDirector').textContent = movie.director;
  $('#modalCast').textContent = movie.cast;
  $('#modalLang').textContent = movie.lang;
  $('#modalFormat').textContent = movie.format;
  $('#modalPoster').style.backgroundImage = `url('${movie.poster}')`;

  const badges = $('#modalBadges');
  badges.innerHTML = '';
  [movie.genre, movie.age, movie.format, ...movie.tags].forEach(t => {
    const span = document.createElement('span');
    span.className = 'badge';
    span.textContent = t;
    badges.appendChild(span);
  });

  $('#priceLabel').textContent = `Desde S/ ${movie.priceFrom}`;
  $('#roomLabel').textContent = '—';
  $('#seatBox').hidden = true;

  const times = $('#modalTimes');
  times.innerHTML = '';

  movie.showtimes.forEach(s => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'time';
    b.textContent = s.time;
    b.addEventListener('click', () => selectShowtime(movie, s));
    times.appendChild(b);

    if (preferredTime && preferredTime === s.time) {
      // auto-select
      setTimeout(() => b.click(), 0);
    }
  });

  const modal = $('#movieModal');
  modal.showModal();
}

function selectShowtime(movie, show){
  state.selectedTime = show;
  state.selectedSeats.clear();

  $$('#modalTimes .time').forEach(t => t.classList.toggle('is-active', t.textContent === show.time));
  $('#roomLabel').textContent = show.room;
  $('#seatBox').hidden = false;

  renderSeats(movie.id, show);
  updateTotal(show.price);
}

function closeMovieModal(){
  const modal = $('#movieModal');
  if (modal.open) modal.close();
}

function buyTickets(){
  const movie = MOVIES.find(m => m.id === state.modalMovieId);
  const show = state.selectedTime;

  if (!movie || !show) return toast('Selecciona un horario primero');
  if (state.selectedSeats.size === 0) return toast('Selecciona al menos 1 asiento');

  const items = loadTickets();
  const now = new Date();
  const id = `T-${now.getTime()}`;
  items.unshift({
    id,
    movieId: movie.id,
    title: movie.title,
    time: show.time,
    room: show.room,
    seats: Array.from(state.selectedSeats),
    price: show.price,
    createdAt: now.toISOString(),
  });
  saveTickets(items);
  setTicketCount();

  toast('¡Compra registrada!');
  closeMovieModal();
}

// Tickets modal
function renderTickets(){
  const list = $('#ticketsList');
  const items = loadTickets();

  if (!items.length){
    list.innerHTML = `
      <div class="empty" style="margin:0;" >
        <div class="empty__icon" aria-hidden="true">🎟️</div>
        <h3>Sin tickets</h3>
        <p>Compra una entrada desde la cartelera y aparecerá aquí.</p>
      </div>
    `;
    return;
  }

  list.innerHTML = '';
  items.forEach(t => {
    const div = document.createElement('div');
    div.className = 'ticket';
    const total = t.seats.length * t.price;
    const created = new Intl.DateTimeFormat('es-PE', { dateStyle:'medium', timeStyle:'short' }).format(new Date(t.createdAt));

    div.innerHTML = `
      <div>
        <strong>${t.title}</strong>
        <p>${t.time} • Sala ${t.room} • Asientos: ${t.seats.join(', ')}<br/>
        <span class="muted">Comprado: ${created}</span></p>
      </div>
      <div style="text-align:right">
        <div class="badge">S/ ${total}</div>
        <button class="btn btn--ghost" type="button" data-remove="${t.id}" style="margin-top:8px">Eliminar</button>
      </div>
    `;

    list.appendChild(div);
  });

  $$('[data-remove]', list).forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-remove');
      const next = loadTickets().filter(t => t.id !== id);
      saveTickets(next);
      setTicketCount();
      renderTickets();
      toast('Ticket eliminado');
    });
  });
}

function openTickets(){
  renderTickets();
  $('#ticketsModal').showModal();
}

// ---------------------------
// Events
// ---------------------------
function bindEvents(){
  $('#todayLabel').textContent = todayLabel();
  $('#year').textContent = String(new Date().getFullYear());

  // Search
  $('#searchInput').addEventListener('input', (e) => {
    state.q = e.target.value;
    renderGrid();
  });
  $('#btnClear').addEventListener('click', () => {
    $('#searchInput').value = '';
    state.q = '';
    renderGrid();
    $('#searchInput').focus();
  });

  // Chips
  $$('.chip').forEach(c => c.addEventListener('click', () => {
    state.genre = c.dataset.genre;
    setChipActive(state.genre);
    renderGrid();
  }));

  // Sort + today
  $('#sortSelect').addEventListener('change', (e) => {
    state.sort = e.target.value;
    renderGrid();
  });
  $('#onlyToday').addEventListener('change', (e) => {
    state.onlyToday = e.target.checked;
    renderGrid();
  });

  // Reset
  $('#btnReset').addEventListener('click', () => {
    state.genre = 'all';
    state.q = '';
    state.sort = 'pop';
    state.onlyToday = false;
    $('#searchInput').value = '';
    $('#sortSelect').value = 'pop';
    $('#onlyToday').checked = false;
    setChipActive('all');
    renderGrid();
  });

  // Grid open handlers (delegation)
  $('#grid').addEventListener('click', (e) => {
    const open = e.target.closest('[data-open]');
    if (!open) return;
    const id = open.getAttribute('data-open');
    const t = open.getAttribute('data-time');
    openMovieModal(id, t);
  });

  // Featured open handlers
  $('#featuredTimes').addEventListener('click', (e) => {
    const open = e.target.closest('[data-open]');
    if (!open) return;
    const id = open.getAttribute('data-open');
    const t = open.getAttribute('data-time');
    openMovieModal(id, t);
  });

  // Modal controls
  $('#btnClose').addEventListener('click', closeMovieModal);
  $('#btnCancelSeats').addEventListener('click', () => {
    state.selectedTime = null;
    state.selectedSeats.clear();
    $('#seatBox').hidden = true;
    $$('#modalTimes .time').forEach(t => t.classList.remove('is-active'));
    toast('Elige otro horario');
  });
  $('#btnBuy').addEventListener('click', buyTickets);

  // Tickets
  $('#btnTickets').addEventListener('click', openTickets);
  $('#btnCloseTickets').addEventListener('click', () => $('#ticketsModal').close());
  $('#btnClearTickets').addEventListener('click', () => {
    saveTickets([]);
    setTicketCount();
    renderTickets();
    toast('Tickets eliminados');
  });

  // Promo
  $('#btnPromo').addEventListener('click', () => toast('Promo demo: válido miércoles en funciones seleccionadas.'));

  // Theme
  $('#btnTheme').addEventListener('click', () => {
    const current = localStorage.getItem(THEME_KEY) || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
    toast(`Tema: ${next === 'light' ? 'claro' : 'oscuro'}`);
  });

  // ESC closes dialogs automatically; just ensure seat state reset when closing.
  $('#movieModal').addEventListener('close', () => {
    state.modalMovieId = null;
    state.selectedTime = null;
    state.selectedSeats.clear();
  });
}

// ---------------------------
// Init
// ---------------------------
function init(){
  // Theme
  const theme = localStorage.getItem(THEME_KEY) || 'dark';
  applyTheme(theme);

  // featured: pick best rating
  state.featuredId = MOVIES.slice().sort((a,b)=>b.rating-a.rating)[0]?.id;

  renderFeatured();
  renderPremieres();
  renderGrid();
  setTicketCount();
  bindEvents();
}

document.addEventListener('DOMContentLoaded', init);
