const screen = document.getElementById('screen');
let current = '0';      // number being typed
let stored = null;      // left-hand value
let pendingOp = null;   // operator waiting to be applied
let justEvaluated = false;
let hasError = false;

const show = t => { screen.textContent = t; };
const fmt = n => String(parseFloat(n.toFixed(10)));

function apply(a, op, b) {
  if (op === '+') return a + b;
  if (op === '−') return a - b;
  if (op === '×') return a * b;
  if (op === '÷') return b === 0 ? null : a / b;
}

function showError() {
  hasError = true; current = '0'; stored = null; pendingOp = null;
  show('Error: cannot divide by 0');
}

function reset() {
  current = '0'; stored = null; pendingOp = null; justEvaluated = false; hasError = false; show('0');
}

function inputNumber(d) {
  if (hasError) reset();
  if (justEvaluated) { current = '0'; justEvaluated = false; }
  if (d === '.') { if (current.includes('.')) return; current += '.'; }
  else current = current === '0' ? d : current + d;
  show(stored !== null && pendingOp ? `${fmt(stored)} ${pendingOp} ${current}` : current);
}

function inputOperator(op) {
  if (hasError) return;
  justEvaluated = false;
  if (pendingOp && current !== '') {            // chain: 5 + 3 × ... -> evaluate left to right
    const r = apply(stored, pendingOp, parseFloat(current));
    if (r === null) return showError();
    stored = r;
  } else stored = parseFloat(current);
  pendingOp = op; current = '';
  show(`${fmt(stored)} ${op}`);
}

function equals() {
  if (hasError || !pendingOp || current === '') return;
  const r = apply(stored, pendingOp, parseFloat(current));
  if (r === null) return showError();
  current = fmt(r); stored = null; pendingOp = null; justEvaluated = true;
  show(current);
}

function backspace() {
  if (hasError) return reset();
  if (justEvaluated || current === '') return;
  current = current.length > 1 ? current.slice(0, -1) : '0';
  show(stored !== null && pendingOp ? `${fmt(stored)} ${pendingOp} ${current}` : current);
}

document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.dataset.num !== undefined) inputNumber(btn.dataset.num);
    else if (btn.dataset.op) inputOperator(btn.dataset.op);
    else if (btn.dataset.action === 'equals') equals();
    else if (btn.dataset.action === 'clear') reset();
    else if (btn.dataset.action === 'back') backspace();
  });
});
