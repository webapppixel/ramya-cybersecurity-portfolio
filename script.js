// Set this to your deployed Cloudflare Worker URL after deployment.
const CHAT_API_URL = "https://ramya-cybersecurity-portfolio.gbhuvanesh23.workers.dev/chat";

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("show");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("show");
  menuToggle.setAttribute("aria-expanded", "false");
}));
document.getElementById("year").textContent = new Date().getFullYear();

const chatPanel = document.getElementById("chatPanel");
const chatLauncher = document.getElementById("chatLauncher");
const chatClose = document.getElementById("chatClose");
const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
let history = [];

function toggleChat(open) {
  chatPanel.classList.toggle("open", open);
  chatPanel.setAttribute("aria-hidden", String(!open));
  if (open) chatInput.focus();
}
chatLauncher.addEventListener("click", () => toggleChat(!chatPanel.classList.contains("open")));
chatClose.addEventListener("click", () => toggleChat(false));

function addMessage(text, role) {
  const bubble = document.createElement("div");
  bubble.className = `message ${role === "user" ? "user-message" : "bot-message"}`;
  bubble.textContent = text;
  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return bubble;
}

async function sendMessage(text) {
  const clean = text.trim();
  if (!clean) return;
  addMessage(clean, "user");
  history.push({ role: "user", content: clean });
  chatInput.value = "";
  const pending = addMessage("Thinking…", "bot");
  const sendButton = chatForm.querySelector("button");
  sendButton.disabled = true;

  try {
    if (CHAT_API_URL.includes("YOUR-WORKER-NAME")) {
      throw new Error("The chatbot backend has not been configured yet. Follow the README to deploy the Cloudflare Worker and add its URL in script.js.");
    }
    const response = await fetch(CHAT_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: history.slice(-10) })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "The assistant is temporarily unavailable.");
    const answer = data.reply || "I couldn't generate a response. Please try again.";
    pending.textContent = answer;
    history.push({ role: "assistant", content: answer });
  } catch (error) {
    pending.textContent = error.message || "Something went wrong. Please try again.";
  } finally {
    sendButton.disabled = false;
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}
chatForm.addEventListener("submit", event => {
  event.preventDefault();
  sendMessage(chatInput.value);
});
document.querySelectorAll(".chat-suggestions button").forEach(button => {
  button.addEventListener("click", () => sendMessage(button.dataset.prompt));
});
