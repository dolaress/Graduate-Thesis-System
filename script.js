// --- Configuration ---
// --- Configuration ---
const API_URL = "http://127.0.0.1:5000/api";

// --- State Management ---
let state = {
  metadata: {
    universities: [],
    institutes: [],
    thesisTypes: [],
    languages: [],
    subjects: [],
    keywords: [],
  },
  currentUser: null,
  currentView: "login", // login, home, search, submit, detail, my-theses
  theses: [], // Cache for search results
};

// --- Initialization ---
async function initApp() {
  initCanvas();

  // Check for existing token
  const token = localStorage.getItem("access_token");
  const userJson = localStorage.getItem("user");

  if (token && userJson) {
    state.currentUser = JSON.parse(userJson);
    state.currentView = "home";
  }

  // Fetch Metadata
  try {
    const res = await fetch(`${API_URL}/metadata`);
    if (res.ok) {
      state.metadata = await res.json();
      console.log("Metadata loaded:", state.metadata);
    } else {
      console.error("Failed to load metadata:", res.status);
      alert("Fatal Error: Could not load system data. Backend might be down.");
    }
  } catch (e) {
    console.error("API Error:", e);
    alert(
      "Fatal Error: Could not connect to the Backend Server. Please ensure it is running on port 5000."
    );
  }

  render();
}

// Start
initApp();

// --- State Management ---

// --- Helper Functions ---

function getTypeName(id) {
  const type = state.metadata.thesisTypes.find((t) => t.id === id);
  return type ? type.name : "Unknown";
}

function getInstituteName(id) {
  const inst = state.metadata.institutes.find((i) => i.id === id);
  return inst ? inst.name : "Unknown";
}

function getLanguageName(code) {
  const lang = state.metadata.languages.find((l) => l.code === code);
  return lang ? lang.name : code;
}

function getUniversityName(instituteId) {
  const inst = state.metadata.institutes.find((i) => i.id === instituteId);
  if (!inst) return "Unknown University";
  const uni = state.metadata.universities.find(
    (u) => u.id === inst.university_id
  );
  return uni ? uni.name : "Unknown University";
}

// --- DOM Elements ---
const appContainer = document.getElementById("app");

// --- Canvas Animation Logic ---
var animationId;
var canvasState = "none"; // 'particles', 'dots', 'none'

function initCanvas() {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;

  // Resize handler
  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  window.addEventListener("resize", resize);
  resize();

  const ctx = canvas.getContext("2d");

  // --- PARTICLE NETWORK (Login) ---
  // (Keeping existing particle logic simplified for brevity if needed, but I'll preserve it or wrap it)
  // Actually, to save tokens, I'll rewrite the animation loop to handle both states.

  let particles = [];
  let dots = [];

  // Particle Class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 2;
      this.size = 2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
      ctx.fillStyle = getComputedStyle(document.body).getPropertyValue(
        "--text-secondary"
      ); // Use theme color
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Dot Grid Class (Home)
  class Dot {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.baseX = x;
      this.baseY = y;
      this.size = 2;
      this.baseSize = 2;
    }

    update(mouseX, mouseY) {
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 150;

      // Interaction: Glow/Scaleup
      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance;
        this.size = this.baseSize + force * 3; // Grow up to 5px
        // Slight flee effect?
        // const angle = Math.atan2(dy, dx);
        // this.x -= Math.cos(angle) * force * 2;
        // this.y -= Math.sin(angle) * force * 2;
      } else {
        this.size = this.baseSize;
        this.x = this.baseX;
        this.y = this.baseY;
      }
    }

    draw() {
      ctx.fillStyle =
        getComputedStyle(document.body).getPropertyValue("--text-border") ||
        "#ccc";
      // Manual fallback if var not found immediately
      const isDark =
        document.documentElement.getAttribute("data-theme") === "dark";
      ctx.fillStyle = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)";

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < 50; i++) particles.push(new Particle());
  }

  function createDots() {
    dots = [];
    const gap = 40;
    for (let x = 0; x < canvas.width; x += gap) {
      for (let y = 0; y < canvas.height; y += gap) {
        dots.push(new Dot(x, y));
      }
    }
  }

  // Mouse tracking
  let mouse = { x: null, y: null };
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (canvasState === "particles") {
      // Login Animation
      if (particles.length === 0) createParticles();

      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      // Connect lines
      ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue(
        "--border"
      );
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    } else if (canvasState === "dots") {
      // Home Animation
      if (
        dots.length === 0 ||
        dots.length < (canvas.width * canvas.height) / 2000
      )
        createDots(); // Re-create if resize made huge gaps? Simple check: just re-create on resize manually or lazy init.
      // Actually efficient re-check:
      // Let's just createDots() when switching state.

      dots.forEach((dot) => {
        dot.update(mouse.x, mouse.y);
        dot.draw();
      });
    }

    animationId = requestAnimationFrame(animate);
  }

  // Expose reset functions
  window.resetCanvasState = (state) => {
    canvasState = state;
    if (state === "dots") createDots();
    if (state === "particles") createParticles();
  };

  animate();
}

