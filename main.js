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
