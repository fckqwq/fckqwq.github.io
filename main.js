const themeToggle = document.querySelector('#theme-toggle');

function updateThemeButton() {
  const isDark = document.documentElement.dataset.theme === 'dark';
  const label = `Switch to ${isDark ? 'light' : 'dark'} mode`;
  themeToggle.setAttribute('aria-label', label);
  themeToggle.setAttribute('title', label);
  document.querySelector('meta[name="theme-color"]').setAttribute('content', isDark ? '#171b22' : '#ffffff');
}

themeToggle.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('theme', theme); } catch {}
  updateThemeButton();
});
updateThemeButton();
themeToggle.hidden = false;

// Keep the navigation in sync with the section being read.
const navigationLinks = [...document.querySelectorAll('.nav-links a')];
const linkedSections = navigationLinks.map(link => document.querySelector(link.hash));

function updateNavigation() {
  let activeSection = linkedSections[0];
  for (const section of linkedSections) {
    if (section.getBoundingClientRect().top <= 150) activeSection = section;
  }
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
    activeSection = linkedSections[linkedSections.length - 1];
  }
  for (const link of navigationLinks) {
    if (link.hash === `#${activeSection.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}

let updatePending = false;
window.addEventListener('scroll', () => {
  if (updatePending) return;
  updatePending = true;
  requestAnimationFrame(() => {
    updateNavigation();
    updatePending = false;
  });
}, { passive: true });
window.addEventListener('resize', updateNavigation);
window.addEventListener('load', updateNavigation);
updateNavigation();
