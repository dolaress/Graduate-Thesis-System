// --- Mock Data ---

const users = [
    { id: 1, first_name: 'Volkan', last_name: 'Tunalı', role_id: 1, email: 'volkan.tunali@gmail.com' },
    { id: 2, first_name: 'Mehmet', last_name: 'Şenadlı', role_id: 2, email: 'mehmet.senadli@gmail.com' },
    { id: 3, first_name: 'Necati', last_name: 'Dolar', role_id: 2, email: 'necati.dolar@gmail.com' },
    { id: 4, first_name: 'Bülent Bora', last_name: 'Balcı', role_id: 3, email: 'bulent.balci@gmail.com' },
    { id: 5, first_name: 'Ebru', last_name: 'Yıldız', role_id: 3, email: 'ebru.yildiz@gmail.com' },
    { id: 6, first_name: 'Hüseyin', last_name: 'Yapıcı', role_id: 3, email: 'huseyin.yapici@gmail.com' },
    { id: 7, first_name: 'Ali', last_name: 'Kılıç', role_id: 3, email: 'ali.kilic@gmail.com' }
];

const roles = [
    { id: 1, name: 'Author' },
    { id: 2, name: 'Admin' },
    { id: 3, name: 'Supervisor' }
];

const universities = [
    { id: 1, name: 'Maltepe University' },
    { id: 2, name: 'Marmara University' },
    { id: 3, name: 'Istanbul University' },
    { id: 4, name: 'Hacettepe University' },
    { id: 5, name: 'Ege University' },
    { id: 6, name: 'Anadolu University' }
];

const institutes = [
    { id: 1, name: 'Faculty of Natural Sciences and Engineering', university_id: 1 },
    { id: 2, name: 'Faculty of Natural Sciences and Engineering', university_id: 2 },
    { id: 3, name: 'Faculty of Natural Sciences and Engineering', university_id: 5 },
    { id: 4, name: 'Institute of Science', university_id: 1 },
    { id: 5, name: 'Institute of Educational Sciences', university_id: 3 },
    { id: 6, name: 'Graduate School of Engineering', university_id: 4 },
    { id: 7, name: 'Institute of Social Sciences', university_id: 2 }
];

const thesisTypes = [
    { id: 1, name: 'Master' },
    { id: 2, name: 'Doctorate' },
    { id: 3, name: 'Specialization in Medicine' },
    { id: 4, name: 'Proficiency in Art' }
];

const languages = [
    { code: 'TR', name: 'Turkish' },
    { code: 'EN', name: 'English' },
    { code: 'FR', name: 'French' },
    { code: 'DE', name: 'German' },
    { code: 'ES', name: 'Spanish' }
];

const subjects = [
    { id: 1, name: 'Biology' },
    { id: 2, name: 'Education and Training' },
    { id: 3, name: 'Software Engineering' },
    { id: 4, name: 'Computer Engineering' },
    { id: 5, name: 'Turkish Language and Literature' },
    { id: 6, name: 'Religion Studies' }
];

const keywords = [
    { id: 1, text: 'Evolution' },
    { id: 2, text: 'Religion' },
    { id: 3, text: 'Software' },
    { id: 4, text: 'Educational Technology' },
    { id: 5, text: 'Tourism' },
    { id: 6, text: 'Algorithm Design' }
];

