const KEY = 'oibsip_todo_tasks';
let tasks = load();

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
}
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(tasks)); } catch {}
}
const now = () => new Date().toLocaleString();

function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  if (!text) { input.focus(); return; }
  tasks.push({ id: Date.now(), text, done: false, added: now(), completed: null });
  input.value = '';
  update();
}

function toggle(id) {
  const t = tasks.find(x => x.id === id);
  t.done = !t.done;
  t.completed = t.done ? now() : null;
  update();
}

function remove(id) { tasks = tasks.filter(x => x.id !== id); update(); }

function edit(id) {
  const t = tasks.find(x => x.id === id);
  const next = prompt('Edit task:', t.text);
  if (next && next.trim()) { t.text = next.trim(); update(); }
}

function button(label, cls, fn) {
  const b = document.createElement('button');
  b.textContent = label; b.className = cls;
  b.addEventListener('click', fn);
  return b;
}

function render(listId, items, emptyMsg) {
  const ul = document.getElementById(listId);
  ul.innerHTML = '';
  if (!items.length) {
    const li = document.createElement('li');
    li.className = 'empty'; li.textContent = emptyMsg;
    ul.appendChild(li); return;
  }
  items.forEach(t => {
    const li = document.createElement('li');
    if (t.done) li.classList.add('done');
    const span = document.createElement('span');
    span.className = 'text'; span.textContent = t.text;
    const small = document.createElement('small');
    small.textContent = 'Added ' + t.added + (t.completed ? ' · Completed ' + t.completed : '');
    li.append(span,
      button(t.done ? 'Undo' : 'Mark complete', 'ghost', () => toggle(t.id)),
      button('Edit', 'ghost', () => edit(t.id)),
      button('Delete', 'del', () => remove(t.id)),
      small);
    ul.appendChild(li);
  });
}

function update() {
  save();
  const pending = tasks.filter(t => !t.done), done = tasks.filter(t => t.done);
  document.getElementById('pendingCount').textContent = `(${pending.length} pending)`;
  document.getElementById('doneCount').textContent = `(${done.length} completed)`;
  render('pendingList', pending, 'Nothing pending. Add a task above.');
  render('doneList', done, 'No completed tasks yet.');
}

document.getElementById('addBtn').addEventListener('click', addTask);
document.getElementById('taskInput').addEventListener('keydown', e => { if (e.key === 'Enter') addTask(); });
update();