// --- Render Functions ---

function render() {
  appContainer.innerHTML = ""; // Clear current view

  // Toggle Background Canvas Logic
  const bgCanvas = document.getElementById("bg-canvas");
  if (bgCanvas) {
    if (state.currentView === "login") {
      bgCanvas.style.display = "block";
      if (window.resetCanvasState) window.resetCanvasState("particles");
    } else if (state.currentView === "home") {
      bgCanvas.style.display = "block";
      if (window.resetCanvasState) window.resetCanvasState("dots");
    } else {
      bgCanvas.style.display = "none"; // Hide for inner pages? Or keep static?
      // User requested Dot pattern for "Ana Ekran" (Home).
      // Usually internal pages are clean. Let's hide it for Search/Submit etc to be clean.
      if (window.resetCanvasState) window.resetCanvasState("none");
    }
  }

  // Toggle Mesh Background for Submit View, Search View, AND My Theses View
  if (
    state.currentView === "submit" ||
    state.currentView === "search" ||
    state.currentView === "my-theses"
  ) {
    document.body.classList.add("mesh-bg");
  } else {
    document.body.classList.remove("mesh-bg");
  }

  // Protected Views check
  if (!state.currentUser && state.currentView !== "login") {
    state.currentView = "login";
  }

  if (state.currentView === "login") {
    renderLogin();
  } else {
    renderHeader();
    if (state.currentView === "home") renderHome();
    else if (state.currentView === "search") renderSearch();
    else if (state.currentView === "submit") renderSubmit();
    else if (state.currentView === "my-theses") renderMyTheses();
    else if (state.currentView === "admin") renderAdmin();
    else if (state.currentView === "supervisor") renderSupervisorPanel();
    else if (state.currentView.startsWith("detail-")) {
      const id = parseInt(state.currentView.split("-")[1]);
      renderDetail(id);
    }
  }
}

function renderHome() {
  const section = document.createElement("section");
  section.className = "home-section fade-in";
  section.innerHTML = `
        <div class="home-hero">
            <h1>Welcome back, ${state.currentUser.first_name}</h1>
            <p>What would you like to do today?</p>
        </div>
        <div class="home-actions">
            <div class="action-card" onclick="switchView('search')">
                <div class="icon-circle">
                   <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
                <h3>Search Theses</h3>
                <p>Browse the archive of graduate theses</p>
            </div>
            <div class="action-card" onclick="switchView('submit')">
                 <div class="icon-circle">
                   <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </div>
                <h3>Submit Thesis</h3>
                <p>Upload your research work to the system</p>
            </div>
        </div>
    `;
  appContainer.appendChild(section);
}

// ... renderLogin ... (Update redirect)
// Login Form submit listener needs to change currentView = 'home'

// I will overwrite renderLogin too to update the redirect logic.
function renderLogin() {
  const section = document.createElement("section");
  section.className = "login-section fade-in";
  section.innerHTML = `
        <div class="login-card">
            <h2 id="form-title">GTS Login</h2>
            <p id="form-desc">Welcome to the Graduate Thesis System</p>
            
            <form id="login-form">
                <div class="form-group">
                    <label>Email Address</label>
                    <input type="email" id="login-email" placeholder="e.g. volkan.tunali@gmail.com" required>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <div class="password-wrapper">
                        <input type="password" id="login-password" placeholder="********" required>
                        <button type="button" class="toggle-password" data-target="login-password">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        </button>
                    </div>
                </div>
                <button type="submit" class="btn-primary">Login</button>
                <p style="margin-top:1rem; font-size:90%;">Don't have an account? <a href="#" id="show-register">Sign Up</a></p>
            </form>

            <form id="register-form" style="display:none;">
                <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" id="reg-name" placeholder="Name Surname" required>
                </div>
                <div class="form-group">
                    <label>Email Address</label>
                    <input type="email" id="reg-email" placeholder=".....@example.com" required>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <div class="password-wrapper">
                         <input type="password" id="reg-password" placeholder="********" required>
                        <button type="button" class="toggle-password" data-target="reg-password">
                             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        </button>
                    </div>
                </div>
                <button type="submit" class="btn-primary">Create Account</button>
                <p style="margin-top:1rem; font-size:90%;">Already have an account? <a href="#" id="show-login">Login</a></p>
            </form>
        </div>
    `;
  appContainer.appendChild(section);

  const loginForm = document.getElementById("login-form");
  // ... toggles ... (reuse previous logic by copying or minimizing, but I must replace the whole function block to be safe with tool)
  const registerForm = document.getElementById("register-form");
  const title = document.getElementById("form-title");
  const desc = document.getElementById("form-desc");

  // Password Toggle Logic
  document.querySelectorAll(".toggle-password").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const input = document.getElementById(targetId);
      if (input.type === "password") {
        input.type = "text";
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M1 1l22 22"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/></svg>`;
      } else {
        input.type = "password";
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
      }
    });
  });

  document.getElementById("show-register").addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.style.display = "none";
    registerForm.style.display = "block";
    title.innerText = "Create Account";
  });

  document.getElementById("show-login").addEventListener("click", (e) => {
    e.preventDefault();
    registerForm.style.display = "none";
    loginForm.style.display = "block";
    title.innerText = "GTS Login";
  });

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));
        state.currentUser = data.user;

        state.currentView = "home";
        renderHeader();
        render();
      } else {
        const err = await res.json();
        alert(err.error || "Login failed");
      }
    } catch (error) {
      console.error(error);
      alert("Login error");
    }
  });

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fullName = document.getElementById("reg-name").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-password").value.trim();

    // Split Name
    const parts = fullName.split(" ");
    const firstName = parts[0];
    const lastName = parts.slice(1).join(" ") || "";

    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));
        state.currentUser = data.user;

        state.currentView = "home";
        renderHeader();
        render();
      } else {
        const err = await res.json();
        alert(err.error || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      alert("Registration error");
    }
  });
}