const theses = [
    {
        id: 894096,
        title: "Young adults' attitudes towards evolutionary theory and religiosity",
        abstract: "This thesis investigates the relationship between young adults' attitudes towards evolution, religious identity and perceived conflict between science and religion.",
        author_id: 1,
        year: 2024,
        type_id: 2,
        institute_id: 1,
        page_count: 210,
        language_code: 'TR',
        submission_date: '2024-06-15',
        supervisor_id: 4,
        subjects: [5], // Religion Studies (Mapped from SQL)
        keywords: [1, 2] // Evolution, Religion
    },
    {
        id: 518265,
        title: "Prospective biology teachers' knowledge of evolution and teaching self-efficacy",
        abstract: "A descriptive study on Turkish prospective biology teachers' knowledge of evolution, acceptance of evolutionary theory and self-efficacy beliefs.",
        author_id: 2,
        year: 2018,
        type_id: 1,
        institute_id: 3,
        page_count: 165,
        language_code: 'TR',
        submission_date: '2018-07-02',
        supervisor_id: 5,
        subjects: [1], // Biology
        keywords: [1] // Evolution (Mapped from SQL) 
    },
    {
        id: 958258,
        title: "Evolving bodies and imperial imaginaries in contemporary literature",
        abstract: "An analysis of bodily transformation, identity and power in selected contemporary novels using evolution as a metaphor.",
        author_id: 1,
        year: 2025,
        type_id: 1,
        institute_id: 5,
        page_count: 190,
        language_code: 'EN',
        submission_date: '2025-05-20',
        supervisor_id: 4,
        subjects: [4], // Computer Engineering ?? (Wait, mapping from SQL insert says (4, 958258). Subject 4 is Computer Engineering. Title sounds like Lit. Let's trust the SQL provided.)
        keywords: [4] // Educational Tech? (SQL says (4, 958258), keyword 4 is Educational Technology. )
    },
    {
        id: 821884,
        title: "A metric for tracking evolutionary coupling in complex software systems",
        abstract: "This thesis proposes a new index for tracking evolutionary coupling between software modules using large-scale repository data.",
        author_id: 2,
        year: 2023,
        type_id: 1,
        institute_id: 4,
        page_count: 145,
        language_code: 'EN',
        submission_date: '2023-09-10',
        supervisor_id: 5,
        subjects: [3], // Software Engineering
        keywords: [5] // Tourism ?? (SQL says (5, 821884). Keyword 5 is Tourism. This is odd for a SW thesis but I follow the data.)
    },
    {
        id: 952012,
        title: "Evolution of language: cognitive and social perspectives",
        abstract: "A comparative study on the evolution of human language abilities from cognitive and sociocultural viewpoints.",
        author_id: 1,
        year: 2025,
        type_id: 2,
        institute_id: 2,
        page_count: 250,
        language_code: 'TR',
        submission_date: '2025-10-01',
        supervisor_id: 4,
        subjects: [2],
        keywords: []
    },
    // --- Added 15 New Mock Theses for Visual Testing ---
    { id: 1001, title: "Deep Learning in Medical Imaging", abstract: "Using CNNs for early detection of lung cancer nodules.", author_id: 1, year: 2023, type_id: 1, institute_id: 1, page_count: 120, language_code: 'EN', submission_date: '2023-01-15', supervisor_id: 4, subjects: [4], keywords: [3] },
    { id: 1002, title: "Turkish Folk Literature in the 19th Century", abstract: "An analysis of folk tales and their cultural impact during the late Ottoman period.", author_id: 2, year: 2020, type_id: 2, institute_id: 5, page_count: 300, language_code: 'TR', submission_date: '2020-05-20', supervisor_id: 5, subjects: [5], keywords: [] },
    { id: 1003, title: "Quantum Computing Algorithms", abstract: "Exploring the efficiency of Shor's algorithm in modern simulations.", author_id: 1, year: 2024, type_id: 1, institute_id: 4, page_count: 150, language_code: 'EN', submission_date: '2024-03-10', supervisor_id: 4, subjects: [4], keywords: [6] },
    { id: 1004, title: "Urban Planning and Sustainability", abstract: "Eco-friendly architectural designs for growing metropolitan areas.", author_id: 2, year: 2022, type_id: 1, institute_id: 3, page_count: 180, language_code: 'TR', submission_date: '2022-11-05', supervisor_id: 5, subjects: [2], keywords: [5] },
    { id: 1005, title: "The Psychology of Remote Work", abstract: "Impact of long-term isolation on employee productivity and mental health.", author_id: 1, year: 2021, type_id: 1, institute_id: 7, page_count: 135, language_code: 'EN', submission_date: '2021-08-12', supervisor_id: 4, subjects: [2], keywords: [] },
    { id: 1006, title: "Artificial Intelligence in Education", abstract: "Adaptive learning systems for personalized high school education.", author_id: 2, year: 2024, type_id: 2, institute_id: 5, page_count: 260, language_code: 'TR', submission_date: '2024-02-28', supervisor_id: 5, subjects: [2, 3], keywords: [3, 4] },
    { id: 1007, title: "Modern Art Movements in Turkey", abstract: "A review of abstract impressionism in the early 2000s.", author_id: 1, year: 2019, type_id: 4, institute_id: 2, page_count: 140, language_code: 'TR', submission_date: '2019-06-30', supervisor_id: 4, subjects: [6], keywords: [] },
    { id: 1008, title: "Blockchain for Supply Chain", abstract: "Implementing decentralized ledgers for transparent logistics.", author_id: 2, year: 2023, type_id: 1, institute_id: 4, page_count: 110, language_code: 'EN', submission_date: '2023-12-01', supervisor_id: 5, subjects: [3], keywords: [3] },
    { id: 1009, title: "Genetic Markers in Wheat Production", abstract: "Increasing yield through selective breeding and CRISPR technology.", author_id: 1, year: 2022, type_id: 2, institute_id: 1, page_count: 320, language_code: 'EN', submission_date: '2022-04-14', supervisor_id: 4, subjects: [1], keywords: [1] },
    { id: 1010, title: "Cybersecurity in IoT Devices", abstract: "Vulnerability assessment of smart home appliances.", author_id: 2, year: 2025, type_id: 1, institute_id: 6, page_count: 175, language_code: 'EN', submission_date: '2025-01-20', supervisor_id: 5, subjects: [3, 4], keywords: [3] },
    { id: 1011, title: "Ottoman Economic Policy 1700-1800", abstract: "Taxation and trade routes in the 18th century empire.", author_id: 1, year: 2018, type_id: 2, institute_id: 7, page_count: 400, language_code: 'TR', submission_date: '2018-09-09', supervisor_id: 4, subjects: [5], keywords: [] },
    { id: 1012, title: "Machine Translation Accuracy", abstract: "Comparing neural machine translation models for Turkic languages.", author_id: 2, year: 2023, type_id: 1, institute_id: 4, page_count: 130, language_code: 'EN', submission_date: '2023-07-22', supervisor_id: 5, subjects: [3], keywords: [3] },
    { id: 1013, title: "Renewable Energy Grid Integration", abstract: "Challenges in stabilizing grids with high solar penetration.", author_id: 1, year: 2021, type_id: 2, institute_id: 3, page_count: 220, language_code: 'TR', submission_date: '2021-03-15', supervisor_id: 4, subjects: [1], keywords: [] },
    { id: 1014, title: "AR in Museum Exhibits", abstract: "Enhancing visitor engagement through Augmented Reality.", author_id: 2, year: 2024, type_id: 4, institute_id: 2, page_count: 160, language_code: 'EN', submission_date: '2024-11-11', supervisor_id: 5, subjects: [2], keywords: [4] },
    { id: 1015, title: "Micro-plastics in Mediterranean Sea", abstract: "Quantitative analysis of pollution levels in coastal regions.", author_id: 1, year: 2022, type_id: 1, institute_id: 1, page_count: 195, language_code: 'EN', submission_date: '2022-08-30', supervisor_id: 4, subjects: [1], keywords: [] }
];


