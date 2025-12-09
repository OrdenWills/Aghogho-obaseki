// Dynamic Year
document.getElementById("year").textContent = new Date().getFullYear();

// --- 1. Mobile Navigation Logic (The missing piece) ---
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("toggle");
});

// Close menu when a link is clicked
document.querySelectorAll(".nav-links li a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        hamburger.classList.remove("toggle");
    });
});


// --- 2. Scroll Animation ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section h2, .project-card, .job-item').forEach(el => {
    el.style.opacity = "0";
    el.classList.add('fade-in-scroll');
    observer.observe(el);
});

const style = document.createElement('style');
style.innerHTML = `
    .fade-in-scroll { transition: opacity 0.8s ease-out, transform 0.8s ease-out; transform: translateY(30px); }
    .fade-in { opacity: 1 !important; transform: translateY(0) !important; }
`;
document.head.appendChild(style);


// --- 3. Active Navigation Highlighting ---
const sections = document.querySelectorAll('section[id], div[id="resume"]');
const navLinksAll = document.querySelectorAll('.nav-links li a');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');

            // Remove active class from all nav links
            navLinksAll.forEach(link => {
                link.classList.remove('active');
            });

            // Add active class to the corresponding nav link
            const activeLink = document.querySelector(`.nav-links li a[href="#${id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}, {
    threshold: 0.3, // Trigger when 30% of the section is visible
    rootMargin: '-80px 0px 0px 0px' // Account for fixed navbar
});

// Observe all sections
sections.forEach(section => {
    navObserver.observe(section);
});



// --- 3. Project Data (Expanded to 6 Projects with Gallery Support) ---
const projects = {
    1: {
        title: "7th Century Music",
        category: "Visual Identity",
        brief: "Create a promotional visual direction aligning with their mission to amplify global music voices.",
        process: "Focused on rhythmic layouts and bold typography to represent sound waves.",
        result: "Increased engagement by 20% in the first month.",
        // Note: In a real site, these would be file paths like 'img/project1-mockup.jpg'
        imageMockup: "background-color: #dcdcdc;",
        imageFinal: "background-color: #333;"
    },
    2: {
        title: "Her Growth Hub",
        category: "Social Media Strategy",
        brief: "Create a welcoming digital environment for women entrepreneurs.",
        process: "Selected a soft pastel palette grounded by strong serif typography.",
        result: "Grew the community follower base substantially.",
        imageMockup: "background-color: #d4cbb8;",
        imageFinal: "background-color: #555;"
    },
    3: {
        title: "NGO Awareness",
        category: "Print Design",
        brief: "Design posters that catch attention regarding community health.",
        process: "Used high-contrast colors (Red/White) and minimal text.",
        result: "Distributed 500+ posters leading to record turnout.",
        imageMockup: "background-color: #b8c4d4;",
        imageFinal: "background-color: #444;"
    },
    4: {
        title: "Consultant Identity",
        category: "Personal Branding",
        brief: "A minimalist identity for a local consultant.",
        process: "Drafted 3 concepts, settling on a clean monogram.",
        result: "Full stationery kit: Business cards, letterhead, and email signature.",
        imageMockup: "background-color: #d4b8b8;",
        imageFinal: "background-color: #666;"
    },
    5: {
        title: "Legal Tech Startup",
        category: "UI/UX & Logo",
        brief: "Make complex legal data look friendly and accessible.",
        process: "Utilized plenty of whitespace and calming blue tones.",
        result: "A user-friendly dashboard interface.",
        imageMockup: "background-color: #E0E0E0;",
        imageFinal: "background-color: #222;"
    },
    6: {
        title: "Urban Fashion",
        category: "Editorial Design",
        brief: "Layout a 20-page lookbook for a Lagos fashion brand.",
        process: "Grid-breaking layouts to mimic street style energy.",
        result: "Used for their Summer 2025 campaign launch.",
        imageMockup: "background-color: #C0C0C0;",
        imageFinal: "background-color: #111;"
    }
};

const modal = document.getElementById("projectModal");
const modalBody = document.getElementById("modal-body");

function openModal(id) {
    const p = projects[id];

    // Updated HTML structure to show Mockup AND Final Result
    modalBody.innerHTML = `
        <div class="modal-header">
            <h2>${p.title}</h2>
            <p class="modal-tags">${p.category}</p>
        </div>
        
        <!-- Mockup Image (The "Glamour Shot") -->
        <div class="modal-img-area" style="${p.imageMockup}">
            <p style="color:#fff;">[Mockup Image]</p>
        </div>

        <div class="modal-grid">
            <div class="modal-section">
                <h4>The Brief</h4>
                <p>${p.brief}</p>
            </div>
            <div class="modal-section">
                <h4>The Process</h4>
                <p>${p.process}</p>
            </div>
        </div>
        
        <!-- Final Result Image (The "Detail Shot") -->
        <div class="modal-img-area" style="height: 200px; margin-top: 2rem; ${p.imageFinal}">
             <p style="color:#fff;">[Final Result / Flat Design]</p>
        </div>

        <div class="modal-section" style="margin-top: 1rem;">
            <h4>The Result</h4>
            <p>${p.result}</p>
        </div>
    `;

    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}

window.onclick = function (event) {
    if (event.target == modal) { closeModal(); }
}