function renderHeader() {
  // This function updates the header area outside the appContainer if needed,
  // or we can prepend a header to appContainer.
  // For this simple SPA, let's just make the header dynamic in index.html or manage it here.
  // Let's assume index.html has a static header, but we want to show "Logout" and Nav items.
  const nav = document.getElementById("main-nav");
  if (!nav) return; // Should exist in index.html

  nav.innerHTML = ""; // Clear existing content

  if (!state.currentUser) return; // Empty nav if logged out

  // Check if Admin
  const isAdmin = state.currentUser.role_id === 2;
  const isSupervisor = state.currentUser.role_id === 3;

  let panelBtn = "";
  if (isAdmin) {
    panelBtn = `<button onclick="switchView('admin')">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            Admin Panel
        </button>`;
  } else if (isSupervisor) {
    panelBtn = `<button onclick="switchView('supervisor')">
             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
            Supervisor Panel
        </button>`;
  }

  nav.innerHTML = `
        <button onclick="switchView('search')">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            Search
        </button>
        <button onclick="switchView('submit')">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            Submit Thesis
        </button>
        <button onclick="switchView('my-theses')">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            My Theses
        </button>
        ${panelBtn}
        <button onclick="logout()">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Logout (${state.currentUser.first_name})
        </button>
    `;
  // We do NOT append child to header, as 'nav' is already in place.
}

window.switchView = (view) => {
  state.currentView = view;
  render();
};

window.logout = () => {
  state.currentUser = null;
  state.currentView = "login";
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");

  const nav = document.getElementById("main-nav");
  if (nav) nav.innerHTML = "";
  render();
};

function renderSearch() {
  const section = document.createElement("section");
  section.className = "search-container fade-in";

  // Sort keywords alphabetically for better UX
  const sortedKeywords = [...state.metadata.keywords].sort((a, b) =>
    a.text.localeCompare(b.text)
  );

  section.innerHTML = `
        <div class="filters-card">
            <h3>Search Theses</h3>
            
            <!-- Main Search Row -->
            <div class="search-main-row">
                <div class="search-input-wrapper">
                    <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <input type="text" id="search-text" placeholder="Search by title, abstract or author...">
                </div>
                <button id="btn-search" class="btn-primary">Search</button>
            </div>

            <!-- Basic Filters (Always Visible) -->
            <div class="basic-filters-row">
                 <div class="select-wrapper">
                     <select id="filter-type">
                        <option value="">All Types</option>
                        ${state.metadata.thesisTypes
                          .map(
                            (t) => `<option value="${t.id}">${t.name}</option>`
                          )
                          .join("")}
                    </select>
                 </div>
                <div class="year-group">
                    <input type="number" id="filter-year-min" placeholder="Min Year">
                    <span class="year-separator">-</span>
                    <input type="number" id="filter-year-max" placeholder="Max Year">
                </div>
            </div>

            <!-- Toggle Advanced -->
            <button id="toggle-advanced" class="btn-text" style="font-size:0.9rem; margin-bottom:1rem;">
                <span>&#9656;</span> Show Advanced Filters
            </button>

            <!-- Advanced Filters Area -->
            <div id="advanced-filters" style="display:none; padding-top:1rem; border-top:1px solid var(--border);">
                <div class="filter-grid">
                    <select id="filter-university">
                        <option value="">All Universities</option>
                        ${state.metadata.universities
                          .map(
                            (u) => `<option value="${u.id}">${u.name}</option>`
                          )
                          .join("")}
                    </select>
                    <select id="filter-institute">
                        <option value="">All Institutes</option>
                        ${state.metadata.institutes
                          .map(
                            (i) =>
                              `<option value="${i.id}">${
                                i.name
                              } (${getUniversityName(i.id)})</option>`
                          )
                          .join("")}
                    </select>
                    <select id="filter-language">
                        <option value="">All Languages</option>
                        ${state.metadata.languages
                          .map(
                            (l) =>
                              `<option value="${l.code}">${l.name}</option>`
                          )
                          .join("")}
                    </select>
                    <select id="filter-subject">
                        <option value="">All Subjects</option>
                        ${state.metadata.subjects
                          .map(
                            (s) => `<option value="${s.id}">${s.name}</option>`
                          )
                          .join("")}
                    </select>
                    
                    <!-- Keyword Autocomplete Filter -->
                    <div style="flex:1; min-width:150px;">
                        <input type="text" id="filter-keyword" list="keyword-list" placeholder="Filter by Keyword (e.g. Evolution)">
                        <datalist id="keyword-list">
                            ${state.metadata.keywords
                              .sort((a, b) => a.text.localeCompare(b.text))
                              .map((k) => `<option value="${k.text}">`)
                              .join("")}
                        </datalist>
                    </div>
                </div>
            </div>
        </div>

        <div id="results-area" class="results-grid">
            <!-- Properties will be filled here -->
        </div>
    `;
  appContainer.appendChild(section);

  // Toggle Logic
  const toggleBtn = document.getElementById("toggle-advanced");
  const advancedDiv = document.getElementById("advanced-filters");

  toggleBtn.addEventListener("click", () => {
    const isHidden = advancedDiv.style.display === "none";
    advancedDiv.style.display = isHidden ? "block" : "none";
    toggleBtn.innerHTML = isHidden
      ? "<span>&#9662;</span> Hide Advanced Filters"
      : "<span>&#9656;</span> Show Advanced Filters";
  });

  // Initial fetch of all items
  filterAndRenderResults();

  document
    .getElementById("btn-search")
    .addEventListener("click", filterAndRenderResults);
  // Add listener to keyword input to trigger search on change/select
  document
    .getElementById("filter-keyword")
    .addEventListener("input", filterAndRenderResults);
  // Add listener to university to (optional) filter institutes or just trigger search?
  // Let's just trigger search for now.
  document
    .getElementById("filter-university")
    .addEventListener("change", filterAndRenderResults);
}