// --- State Management ---

let currentUser = null; // null = not logged in
let currentView = 'login'; // login, search, submit, detail

// --- Helper Functions ---

function getAuthorName(id) {
    const user = users.find(u => u.id === id);
    return user ? `${user.first_name} ${user.last_name}` : 'Unknown';
}

function getTypeName(id) {
    const type = thesisTypes.find(t => t.id === id);
    return type ? type.name : 'Unknown';
}

function getInstituteName(id) {
    const inst = institutes.find(i => i.id === id);
    return inst ? inst.name : 'Unknown';
}

function getLanguageName(code) {
    const lang = languages.find(l => l.code === code);
    return lang ? lang.name : code;
}

function getUniversityName(instituteId) {
    const inst = institutes.find(i => i.id === instituteId);
    if (!inst) return 'Unknown University';
    const uni = universities.find(u => u.id === inst.university_id);
    return uni ? uni.name : 'Unknown University';
}


// --- DOM Elements ---
const appContainer = document.getElementById('app');

// --- Canvas Animation Logic ---
let animationId;
let canvasState = 'none'; // 'particles', 'dots', 'none'

function initCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    // Resize handler
    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const ctx = canvas.getContext('2d');

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
            ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--text-secondary'); // Use theme color
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
                this.size = this.baseSize + (force * 3); // Grow up to 5px
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
            ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--text-border') || '#ccc';
            // Manual fallback if var not found immediately
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            ctx.fillStyle = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)';

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
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (canvasState === 'particles') {
            // Login Animation
            if (particles.length === 0) createParticles();

            particles.forEach(p => {
                p.update();
                p.draw();
            });
            // Connect lines
            ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--border');
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

        } else if (canvasState === 'dots') {
            // Home Animation
            if (dots.length === 0 || dots.length < (canvas.width * canvas.height) / 2000) createDots(); // Re-create if resize made huge gaps? Simple check: just re-create on resize manually or lazy init.
            // Actually efficient re-check:
            // Let's just createDots() when switching state.

            dots.forEach(dot => {
                dot.update(mouse.x, mouse.y);
                dot.draw();
            });
        }

        animationId = requestAnimationFrame(animate);
    }

    // Expose reset functions
    window.resetCanvasState = (state) => {
        canvasState = state;
        if (state === 'dots') createDots();
        if (state === 'particles') createParticles();
    };

    animate();
}

