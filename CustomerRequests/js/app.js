import emailjs from "https://cdn.jsdelivr.net/npm/emailjs-com@2.6.4/dist/email.min.js";

// ---------- EmailJS configuration ----------
const SERVICE_ID = "service_fpkm7vo";
const TEMPLATE_ID = "_tvnND4sP1MKNZny0";
const PUBLIC_KEY = "_tvnND4sP1MKNZny0";
const PHONE_EMAIL = "6299825491@vtext.com";

// ---------- DOM elements ----------
const requestForm = document.getElementById("requestForm");
const confirmation = document.getElementById("confirmation");
const photoContainer = document.getElementById("photoContainer");

// ---------- Load dynamic photos ----------
async function loadPhotos() {
  try {
    const res = await fetch("images.json");
    if (!res.ok) throw new Error("images.json not found");
    const images = await res.json();

    images.forEach(img => {
      const section = document.createElement("div");
      section.classList.add("photo-section");

      const caption = document.createElement("div");
      caption.classList.add("photo-caption");
      caption.textContent = img.caption;

      const image = document.createElement("img");
      image.src = img.src;
      image.alt = img.caption;

      section.appendChild(caption);
      section.appendChild(image);
      photoContainer.appendChild(section);
    });
  } catch (err) {
    console.warn("No photos loaded:", err);
  }
}
loadPhotos();

// ---------- Form submit ----------
requestForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      to_email: PHONE_EMAIL,
      name: name,
      message: message
    }, PUBLIC_KEY);

    confirmation.style.display = "block";
    setTimeout(() => {
      confirmation.style.display = "none";
    }, 5000);

    requestForm.reset();
  } catch (err) {
    console.error("Error sending SMS:", err);
    alert("Failed to send request. Check console for details.");
  }
});
