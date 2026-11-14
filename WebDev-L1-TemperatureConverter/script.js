const input = document.getElementById('value');
const unit = document.getElementById('unit');
const errorBox = document.getElementById('error');
const results = document.getElementById('results');
const ABSOLUTE_ZERO_C = -273.15;

function toCelsius(v, from) {
  if (from === 'F') return (v - 32) * 5 / 9;
  if (from === 'K') return v - 273.15;
  return v;
}

function convert() {
  errorBox.textContent = '';
  results.innerHTML = '';
  const raw = input.value.trim();

  if (raw === '' || isNaN(Number(raw))) {
    errorBox.textContent = 'Please enter a valid number, like 25 or -4.5.';
    return;
  }

  const c = toCelsius(Number(raw), unit.value);
  if (c < ABSOLUTE_ZERO_C - 1e-9) {
    errorBox.textContent = 'That is below absolute zero (-273.15 °C). Nothing can be that cold.';
    return;
  }

  const output = { C: c, F: c * 9 / 5 + 32, K: c + 273.15 };
  const labels = { C: '°C', F: '°F', K: 'K' };
  Object.keys(output).forEach(k => {
    const li = document.createElement('li');
    li.textContent = output[k].toFixed(2) + ' ' + labels[k];
    results.appendChild(li);
  });
}

document.getElementById('convert').addEventListener('click', convert);
input.addEventListener('keydown', e => { if (e.key === 'Enter') convert(); });
