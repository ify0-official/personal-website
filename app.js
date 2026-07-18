// Page content storage
const pageContent = {
    home: null,
    works: null,
    roadmap: null,
    inquiries: null,
    contacts: null
};

// Current active page
let currentPage = 'home';

// Load all page sections
async function loadAllPages() {
    const pages = ['home', 'works', 'roadmap', 'inquiries', 'contacts'];
    
    for (const page of pages) {
        try {
            const response = await fetch(`./pages/${page}.html`);
            if (!response.ok) throw new Error(`Failed to load ${page}`);
            pageContent[page] = await response.text();
        } catch (error) {
            console.error(`Error loading ${page}:`, error);
            pageContent[page] = `<section id="page-${page}" class="page-section"><p>Error loading ${page}</p></section>`;
        }
    }
    
    // Render all pages
    renderAllPages();
    
    // Initialize the first page
    showPage('home');
}

function renderAllPages() {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;
    
    let html = '';
    for (const [page, content] of Object.entries(pageContent)) {
        if (content) {
            html += content;
        }
    }
    mainContent.innerHTML = html;
}

function showPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target page
    const targetSection = document.getElementById(`page-${pageName}`);
    if (targetSection) {
        targetSection.classList.add('active');
        currentPage = pageName;
        
        // Update navigation state
        updateNavigation(pageName);
        
        // Initialize page-specific functionality
        initializePage(pageName);
    }
}

function updateNavigation(pageName) {
    const buttons = document.querySelectorAll('.bar-link');
    buttons.forEach(btn => {
        const targetPage = btn.getAttribute('data-page');
        if (targetPage === pageName) {
            btn.setAttribute('aria-current', 'page');
            btn.classList.add('force-focus');
        } else {
            btn.removeAttribute('aria-current');
            btn.classList.remove('force-focus');
        }
    });
}

function initializePage(pageName) {
    // Page-specific initialization
    if (pageName === 'works') {
        initializeWorksPage();
    }
}

// Works page specific initialization (from works.html)
function initializeWorksPage() {
    const projectData = [
        { name: "blurred people", image: "./assets/images/blurred-people.webp" },
        { name: "thriller", image: "./assets/images/Michael-Jackson.webp" },
        { name: "tame impala", image: "./assets/images/Tame-Impala.webp" },
        { name: "tyler the creator", image: "./assets/images/Tyler-the-creator.webp" },
        { name: "interstellar", image: "./assets/images/interstellar.webp" },
        { name: "breaking-bad", image: "./assets/images/breakingbad.webp" },
        { name: "dune", image: "./assets/images/dune.webp" },
        { name: "fight-club", image: "./assets/images/fightclub.webp" },
        { name: "inception", image: "./assets/images/inception.webp" },
        { name: "severance", image: "./assets/images/severance.webp" }
    ];

    // Fisher-Yates Shuffle Algorithm
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function renderProjectList(data, containerSelector = '.work-container') {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        const defaultImage = data.length > 0 ? data[0].image : './assets/images/blurred-people.webp';

        let htmlContent = `
            <img
                id="preview-img"
                class="selectable-img"
                src="${defaultImage}"
                alt="Project Preview"
                data-default-src="${defaultImage}"
            />
        `;

        data.forEach((project, index) => {
            const formattedNumber = String(index + 1).padStart(2, '0');

            htmlContent += `
                <div class="project-pair">
                    <span
                        class="selectable project-name super-hover-target"
                        tabindex="0"
                        data-src="${project.image}"
                    >
                        <span class="project-text">${project.name}</span>
                        <span class="project-number">&nbsp; ${formattedNumber}</span>
                    </span>
                </div>
            `;
        });

        container.innerHTML = htmlContent;
    }

    // Shuffle and render
    shuffleArray(projectData);
    renderProjectList(projectData);

    // Setup project interactions after a brief delay to ensure DOM is ready
    setTimeout(() => {
        const previewImg = document.getElementById("preview-img");
        const projectNames = document.querySelectorAll(".project-name");

        projectNames.forEach((name) => {
            name.addEventListener("focus", () => {
                const newSrc = name.getAttribute("data-src");
                if (newSrc && previewImg) previewImg.src = newSrc;
                playProceduralTick();
            });
        });

        initSuperHover();
    }, 0);

    // No-hire shake functionality
    const noHireEl = document.querySelector(".no-hire");
    if (noHireEl) {
        const triggerShake = () => {
            if (noHireEl.classList.contains("shaking")) return;
            noHireEl.classList.add("shaking");
            setTimeout(() => noHireEl.classList.remove("shaking"), 400);
        };
        noHireEl.addEventListener("click", triggerShake);
        noHireEl.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                triggerShake();
            }
        });
    }
}