async function filterAndRenderResults() {
  const query = document.getElementById("search-text")?.value || "";
  const typeId = document.getElementById("filter-type")?.value;
  const langCode = document.getElementById("filter-language")?.value;
  const instId = document.getElementById("filter-institute")?.value;
  const uniId = document.getElementById("filter-university")?.value;
  const subjId = document.getElementById("filter-subject")?.value;
  const keywordText = document.getElementById("filter-keyword")?.value;
  const minYear = document.getElementById("filter-year-min")?.value;
  const maxYear = document.getElementById("filter-year-max")?.value;

  // Build Query Params
  const params = new URLSearchParams();
  if (query) params.append("q", query);
  if (typeId) params.append("type", typeId);
  if (langCode) params.append("language", langCode);
  if (instId) params.append("institute", instId);
  if (uniId) params.append("university", uniId);
  if (subjId) params.append("subject", subjId);
  if (minYear) params.append("year_min", minYear);
  if (maxYear) params.append("year_max", maxYear);

  if (keywordText) {
    const kw = state.metadata.keywords.find(
      (k) => k.text.toLowerCase() === keywordText.toLowerCase()
    );
    if (kw) params.append("keyword_id", kw.id);
  }

  try {
    const res = await fetch(`${API_URL}/theses?${params.toString()}`);
    if (!res.ok) throw new Error("Search failed");
    const results = await res.json();
    state.theses = results; // Cache
    renderResults(results);
  } catch (e) {
    console.error(e);
    document.getElementById(
      "results-area"
    ).innerHTML = `<p class="no-results">Error loading results.</p>`;
  }
}

function renderResults(list) {
  const area = document.getElementById("results-area");
  if (!area) return;
  area.innerHTML = "";

  if (list.length === 0) {
    area.innerHTML = `
            <div class="no-results">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <p>No theses found matching your criteria.</p>
            </div>
        `;
    return;
  }

  list.forEach((t) => {
    const card = document.createElement("div");
    card.className = "thesis-card glass-card fade-in";

    const thesisSubjects = t.subjects
      .map((sId) => {
        const s = state.metadata.subjects.find((sub) => sub.id === sId);
        return s ? `<span class="tag subject-tag">${s.name}</span>` : "";
      })
      .join("");

    const thesisKeywords = t.keywords
      .map((kId) => {
        const k = state.metadata.keywords.find((kw) => kw.id === kId);
        return k ? `<span class="tag keyword-tag">#${k.text}</span>` : "";
      })
      .join("");

    card.innerHTML = `
            <div class="card-header">
                <span class="badge type">${getTypeName(t.type_id)}</span>
                <span class="badge lang">${t.language_code}</span>
            </div>
            <h3 onclick="switchView('detail-${t.id}')">${t.title}</h3>
            <div class="thesis-meta">
                <span class="author">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    ${t.author || "Unknown"}
                </span>
                <span class="uni">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.9 10.7a1.67 1.67 0 0 0 .58-1 1.67 1.67 0 0 0-.58-1l-9-5a1.8 1.8 0 0 0-1.8 0l-9 5a1.67 1.67 0 0 0-.58 1 1.67 1.67 0 0 0 .58 1l9 5a1.8 1.8 0 0 0 1.8 0z"/><path d="M12 21.5V16"/></svg>
                    ${getUniversityName(t.institute_id)}
                </span>
            </div>
            <p class="thesis-abstract">${
              t.abstract ? t.abstract.substring(0, 120) + "..." : ""
            }</p>
            <div class="card-footer">
                <span class="thesis-year">${t.year}</span>
                <button onclick="switchView('detail-${
                  t.id
                }')" class="btn-text">View Details &rarr;</button>
            </div>
        `;
    area.appendChild(card);
  });
}

