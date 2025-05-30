// script.js
// Love Counter Logic

const countEl = document.getElementById('count');
const daysEl = document.getElementById('days');
const incrementBtn = document.getElementById('increment');

function getCurrentChristmas() {
  const now = new Date();
  let year = now.getFullYear();
  const christmas = new Date(year + '-12-25T00:00:00');
  if (now > christmas) {
    year += 1;
  }
  return year;
}

const year = getCurrentChristmas();
const counterRef = db.ref('counter/' + year);

function updateDaysRemaining() {
  const now = new Date();
  const christmas = new Date(year + '-12-25T00:00:00');
  const diff = christmas - now;
  const days = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  daysEl.textContent = `Days left until Christmas ${year}: ${days}`;
}

// Listen for changes in the counter
counterRef.on('value', (snapshot) => {
  const val = snapshot.val();
  countEl.textContent = val !== null ? val : 0;
});

incrementBtn.addEventListener('click', () => {
  counterRef.transaction((current) => (current || 0) + 1);
});

// Reset counter after Christmas (if needed)
(function checkReset() {
  const now = new Date();
  const lastYear = localStorage.getItem('coitusCounterLastYear');
  if (lastYear && lastYear !== String(year)) {
    db.ref('counter/' + year).set(0);
  }
  localStorage.setItem('coitusCounterLastYear', year);
})();

updateDaysRemaining();
setInterval(updateDaysRemaining, 1000 * 60 * 60); // update every hour