// --- Render Functions ---

function render() {
    appContainer.innerHTML = ''; // Clear current view

    // Toggle Background Canvas Logic
    const bgCanvas = document.getElementById('bg-canvas');
    if (bgCanvas) {
        if (currentView === 'login') {
            bgCanvas.style.display = 'block';
            if (window.resetCanvasState) window.resetCanvasState('particles');
        } else if (currentView === 'home') {
            bgCanvas.style.display = 'block';
            if (window.resetCanvasState) window.resetCanvasState('dots');
        } else {
            bgCanvas.style.display = 'none'; // Hide for inner pages? Or keep static?
            // User requested Dot pattern for "Ana Ekran" (Home). 
            // Usually internal pages are clean. Let's hide it for Search/Submit etc to be clean.
            if (window.resetCanvasState) window.resetCanvasState('none');
        }
    }

    // Toggle Mesh Background for Submit View, Search View, AND My Theses View
    if (currentView === 'submit' || currentView === 'search' || currentView === 'my-theses') {
        document.body.classList.add('mesh-bg');
    } else {
        document.body.classList.remove('mesh-bg');
    }

    // Protected Views check
    if (!currentUser && currentView !== 'login') {
        currentView = 'login';
    }

    if (currentView === 'login') {
        renderLogin();
    } else {
        renderHeader();
        if (currentView === 'home') renderHome();
        else if (currentView === 'search') renderSearch();
        else if (currentView === 'submit') renderSubmit();
        else if (currentView === 'my-theses') renderMyTheses();
        else if (currentView === 'admin') renderAdmin();
        else if (currentView === 'supervisor') renderSupervisorPanel();
        else if (currentView.startsWith('detail-')) {
            const id = parseInt(currentView.split('-')[1]);
            renderDetail(id);
        }
    }
}

function renderHome() {
    const section = document.createElement('section');
    section.className = 'home-section fade-in';
    section.innerHTML = `
        <div class="home-hero">
            <h1>Welcome back, ${currentUser.first_name}</h1>
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
    const section = document.createElement('section');
    section.className = 'login-section fade-in';
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
                    <input type="text" id="reg-name" placeholder="John Doe" required>
                </div>
                <div class="form-group">
                    <label>Email Address</label>
                    <input type="email" id="reg-email" placeholder="john@example.com" required>
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

            <div style="margin-top: 1rem; font-size: 0.8rem; color: #666; border-top:1px solid var(--border); padding-top:1rem;">
                <p>Mock Credentials Hint:</p>
                <p>User: volkan.tunali@gmail.com (Author)</p>
                <p>Admin: mehmet.senadli@gmail.com (Role: Admin)</p>
                <p>Supervisor: bulent.balci@gmail.com</p>
            </div>
        </div>
    `;
    appContainer.appendChild(section);

    const loginForm = document.getElementById('login-form');
    // ... toggles ... (reuse previous logic by copying or minimizing, but I must replace the whole function block to be safe with tool)
    const registerForm = document.getElementById('register-form');
    const title = document.getElementById('form-title');
    const desc = document.getElementById('form-desc');

    // Password Toggle Logic
    document.querySelectorAll('.toggle-password').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const input = document.getElementById(targetId);
            if (input.type === 'password') {
                input.type = 'text';
                btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M1 1l22 22"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/></svg>`;
            } else {
                input.type = 'password';
                btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
            }
        });
    });

    document.getElementById('show-register').addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        title.innerText = 'Create Account';
    });

    document.getElementById('show-login').addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
        title.innerText = 'GTS Login';
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value.trim();
        currentUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (currentUser) {
            currentView = 'home'; // Redirect to Home!
            renderHeader();
            render();
        } else {
            alert('Invalid email! Try: volkan.tunali@gmail.com');
        }
    });

    registerForm.addEventListener('submit', (e) => {
        // ... same reg logic ...
        e.preventDefault();
        const name = document.getElementById('reg-name').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        // ... (simplified check) ...
        const newUser = { id: users.length + 999, first_name: name.split(' ')[0], last_name: name.split(' ')[1] || '', role_id: 1, email: email };
        users.push(newUser);
        currentUser = newUser;
        currentView = 'home';
        renderHeader();
        render();
    });
}

// Init
initCanvas();
render();