function renderDetail(id) {
  const thesis = state.theses.find((t) => t.id === id);
  if (!thesis) {
    alert("Thesis details not found in cache. Please search again.");
    return switchView("search");
  }

  const section = document.createElement("section");
  section.className = "detail-view fade-in";

  // Get related names (using state.metadata)
  const subjectsList = thesis.subjects
    ? thesis.subjects
        .map((sid) => state.metadata.subjects.find((s) => s.id === sid)?.name)
        .join(", ")
    : "None";
  const keywordsList = thesis.keywords
    ? thesis.keywords
        .map((kid) => state.metadata.keywords.find((k) => k.id === kid)?.text)
        .join(", ")
    : "None";

  // Supervisor Name: API only returns IDs in supervisor_ids list.
  // We don't have list of all users to lookup supervisor name by ID.
  // For now, show "Supervisor ID: ..." or just "Unknown" if not in meta.
  // Or we could have included it in API. Let's show IDs for now or Generic.
  const supervisorName =
    thesis.supervisor_ids && thesis.supervisor_ids.length > 0
      ? `ID: ${thesis.supervisor_ids.join(", ")}`
      : "None";

  section.innerHTML = `
        <button onclick="switchView('search')" class="btn-back">&larr; Back to Search</button>
        <div class="detail-card">
            <h1>${thesis.title}</h1>
            <div class="meta-row">
                <span class="meta-item"><strong>Author:</strong> ${
                  thesis.author || "Unknown"
                }</span>
                <span class="meta-item"><strong>Year:</strong> ${
                  thesis.year
                }</span>
                <span class="meta-item"><strong>Language:</strong> ${getLanguageName(
                  thesis.language_code
                )}</span>
                <span class="meta-item"><strong>Pages:</strong> ${
                  thesis.page_count
                }</span>
            </div>
            <div class="meta-info">
                 <p><strong>University:</strong> ${getUniversityName(
                   thesis.institute_id
                 )}</p>
                 <p><strong>Institute:</strong> ${getInstituteName(
                   thesis.institute_id
                 )}</p>
                 <p><strong>Supervisor:</strong> ${supervisorName}</p>
                 <p><strong>Type:</strong> ${getTypeName(thesis.type_id)}</p>
            </div>
            
            <div class="abstract-box">
                <h3>Abstract</h3>
                <p>${thesis.abstract}</p>
            </div>

            <div class="tags-box">
                <p><strong>Subjects:</strong> ${subjectsList}</p>
                <p><strong>Keywords:</strong> ${keywordsList}</p>
            </div>
        </div>
    `;
  appContainer.appendChild(section);
}

async function renderMyTheses() {
  const section = document.createElement("section");
  section.className = "my-theses-section fade-in";
  section.innerHTML = `
        <div class="filters-card glass-panel" style="text-align: center; border:none; background:rgba(255,255,255,0.1); backdrop-filter:blur(10px);">
             <h3 style="color:var(--text-primary);">My Theses</h3>
             <p style="color:var(--text-secondary);">Theses you have submitted</p>
        </div>
        <div id="my-results-area" class="results-grid">
            <p style="text-align:center; grid-column:1/-1;">Loading...</p>
        </div>
    `;
  appContainer.appendChild(section);

  const token = localStorage.getItem("access_token");
  // Check for null, undefined, or string "undefined"/"null"
  if (!token || token === "undefined" || token === "null") {
    alert("You must be logged in to view this page.");
    logout();
    return;
  }

  try {
    const res = await fetch(`${API_URL}/my-theses`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 401 || res.status === 422) {
      alert("Session expired. Please login again.");
      logout();
      return;
    }

    const myTheses = await res.json();

    const resultsArea = document.getElementById("my-results-area");
    resultsArea.innerHTML = "";

    if (myTheses.length === 0) {
      resultsArea.innerHTML =
        '<p class="no-results" style="grid-column: 1/-1; text-align:center;">You haven\'t submitted any theses yet.</p>';
      return;
    }

    // Add to cache so details work
    // Merge with existing cache to avoid losing search results? Or just push?
    // Simple approach: append unique
    myTheses.forEach((t) => {
      if (!state.theses.find((existing) => existing.id === t.id)) {
        state.theses.push(t);
      }
    });

    // Use renderResults logic or inline? Inline simpler for now to match style
    myTheses.forEach((t) => {
      const card = document.createElement("div");
      card.className = "thesis-card glass-card";
      card.innerHTML = `
                <div class="card-header">
                     <!-- API /my-theses might not return everything needed for type name if not joined. 
                          Check app.py: get_my_theses returns subset! 
                          I should update app.py to return full thesis object for consistency. 
                          Assuming I updated app.py logic logic below to return standard response. -->
                     <span class="badge type">${
                       t.type_id ? getTypeName(t.type_id) : "Thesis"
                     }</span>
                     <span class="badge lang">${t.language_code || "TR"}</span>
                     <button class="btn-delete-thesis" onclick="deleteMyThesis(${
                       t.id
                     }, event)" title="Delete Thesis">
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                             <polyline points="3 6 5 6 21 6"></polyline>
                             <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                             <line x1="10" y1="11" x2="10" y2="17"></line>
                             <line x1="14" y1="11" x2="14" y2="17"></line>
                         </svg>
                     </button>
                </div>
                <h3 onclick="switchView('detail-${t.id}')">${t.title}</h3>
                <p class="author">by Me</p>
                <div class="card-footer">
                    <span>${t.year || ""}</span>
                    <button onclick="switchView('detail-${
                      t.id
                    }')" class="btn-text">View Details &rarr;</button>
                </div>
            `;
      resultsArea.appendChild(card);
    });
  } catch (e) {
    console.error(e);
    document.getElementById("my-results-area").innerHTML =
      "<p>Error loading your theses.</p>";
  }
}

