// Add a small delay to ensure the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get all pages and navigation links
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');
    const navDots = document.querySelectorAll('.nav-dot');
    const scrollUp = document.getElementById('scrollUp');
    const scrollDown = document.getElementById('scrollDown');
    
    // Function to update active navigation link
    const updateActiveLink = (pageId) => {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${pageId}`) {
                link.classList.add('active');
            }
        });

        // Update active dot
        navDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-section') === pageId) {
                dot.classList.add('active');
            }
        });
    };

    // Function to update navigation buttons visibility
    const updateNavigationButtons = (currentPage) => {
        if (!currentPage) return;
        
        const currentIndex = Array.from(pages).indexOf(currentPage);
        
        // Show/hide up button
        if (currentIndex > 0) {
            scrollUp.style.display = 'flex';
        } else {
            scrollUp.style.display = 'none';
        }
        
        // Show/hide down button
        if (currentIndex < pages.length - 1) {
            scrollDown.style.display = 'flex';
        } else {
            scrollDown.style.display = 'none';
        }
    };

    // Set up Intersection Observer
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.5 // trigger when 50% of the page is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const pageId = entry.target.id;
                pages.forEach(page => {
                    page.style.opacity = page.id === pageId ? '1' : '0.7';
                });
                updateActiveLink(pageId);
                updateNavigationButtons(entry.target);
            }
        });
    }, observerOptions);

    // Observe all pages
    pages.forEach(page => observer.observe(page));

    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetPage = document.getElementById(targetId);
            targetPage.scrollIntoView({ behavior: 'smooth' });
            updateActiveLink(targetId);
            updateNavigationButtons(targetPage);
        });
    });

    // Handle dot navigation clicks
    navDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = dot.getAttribute('data-section');
            const targetPage = document.getElementById(targetId);
            targetPage.scrollIntoView({ behavior: 'smooth' });
            updateActiveLink(targetId);
            updateNavigationButtons(targetPage);
        });
    });

    // Handle scroll buttons
    scrollUp.addEventListener('click', () => {
        const currentPage = Array.from(pages).find(page => {
            const rect = page.getBoundingClientRect();
            return rect.top >= 0 && rect.top <= window.innerHeight / 2;
        });

        if (currentPage) {
            const currentIndex = Array.from(pages).indexOf(currentPage);
            if (currentIndex > 0) {
                pages[currentIndex - 1].scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    scrollDown.addEventListener('click', () => {
        const currentPage = Array.from(pages).find(page => {
            const rect = page.getBoundingClientRect();
            return rect.top >= 0 && rect.top <= window.innerHeight / 2;
        });

        if (currentPage) {
            const currentIndex = Array.from(pages).indexOf(currentPage);
            if (currentIndex < pages.length - 1) {
                pages[currentIndex + 1].scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    // Handle initial hash in URL
    const handleInitialHash = () => {
        const hash = window.location.hash;
        if (hash) {
            const targetId = hash.substring(1);
            const targetPage = document.getElementById(targetId);
            if (targetPage) {
                // Small delay to ensure the page is fully loaded
                setTimeout(() => {
                    targetPage.scrollIntoView();
                    updateActiveLink(targetId);
                    updateNavigationButtons(targetPage);
                }, 100);
            }
        } else {
            // If no hash, set initial active link based on current view
            const visiblePage = Array.from(pages).find(page => {
                const rect = page.getBoundingClientRect();
                return rect.top >= 0 && rect.top <= window.innerHeight / 2;
            });
            if (visiblePage) {
                updateActiveLink(visiblePage.id);
                updateNavigationButtons(visiblePage);
            }
        }
    };

    // Call the initial hash handler
    handleInitialHash();
});



// Mimic Typing
const txt = [
    'Full Stack Web',
    'Java',
    'Python',
    'JavaScript',
    'Node.js',
    'SQL',
];


let i = 0, j = 0;
let end = false;

function wait(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

async function mimicTyping() {
    if (i < txt.length) {
        if (end == false && j <= txt[i].length) {
            document.getElementById("typed").innerHTML += txt[i][j];
            j++;
        }
        
        // This is for backspacing the characters one by one
        if (end == true && j <= txt[i].length) {
            document.getElementById("typed").innerHTML = txt[i].substring(0, j - 1);
            j--;
        }
        
        // This is for checking if all the characters have been typed
        if (j == txt[i].length) {
            end = true;
            await wait(1.5);
        }
        
        // This is for going to the next word
        if (end == true && j == 0) {
            i++;
            end = false;
        }
    } else {
        i = 0;
    }
    setTimeout(mimicTyping, 100);
}

// Start the animation
mimicTyping();