const app = document.querySelector("#app");
const nav = document.querySelector("#courseNav");
const progressText = document.querySelector("#progressText");
const progressBar = document.querySelector("#progressBar");
const sidebar = document.querySelector("#sidebar");
const scrim = document.querySelector("#scrim");
const storageKey = "js-dsa-progress-v1";
let completed = new Set(JSON.parse(localStorage.getItem(storageKey) || "[]"));

function topicFor(id) { return topics.find(topic => topic.id === id); }
function questionsFor(topicId) { return questions.filter(question => question.topic === topicId); }
function route() { return location.hash.replace(/^#\/?/, ""); }
function save() { localStorage.setItem(storageKey, JSON.stringify([...completed])); }
function closeMenu() { sidebar.classList.remove("open"); scrim.classList.remove("open"); }

function renderNav(activeId = "") {
  nav.innerHTML = topics.map(topic => `
    <section class="nav-group">
      <div class="nav-group-title">${topic.title}</div>
      ${questionsFor(topic.id).map(q => `
        <a class="nav-item ${q.id === activeId ? "active" : ""} ${completed.has(q.id) ? "done" : ""}" href="#/question/${q.id}">
          <span class="nav-num">${completed.has(q.id) ? "✓" : String(q.number).padStart(2, "0")}</span>
          <span>${q.title}</span>
        </a>`).join("")}
    </section>`).join("");
  updateProgress();
}

function updateProgress() {
  progressText.textContent = `${completed.size} / ${questions.length}`;
  progressBar.style.width = `${(completed.size / questions.length) * 100}%`;
}

function renderHome() {
  const next = questions.find(q => !completed.has(q.id)) || questions[0];
  app.innerHTML = `
    <section>
      <p class="eyebrow">Question-first interview prep</p>
      <h1>Learn DSA by solving the right problems.</h1>
      <p class="lead">No detached theory chapters. Each question introduces the JavaScript syntax, data structure, algorithm pattern, and complexity idea exactly when you need it.</p>
      <div class="hero-actions">
        <a class="primary-button" href="#/question/${next.id}">${completed.size ? "Continue learning" : "Start question 01"} →</a>
        <a class="secondary-button" href="#/topic/foundations">View first topic</a>
      </div>
    </section>
    <section>
      <div class="section-heading"><h2>Course map</h2><p>${questions.length} questions · 11 patterns</p></div>
      <div class="topic-grid">
        ${topics.map(topic => {
          const set = questionsFor(topic.id);
          const done = set.filter(q => completed.has(q.id)).length;
          return `<a class="topic-card" href="#/topic/${topic.id}">
            <div class="topic-top"><span class="topic-icon">${topic.icon}</span><span class="topic-count">${done}/${set.length}</span></div>
            <h3>${topic.title}</h3><p>${topic.description}</p>
          </a>`;
        }).join("")}
      </div>
    </section>`;
  renderNav();
}

function renderTopic(topicId) {
  const topic = topicFor(topicId);
  if (!topic) return renderNotFound();
  const set = questionsFor(topicId);
  app.innerHTML = `
    <p class="eyebrow">Topic ${topic.icon} · ${set.length} questions</p>
    <h1>${topic.title}</h1>
    <p class="lead">${topic.description}</p>
    <div class="problem-card">
      ${set.map(q => `<a class="nav-item ${completed.has(q.id) ? "done" : ""}" href="#/question/${q.id}">
        <span class="nav-num">${completed.has(q.id) ? "✓" : String(q.number).padStart(2, "0")}</span>
        <span style="flex:1;color:var(--ink);font-weight:700">${q.title}</span>
        <span class="pill ${q.difficulty.toLowerCase()}">${q.difficulty}</span>
      </a>`).join("")}
    </div>`;
  renderNav();
}

function placeholderLesson(question) {
  const topic = topicFor(question.topic);
  return {
    prompt: `This lesson is part of the ${topic.title} module. Its complete guided prompt will be added as the course expands.`,
    example: `// Question ${question.number}: ${question.title}`,
    concepts: [topic.title, question.difficulty],
    syntax: `<p>The JavaScript syntax for this lesson will be introduced here, only when the problem requires it.</p>`,
    hint: `<p>Before revealing a full answer, identify the input, required output, and what repeated work could be avoided.</p>`,
    approach: `<p>The guided reasoning for <strong>${question.title}</strong> is queued for this lesson.</p>`,
    solution: `<p>The complete JavaScript solution will live here. Questions 1–5 are fully authored in this first version.</p>`,
    complexity: `<p>Time and space will be discussed in the context of the chosen solution—not as a separate theory chapter.</p>`,
    edgeCases: `<p>We will derive edge cases from the problem constraints.</p>`
  };
}

function renderQuestion(id) {
  const question = questions.find(q => q.id === id);
  if (!question) return renderNotFound();
  const content = question.prompt ? question : { ...question, ...placeholderLesson(question) };
  const previous = questions[question.number - 2];
  const next = questions[question.number];
  const sections = [
    ["JavaScript you need", content.syntax], ["Hint", content.hint], ["Approach", content.approach],
    ["Solution", content.solution], ["Time & space", content.complexity], ["Edge cases", content.edgeCases]
  ];
  app.innerHTML = `
    <article>
      <header class="question-header">
        <div class="meta"><span class="pill">Question ${String(question.number).padStart(2, "0")}</span><span class="pill ${question.difficulty.toLowerCase()}">${question.difficulty}</span><span class="pill">${topicFor(question.topic).title}</span></div>
        <h1>${question.title}</h1>
      </header>
      <section class="problem-card">
        <h2>Problem</h2><p>${content.prompt}</p><pre>${content.example}</pre>
        <div class="concepts">${content.concepts.map(c => `<span class="concept">${c}</span>`).join("")}</div>
        <div class="reveal-list">
          ${sections.map((section, index) => `<details class="reveal"><summary><span class="reveal-index">${String(index + 1).padStart(2, "0")}</span>${section[0]}</summary><div class="reveal-body">${section[1]}</div></details>`).join("")}
        </div>
      </section>
      <div class="question-footer">
        ${previous ? `<a class="secondary-button" href="#/question/${previous.id}">← Previous</a>` : `<a class="secondary-button" href="#/">← Course map</a>`}
        <button class="primary-button complete-button ${completed.has(question.id) ? "done" : ""}" data-id="${question.id}">${completed.has(question.id) ? "Completed ✓" : "Mark complete"}</button>
        ${next ? `<a class="secondary-button" href="#/question/${next.id}">Next →</a>` : `<a class="secondary-button" href="#/">Course map</a>`}
      </div>
    </article>`;
  app.querySelector(".complete-button").addEventListener("click", event => {
    const qid = event.currentTarget.dataset.id;
    completed.has(qid) ? completed.delete(qid) : completed.add(qid);
    save();
    renderQuestion(qid);
  });
  renderNav(question.id);
}

function renderNotFound() {
  app.innerHTML = `<div class="empty-state"><h2>That lesson wandered off.</h2><p>Return to the course map and choose another question.</p><a class="primary-button" href="#/">Course map</a></div>`;
  renderNav();
}

function render() {
  closeMenu();
  const path = route().split("/").filter(Boolean);
  if (path[0] === "question") renderQuestion(path[1]);
  else if (path[0] === "topic") renderTopic(path[1]);
  else renderHome();
  window.scrollTo(0, 0);
  app.focus({ preventScroll: true });
}

document.querySelector("#menuButton").addEventListener("click", () => { sidebar.classList.add("open"); scrim.classList.add("open"); });
scrim.addEventListener("click", closeMenu);
document.querySelector("#themeButton").addEventListener("click", () => {
  const dark = document.documentElement.dataset.theme === "dark";
  document.documentElement.dataset.theme = dark ? "" : "dark";
  localStorage.setItem("js-dsa-theme", dark ? "light" : "dark");
});
document.querySelector("#resetButton").addEventListener("click", () => {
  if (confirm("Reset all completed questions?")) { completed.clear(); save(); render(); }
});
if (localStorage.getItem("js-dsa-theme") === "dark") document.documentElement.dataset.theme = "dark";
window.addEventListener("hashchange", render);
render();