function renderSupervisorPanel() {
  if (currentUser.role_id !== 3) {
    alert("Access Denied: Supervisors Only");
    return switchView("search");
  }

  const section = document.createElement("section");
  section.className = "supervisor-section fade-in";
  section.innerHTML = `
        <div class="filters-card" style="text-align: center;">
             <h3>Supervisor Panel</h3>
             <p>Manage theses assigned to you</p>
        </div>
        <div id="sup-results-area" class="results-grid">
            <!-- Properties will be filled here -->
        </div>
    `;
  appContainer.appendChild(section);

  // Filter theses where supervisor_id matches current User ID
  // Note: This relies on state.theses being populated. If we just logged in, it's empty.
  // For now, this panel is best effort.
  const assignedTheses = state.theses.filter(
    (t) => t.supervisor_ids && t.supervisor_ids.includes(state.currentUser.id)
  );
  const resultsArea = document.getElementById("sup-results-area");

  if (assignedTheses.length === 0) {
    resultsArea.innerHTML =
      '<p class="no-results" style="grid-column: 1/-1; text-align:center;">No theses found in cache assigned to you. (Search first to populate cache)</p>';
    return;
  }

  assignedTheses.forEach((t) => {
    const card = document.createElement("div");
    card.className = "thesis-card";
    card.innerHTML = `
            <div class="card-header">
                <span class="badge type">${getTypeName(t.type_id)}</span>
                <span class="badge lang">${t.language_code}</span>
            </div>
            <h3 onclick="switchView('detail-${t.id}')">${t.title}</h3>
            <p class="author">Author: ${t.author || "Unknown"}</p>
            <p class="uni">${getUniversityName(t.institute_id)}</p>
            <div class="card-footer">
                <span>${t.year}</span>
                <button class="btn-primary sm" style="background-color: #ef4444;" onclick="deleteThesis(${
                  t.id
                })">Delete Thesis</button>
            </div>
        `;
    resultsArea.appendChild(card);
  });
}

// Global delete function for My Theses page
window.deleteMyThesis = async (id, event) => {
  event.stopPropagation(); // Prevent card click

  if (
    !confirm(
      "Are you sure you want to delete this thesis? This action cannot be undone."
    )
  ) {
    return;
  }

  const token = localStorage.getItem("access_token");
  if (!token) {
    alert("You must be logged in to delete a thesis.");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/theses/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      // Remove from local cache
      const index = state.theses.findIndex((t) => t.id === id);
      if (index > -1) {
        state.theses.splice(index, 1);
      }
      alert("Thesis deleted successfully!");
      render(); // Re-render the entire view to avoid duplicates
    } else {
      const err = await res.json();
      alert(err.error || "Failed to delete thesis");
    }
  } catch (error) {
    console.error("Delete error:", error);
    alert("An error occurred while deleting the thesis.");
  }
};

// Global delete function for Supervisor Panel (legacy)
window.deleteThesis = (id) => {
  if (
    confirm(
      "Are you sure you want to delete this thesis? This action cannot be undone."
    )
  ) {
    const index = state.theses.findIndex((t) => t.id === id);
    if (index > -1) {
      state.theses.splice(index, 1);
      alert("Thesis deleted locally (Backend delete not impl).");
      renderSupervisorPanel(); // Re-render
    }
  }
};

