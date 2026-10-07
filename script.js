const menuButton = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Otwórz menu" : "Zamknij menu");
  siteNav.classList.toggle("is-open", !isOpen);
});

siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Otwórz menu");
    siteNav.classList.remove("is-open");
  }
});

const testimonials = [
  {
    heading: 'Po raz pierwszy od dawna<br>poczułam, że <em>jestem u siebie.</em>',
    quote: '„Marta stworzyła przestrzeń, w której nie musiałam niczego udowadniać. Wyszłam z kursu spokojniejsza, odważniejsza i — co najważniejsze — bliżej siebie.”',
    author: 'Julia, uczestniczka kursu „Powrót do siebie”'
  },
  {
    heading: 'Znalazłam ciszę,<br>której <em>tak bardzo potrzebowałam.</em>',
    quote: '„Leśny reset był dla mnie jak głęboki oddech po bardzo długim czasie. Wróciłam z lekkością i małymi rytuałami, które naprawdę zostały ze mną.”',
    author: 'Kasia, uczestniczka Leśnego resetu'
  },
  {
    heading: 'Nie dostałam gotowych odpowiedzi.<br><em>Odnalazłam swoje.</em>',
    quote: '„W kręgu poczułam się wysłuchana i przyjęta dokładnie taka, jaka jestem. To ciepłe, piękne spotkania, na które czekam cały miesiąc.”',
    author: 'Ania, uczestniczka Kręgu pełni'
  }
];

const testimonialTitle = document.querySelector("#testimonial-title");
const testimonialQuote = document.querySelector(".testimonial-quote");
const testimonialAuthor = document.querySelector(".testimonial-author span:last-child");
const testimonialDots = [...document.querySelectorAll(".testimonial-dot")];

testimonialDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    const testimonial = testimonials[index];
    testimonialTitle.innerHTML = testimonial.heading;
    testimonialQuote.textContent = testimonial.quote;
    testimonialAuthor.textContent = testimonial.author;
    testimonialDots.forEach((item, dotIndex) => {
      const active = dotIndex === index;
      item.classList.toggle("active", active);
      item.setAttribute("aria-current", String(active));
    });
    document.querySelector(".testimonial-dots").setAttribute("aria-label", `Opinia uczestniczki ${index + 1} z ${testimonials.length}`);
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();

document.querySelector("#contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();
  const subject = encodeURIComponent(`Wiadomość ze strony od ${name}`);
  const body = encodeURIComponent(`${message}\n\nOdpowiedz proszę na: ${email}`);
  document.querySelector("#form-status").textContent = "Otwieram Twoją aplikację pocztową — dziękuję za wiadomość.";
  window.location.href = `mailto:czesc@odkryjsiebie.pl?subject=${subject}&body=${body}`;
});