function renderHeader() {
    // This function updates the header area outside the appContainer if needed, 
    // or we can prepend a header to appContainer. 
    // For this simple SPA, let's just make the header dynamic in index.html or manage it here.
    // Let's assume index.html has a static header, but we want to show "Logout" and Nav items.
    const nav = document.getElementById('main-nav');
    if (!nav) return; // Should exist in index.html

    nav.innerHTML = ''; // Clear existing content

    if (!currentUser) return; // Empty nav if logged out

    // Check if Admin
    const isAdmin = currentUser.role_id === 2;
    const isSupervisor = currentUser.role_id === 3;

    let panelBtn = '';
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
            Logout (${currentUser.first_name})
        </button>
    `;
    // We do NOT append child to header, as 'nav' is already in place.
}

window.switchView = (view) => {
    currentView = view;
    render();
};

window.logout = () => {
    currentUser = null;
    currentView = 'login';
    const nav = document.getElementById('main-nav');
    if (nav) nav.innerHTML = ''; // Clear content, don't remove element
    render();
};

function renderSearch() {
    const section = document.createElement('section');
    section.className = 'search-container fade-in';

    // Sort keywords alphabetically for better UX
    const sortedKeywords = [...keywords].sort((a, b) => a.text.localeCompare(b.text));

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
                        ${thesisTypes.map(t => `<option value="${t.id}">${t.name}</option>`).join('')}
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

            <!-- Advanced Filters Area (Hidden by default) -->
            <div id="advanced-filters" style="display:none; padding-top:1rem; border-top:1px solid var(--border);">
                <div class="filter-grid">
                    <select id="filter-university">
                        <option value="">All Universities</option>
                        ${universities.map(u => `<option value="${u.id}">${u.name}</option>`).join('')}
                    </select>
                    <select id="filter-institute">
                        <option value="">All Institutes</option>
                        ${institutes.map(i => `<option value="${i.id}">${i.name} (${getUniversityName(i.id)})</option>`).join('')}
                    </select>
                    <select id="filter-language">
                        <option value="">All Languages</option>
                        ${languages.map(l => `<option value="${l.code}">${l.name}</option>`).join('')}
                    </select>
                    <select id="filter-subject">
                        <option value="">All Subjects</option>
                        ${subjects.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
                    </select>
                    
                    <!-- Keyword Autocomplete Filter -->
                    <div style="flex:1; min-width:150px;">
                        <input type="text" id="filter-keyword" list="keyword-list" placeholder="Filter by Keyword (e.g. Evolution)">
                        <datalist id="keyword-list">
                            ${sortedKeywords.map(k => `<option value="${k.text}">`).join('')}
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
    const toggleBtn = document.getElementById('toggle-advanced');
    const advancedDiv = document.getElementById('advanced-filters');

    toggleBtn.addEventListener('click', () => {
        const isHidden = advancedDiv.style.display === 'none';
        advancedDiv.style.display = isHidden ? 'block' : 'none';
        toggleBtn.innerHTML = isHidden ? '<span>&#9662;</span> Hide Advanced Filters' : '<span>&#9656;</span> Show Advanced Filters';
    });

    // Initial fetch of all items
    filterAndRenderResults();

    document.getElementById('btn-search').addEventListener('click', filterAndRenderResults);
    // Add listener to keyword input to trigger search on change/select
    document.getElementById('filter-keyword').addEventListener('input', filterAndRenderResults);
    // Add listener to university to (optional) filter institutes or just trigger search? 
    // Let's just trigger search for now.
    document.getElementById('filter-university').addEventListener('change', filterAndRenderResults);
}

function filterAndRenderResults() {
    const query = document.getElementById('search-text')?.value.toLowerCase() || '';
    const typeId = document.getElementById('filter-type')?.value;
    const langCode = document.getElementById('filter-language')?.value;
    const instId = document.getElementById('filter-institute')?.value;
    const uniId = document.getElementById('filter-university')?.value;
    const subjId = document.getElementById('filter-subject')?.value;

    // Keyword Filter Logic
    const keywordInput = document.getElementById('filter-keyword')?.value;
    // Find the ID of the keyword if it exists in our list (Case insensitive match)
    const targetKeyword = keywordInput ? keywords.find(k => k.text.toLowerCase() === keywordInput.toLowerCase()) : null;


    const minYear = document.getElementById('filter-year-min')?.value;
    const maxYear = document.getElementById('filter-year-max')?.value;

    const filtered = theses.filter(t => {
        // Text Search
        const titleMatch = t.title.toLowerCase().includes(query);
        const abstractMatch = t.abstract.toLowerCase().includes(query);
        const authorName = getAuthorName(t.author_id).toLowerCase();
        const authorMatch = authorName.includes(query);
        // We still search keywords in the main text search too
        const thesisKeywords = t.keywords ? t.keywords.map(kId => keywords.find(k => k.id === kId)?.text.toLowerCase()).join(' ') : '';
        const keywordTextMatch = thesisKeywords.includes(query);

        const textMatch = titleMatch || abstractMatch || authorMatch || keywordTextMatch;

        // Exact filters
        const typeMatch = typeId ? t.type_id == typeId : true;
        const langMatch = langCode ? t.language_code === langCode : true;
        const instMatch = instId ? t.institute_id == instId : true;
        const subjMatch = subjId ? (t.subjects && t.subjects.includes(parseInt(subjId))) : true;

        // University Filter
        let uniMatch = true;
        if (uniId) {
            // Find institute of this thesis
            const thesisInst = institutes.find(i => i.id === t.institute_id);
            // Check if that institute belongs to selected university matches
            uniMatch = thesisInst && thesisInst.university_id == uniId;
        }

        // Specific Keyword Filter (Advanced)
        let kwFilterMatch = true;
        if (keywordInput) {
            if (targetKeyword) {
                kwFilterMatch = t.keywords && t.keywords.includes(targetKeyword.id);
            } else {
                kwFilterMatch = t.keywords && t.keywords.some(kid => {
                    const kText = keywords.find(k => k.id === kid)?.text.toLowerCase();
                    return kText && kText.includes(keywordInput.toLowerCase());
                });
            }
        }

        // Year Range
        const yearMinMatch = minYear ? t.year >= minYear : true;
        const yearMaxMatch = maxYear ? t.year <= maxYear : true;

        return textMatch && typeMatch && langMatch && instMatch && uniMatch && subjMatch && kwFilterMatch && yearMinMatch && yearMaxMatch;
    });

    const resultsArea = document.getElementById('results-area');
    resultsArea.innerHTML = '';

    if (filtered.length === 0) {
        resultsArea.innerHTML = '<p class="no-results">No theses found matching criteria.</p>';
        return;
    }

    filtered.forEach(t => {
        const card = document.createElement('div');
        // Use 'glass-card' for Liquid Glass effect in Search too
        card.className = 'thesis-card glass-card';
        card.innerHTML = `
            <div class="card-header">
                <span class="badge type">${getTypeName(t.type_id)}</span>
                <span class="badge lang">${t.language_code}</span>
            </div>
            <h3 onclick="switchView('detail-${t.id}')">${t.title}</h3>
            <p class="author">by ${getAuthorName(t.author_id)}</p>
            <p class="uni">${getUniversityName(t.institute_id)}</p>
            <div class="card-footer">
                <span>${t.year}</span>
                <button onclick="switchView('detail-${t.id}')" class="btn-text">View Details &rarr;</button>
            </div>
        `;
        resultsArea.appendChild(card);
    });
}

function renderDetail(id) {
    const thesis = theses.find(t => t.id === id);
    if (!thesis) return switchView('search');

    const section = document.createElement('section');
    section.className = 'detail-view fade-in';

    // Get related names
    const subjectsList = thesis.subjects ? thesis.subjects.map(sid => subjects.find(s => s.id === sid)?.name).join(', ') : 'None';
    const keywordsList = thesis.keywords ? thesis.keywords.map(kid => keywords.find(k => k.id === kid)?.text).join(', ') : 'None';
    const supervisor = users.find(u => u.id === thesis.supervisor_id);
    const supervisorName = supervisor ? `${supervisor.first_name} ${supervisor.last_name}` : 'Unknown';

    section.innerHTML = `
        <button onclick="switchView('search')" class="btn-back">&larr; Back to Search</button>
        <div class="detail-card">
            <h1>${thesis.title}</h1>
            <div class="meta-row">
                <span class="meta-item"><strong>Author:</strong> ${getAuthorName(thesis.author_id)}</span>
                <span class="meta-item"><strong>Year:</strong> ${thesis.year}</span>
                <span class="meta-item"><strong>Language:</strong> ${getLanguageName(thesis.language_code)}</span>
                <span class="meta-item"><strong>Pages:</strong> ${thesis.page_count}</span>
            </div>
            <div class="meta-info">
                 <p><strong>University:</strong> ${getUniversityName(thesis.institute_id)}</p>
                 <p><strong>Institute:</strong> ${getInstituteName(thesis.institute_id)}</p>
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

function renderMyTheses() {
    const section = document.createElement('section');
    section.className = 'my-theses-section fade-in';
    section.innerHTML = `
        <div class="filters-card glass-panel" style="text-align: center; border:none; background:rgba(255,255,255,0.1); backdrop-filter:blur(10px);">
             <h3 style="color:var(--text-primary);">My Theses</h3>
             <p style="color:var(--text-secondary);">Theses you have submitted to the system</p>
        </div>
        <div id="my-results-area" class="results-grid">
            <!-- Properties will be filled here -->
        </div>
    `;
    appContainer.appendChild(section);

    const myTheses = theses.filter(t => t.author_id === currentUser.id);
    const resultsArea = document.getElementById('my-results-area');

    if (myTheses.length === 0) {
        resultsArea.innerHTML = '<p class="no-results" style="grid-column: 1/-1; text-align:center;">You haven\'t submitted any theses yet.</p>';
        return;
    }

    myTheses.forEach(t => {
        const card = document.createElement('div');
        // Use 'glass-card' for specific styling
        card.className = 'thesis-card glass-card';
        card.innerHTML = `
            <div class="card-header">
                <span class="badge type">${getTypeName(t.type_id)}</span>
                <span class="badge lang">${t.language_code}</span>
            </div>
            <h3 onclick="switchView('detail-${t.id}')">${t.title}</h3>
            <p class="author">by Me (${getAuthorName(t.author_id)})</p>
            <p class="uni">${getUniversityName(t.institute_id)}</p>
            <div class="card-footer">
                <span>${t.year}</span>
                <button onclick="switchView('detail-${t.id}')" class="btn-text">View Details &rarr;</button>
            </div>
        `;
        resultsArea.appendChild(card);
    });
}

function renderSupervisorPanel() {
    if (currentUser.role_id !== 3) {
        alert("Access Denied: Supervisors Only");
        return switchView('search');
    }

    const section = document.createElement('section');
    section.className = 'supervisor-section fade-in';
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
    const assignedTheses = theses.filter(t => t.supervisor_id === currentUser.id);
    const resultsArea = document.getElementById('sup-results-area');

    if (assignedTheses.length === 0) {
        resultsArea.innerHTML = '<p class="no-results" style="grid-column: 1/-1; text-align:center;">No theses assigned to you yet.</p>';
        return;
    }

    assignedTheses.forEach(t => {
        const card = document.createElement('div');
        card.className = 'thesis-card';
        card.innerHTML = `
            <div class="card-header">
                <span class="badge type">${getTypeName(t.type_id)}</span>
                <span class="badge lang">${t.language_code}</span>
            </div>
            <h3 onclick="switchView('detail-${t.id}')">${t.title}</h3>
            <p class="author">Author: ${getAuthorName(t.author_id)}</p>
            <p class="uni">${getUniversityName(t.institute_id)}</p>
            <div class="card-footer">
                <span>${t.year}</span>
                <button class="btn-primary sm" style="background-color: #ef4444;" onclick="deleteThesis(${t.id})">Delete Thesis</button>
            </div>
        `;
        resultsArea.appendChild(card);
    });
}

// Global delete function
window.deleteThesis = (id) => {
    if (confirm('Are you sure you want to delete this thesis? This action cannot be undone.')) {
        const index = theses.findIndex(t => t.id === id);
        if (index > -1) {
            theses.splice(index, 1);
            alert('Thesis deleted successfully.');
            renderSupervisorPanel(); // Re-render
        }
    }
};

function renderSubmit() {
    const section = document.createElement('section');
    section.className = 'submit-section fade-in';
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
                        ${thesisTypes.map(t => `<option value="${t.id}">${t.name}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Language</label>
                    <select id="sub-lang">
                         ${languages.map(l => `<option value="${l.code}">${l.name}</option>`).join('')}
                    </select>
                </div>
            </div>
            <div class="form-group full">
                <label>Institute</label>
                <select id="sub-inst">
                     ${institutes.map(i => `<option value="${i.id}">${i.name} (${getUniversityName(i.id)})</option>`).join('')}
                </select>
            </div>
            
            <div class="form-row">
                 <div class="form-group">
                    <label>Subject</label>
                    <select id="sub-subject">
                        ${subjects.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
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

    document.getElementById('submit-form').addEventListener('submit', (e) => {
        e.preventDefault();

        // Process Keywords
        const rawKeywords = document.getElementById('sub-keywords').value.split(',');
        const keywordIds = rawKeywords.map(k => {
            const text = k.trim();
            if (!text) return null;
            // Check existing
            const existing = keywords.find(kw => kw.text.toLowerCase() === text.toLowerCase());
            if (existing) return existing.id;
            // Add new mock keyword
            const newId = keywords.length > 0 ? Math.max(...keywords.map(k => k.id)) + 1 : 1;
            keywords.push({ id: newId, text: text });
            return newId;
        }).filter(id => id !== null);

        // Random Supervisor Assignment
        // Get all users with role_id = 3 (Supervisor)
        const supervisors = users.filter(u => u.role_id === 3);
        const randomSupervisor = supervisors.length > 0 ? supervisors[Math.floor(Math.random() * supervisors.length)] : null;
        const supervisorId = randomSupervisor ? randomSupervisor.id : 4; // Fallback

        // Mock Submission logic
        const newThesis = {
            id: Math.floor(Math.random() * 900000) + 100000,
            title: document.getElementById('sub-title').value,
            abstract: document.getElementById('sub-abstract').value,
            author_id: currentUser.id,
            year: parseInt(document.getElementById('sub-year').value),
            type_id: parseInt(document.getElementById('sub-type').value),
            institute_id: parseInt(document.getElementById('sub-inst').value),
            page_count: parseInt(document.getElementById('sub-pages').value),
            language_code: document.getElementById('sub-lang').value,
            submission_date: new Date().toISOString().split('T')[0],
            supervisor_id: supervisorId,
            subjects: [parseInt(document.getElementById('sub-subject').value)],
            keywords: keywordIds
        };
        theses.push(newThesis);
        alert(`Thesis submitted successfully! user: ${randomSupervisor ? randomSupervisor.first_name + ' ' + randomSupervisor.last_name : 'System'} assigned as Supervisor.`);
        switchView('search');
    });
}

function renderAdmin() {
    if (currentUser.role_id !== 2) {
        alert("Access Denied: Admins Only");
        return switchView('search');
    }

    const section = document.createElement('section');
    section.className = 'admin-section fade-in';

    section.innerHTML = `
        <h2>Admin Dashboard</h2>
        <div class="admin-grid">
            
            <!-- University Management -->
            <div class="admin-card">
                <h3>Universities</h3>
                <ul class="item-list">
                    ${universities.map(u => `<li>${u.name}</li>`).join('')}
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
                    ${institutes.map(i => `<li>${i.name} <span>(${getUniversityName(i.university_id)})</span></li>`).join('')}
                </ul>
                <form id="add-inst-form" class="admin-form-col">
                    <input type="text" id="new-inst-name" placeholder="New Institute Name" required>
                    <select id="new-inst-uni" required>
                        <option value="">Select University</option>
                        ${universities.map(u => `<option value="${u.id}">${u.name}</option>`).join('')}
                    </select>
                    <button type="submit" class="btn-primary sm">Add Institute</button>
                </form>
            </div>

        </div>
    `;
    appContainer.appendChild(section);

    // Logic for forms
    document.getElementById('add-uni-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('new-uni-name').value;
        const newId = universities.length + 1;
        universities.push({ id: newId, name: name });
        renderAdmin(); // Re-render to show new item
    });

    document.getElementById('add-inst-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('new-inst-name').value;
        const uniId = parseInt(document.getElementById('new-inst-uni').value);
        const newId = institutes.length + 1;
        institutes.push({ id: newId, name: name, university_id: uniId });
        renderAdmin(); // Re-render
    });
}


// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    // Basic Theme Logic from previous step remains in script.js or we re-add it here? 
    // The previous script.js only had theme toggle. I will preserve that logic.

    // Setup Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDark.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            theme = theme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
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
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particlesArray;

// Resize
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// Mouse interaction
const mouse = { x: null, y: null, radius: 150 };

window.addEventListener('mousemove', (event) => {
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
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) this.x += 3;
            if (mouse.x > this.x && this.x > this.size * 10) this.x -= 3;
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) this.y += 3;
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
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    // White/Grey for Dark Mode (Antigravity Space feel), Dark Blue/Grey for Light Mode (Clean Google feel)
    const color = isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(32, 33, 36, 0.4)';

    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 3) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let dx = (Math.random() * 2) - 1;
        let dy = (Math.random() * 2) - 1;

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
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                opacityValue = 1 - (distance / 20000);
                const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                const strokeColor = isDark ? `rgba(255, 255, 255, ${opacityValue})` : `rgba(32, 33, 36, ${opacityValue})`;
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