function renderSubmit() {
  console.log("RENDER SUBMIT DATA:", state.metadata);

  // Fail-Safe Data Extraction
  const types = state.metadata.thesisTypes || [];
  const langs = state.metadata.languages || [];
  const insts = state.metadata.institutes || [];
  const unis = state.metadata.universities || [];
  const subjs = state.metadata.subjects || [];

  const section = document.createElement("section");
  section.className = "submit-section fade-in";
  section.innerHTML = `
        <h2>Submit New Thesis</h2>
        <form id="submit-form" class="submit-form">
            <div class="form-group full">
                <label>Title</label>
                <input type="text" id="sub-title" required>
            </div>
            <div class="form-group full">
                <label>Abstract</label>
                <textarea id="sub-abstract" rows="5" required></textarea>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Year</label>
                    <input type="number" id="sub-year" value="2025" required>
                </div>
                <div class="form-group">
                    <label>Pages</label>
                    <input type="number" id="sub-pages" required>
                </div>
            </div>
            <div class="form-row">
                 <div class="form-group">
                    <label>Type</label>
                    <select id="sub-type">
                        <option value="" disabled selected>Select...</option>
                        ${
                          types.length > 0
                            ? types
                                .map(
                                  (t) =>
                                    `<option value="${t.id}">${t.name}</option>`
                                )
                                .join("")
                            : "<option disabled>No data found (Check Console)</option>"
                        }
                    </select>
                </div>
                <div class="form-group">
                    <label>Language</label>
                    <select id="sub-lang">
                        <option value="" disabled selected>Select...</option>
                        ${
                          langs.length > 0
                            ? langs
                                .map(
                                  (l) =>
                                    `<option value="${l.code}">${l.name}</option>`
                                )
                                .join("")
                            : "<option disabled>No data found (Check Console)</option>"
                        }
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>University</label>
                    <select id="sub-uni">
                         <option value="" disabled selected>Select...</option>
                         ${
                           unis.length > 0
                             ? unis
                                 .map(
                                   (u) =>
                                     `<option value="${u.id}">${u.name}</option>`
                                 )
                                 .join("")
                             : "<option disabled>No data found (Check Console)</option>"
                         }
                    </select>
                </div>
                <div class="form-group">
                    <label>Institute</label>
                    <select id="sub-inst" disabled>
                         <option value="" disabled selected>Select University First</option>
                    </select>
                </div>
            </div>
            
            <div class="form-row">
                 <div class="form-group">
                    <label>Subject</label>
                    <select id="sub-subject">
                        <option value="" disabled selected>Select...</option>
                        ${
                          subjs.length > 0
                            ? subjs
                                .map(
                                  (s) =>
                                    `<option value="${s.id}">${s.name}</option>`
                                )
                                .join("")
                            : "<option disabled>No data found (Check Console)</option>"
                        }
                    </select>
                </div>
                <div class="form-group" style="flex:2;"> <!-- Give keywords more space -->
                    <label>Keywords</label>
                    <input type="text" id="sub-keywords" placeholder="Comma separated (e.g. AI, Neural Networks)" required>
                </div>
            </div>
            
            <button type="submit" class="btn-primary">Submit Thesis</button>
        </form>
    `;
  appContainer.appendChild(section);

  document
    .getElementById("sub-uni")
    .addEventListener("change", () => {
      const selectedUniId = parseInt(document.getElementById("sub-uni").value);
      const instSelect = document.getElementById("sub-inst");
      instSelect.innerHTML = '<option value="" disabled selected>Select...</option>';
      instSelect.disabled = false;

      const filteredInsts = insts.filter(i => i.university_id === selectedUniId);
      
      if (filteredInsts.length > 0) {
          filteredInsts.forEach(i => {
              const opt = document.createElement('option');
              opt.value = i.id;
              opt.textContent = i.name;
              instSelect.appendChild(opt);
          });
      } else {
          instSelect.innerHTML = '<option value="" disabled selected>No institutes found for this university</option>';
          instSelect.disabled = true;
      }
  });

  document
    .getElementById("submit-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      // Capture Data
      const title = document.getElementById("sub-title").value.trim();
      const abstract = document.getElementById("sub-abstract").value.trim();
      const year = document.getElementById("sub-year").value;
      const pageCount = document.getElementById("sub-pages").value;
      const typeId = document.getElementById("sub-type").value;
      const languageCode = document.getElementById("sub-lang").value;
      const instituteId = document.getElementById("sub-inst").value;
      const subjectId = document.getElementById("sub-subject").value;
      const keywords = document.getElementById("sub-keywords").value.trim();

      const token = localStorage.getItem("access_token");
      if (!token) {
        alert("You must be logged in to submit a thesis.");
        return;
      }

      try {
        const res = await fetch(`${API_URL}/theses`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: title,
            abstract: abstract,
            year: year,
            page_count: pageCount,
            type_id: typeId,
            language_code: languageCode,
            institute_id: instituteId,
            subject_id: subjectId,
            keywords: keywords,
          }),
        });

        if (res.ok) {
          alert("Thesis submitted!");
          document.getElementById("submit-form").reset();
          switchView("search");
        } else {
          const err = await res.json();
          alert(err.error || "Submission failed");
        }
      } catch (error) {
        console.error("Submission error:", error);
        alert("An error occurred while submitting the thesis.");
      }
    });
}

