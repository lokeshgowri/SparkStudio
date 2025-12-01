// ----------------------------
// Smooth reveal on scroll
// ----------------------------
const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      el.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


// ----------------------------
// DARK MODE
// ----------------------------
const toggle = document.getElementById("darkToggle");

toggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  toggle.checked = true;
}


// ----------------------------
// CONTACT FORM -> BACKEND
// ----------------------------
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const sendBtn = document.getElementById("sendBtn");
  const statusEl = document.getElementById("formStatus");
  sendBtn.disabled = true;
  statusEl.textContent = "Sending...";

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value
  };

  try {
    const res = await fetch("http://localhost:3000/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      statusEl.textContent = "Message sent successfully!";
      document.getElementById("contactForm").reset();
    } else {
      statusEl.textContent = "Something went wrong.";
    }
  } catch (err) {
    statusEl.textContent = "Error sending message.";
  }

  sendBtn.disabled = false;
});

document.getElementById("year").textContent = new Date().getFullYear();