// Super hover implementation
function initSuperHover() {
    const targets = document.querySelectorAll(".super-hover-target");
    const previewImg = document.getElementById("preview-img");
    const defaultSrc = previewImg ? previewImg.dataset.defaultSrc : null;

    if (!previewImg || targets.length === 0) return;

    let prevX = 0;
    let prevY = 0;
    let currX = 0;
    let currY = 0;
    let activeTarget = null;
    let boxes = [];

    function updateBoxes() {
        boxes = Array.from(targets).map((el) => {
            const rect = el.getBoundingClientRect();
            return {
                element: el,
                left: rect.left,
                right: rect.right,
                top: rect.top,
                bottom: rect.bottom,
                src: el.getAttribute("data-src"),
            };
        });
    }

    updateBoxes();
    window.addEventListener("resize", updateBoxes);
    window.addEventListener("scroll", updateBoxes, { passive: true });

    document.addEventListener("pointermove", (e) => {
        currX = e.clientX;
        currY = e.clientY;
    }, { passive: true });

    function loop() {
        if (currX !== prevX || currY !== prevY) {
            let foundTarget = null;

            for (const box of boxes) {
                if (lineIntersectsRect(prevX, prevY, currX, currY, box)) {
                    foundTarget = box;
                    break;
                }
            }

            if (foundTarget && foundTarget.element !== activeTarget) {
                if (activeTarget) {
                    activeTarget.removeAttribute("data-super-hover-active");
                }

                activeTarget = foundTarget.element;
                activeTarget.setAttribute("data-super-hover-active", "");

                if (previewImg && foundTarget.src) {
                    previewImg.src = foundTarget.src;
                }

                playProceduralTick();
            }

            prevX = currX;
            prevY = currY;
        }
        requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);

    document.addEventListener("mouseleave", () => {
        if (activeTarget) {
            activeTarget.removeAttribute("data-super-hover-active");
            activeTarget = null;
        }
        if (previewImg && defaultSrc) {
            previewImg.src = defaultSrc;
        }
    });

    targets.forEach((target) => {
        target.addEventListener("touchstart", (e) => {
            const newSrc = target.getAttribute("data-src");
            if (newSrc && previewImg) previewImg.src = newSrc;

            if (activeTarget) {
                activeTarget.removeAttribute("data-super-hover-active");
            }
            activeTarget = target;
            activeTarget.setAttribute("data-super-hover-active", "");

            playProceduralTick();
        }, { passive: true });
    });
}

function lineIntersectsRect(x1, y1, x2, y2, rect) {
    const dx = x2 - x1;
    const dy = y2 - y1;

    if (dx === 0 && dy === 0) {
        return (
            x1 >= rect.left &&
            x1 <= rect.right &&
            y1 >= rect.top &&
            y1 <= rect.bottom
        );
    }

    const t1 = (rect.left - x1) / dx;
    const t2 = (rect.right - x1) / dx;
    const t3 = (rect.top - y1) / dy;
    const t4 = (rect.bottom - y1) / dy;

    const minX = Math.min(t1, t2);
    const maxX = Math.max(t1, t2);
    const minY = Math.min(t3, t4);
    const maxY = Math.max(t3, t4);

    return Math.max(minX, minY) <= Math.min(maxX, maxY);
}

// Helper to get procedural tick from scripts.js
function playProceduralTick() {
    // This will be called from the global scope where audioCtx is available
    if (window.playProceduralTick) {
        window.playProceduralTick();
    }
}

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
    loadAllPages().then(() => {
        // Setup keyboard navigation after pages are loaded
        if (typeof window.setupKeyboardNavigation === 'function') {
            window.setupKeyboardNavigation();
        }
    });
});

// Expose showPage globally for keyboard navigation
window.showPage = showPage;
