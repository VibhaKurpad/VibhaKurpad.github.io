import { generatePlan, normalizeCraft, restoreSaved, shoppingLinks, LEVELS, STORAGE_KEY } from './planner.js';

const $ = selector => document.querySelector(selector);
const defaults = { craft: 'crochet', level: 'beginner', minutes: 30, days: 14 };
let plan = generatePlan(defaults);
let checkedSupplies = new Set();
let checkedDays = new Set();
let hasSavedPlan = false;
let storageAvailable = true;
const node = (tag, text, className) => {
  const element = document.createElement(tag);
  if (text !== undefined) element.textContent = text;
  if (className) element.className = className;
  return element;
};
const externalLink = (text, href, className) => {
  const link = node('a', text, className);
  link.href = href;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  return link;
};

try {
  const saved = restoreSaved(localStorage.getItem(STORAGE_KEY));
  if (saved) {
    plan = saved.plan;
    checkedSupplies = new Set(saved.supplies);
    checkedDays = new Set(saved.days);
    hasSavedPlan = true;
  }
} catch { storageAvailable = false; }

function syncForm() {
  $('#craft').value = plan.craftName;
  $('#minutes').value = String(plan.options.minutes);
  $(`input[name=level][value=${plan.options.level}]`).checked = true;
  $(`input[name=days][value="${plan.options.days}"]`).checked = true;
  syncChips();
}
function syncChips() {
  const craft = normalizeCraft($('#craft').value);
  document.querySelectorAll('[data-craft]').forEach(button => button.setAttribute('aria-pressed', String(normalizeCraft(button.dataset.craft) === craft)));
}
function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, options: plan.options, supplies: [...checkedSupplies], days: [...checkedDays] }));
    hasSavedPlan = true;
    storageAvailable = true;
  } catch { storageAvailable = false; }
  updateSaveNote();
}
function updateSaveNote() {
  $('#plan-caption').textContent = hasSavedPlan ? 'your little plan' : 'a little inspiration';
  $('#save-note').textContent = !storageAvailable ? 'Storage is off here. Print your plan to keep it.' : hasSavedPlan ? 'Saved in this browser ♡' : 'An example to get you dreaming.';
  $('#clear-plan').hidden = !hasSavedPlan;
}
function checkbox(id, label, checked, onChange) {
  const input = node('input');
  input.type = 'checkbox';
  input.className = 'check-input';
  input.id = id;
  input.checked = checked;
  input.setAttribute('aria-label', label);
  input.addEventListener('change', () => { onChange(input.checked); updateProgress(); save(); });
  return input;
}
function updateProgress() {
  $('#supply-progress').textContent = `${checkedSupplies.size} of ${plan.supplies.length} ready`;
  $('#day-progress').textContent = `${checkedDays.size} of ${plan.schedule.length} days`;
  $('#timeline-progress').max = plan.schedule.length;
  $('#timeline-progress').value = checkedDays.size;
  $('#timeline-progress').setAttribute('aria-valuetext', `${checkedDays.size} of ${plan.schedule.length} days complete`);
}
function stageImage(visual) {
  const frame = node('div', undefined, `stage-image stage-row-${visual.row} stage-column-${visual.column}`);
  const image = node('img');
  image.src = visual.src;
  image.alt = visual.alt;
  image.width = 1536;
  image.height = 1024;
  image.decoding = 'async';
  const fallback = node('span', 'The picture could not load. Your written plan is still available.', 'stage-image-error');
  fallback.hidden = true;
  image.addEventListener('error', () => { image.hidden = true; fallback.hidden = false; });
  frame.append(image, fallback);
  return frame;
}
function showStage(visual) {
  $('#progress-dialog-title').textContent = `${visual.title} · ${plan.project.title}`;
  $('#progress-dialog-image').replaceChildren(stageImage(visual));
  $('#progress-dialog-description').textContent = visual.description;
  $('#progress-dialog').showModal();
}
function renderVisuals() {
  $('#project-stages').replaceChildren(...plan.visuals.map((visual, index) => {
    const figure = node('figure', undefined, 'stage-card');
    const button = node('button', undefined, 'stage-zoom');
    button.type = 'button';
    button.setAttribute('aria-label', `Enlarge ${visual.title.toLowerCase()}: ${plan.project.title}`);
    button.setAttribute('aria-haspopup', 'dialog');
    button.addEventListener('click', () => showStage(visual));
    button.append(stageImage(visual));
    const caption = node('figcaption');
    caption.append(node('span', `0${index + 1}`, 'stage-number'), node('h4', visual.title), node('p', visual.description));
    figure.append(button, caption);
    return figure;
  }));
}
function render() {
  $('#plan-heading').textContent = plan.project.title;
  $('#project-description').textContent = plan.project.description;
  $('#project-icon').textContent = plan.icon;
  $('#project-tags').replaceChildren(...[plan.craftName, LEVELS[plan.options.level], `${plan.options.days} days`, `${plan.options.minutes} min / making day`].map(text => node('span', text)));
  $('#plan-note').textContent = `Goal: ${plan.project.target} · ${plan.activeDays} making days + ${plan.options.days - plan.activeDays} rest days`;
  renderVisuals();
  $('#supply-count').textContent = plan.supplies.length;
  $('#supplies').replaceChildren(...plan.supplies.map((supply, index) => {
    const row = node('div', undefined, 'supply-row');
    const input = checkbox(`supply-${index}`, `I have ${supply.name}`, checkedSupplies.has(index), checked => checked ? checkedSupplies.add(index) : checkedSupplies.delete(index));
    const content = node('div');
    const heading = node('div', undefined, 'supply-title');
    const label = node('label', supply.name);
    label.htmlFor = input.id;
    heading.append(label, node('span', supply.quantity, 'supply-quantity'));
    const links = node('div', undefined, 'shop-links');
    links.append(...shoppingLinks(supply.query).map(link => {
      const anchor = externalLink(`${link.name} ↗`, link.url);
      anchor.setAttribute('aria-label', `Find ${supply.name} at ${link.name}, opens in a new tab`);
      return anchor;
    }));
    content.append(heading, node('p', supply.detail, 'supply-detail'), links);
    row.append(input, content);
    return row;
  }));
  const tutorials = plan.videos.map(video => {
    const link = externalLink('', `https://www.youtube.com/watch?v=${video.id}`, 'tutorial-card');
    const image = node('div', '▷', 'video-art');
    image.setAttribute('aria-hidden', 'true');
    const content = node('div');
    content.append(node('div', `${video.creator} · ${video.popularity}`, 'video-meta'), node('h4', `${video.title} ↗`), node('p', video.note));
    link.append(image, content);
    return link;
  });
  const search = externalLink(`Find a project walkthrough: ${plan.project.title.toLowerCase()} ↗`, `https://www.youtube.com/results?search_query=${encodeURIComponent(plan.project.query)}`, 'project-search');
  $('#tutorials').replaceChildren(...tutorials, search);
  $('#tutorial-tip').textContent = plan.tutorialTip;
  $('#timeline-subtitle').textContent = `${formatTime(plan.totalMinutes)} of making in total.`;
  const days = [];
  plan.schedule.forEach((day, index) => {
    if (index % 7 === 0) days.push(node('h4', `Week ${Math.floor(index / 7) + 1}`, 'week-label'));
    const row = node('div', undefined, `day-row${day.rest ? ' rest' : ''}`);
    const input = checkbox(`day-${index}`, `Complete day ${day.day}: ${day.title}`, checkedDays.has(index), checked => checked ? checkedDays.add(index) : checkedDays.delete(index));
    const content = node('div');
    const label = node('label', day.title);
    label.htmlFor = input.id;
    content.append(label, node('p', day.detail), node('div', day.rest ? 'Rest day' : `${day.minutes} min`, 'day-time'));
    if (day.watch.length) content.append(watchLinks(day.watch));
    if (day.milestone) content.append(node('span', day.milestone, 'milestone'));
    row.append(input, node('div', `DAY ${day.day}`, 'day-label'), content);
    days.push(row);
  });
  $('#timeline').replaceChildren(...days);
  updateProgress();
  updateSaveNote();
}
const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const CONFETTI = ['#ff3b3b', '#ff8c1a', '#ffc81a', '#22c55e', '#1e88ff', '#8e5cff', '#ff4fa3'];
function celebrate() {
  const card = $('#project-card');
  card.classList.remove('pop');
  void card.offsetWidth;
  card.classList.add('pop');
  if (reducedMotion()) return;
  const burst = node('div', undefined, 'confetti');
  burst.setAttribute('aria-hidden', 'true');
  for (let index = 0; index < 36; index++) {
    const piece = node('span');
    piece.style.setProperty('--x', `${Math.round(Math.random() * 100)}vw`);
    piece.style.setProperty('--drift', `${Math.round(Math.random() * 160 - 80)}px`);
    piece.style.setProperty('--spin', `${Math.round(Math.random() * 720 - 360)}deg`);
    piece.style.setProperty('--delay', `${Math.round(Math.random() * 400)}ms`);
    piece.style.background = CONFETTI[index % CONFETTI.length];
    burst.append(piece);
  }
  document.body.append(burst);
  setTimeout(() => burst.remove(), 3200);
}
function revealOnScroll() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || reducedMotion()) { items.forEach(item => item.classList.add('is-visible')); return; }
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  }), { threshold: 0.12 });
  document.documentElement.classList.add('motion');
  items.forEach(item => observer.observe(item));
}
function watchLinks(links) {
  const row = node('div', undefined, 'day-watch');
  row.append(node('span', 'Watch', 'day-watch-label'));
  let creator = '';
  links.forEach(link => {
    if (link.creator !== creator) {
      creator = link.creator;
      row.append(node('span', creator, 'day-watch-creator'));
    }
    const anchor = externalLink('', link.url, 'day-watch-link');
    anchor.append(node('b', link.time), document.createTextNode(` ${link.label}`));
    anchor.setAttribute('aria-label', `Watch ${link.label} at ${link.time} in ${link.title} by ${link.creator}, opens in a new tab`);
    row.append(anchor);
  });
  return row;
}
function formatTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return `${hours ? `${hours}h ` : ''}${remainder ? `${remainder}m` : ''}`.trim();
}
function selectTab(name, focus = false) {
  document.querySelectorAll('[data-tab]').forEach(tab => {
    const active = tab.dataset.tab === name;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    $(`#panel-${tab.dataset.tab}`).hidden = !active;
    if (active && focus) tab.focus();
  });
}
document.querySelectorAll('[data-tab]').forEach(tab => {
  tab.addEventListener('click', () => selectTab(tab.dataset.tab));
  tab.addEventListener('keydown', event => {
    const tabs = [...document.querySelectorAll('[data-tab]')];
    let index = tabs.indexOf(tab);
    if (event.key === 'ArrowRight') index = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') index = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') index = 0;
    else if (event.key === 'End') index = tabs.length - 1;
    else return;
    event.preventDefault();
    selectTab(tabs[index].dataset.tab, true);
  });
});
function clearCraftError() {
  $('#craft-error').hidden = true;
  $('#craft').removeAttribute('aria-invalid');
}
document.querySelectorAll('[data-craft]').forEach(button => button.addEventListener('click', () => {
  $('#craft').value = button.dataset.craft;
  clearCraftError();
  syncChips();
}));
$('#craft').addEventListener('input', () => { syncChips(); clearCraftError(); });
$('#plan-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const craft = normalizeCraft(form.get('craft'));
  if (!craft) {
    $('#craft-error').textContent = 'Our little library currently covers crochet, knitting, and hand embroidery. Choose one to make your plan.';
    $('#craft-error').hidden = false;
    $('#craft').setAttribute('aria-invalid', 'true');
    $('#craft').focus();
    return;
  }
  plan = generatePlan({ craft, level: form.get('level'), minutes: Number(form.get('minutes')), days: Number(form.get('days')) });
  checkedDays = new Set();
  checkedSupplies = new Set();
  save();
  render();
  selectTab('supplies');
  $('#status').textContent = storageAvailable ? 'Your plan is ready! Start with what you already have.' : 'Your plan is ready! Storage is off, so print it to keep a copy.';
  $('#my-plan').focus({ preventScroll: true });
  $('#my-plan').scrollIntoView({ behavior: reducedMotion() ? 'instant' : 'smooth', block: 'start' });
  celebrate();
});
$('#print-plan').addEventListener('click', () => window.print());
$('#close-progress-dialog').addEventListener('click', () => $('#progress-dialog').close());
$('#clear-plan').addEventListener('click', () => {
  try { localStorage.removeItem(STORAGE_KEY); }
  catch { $('#status').textContent = 'This browser could not clear saved storage. You can remove site data in your browser settings.'; return; }
  hasSavedPlan = false;
  plan = generatePlan(defaults);
  checkedSupplies.clear();
  checkedDays.clear();
  syncForm();
  render();
  $('#status').textContent = 'Saved plan cleared. Here is the example again.';
  $('#craft').focus();
});
syncForm();
render();
revealOnScroll();