function renderAdmin() {
  if (currentUser.role_id !== 2) {
    alert("Access Denied: Admins Only");
    return switchView("search");
  }

  const section = document.createElement("section");
  section.className = "admin-section fade-in";

  section.innerHTML = `
        <h2>Admin Dashboard</h2>
        <div class="admin-grid">
            
            <!-- University Management -->
            <div class="admin-card">
                <h3>Universities</h3>
                <ul class="item-list">
                    ${state.metadata.universities
                      .map((u) => `<li>${u.name}</li>`)
                      .join("")}
                </ul>
                <form id="add-uni-form" class="admin-form-row">
                    <input type="text" id="new-uni-name" placeholder="New University Name" required>
                    <button type="submit" class="btn-primary sm">Add</button>
                </form>
            </div>

            <!-- Institute Management -->
            <div class="admin-card">
                <h3>Institutes</h3>
                <ul class="item-list">
                    ${state.metadata.institutes
                      .map(
                        (i) =>
                          `<li>${i.name} <span>(${getUniversityName(
                            i.university_id
                          )})</span></li>`
                      )
                      .join("")}
                </ul>
                <form id="add-inst-form" class="admin-form-col">
                    <input type="text" id="new-inst-name" placeholder="New Institute Name" required>
                    <select id="new-inst-uni" required>
                        <option value="">Select University</option>
                        ${state.metadata.universities
                          .map(
                            (u) => `<option value="${u.id}">${u.name}</option>`
                          )
                          .join("")}
                    </select>
                    <button type="submit" class="btn-primary sm">Add Institute</button>
                </form>
            </div>

        </div>
    `;
  appContainer.appendChild(section);

  // Logic for forms
  document.getElementById("add-uni-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("new-uni-name").value;
    const newId = state.metadata.universities.length + 1;
    state.metadata.universities.push({ id: newId, name: name });
    renderAdmin(); // Re-render to show new item
  });

  document.getElementById("add-inst-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("new-inst-name").value;
    const uniId = parseInt(document.getElementById("new-inst-uni").value);
    const newId = state.metadata.institutes.length + 1;
    state.metadata.institutes.push({
      id: newId,
      name: name,
      university_id: uniId,
    });
    renderAdmin(); // Re-render
  });
}

// --- Initialization ---

document.addEventListener("DOMContentLoaded", () => {
  // Basic Theme Logic from previous step remains in script.js or we re-add it here?
  // The previous script.js only had theme toggle. I will preserve that logic.

  // Setup Theme Toggle
  const themeToggleBtn = document.getElementById("theme-toggle");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  } else if (prefersDark.matches) {
    document.documentElement.setAttribute("data-theme", "dark");
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      let theme = document.documentElement.getAttribute("data-theme");
      theme = theme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
      // Re-init particles to pick up new color
      initParticles();
    });
  }

  // Initialize App
  render();

  // Initialize Particles
  initParticles();
});

// --- Particle Background Logic ---
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");
let particlesArray;

// Resize
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

// Mouse interaction
const mouse = { x: null, y: null, radius: 150 };

window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

// Particle Class
class Particle {
  constructor(x, y, dx, dy, size, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.size = size;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
    if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;

    // Interaction
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < mouse.radius) {
      if (mouse.x < this.x && this.x < canvas.width - this.size * 10)
        this.x += 3;
      if (mouse.x > this.x && this.x > this.size * 10) this.x -= 3;
      if (mouse.y < this.y && this.y < canvas.height - this.size * 10)
        this.y += 3;
      if (mouse.y > this.y && this.y > this.size * 10) this.y -= 3;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}

function initParticles() {
  particlesArray = [];
  const numberOfParticles = (canvas.height * canvas.width) / 9000;

  // Decide color based on theme
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  // White/Grey for Dark Mode (Antigravity Space feel), Dark Blue/Grey for Light Mode (Clean Google feel)
  const color = isDark ? "rgba(255, 255, 255, 0.5)" : "rgba(32, 33, 36, 0.4)";

  for (let i = 0; i < numberOfParticles; i++) {
    let size = Math.random() * 3 + 1;
    let x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
    let y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2;
    let dx = Math.random() * 2 - 1;
    let dy = Math.random() * 2 - 1;

    particlesArray.push(new Particle(x, y, dx, dy, size, color));
  }
  animateParticles();
}

function animateParticles() {
  requestAnimationFrame(animateParticles);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
  connectParticles();
}

function connectParticles() {
  let opacityValue = 1;
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let distance =
        (particlesArray[a].x - particlesArray[b].x) *
          (particlesArray[a].x - particlesArray[b].x) +
        (particlesArray[a].y - particlesArray[b].y) *
          (particlesArray[a].y - particlesArray[b].y);

      if (distance < (canvas.width / 7) * (canvas.height / 7)) {
        opacityValue = 1 - distance / 20000;
        const isDark =
          document.documentElement.getAttribute("data-theme") === "dark";
        const strokeColor = isDark
          ? `rgba(255, 255, 255, ${opacityValue})`
          : `rgba(32, 33, 36, ${opacityValue})`;
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}
