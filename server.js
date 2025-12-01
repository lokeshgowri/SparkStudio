import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ------------------------------
// DIRECT VALUES (you will change them)
// ------------------------------
const TOKEN = "EAAQsWbKrXvkBQH8LjCHZCHKKc0HVVz04eIykHcKsecIWilXYntR41bAD49ZAtWfnnYfcVllXQ9WyZCYioZBkRCUHqy1J1RcJqkS9o4JJTcRBWRUgD5ATMrZCbpjL7e5HC6TDGKGLjSTBUZCDCPvPhPRfTatVWKeZCiZBbCZBg4Lh0WDQFrqHxgZAD7MVwOHdZBi7xdqni1yLJ7Vd7TpTcJxTVhvsMNh1CXCagNOGsZC67lKhiltNZAoOYZBf6JgLvS7zhkxaRh6ZAtkwk1l6TdOvRFL0nGZA";
const PHONE_NUMBER_ID = "823988177474649";
const PERSONAL_NUMBER = "919121770058"; // change this later

// ------------------------------
// SEND WHATSAPP
// ------------------------------
async function sendWhatsApp(name, email, message) {
  const text = `
📩 New SparkStudio Enquiry
-------------------------
👤 Name: ${name}
📧 Email: ${email}
📝 Message: ${message}
  `;

  return fetch(`https://graph.facebook.com/v20.0/${PHONE_NUMBER_ID}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: PERSONAL_NUMBER,
      type: "text",
      text: { body: text }
    })
  });
}

// ------------------------------
// API ENDPOINT
// ------------------------------
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  await sendWhatsApp(name, email, message);
  res.json({ success: true });
});

// ------------------------------
app.listen(3000, () =>
  console.log("Server running on http://localhost:3000")
);
